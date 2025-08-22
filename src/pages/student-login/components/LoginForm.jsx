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
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Mock credentials for authentication
  const mockCredentials = {
    email: "student@edutwin.edu",
    password: "Student123!"
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
    
    if (loginAttempts >= 3) {
      setErrors({ general: 'Account temporarily locked due to multiple failed attempts. Please try again later.' });
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Successful login
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('userEmail', formData.email);
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/virtual-classroom-session');
      } else {
        // Failed login
        setLoginAttempts(prev => prev + 1);
        setErrors({ 
          general: `Invalid email or password. Please use: ${mockCredentials.email} / ${mockCredentials.password}` 
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
      {/* General Error Message */}
      {errors.general && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-red-500 mt-0.5" />
            <div>
              <p className="text-sm text-red-700 font-medium">Authentication Failed</p>
              <p className="text-sm text-red-600 mt-1">{errors.general}</p>
            </div>
          </div>
        </div>
      )}

      {/* Email Input */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your student email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
        disabled={isLoading}
        className="w-full"
      />

      {/* Password Input */}
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
          className="w-full pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          disabled={isLoading}
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 focus-ring rounded px-1 py-1"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={loginAttempts >= 3}
        iconName="LogIn"
        iconPosition="right"
        className="mt-6"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>

      {/* Registration Link */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          New to EduTwin?{' '}
          <button
            type="button"
            onClick={() => navigate('/student-registration')}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 focus-ring rounded px-1 py-1"
            disabled={isLoading}
          >
            Create an account
          </button>
        </p>
      </div>

      {/* Mock Credentials Helper */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700 font-medium">Demo Credentials</p>
            <p className="text-sm text-blue-600 mt-1">
              Email: {mockCredentials.email}<br />
              Password: {mockCredentials.password}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;