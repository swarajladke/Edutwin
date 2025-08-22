import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessMessage = ({ onContinue, userEmail }) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center animate-scale-in">
          <Icon name="CheckCircle" size={40} color="white" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Welcome to EduTwin!
        </h2>
        <p className="text-lg text-muted-foreground">
          Your account has been created successfully
        </p>
      </div>

      <div className="bg-muted rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-center space-x-2 text-primary">
          <Icon name="Mail" size={20} />
          <span className="font-medium">Verification Email Sent</span>
        </div>
        <p className="text-sm text-muted-foreground">
          We've sent a verification email to:
        </p>
        <p className="text-sm font-medium text-foreground bg-background px-3 py-2 rounded border">
          {userEmail}
        </p>
        <p className="text-sm text-muted-foreground">
          Please check your inbox and click the verification link to activate your account.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          What's Next?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Icon name="Mail" size={20} color="white" />
            </div>
            <h4 className="font-medium text-foreground">1. Verify Email</h4>
            <p className="text-sm text-muted-foreground">
              Click the link in your email
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mx-auto">
              <Icon name="User" size={20} color="white" />
            </div>
            <h4 className="font-medium text-foreground">2. Complete Profile</h4>
            <p className="text-sm text-muted-foreground">
              Add your photo and preferences
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mx-auto">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <h4 className="font-medium text-foreground">3. Start Learning</h4>
            <p className="text-sm text-muted-foreground">
              Join your first virtual class
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          onClick={onContinue}
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
        >
          Continue to Dashboard
        </Button>
        <p className="text-sm text-muted-foreground">
          Didn't receive the email? Check your spam folder or{' '}
          <button className="text-primary hover:underline font-medium">
            resend verification email
          </button>
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;