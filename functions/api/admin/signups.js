// GET /api/admin/signups?password=xxx&status=pending_pickup
// Returns list of signups with decrypted IBANs (admin only)

import { getAllSignupsByStatus } from '../../_lib/db.js';
import { decryptIBAN } from '../../_lib/crypto.js';

export async function onRequestGet(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const url = new URL(request.url);
    const password = url.searchParams.get('password');
    const status = url.searchParams.get('status') || 'pending_pickup';

    // Verify admin password
    if (password !== env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Get signups by status
    const signups = await getAllSignupsByStatus(env.DB, status);

    // Decrypt IBANs
    const signupsWithDecryptedIBAN = await Promise.all(
      signups.map(async (signup) => {
        let iban = null;
        if (signup.ibanEncrypted) {
          try {
            iban = await decryptIBAN(signup.ibanEncrypted, env.IBAN_ENCRYPTION_KEY);
          } catch (err) {
            console.error('Failed to decrypt IBAN for signup', signup.id, err);
            iban = '[DECRYPTION ERROR]';
          }
        }

        return {
          ...signup,
          iban, // Decrypted IBAN
          ibanEncrypted: undefined, // Don't send encrypted version to frontend
        };
      })
    );

    return new Response(JSON.stringify({ signups: signupsWithDecryptedIBAN }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Admin signups error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
