// Input validation utilities for signup form

// Valid membership IDs that are eligible for online signup (recurring only)
const VALID_MEMBERSHIP_IDS = [
  'smart-deal',
  'duo-deal',
  'ladies-jaar-deal',
  'ultimate-fit',
  'kickboxing-weekly',
  'kickboxing-unlimited',
  'fit-deal-halfjaar',
  'ladies-halfjaar',
  'maand-flex',
  'ladies-flex',
];

export function validateSignupInput(data) {
  const errors = [];

  // Required fields
  if (!data.membershipId) {
    errors.push('Kies een abonnement');
  } else if (!VALID_MEMBERSHIP_IDS.includes(data.membershipId)) {
    errors.push('Ongeldig abonnement geselecteerd');
  }

  if (!data.startDate) {
    errors.push('Kies een startdatum');
  } else if (!isValidFutureDate(data.startDate)) {
    errors.push('Startdatum moet in de toekomst liggen');
  }

  if (!data.firstName?.trim()) {
    errors.push('Voornaam is verplicht');
  }

  if (!data.lastName?.trim()) {
    errors.push('Achternaam is verplicht');
  }

  if (!data.email) {
    errors.push('E-mailadres is verplicht');
  } else if (!isValidEmail(data.email)) {
    errors.push('Ongeldig e-mailadres');
  }

  if (!data.phone) {
    errors.push('Telefoonnummer is verplicht');
  } else if (!isValidPhone(data.phone)) {
    errors.push('Ongeldig telefoonnummer');
  }

  if (!data.dateOfBirth) {
    errors.push('Geboortedatum is verplicht');
  } else if (!isOldEnough(data.dateOfBirth, 13)) {
    errors.push('Je moet minimaal 13 jaar oud zijn');
  }

  if (!data.street?.trim()) {
    errors.push('Straat is verplicht');
  }

  if (!data.houseNumber?.trim()) {
    errors.push('Huisnummer is verplicht');
  }

  if (!data.postalCode) {
    errors.push('Postcode is verplicht');
  } else if (!isValidPostalCode(data.postalCode)) {
    errors.push('Ongeldige postcode (formaat: 1234AB)');
  }

  if (!data.city?.trim()) {
    errors.push('Plaats is verplicht');
  }

  if (!data.agreeTerms) {
    errors.push('Je moet akkoord gaan met de voorwaarden');
  }

  // IBAN validation (required for no-payment flow)
  if (data.iban !== undefined) {
    if (!data.iban) {
      errors.push('IBAN is verplicht');
    } else if (!isValidIBAN(data.iban)) {
      errors.push('Ongeldig IBAN (formaat: NL91ABNA0417164300)');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function isValidEmail(email) {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Dutch phone number validation (mobile or landline)
  // Accepts formats: 0612345678, 06-12345678, +31612345678, etc.
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^(\+31|0031|0)[1-9][0-9]{8}$/;
  return phoneRegex.test(cleaned);
}

function isValidPostalCode(postalCode) {
  // Dutch postal code format: 4 digits + 2 letters
  const cleaned = postalCode.replace(/\s/g, '').toUpperCase();
  const postalRegex = /^[1-9][0-9]{3}[A-Z]{2}$/;
  return postalRegex.test(cleaned);
}

function isValidIBAN(iban) {
  // Dutch IBAN format: NL + 2 check digits + 4 letter bank code + 10 digit account
  // Example: NL91ABNA0417164300 (18 characters total)
  const cleaned = iban.replace(/\s/g, '').toUpperCase();
  const ibanRegex = /^NL[0-9]{2}[A-Z]{4}[0-9]{10}$/;
  return ibanRegex.test(cleaned);
}

function isValidFutureDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
}

function isOldEnough(dateOfBirth, minAge) {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age >= minAge;
}

export function normalizePostalCode(postalCode) {
  return postalCode.replace(/\s/g, '').toUpperCase();
}

export function normalizePhone(phone) {
  // Normalize to Dutch format without spaces
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+31')) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.startsWith('0031')) {
    cleaned = '0' + cleaned.slice(4);
  }
  return cleaned;
}

export function normalizeIBAN(iban) {
  // Normalize to uppercase without spaces
  return iban.replace(/\s/g, '').toUpperCase();
}
