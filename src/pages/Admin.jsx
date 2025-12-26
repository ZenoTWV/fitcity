import { useState, useEffect } from 'react';
import { Lock, RefreshCw, Check, X } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import Container from '../components/Container';
import Button from '../components/ui/Button';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');
  const [signups, setSignups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingNotes, setEditingNotes] = useState({});
  const [saving, setSaving] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminPassword', password);
        loadSignups(password);
      } else {
        setAuthError('Incorrect password');
      }
    } catch (error) {
      setAuthError('Login failed');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const loadSignups = async (pwd) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/signups?password=${encodeURIComponent(pwd)}&status=pending_pickup`);
      const data = await response.json();
      if (data.signups) {
        setSignups(data.signups);
        // Initialize editing notes
        const notes = {};
        data.signups.forEach((s) => {
          notes[s.id] = { paidInPerson: s.paidInPerson, adminNotes: s.adminNotes || '' };
        });
        setEditingNotes(notes);
      }
    } catch (error) {
      console.error('Failed to load signups', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (signupId) => {
    setSaving((prev) => ({ ...prev, [signupId]: true }));
    try {
      await fetch('/api/admin/update-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          signupId,
          paidInPerson: editingNotes[signupId].paidInPerson,
          adminNotes: editingNotes[signupId].adminNotes,
        }),
      });
      // Reload signups to reflect changes
      await loadSignups(password);
    } catch (error) {
      console.error('Failed to save', error);
    } finally {
      setSaving((prev) => ({ ...prev, [signupId]: false }));
    }
  };

  const togglePaid = (signupId) => {
    setEditingNotes((prev) => ({
      ...prev,
      [signupId]: {
        ...prev[signupId],
        paidInPerson: !prev[signupId].paidInPerson,
      },
    }));
  };

  const updateNotes = (signupId, notes) => {
    setEditingNotes((prev) => ({
      ...prev,
      [signupId]: {
        ...prev[signupId],
        adminNotes: notes,
      },
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('adminPassword');
    if (saved) {
      setPassword(saved);
      setIsAuthenticated(true);
      loadSignups(saved);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <AnimatedPage>
        <section className="flex min-h-screen items-center py-24">
          <Container size="sm">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-fitcity/20">
                  <Lock className="h-8 w-8 text-fitcity" />
                </div>
                <h1 className="font-display text-3xl">Admin Login</h1>
                <p className="mt-2 text-white/60">Enter password to view signups</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-fitcity"
                  autoFocus
                />
                {authError && <p className="text-sm text-red-400">{authError}</p>}
                <Button type="submit" disabled={isAuthenticating} className="w-full justify-center">
                  {isAuthenticating ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </div>
          </Container>
        </section>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <section className="min-h-screen py-12 lg:py-16">
        <Container size="full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl">Pending Signups</h1>
              <p className="mt-1 text-white/60">{signups.length} pending</p>
            </div>
            <Button
              variant="ghost"
              icon={RefreshCw}
              onClick={() => loadSignups(password)}
              disabled={isLoading}
            >
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center text-white/60">Loading...</div>
          ) : signups.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="text-white/60">No pending signups</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Membership</th>
                    <th className="px-4 py-3 font-medium">Start Date</th>
                    <th className="px-4 py-3 font-medium">IBAN</th>
                    <th className="px-4 py-3 font-medium">Paid</th>
                    <th className="px-4 py-3 font-medium">Notes</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {signups.map((signup) => (
                    <tr key={signup.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <div className="font-medium">{signup.firstName} {signup.lastName}</div>
                        <div className="text-xs text-white/50">{new Date(signup.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-white/80">{signup.email}</div>
                        <div className="text-xs text-white/50">{signup.phone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-fitcity">{signup.membershipName}</div>
                        <div className="text-xs text-white/50">€{signup.membershipPrice}/{signup.membershipTerm}</div>
                      </td>
                      <td className="px-4 py-3 text-white/80">
                        {new Date(signup.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {signup.iban ? (
                          <button
                            onClick={() => copyToClipboard(signup.iban)}
                            className="font-mono text-xs text-white/80 hover:text-fitcity"
                            title="Click to copy"
                          >
                            {signup.iban}
                          </button>
                        ) : (
                          <span className="text-white/40">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => togglePaid(signup.id)}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                            editingNotes[signup.id]?.paidInPerson
                              ? 'border-green-500 bg-green-500/20 text-green-400'
                              : 'border-white/10 bg-white/5 text-white/40 hover:border-white/30'
                          }`}
                        >
                          {editingNotes[signup.id]?.paidInPerson ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={editingNotes[signup.id]?.adminNotes || ''}
                          onChange={(e) => updateNotes(signup.id, e.target.value)}
                          placeholder="Add notes..."
                          className="w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white outline-none focus:border-fitcity"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSave(signup.id)}
                          disabled={saving[signup.id]}
                        >
                          {saving[signup.id] ? 'Saving...' : 'Save'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </section>
    </AnimatedPage>
  );
};

export default Admin;
