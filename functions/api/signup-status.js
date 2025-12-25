// GET /api/signup-status?id={signupId}
// Returns current signup status for thank-you page handling

import { getSignupById } from '../_lib/db.js';

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const signupId = url.searchParams.get('id');

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  if (!signupId) {
    return new Response(JSON.stringify({ error: 'Missing signup id' }), {
      status: 400,
      headers,
    });
  }

  try {
    const signup = await getSignupById(env.DB, signupId);
    if (!signup) {
      return new Response(JSON.stringify({ error: 'Signup not found' }), {
        status: 404,
        headers,
      });
    }

    return new Response(
      JSON.stringify({
        id: signup.id,
        status: signup.status,
        membershipId: signup.membershipId,
        membershipName: signup.membershipName,
        startDate: signup.startDate,
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error fetching signup status:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers,
    });
  }
}

// Handle CORS preflight if needed
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
