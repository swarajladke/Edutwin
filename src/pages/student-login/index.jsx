import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import AlternativeLogin from './components/AlternativeLogin';

const StudentLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userRole = localStorage.getItem('userRole');
    const rememberMe = localStorage.getItem('rememberMe');
    
    if (userRole === 'student' && rememberMe === 'true') {
      navigate('/virtual-classroom-session');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-card border border-border rounded-2xl shadow-soft p-8 animate-fade-in">
            {/* Header Section */}
            <LoginHeader />

            {/* Login Form */}
            <div className="space-y-6">
              <LoginForm />
              
              {/* Alternative Login Options */}
              <AlternativeLogin />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} EduTwin. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
                Terms of Service
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
                Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl animate-pulse hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-xl animate-pulse hidden lg:block" />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-accent/5 rounded-full blur-xl animate-pulse hidden lg:block" />
    </div>
  );
};

export default StudentLogin;