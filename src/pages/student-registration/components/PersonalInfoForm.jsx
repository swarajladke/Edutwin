import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoForm = ({ formData, errors, onChange }) => {
  const handleInputChange = (field) => (e) => {
    onChange(field, e.target.value);
  };

  const handleSelectChange = (field) => (value) => {
    onChange(field, value);
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'in', label: 'India' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleInputChange('firstName')}
          error={errors.firstName}
          required
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleInputChange('lastName')}
          error={errors.lastName}
          required
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        description="We'll use this for account verification and important updates"
        value={formData.email}
        onChange={handleInputChange('email')}
        error={errors.email}
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="Enter your phone number"
        description="Optional - for account recovery and notifications"
        value={formData.phone}
        onChange={handleInputChange('phone')}
        error={errors.phone}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleInputChange('dateOfBirth')}
          error={errors.dateOfBirth}
          required
        />
        <Select
          label="Gender"
          placeholder="Select your gender"
          options={genderOptions}
          value={formData.gender}
          onChange={handleSelectChange('gender')}
          error={errors.gender}
        />
      </div>

      <Select
        label="Country"
        placeholder="Select your country"
        options={countryOptions}
        value={formData.country}
        onChange={handleSelectChange('country')}
        error={errors.country}
        required
        searchable
      />
    </div>
  );
};

export default PersonalInfoForm;