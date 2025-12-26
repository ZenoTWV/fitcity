// POST /api/admin/update-signup
// Updates admin fields (paid_in_person, admin_notes) for a signup

import { updateSignupAdminFields, updateSignupStatus } from '../../_lib/db.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://fitcity.summitlab.dev',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { signupId, paidInPerson, adminNotes } = await request.json();

    // Authentication handled by Cloudflare Access

    if (!signupId) {
      return new Response(JSON.stringify({ error: 'Missing signupId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Update admin fields
    await updateSignupAdminFields(env.DB, signupId, paidInPerson, adminNotes);

    // Update status based on paid status
    if (paidInPerson) {
      await updateSignupStatus(env.DB, signupId, 'paid');
    } else {
      await updateSignupStatus(env.DB, signupId, 'pending_pickup');
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
      'Access-Control-Allow-Origin': 'https://fitcity.summitlab.dev',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
