import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-6 mb-8">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
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
              Intelligent Learning Platform
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          Welcome Back, Student
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Sign in to access your personalized learning dashboard, virtual classrooms, and AI-powered study assistant.
        </p>
      </div>

      {/* Features Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Video" size={16} className="text-accent" />
          </div>
          <span>Virtual Classrooms</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Bot" size={16} className="text-secondary" />
          </div>
          <span>AI Learning Assistant</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={16} className="text-warning" />
          </div>
          <span>Progress Tracking</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;