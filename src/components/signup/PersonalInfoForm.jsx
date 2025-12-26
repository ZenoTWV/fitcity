import { Link } from 'react-router-dom';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';

const PersonalInfoForm = ({ data, errors, onChange }) => {
  const handleChange = (field) => (e) => {
    onChange(field, e.target.value);
  };

  const handleCheckboxChange = (field) => (e) => {
    onChange(field, e.target.checked);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl">Jouw gegevens</h2>
        <p className="mt-2 text-white/60">
          Vul je persoonlijke gegevens in om je inschrijving te voltooien.
        </p>
      </div>

      {/* Name fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="firstName"
          label="Voornaam"
          value={data.firstName}
          onChange={handleChange('firstName')}
          error={errors.firstName}
          required
          autoComplete="given-name"
        />
        <Input
          name="lastName"
          label="Achternaam"
          value={data.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          required
          autoComplete="family-name"
        />
      </div>

      {/* Contact fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="email"
          type="email"
          label="E-mailadres"
          value={data.email}
          onChange={handleChange('email')}
          error={errors.email}
          required
          autoComplete="email"
          placeholder="naam@voorbeeld.nl"
        />
        <Input
          name="phone"
          type="tel"
          label="Telefoonnummer"
          value={data.phone}
          onChange={handleChange('phone')}
          error={errors.phone}
          required
          autoComplete="tel"
          placeholder="06-12345678"
        />
      </div>

      {/* Date of birth */}
      <Input
        name="dateOfBirth"
        type="date"
        label="Geboortedatum"
        value={data.dateOfBirth}
        onChange={handleChange('dateOfBirth')}
        error={errors.dateOfBirth}
        required
        autoComplete="bday"
        max={new Date().toISOString().split('T')[0]}
      />

      {/* Address fields */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-white/80">Adres</p>

        <Input
          name="street"
          label="Straat"
          value={data.street}
          onChange={handleChange('street')}
          error={errors.street}
          required
          autoComplete="address-line1"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Input
            name="houseNumber"
            label="Huisnummer"
            value={data.houseNumber}
            onChange={handleChange('houseNumber')}
            error={errors.houseNumber}
            required
          />
          <Input
            name="houseNumberAddition"
            label="Toevoeging"
            value={data.houseNumberAddition}
            onChange={handleChange('houseNumberAddition')}
            placeholder="bijv. A"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="postalCode"
            label="Postcode"
            value={data.postalCode}
            onChange={handleChange('postalCode')}
            error={errors.postalCode}
            required
            autoComplete="postal-code"
            placeholder="1234AB"
          />
          <Input
            name="city"
            label="Plaats"
            value={data.city}
            onChange={handleChange('city')}
            error={errors.city}
            required
            autoComplete="address-level2"
          />
        </div>
      </div>

      {/* Bank account for SEPA */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-white/80">Bankgegevens</p>
        <Input
          name="iban"
          label="IBAN"
          value={data.iban}
          onChange={handleChange('iban')}
          error={errors.iban}
          required
          autoComplete="off"
          placeholder="NL91ABNA0417164300"
        />
        <p className="text-xs text-white/50">
          Je IBAN wordt gebruikt voor de automatische incasso van je lidmaatschap.
          Dit wordt veilig en versleuteld opgeslagen.
        </p>
      </div>

      {/* Terms checkbox */}
      <div className="rounded-xl bg-white/5 p-4">
        <Checkbox
          name="agreeTerms"
          checked={data.agreeTerms}
          onChange={handleCheckboxChange('agreeTerms')}
          error={errors.agreeTerms}
        >
          Ik ga akkoord met de{' '}
          <Link
            to="/voorwaarden"
            target="_blank"
            className="text-fitcity underline hover:no-underline"
          >
            algemene voorwaarden
          </Link>{' '}
          en het{' '}
          <Link
            to="/privacy"
            target="_blank"
            className="text-fitcity underline hover:no-underline"
          >
            privacybeleid
          </Link>
          .
        </Checkbox>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
