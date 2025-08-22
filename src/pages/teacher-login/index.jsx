import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import FeatureHighlights from './components/FeatureHighlights';

const TeacherLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated === 'true' && userRole === 'teacher') {
      navigate('/teacher-analytics-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Feature Highlights (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center p-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                Transform Education with AI-Powered Insights
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Monitor student behavior, emotions, and performance in real-time.\nDeliver personalized learning experiences with comprehensive analytics.
              </p>
            </div>
            
            <FeatureHighlights />
            
            {/* Statistics */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-1">
                  98%
                </div>
                <div className="text-sm text-muted-foreground">
                  Student Engagement
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-accent mb-1">
                  45%
                </div>
                <div className="text-sm text-muted-foreground">
                  Performance Improvement
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-secondary mb-1">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">
                  AI Monitoring
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Login Card */}
            <div className="bg-card border border-border rounded-2xl shadow-medium p-8">
              <WelcomeHeader />
              <LoginForm />
              <SecurityBadges />
            </div>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  onClick={() => alert('Contact your institution administrator for account setup')}
                  className="text-primary hover:text-primary/80 transition-colors focus-ring rounded px-1"
                >
                  Contact Administrator
                </button>
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <button
                  onClick={() => alert('Privacy policy would open here')}
                  className="hover:text-foreground transition-colors focus-ring rounded px-1 py-1"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button
                  onClick={() => alert('Terms of service would open here')}
                  className="hover:text-foreground transition-colors focus-ring rounded px-1 py-1"
                >
                  Terms of Service
                </button>
                <span>•</span>
                <button
                  onClick={() => alert('Support contact would open here')}
                  className="hover:text-foreground transition-colors focus-ring rounded px-1 py-1"
                >
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Feature Highlights */}
      <div className="lg:hidden relative z-10 px-6 pb-12">
        <div className="max-w-md mx-auto">
          <FeatureHighlights />
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;