import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AccountSetupForm = ({ formData, errors, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field) => (e) => {
    onChange(field, e.target.value);
  };

  const handleSelectChange = (field) => (value) => {
    onChange(field, value);
  };

  const handleCheckboxChange = (field) => (e) => {
    onChange(field, e.target.checked);
  };

  const securityQuestions = [
    { value: 'pet-name', label: "What was the name of your first pet?" },
    { value: 'birth-city', label: "In what city were you born?" },
    { value: 'mother-maiden', label: "What is your mother\'s maiden name?" },
    { value: 'first-school', label: "What was the name of your first school?" },
    { value: 'favorite-teacher', label: "What was your favorite teacher\'s name?" },
    { value: 'childhood-friend', label: "What was your childhood best friend\'s name?" },
    { value: 'first-car', label: "What was your first car\'s make and model?" },
    { value: 'favorite-book', label: "What is your favorite book?" }
  ];

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
      { strength: 0, label: '', color: '' },
      { strength: 1, label: 'Very Weak', color: 'bg-destructive' },
      { strength: 2, label: 'Weak', color: 'bg-warning' },
      { strength: 3, label: 'Fair', color: 'bg-warning' },
      { strength: 4, label: 'Good', color: 'bg-success' },
      { strength: 5, label: 'Strong', color: 'bg-success' }
    ];

    return levels[score];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            description="Must be at least 8 characters with uppercase, lowercase, number, and special character"
            value={formData.password}
            onChange={handleInputChange('password')}
            error={errors.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        {formData.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Password Strength:</span>
              <span className={`text-sm font-medium ${
                passwordStrength.strength >= 4 ? 'text-success' : 
                passwordStrength.strength >= 2 ? 'text-warning' : 'text-destructive'
              }`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            error={errors.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Security Questions
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose security questions to help recover your account if needed
        </p>

        <div className="space-y-4">
          <Select
            label="Security Question 1"
            placeholder="Choose your first security question"
            options={securityQuestions}
            value={formData.securityQuestion1}
            onChange={handleSelectChange('securityQuestion1')}
            error={errors.securityQuestion1}
            required
          />
          <Input
            label="Answer 1"
            type="text"
            placeholder="Enter your answer"
            value={formData.securityAnswer1}
            onChange={handleInputChange('securityAnswer1')}
            error={errors.securityAnswer1}
            required
          />

          <Select
            label="Security Question 2"
            placeholder="Choose your second security question"
            options={securityQuestions.filter(q => q.value !== formData.securityQuestion1)}
            value={formData.securityQuestion2}
            onChange={handleSelectChange('securityQuestion2')}
            error={errors.securityQuestion2}
            required
          />
          <Input
            label="Answer 2"
            type="text"
            placeholder="Enter your answer"
            value={formData.securityAnswer2}
            onChange={handleInputChange('securityAnswer2')}
            error={errors.securityAnswer2}
            required
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Terms and Privacy
        </h3>
        
        <div className="space-y-3">
          <Checkbox
            label="I agree to the Terms of Service and Privacy Policy"
            description="By checking this box, you agree to our terms and conditions"
            checked={formData.agreeToTerms}
            onChange={handleCheckboxChange('agreeToTerms')}
            error={errors.agreeToTerms}
            required
          />

          <Checkbox
            label="I consent to data processing for educational purposes"
            description="Allow EduTwin to analyze your learning patterns to provide personalized education"
            checked={formData.consentToDataProcessing}
            onChange={handleCheckboxChange('consentToDataProcessing')}
            error={errors.consentToDataProcessing}
            required
          />

          <Checkbox
            label="Send me educational updates and tips via email"
            description="Optional - receive helpful learning resources and platform updates"
            checked={formData.emailUpdates}
            onChange={handleCheckboxChange('emailUpdates')}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSetupForm;