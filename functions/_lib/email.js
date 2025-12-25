// Resend email helper for sending confirmation emails

const RESEND_API_BASE = 'https://api.resend.com';

export async function sendSignupConfirmation(apiKey, fromEmail, signup) {
  const html = generateConfirmationEmailHtml(signup);
  const text = generateConfirmationEmailText(signup);

  const response = await fetch(`${RESEND_API_BASE}/emails`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: signup.email,
      subject: 'Bevestiging inschrijving FitCity Culemborg',
      html,
      text,
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
  const logoUrl = 'https://fitcityculemborg.nl/fitcity-logo.png';

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bevestiging inschrijving</title>
</head>
<body style="margin:0;padding:0;background:#0b0b0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#e5e7eb;">
  <div style="max-width:600px;margin:0 auto;padding:20px 12px;">
    <div style="background:#0f1117;border-radius:18px;padding:24px 18px;box-shadow:0 8px 32px rgba(0,0,0,0.25);">

      <div style="text-align:center;margin-bottom:18px;">
        <img src="${logoUrl}" alt="FitCity Culemborg" style="height:56px;width:auto;max-width:160px;" />
      </div>

      <div style="text-align:center;margin-bottom:18px;">
        <h1 style="color:#ffe500;font-size:22px;margin:0 0 6px 0;">Welkom bij FitCity!</h1>
        <p style="color:rgba(229,231,235,0.75);margin:0;">Je inschrijving is bevestigd</p>
      </div>

      <p style="margin:0 0 14px 0;line-height:1.6;color:#e5e7eb;">Beste ${signup.firstName},</p>

      <p style="margin:0 0 14px 0;line-height:1.6;color:#e5e7eb;">Bedankt voor je inschrijving bij FitCity Culemborg! We hebben je betaling van <strong style="color:#ffe500;">€17,00</strong> inschrijfkosten ontvangen.</p>

      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:0 0 14px 0;">
        <h2 style="font-size:15px;color:#ffe500;margin:0 0 10px 0;">Jouw abonnement</h2>
        <table style="width:100%;border-collapse:collapse;color:#e5e7eb;font-size:14px;">
          <tr>
            <td style="padding:6px 0;color:rgba(229,231,235,0.75);">Abonnement:</td>
            <td style="padding:6px 0;text-align:right;font-weight:600;color:#e5e7eb;">${signup.membershipName}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:rgba(229,231,235,0.75);">Prijs:</td>
            <td style="padding:6px 0;text-align:right;font-weight:600;color:#e5e7eb;">${formattedPrice} / ${signup.membershipTerm}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:rgba(229,231,235,0.75);">Startdatum:</td>
            <td style="padding:6px 0;text-align:right;font-weight:600;color:#e5e7eb;">${formattedStartDate}</td>
          </tr>
        </table>
      </div>

      <div style="background:rgba(255,229,0,0.12);border-radius:12px;padding:12px;margin:0 0 14px 0;">
        <p style="margin:0;font-size:14px;color:#ffe500;"><strong>Let op:</strong> Vanaf je startdatum worden de abonnementskosten maandelijks automatisch geïncasseerd via SEPA automatische incasso.</p>
      </div>

      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:0 0 14px 0;">
        <h2 style="font-size:15px;color:#ffe500;margin:0 0 8px 0;">Volgende stappen</h2>
        <ol style="margin:0;padding-left:18px;color:#e5e7eb;line-height:1.6;font-size:14px;">
          <li style="margin-bottom:6px;">Kom langs met een geldig legitimatiebewijs om je ledenpas op te halen.</li>
          <li style="margin-bottom:6px;">Op je startdatum is je lidmaatschap actief; incasso van het maandbedrag volgt automatisch.</li>
          <li style="margin-bottom:0;">Vragen? Neem contact op via <a href="https://fitcityculemborg.nl/contact" style="color:#ffe500;font-weight:600;">fitcityculemborg.nl/contact</a> of bel +31 6 46872274.</li>
        </ol>
      </div>

      <p style="margin:0 0 14px 0;line-height:1.6;color:#e5e7eb;">We kijken ernaar uit je te verwelkomen in onze sportschool. Heb je vragen? Neem gerust contact met ons op.</p>

      <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 12px 0;width:100%;">
        <tr>
          <td style="border-radius:999px;background:#ffe500;padding:12px 24px;text-align:center;">
            <a href="https://fitcityculemborg.nl/contact" style="color:#0b0b0f;font-weight:700;text-decoration:none;display:inline-block;">Contact opnemen</a>
          </td>
        </tr>
      </table>

      <p style="margin:0;line-height:1.6;color:#e5e7eb;">
        Sportieve groet,<br>
        <strong>Team FitCity Culemborg</strong><br>
        <a href="https://fitcityculemborg.nl/contact" style="color:#ffe500;font-weight:600;">fitcityculemborg.nl/contact</a>
      </p>

    </div>

    <div style="text-align:center;padding:14px 0;color:rgba(229,231,235,0.6);font-size:12px;">
      <p style="margin:0 0 6px 0;">FitCity Culemborg</p>
      <p style="margin:0;"><a href="https://fitcityculemborg.nl" style="color:rgba(229,231,235,0.6);text-decoration:none;">fitcityculemborg.nl</a></p>
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
