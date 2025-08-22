import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AlternativeLogin = () => {
  const navigate = useNavigate();

  const handleSocialLogin = (provider) => {
    // Mock social login functionality
    alert(`${provider} login would redirect to institutional SSO portal.`);
  };

  const handleTeacherLogin = () => {
    navigate('/teacher-login');
  };

  return (
    <div className="space-y-6">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('Google')}
          iconName="Chrome"
          iconPosition="left"
          className="w-full"
        >
          Google SSO
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('Microsoft')}
          iconName="Square"
          iconPosition="left"
          className="w-full"
        >
          Microsoft 365
        </Button>
      </div>

      {/* Institution Login */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-foreground">
              Institution Login
            </h3>
            <p className="text-xs text-muted-foreground">
              Use your school or university credentials
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSocialLogin('Institution')}
            iconName="ExternalLink"
            iconPosition="right"
          >
            Login
          </Button>
        </div>
      </div>

      {/* Teacher Login Link */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-3">
          Are you an educator?
        </p>
        <Button
          variant="secondary"
          onClick={handleTeacherLogin}
          iconName="Users"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Teacher Login
        </Button>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-green-600 mt-0.5" />
          <div>
            <p className="text-xs text-green-700">
              Your data is protected with enterprise-grade security and complies with educational privacy standards (FERPA, COPPA).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeLogin;