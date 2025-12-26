import React, { useState, useEffect } from 'react';
import { RefreshCw, Check, X, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import AnimatedPage from '../components/AnimatedPage';
import Container from '../components/Container';
import Button from '../components/ui/Button';

const Admin = () => {
  const [signups, setSignups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingNotes, setEditingNotes] = useState({});
  const [saving, setSaving] = useState({});
  const [activeTab, setActiveTab] = useState('pending_pickup');
  const [expandedRows, setExpandedRows] = useState(new Set());

  const loadSignups = async (status = 'pending_pickup') => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/signups?status=${status}`);
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
          signupId,
          paidInPerson: editingNotes[signupId].paidInPerson,
          adminNotes: editingNotes[signupId].adminNotes,
        }),
      });
      // Reload signups to reflect changes
      await loadSignups(activeTab);
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

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    loadSignups(newTab);
  };

  const toggleRow = (signupId) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(signupId)) {
        next.delete(signupId);
      } else {
        next.add(signupId);
      }
      return next;
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    // Load signups on mount and when tab changes
    // Authentication is handled by Cloudflare Access
    loadSignups(activeTab);
  }, [activeTab]);

  // Authentication is handled by Cloudflare Access
  // If user reaches this page, they are already authenticated

  return (
    <AnimatedPage>
      <section className="min-h-screen py-12 lg:py-16">
        <Container size="full">
          {/* Tab Navigation */}
          <div className="mb-6 flex gap-3">
            <button
              type="button"
              onClick={() => handleTabChange('pending_pickup')}
              className={clsx(
                'rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.3em] transition',
                activeTab === 'pending_pickup'
                  ? 'border-fitcity text-fitcity bg-fitcity/10'
                  : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
              )}
            >
              In afwachting
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('paid')}
              className={clsx(
                'rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.3em] transition',
                activeTab === 'paid'
                  ? 'border-fitcity text-fitcity bg-fitcity/10'
                  : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
              )}
            >
              Betaald
            </button>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl">
                {activeTab === 'pending_pickup' ? 'Inschrijvingen in afwachting' : 'Betaalde inschrijvingen'}
              </h1>
              <p className="mt-1 text-white/60">
                {signups.length} {activeTab === 'pending_pickup' ? 'in afwachting' : 'betaald'}
              </p>
            </div>
            <Button
              variant="ghost"
              icon={RefreshCw}
              onClick={() => loadSignups(activeTab)}
              disabled={isLoading}
            >
              Vernieuwen
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center text-white/60">Laden...</div>
          ) : signups.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="text-white/60">
                Geen {activeTab === 'pending_pickup' ? 'inschrijvingen in afwachting' : 'betaalde inschrijvingen'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="px-4 py-3 font-medium">Naam</th>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Lidmaatschap</th>
                    <th className="px-4 py-3 font-medium">Betaald</th>
                    <th className="px-4 py-3 font-medium">Actie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {signups.map((signup) => {
                    const isExpanded = expandedRows.has(signup.id);

                    return (
                      <React.Fragment key={signup.id}>
                        {/* Main Row - Always Visible */}
                        <tr
                          className="hover:bg-white/[0.02] cursor-pointer"
                          onClick={() => toggleRow(signup.id)}
                        >
                          {/* Naam + tijd */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div>
                                <div className="font-medium">{signup.firstName} {signup.lastName}</div>
                                <div className="text-xs text-white/50">
                                  {new Date(signup.createdAt).toLocaleString('nl-NL', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                              </div>
                              <ChevronDown className={`h-4 w-4 text-white/40 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="px-4 py-3">
                            <div className="text-sm text-white/80">{signup.email}</div>
                            <div className="text-xs text-white/50">{signup.phone}</div>
                          </td>

                          {/* Lidmaatschap */}
                          <td className="px-4 py-3">
                            <div className="font-medium text-fitcity text-sm">{signup.membershipName}</div>
                            <div className="text-xs text-white/50">€{signup.membershipPrice}/{signup.membershipTerm}</div>
                            <div className="text-xs text-white/40 mt-0.5">
                              Start: {new Date(signup.startDate).toLocaleDateString('nl-NL')}
                            </div>
                          </td>

                          {/* Betaald checkbox */}
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
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

                          {/* Save button */}
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSave(signup.id)}
                              disabled={saving[signup.id]}
                            >
                              {saving[signup.id] ? 'Opslaan...' : 'Opslaan'}
                            </Button>
                          </td>
                        </tr>

                        {/* Expansion Row - Conditionally Visible */}
                        {isExpanded && (
                          <tr className="bg-white/[0.03]">
                            <td colSpan="5" className="px-4 py-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Geboortedatum */}
                                <div>
                                  <label className="block text-xs text-white/60 mb-1">Geboortedatum</label>
                                  <div className="text-sm text-white/80">
                                    {new Date(signup.dateOfBirth).toLocaleDateString('nl-NL')}
                                  </div>
                                </div>

                                {/* Adres */}
                                <div>
                                  <label className="block text-xs text-white/60 mb-1">Adres</label>
                                  <div className="text-sm text-white/80">
                                    {signup.street} {signup.houseNumber}{signup.houseNumberAddition || ''}
                                  </div>
                                </div>

                                {/* Postcode + Plaats */}
                                <div>
                                  <label className="block text-xs text-white/60 mb-1">Postcode + Plaats</label>
                                  <div className="text-sm text-white/80">
                                    {signup.postalCode} {signup.city}
                                  </div>
                                </div>

                                {/* IBAN */}
                                <div>
                                  <label className="block text-xs text-white/60 mb-1">IBAN</label>
                                  {signup.iban ? (
                                    <button
                                      onClick={() => copyToClipboard(signup.iban)}
                                      className="font-mono text-sm text-white/80 hover:text-fitcity"
                                      title="Klik om te kopiëren"
                                    >
                                      {signup.iban}
                                    </button>
                                  ) : (
                                    <span className="text-white/40">-</span>
                                  )}
                                </div>

                                {/* Notities - Full Width */}
                                <div className="md:col-span-2">
                                  <label className="block text-xs text-white/60 mb-1">Notities</label>
                                  <input
                                    type="text"
                                    value={editingNotes[signup.id]?.adminNotes || ''}
                                    onChange={(e) => updateNotes(signup.id, e.target.value)}
                                    placeholder="Notities toevoegen..."
                                    className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-fitcity"
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
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
