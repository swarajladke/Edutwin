import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-8">
      {/* Logo and Branding */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 text-primary-foreground"
            fill="currentColor"
          >
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-heading font-bold text-foreground">
            EduTwin
          </h1>
          <p className="text-sm text-muted-foreground">
            Educator Portal
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          Welcome Back, Educator
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Access your comprehensive analytics dashboard and classroom management tools.\nMonitor student progress with AI-powered insights.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          iconName="Users"
          iconPosition="left"
          onClick={() => navigate('/student-login')}
        >
          Student Portal
        </Button>
        <div className="w-px h-4 bg-border"></div>
        <Button
          variant="ghost"
          size="sm"
          iconName="HelpCircle"
          iconPosition="left"
          onClick={() => alert('Help documentation would open here')}
        >
          Need Help?
        </Button>
      </div>

      {/* Institution Badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full">
        <Icon name="Building" size={14} className="text-accent" />
        <span className="text-xs font-medium text-accent">
          Institutional Access Portal
        </span>
      </div>
    </div>
  );
};

export default WelcomeHeader;