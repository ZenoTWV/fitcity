// POST /api/submit-signup
// Creates a new signup without online payment (collects IBAN for later SEPA setup)

import { validateSignupInput, normalizePostalCode, normalizePhone, normalizeIBAN } from '../_lib/validation.js';
import { createSignup } from '../_lib/db.js';
import { getMembershipById, isSignupEligible } from '../_lib/memberships.js';
import { encryptIBAN } from '../_lib/crypto.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Parse request body
    const data = await request.json();

    // Validate input (including IBAN)
    const validation = validateSignupInput(data);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.errors[0], errors: validation.errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Verify membership is eligible for online signup
    if (!isSignupEligible(data.membershipId)) {
      return new Response(JSON.stringify({ error: 'Dit abonnement kan niet online worden afgesloten' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Get membership details
    const membership = getMembershipById(data.membershipId);
    if (!membership) {
      return new Response(JSON.stringify({ error: 'Ongeldig abonnement' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Encrypt IBAN for storage
    const normalizedIBAN = normalizeIBAN(data.iban);
    const encryptedIBAN = await encryptIBAN(normalizedIBAN, env.IBAN_ENCRYPTION_KEY);

    // Generate unique signup ID
    const signupId = crypto.randomUUID();

    // Create signup record in database with status pending_pickup
    const signup = {
      id: signupId,
      createdAt: new Date().toISOString(),
      status: 'pending_pickup',
      membershipId: membership.id,
      membershipName: membership.name,
      membershipPrice: membership.price.toString(),
      membershipTerm: membership.period,
      startDate: data.startDate,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.toLowerCase().trim(),
      phone: normalizePhone(data.phone),
      dateOfBirth: data.dateOfBirth,
      street: data.street.trim(),
      houseNumber: data.houseNumber.trim(),
      houseNumberAddition: data.houseNumberAddition?.trim() || '',
      postalCode: normalizePostalCode(data.postalCode),
      city: data.city.trim(),
      ibanEncrypted: encryptedIBAN,
    };

    await createSignup(env.DB, signup);

    // Return success (no payment redirect)
    return new Response(JSON.stringify({
      success: true,
      signupId: signupId,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('Error creating signup:', error);

    return new Response(JSON.stringify({
      error: 'Er is een fout opgetreden. Probeer het later opnieuw.',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

// Handle CORS preflight
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
