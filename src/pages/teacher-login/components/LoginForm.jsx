import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberDevice: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    email: "teacher@edutwin.edu",
    password: "TeacherPass123"
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Store authentication state
        localStorage.setItem('userRole', 'teacher');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('teacherData', JSON.stringify({
          name: 'Dr. Sarah Johnson',
          email: formData.email,
          institution: 'EduTwin Academy',
          department: 'Computer Science'
        }));
        
        navigate('/teacher-analytics-dashboard');
      } else {
        setErrors({
          general: `Invalid credentials. Use: ${mockCredentials.email} / ${mockCredentials.password}`
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your registered email address.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-red-500" />
            <p className="text-sm text-red-700">{errors.general}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your institutional email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          disabled={isLoading}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember this device"
          name="rememberDevice"
          checked={formData.rememberDevice}
          onChange={handleInputChange}
          disabled={isLoading}
        />

        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-colors focus-ring rounded px-1 py-1"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          iconName="Building"
          iconPosition="left"
          disabled={isLoading}
          onClick={() => alert('SSO integration would be implemented here')}
        >
          Institution SSO
        </Button>
        <Button
          type="button"
          variant="outline"
          iconName="Shield"
          iconPosition="left"
          disabled={isLoading}
          onClick={() => alert('Multi-factor authentication would be implemented here')}
        >
          MFA Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;