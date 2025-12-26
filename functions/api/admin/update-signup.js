// POST /api/admin/update-signup
// Updates admin fields (paid_in_person, admin_notes) for a signup

import { updateSignupAdminFields, updateSignupStatus } from '../../_lib/db.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { password, signupId, paidInPerson, adminNotes } = await request.json();

    // Verify admin password
    if (password !== env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!signupId) {
      return new Response(JSON.stringify({ error: 'Missing signupId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Update admin fields
    await updateSignupAdminFields(env.DB, signupId, paidInPerson, adminNotes);

    // If marked as paid in person, update status to 'paid'
    if (paidInPerson) {
      await updateSignupStatus(env.DB, signupId, 'paid');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Admin update signup error:', error);
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
