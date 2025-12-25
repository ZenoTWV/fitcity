// Resend email helper for sending confirmation emails

const RESEND_API_BASE = 'https://api.resend.com';

export async function sendSignupConfirmation(apiKey, fromEmail, signup) {
  const html = generateConfirmationEmailHtml(signup);
  const text = generateConfirmationEmailText(signup);

  const response = await fetch(`${RESEND_API_BASE}/emails`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: signup.email,
      subject: 'Bevestiging inschrijving FitCity Culemborg',
      html: html,
      text: text,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Resend API error: ${error.message || 'Unknown error'}`);
  }

  return response.json();
}

function generateConfirmationEmailHtml(signup) {
  const formattedPrice = formatPrice(parseFloat(signup.membershipPrice));
  const formattedStartDate = formatDate(signup.startDate);

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bevestiging inschrijving</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f2; color: #1a1c23;">
  <div style="max-width: 600px; margin: 0 auto; padding: 32px 16px;">
    <div style="background-color: #ffffff; border-radius: 16px; padding: 32px 24px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">

      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
        <div style="height: 40px; width: 40px; border-radius: 12px; background: #ffe500; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; color: #0b0b0f; font-size: 14px;">FC</div>
        <div>
          <div style="text-transform: uppercase; letter-spacing: 0.28em; font-size: 10px; color: #6b7280;">FitCity</div>
          <div style="font-weight: 700; font-size: 16px;">Culemborg</div>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 28px;">
        <h1 style="color: #05060a; font-size: 22px; margin: 0 0 8px 0;">Welkom bij FitCity!</h1>
        <p style="color: #6b7280; margin: 0;">Je inschrijving is bevestigd</p>
      </div>

      <p style="margin: 0 0 20px 0; line-height: 1.6;">Beste ${signup.firstName},</p>

      <p style="margin: 0 0 20px 0; line-height: 1.6;">Bedankt voor je inschrijving bij FitCity Culemborg! We hebben je betaling van <strong>€17,00</strong> inschrijfkosten ontvangen.</p>

      <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; margin: 0 0 20px 0;">
        <h2 style="font-size: 16px; color: #05060a; margin: 0 0 12px 0;">Jouw abonnement</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Abonnement:</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 600;">${signup.membershipName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Prijs:</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 600;">${formattedPrice} / ${signup.membershipTerm}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Startdatum:</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 600;">${formattedStartDate}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 12px; padding: 14px; margin: 0 0 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #92400e;"><strong>Let op:</strong> Vanaf je startdatum worden de abonnementskosten maandelijks automatisch geïncasseerd via SEPA automatische incasso.</p>
      </div>

      <div style="background-color: #f9fafb; border-radius: 12px; padding: 18px; margin: 0 0 20px 0;">
        <h2 style="font-size: 15px; color: #05060a; margin: 0 0 10px 0;">Volgende stappen</h2>
        <ol style="margin: 0; padding-left: 18px; color: #374151; line-height: 1.6;">
          <li style="margin-bottom: 8px;">Kom langs met een geldig legitimatiebewijs om je ledenpas op te halen.</li>
          <li style="margin-bottom: 8px;">Op je startdatum is je lidmaatschap actief; incasso van het maandbedrag volgt automatisch.</li>
          <li style="margin-bottom: 0;">Vragen? Neem contact op via <a href="https://fitcityculemborg.nl/contact" style="color: #0f172a;">fitcityculemborg.nl/contact</a> of bel +31 6 46872274.</li>
        </ol>
      </div>

      <p style="margin: 0 0 20px 0; line-height: 1.6;">We kijken ernaar uit je te verwelkomen in onze sportschool. Heb je vragen? Neem gerust contact met ons op.</p>

      <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 0 14px 0; width: 100%;">
        <tr>
          <td style="border-radius: 999px; background: #ffe500; padding: 12px 24px; text-align: center;">
            <a href="https://fitcityculemborg.nl/contact" style="color: #0b0b0f; font-weight: 700; text-decoration: none; display: inline-block;">Contact opnemen</a>
          </td>
        </tr>
      </table>

      <p style="margin: 0; line-height: 1.6; color: #111827;">
        Sportieve groet,<br>
        <strong>Team FitCity Culemborg</strong><br>
        <a href="https://fitcityculemborg.nl/contact" style="color: #0f172a;">fitcityculemborg.nl/contact</a>
      </p>

    </div>

    <div style="text-align: center; padding: 20px 0; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0 0 6px 0;">FitCity Culemborg</p>
      <p style="margin: 0;"><a href="https://fitcityculemborg.nl" style="color: #6b7280;">fitcityculemborg.nl</a></p>
    </div>

  </div>
</body>
</html>
  `.trim();
}

function generateConfirmationEmailText(signup) {
  const formattedPrice = formatPrice(parseFloat(signup.membershipPrice));
  const formattedStartDate = formatDate(signup.startDate);

  return `
Welkom bij FitCity!

Beste ${signup.firstName},

Bedankt voor je inschrijving bij FitCity Culemborg! We hebben je betaling van €17,00 inschrijfkosten ontvangen.

JOUW ABONNEMENT
---------------
Abonnement: ${signup.membershipName}
Prijs: ${formattedPrice} / ${signup.membershipTerm}
Startdatum: ${formattedStartDate}

LET OP: Vanaf je startdatum worden de abonnementskosten maandelijks automatisch geïncasseerd via SEPA automatische incasso.

VOLGENDE STAPPEN
---------------
1) Kom langs met een geldig legitimatiebewijs om je ledenpas op te halen.
2) Op je startdatum is je lidmaatschap actief; incasso van het maandbedrag volgt automatisch.
3) Vragen? Neem contact op via https://fitcityculemborg.nl/contact of bel +31 6 46872274.

We kijken ernaar uit je te verwelkomen in onze sportschool. Heb je vragen? Neem gerust contact met ons op.

Sportieve groet,
Team FitCity Culemborg

---
FitCity Culemborg
https://fitcityculemborg.nl
  `.trim();
}

function formatPrice(value) {
  return `€${value.toFixed(2).replace('.', ',')}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
