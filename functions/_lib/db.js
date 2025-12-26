// D1 Database helpers for signup operations

export async function createSignup(db, signup) {
  const stmt = db.prepare(`
    INSERT INTO signups (
      id, created_at, status, membership_id, membership_name, membership_price,
      membership_term, start_date, first_name, last_name, email, phone,
      date_of_birth, street, house_number, house_number_addition,
      postal_code, city, iban_encrypted
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  await stmt.bind(
    signup.id,
    signup.createdAt,
    signup.status,
    signup.membershipId,
    signup.membershipName,
    signup.membershipPrice,
    signup.membershipTerm,
    signup.startDate,
    signup.firstName,
    signup.lastName,
    signup.email,
    signup.phone,
    signup.dateOfBirth,
    signup.street,
    signup.houseNumber,
    signup.houseNumberAddition || null,
    signup.postalCode,
    signup.city,
    signup.ibanEncrypted || null
  ).run();

  return signup;
}

export async function getSignupById(db, id) {
  const stmt = db.prepare('SELECT * FROM signups WHERE id = ?');
  const result = await stmt.bind(id).first();
  return result ? mapDbRowToSignup(result) : null;
}

export async function getSignupByMolliePaymentId(db, molliePaymentId) {
  const stmt = db.prepare('SELECT * FROM signups WHERE mollie_payment_id = ?');
  const result = await stmt.bind(molliePaymentId).first();
  return result ? mapDbRowToSignup(result) : null;
}

export async function updateSignupMolliePaymentId(db, id, molliePaymentId) {
  const stmt = db.prepare('UPDATE signups SET mollie_payment_id = ? WHERE id = ?');
  await stmt.bind(molliePaymentId, id).run();
}

export async function updateSignupStatus(db, id, status) {
  const stmt = db.prepare('UPDATE signups SET status = ? WHERE id = ?');
  await stmt.bind(status, id).run();
}

export async function updateSignupEmailSent(db, id) {
  const stmt = db.prepare('UPDATE signups SET email_sent_at = ? WHERE id = ?');
  await stmt.bind(new Date().toISOString(), id).run();
}

export async function updateSignupSubscription(db, id, customerId, subscriptionId) {
  const stmt = db.prepare(`
    UPDATE signups
    SET mollie_customer_id = ?, mollie_subscription_id = ?, status = 'subscription_created'
    WHERE id = ?
  `);
  await stmt.bind(customerId, subscriptionId, id).run();
}

// Map database row (snake_case) to JavaScript object (camelCase)
function mapDbRowToSignup(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    status: row.status,
    membershipId: row.membership_id,
    membershipName: row.membership_name,
    membershipPrice: row.membership_price,
    membershipTerm: row.membership_term,
    startDate: row.start_date,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    dateOfBirth: row.date_of_birth,
    street: row.street,
    houseNumber: row.house_number,
    houseNumberAddition: row.house_number_addition,
    postalCode: row.postal_code,
    city: row.city,
    ibanEncrypted: row.iban_encrypted,
    molliePaymentId: row.mollie_payment_id,
    mollieCustomerId: row.mollie_customer_id,
    mollieSubscriptionId: row.mollie_subscription_id,
    emailSentAt: row.email_sent_at,
    paidInPerson: row.paid_in_person === 1,
    adminNotes: row.admin_notes,
  };
}

export async function getAllSignupsByStatus(db, status) {
  const stmt = db.prepare('SELECT * FROM signups WHERE status = ? ORDER BY created_at DESC');
  const result = await stmt.bind(status).all();
  return result.results ? result.results.map(mapDbRowToSignup) : [];
}

export async function updateSignupAdminFields(db, id, paidInPerson, adminNotes) {
  const stmt = db.prepare('UPDATE signups SET paid_in_person = ?, admin_notes = ? WHERE id = ?');
  await stmt.bind(paidInPerson ? 1 : 0, adminNotes || null, id).run();
}
