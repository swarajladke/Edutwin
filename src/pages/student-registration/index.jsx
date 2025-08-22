import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import PersonalInfoForm from './components/PersonalInfoForm';
import AcademicInfoForm from './components/AcademicInfoForm';
import AccountSetupForm from './components/AccountSetupForm';
import SuccessMessage from './components/SuccessMessage';

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    country: '',
    
    // Academic Info
    gradeLevel: '',
    institutionType: '',
    learningStyle: '',
    subjectsOfInterest: [],
    
    // Account Setup
    password: '',
    confirmPassword: '',
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: '',
    agreeToTerms: false,
    consentToDataProcessing: false,
    emailUpdates: false
  });
  const [errors, setErrors] = useState({});
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const steps = [
    { id: 1, title: 'Personal Information', description: 'Basic details about you' },
    { id: 2, title: 'Academic Information', description: 'Your learning preferences' },
    { id: 3, title: 'Account Setup', description: 'Security and privacy settings' }
  ];

  // Mock credentials for testing
  const mockCredentials = {
    email: 'student@edutwin.edu',
    password: 'Student123!',
    verificationCode: '123456'
  };

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isStudentLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/student-dashboard');
    }
  }, [navigate]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.country) newErrors.country = 'Country is required';
    }

    if (step === 2) {
      if (!formData.gradeLevel) newErrors.gradeLevel = 'Grade level is required';
      if (!formData.institutionType) newErrors.institutionType = 'Institution type is required';
      if (!formData.subjectsOfInterest || formData.subjectsOfInterest.length < 3) {
        newErrors.subjectsOfInterest = 'Please select at least 3 subjects of interest';
      }
    }

    if (step === 3) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData.securityQuestion1) newErrors.securityQuestion1 = 'Please select a security question';
      if (!formData.securityAnswer1.trim()) newErrors.securityAnswer1 = 'Please provide an answer';
      if (!formData.securityQuestion2) newErrors.securityQuestion2 = 'Please select a second security question';
      if (!formData.securityAnswer2.trim()) newErrors.securityAnswer2 = 'Please provide an answer';
      
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      if (!formData.consentToDataProcessing) newErrors.consentToDataProcessing = 'Data processing consent is required for personalized learning';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      localStorage.setItem('studentRegistrationData', JSON.stringify({
        ...formData,
        registrationDate: new Date().toISOString(),
        isVerified: false
      }));
      
      setIsRegistrationComplete(true);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToDashboard = () => {
    localStorage.setItem('isStudentLoggedIn', 'true');
    navigate('/student-dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            formData={formData}
            errors={errors}
            onChange={handleFormChange}
          />
        );
      case 2:
        return (
          <AcademicInfoForm
            formData={formData}
            errors={errors}
            onChange={handleFormChange}
          />
        );
      case 3:
        return (
          <AccountSetupForm
            formData={formData}
            errors={errors}
            onChange={handleFormChange}
          />
        );
      default:
        return null;
    }
  };

  if (isRegistrationComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <SuccessMessage
            onContinue={handleContinueToDashboard}
            userEmail={formData.email}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <span className="text-xl font-heading font-semibold text-foreground">
                EduTwin
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/student-login')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
              Join EduTwin Today
            </h1>
            <p className="text-lg text-muted-foreground">
              Create your account to access personalized learning experiences powered by AI
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-card border border-border rounded-xl shadow-soft p-6 sm:p-8">
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={steps.length}
              steps={steps}
            />

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {renderStepContent()}

              {errors.submit && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={18} className="text-destructive" />
                    <p className="text-sm text-destructive font-medium">{errors.submit}</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {currentStep} of {steps.length}
                  </span>
                </div>

                <Button
                  variant="default"
                  onClick={handleNext}
                  loading={isLoading}
                  iconName={currentStep === steps.length ? "Check" : "ChevronRight"}
                  iconPosition="right"
                >
                  {currentStep === steps.length ? 'Create Account' : 'Next'}
                </Button>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/student-login')}
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors duration-200">
                Privacy Policy
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors duration-200">
                Terms of Service
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors duration-200">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Shield" size={16} />
                <span className="text-sm font-medium">Secure Registration</span>
              </div>
              <div className="flex items-center space-x-2 text-primary">
                <Icon name="Lock" size={16} />
                <span className="text-sm font-medium">Privacy Protected</span>
              </div>
              <div className="flex items-center space-x-2 text-accent">
                <Icon name="Award" size={16} />
                <span className="text-sm font-medium">Certified Platform</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EduTwin. All rights reserved. Empowering education through intelligent technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentRegistration;