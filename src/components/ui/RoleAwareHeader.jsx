import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleAwareHeader = () => {
  const [userRole, setUserRole] = useState('student'); // Default to student
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();

  // Simulate role detection based on current route
  useEffect(() => {
    if (location.pathname.includes('teacher') || location.pathname.includes('class-management')) {
      setUserRole('teacher');
    } else {
      setUserRole('student');
    }
  }, [location.pathname]);

  const studentNavItems = [
    { label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
    { label: 'Learning', path: '/ai-learning-assistant', icon: 'BookOpen' },
    { label: 'Analytics', path: '/student-progress-analytics', icon: 'BarChart3' },
    { label: 'Profile', path: '/student-profile-management', icon: 'User' },
  ];

  const teacherNavItems = [
    { label: 'Dashboard', path: '/teacher-dashboard', icon: 'LayoutDashboard' },
    { label: 'Classes', path: '/class-management-hub', icon: 'Users' },
    { label: 'Analytics', path: '/student-progress-analytics', icon: 'BarChart3' },
    { label: 'Learning', path: '/ai-learning-assistant', icon: 'BookOpen' },
  ];

  const currentNavItems = userRole === 'teacher' ? teacherNavItems : studentNavItems;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="GraduationCap" size={20} color="white" />
      </div>
      <span className="text-xl font-heading font-semibold text-text-primary">
        EduTwin
      </span>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {currentNavItems.map((item) => (
            <Button
              key={item.path}
              variant={isActivePath(item.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item.path)}
              iconName={item.icon}
              iconPosition="left"
              iconSize={16}
              className="px-3 py-2"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {/* Handle notification click */}}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center pulse-gentle">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* User Menu */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {/* Handle user menu */}}
          >
            <Icon name="User" size={20} />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border shadow-moderate">
          <nav className="px-4 py-2 space-y-1">
            {currentNavItems.map((item) => (
              <Button
                key={item.path}
                variant={isActivePath(item.path) ? "default" : "ghost"}
                fullWidth
                onClick={() => handleNavigation(item.path)}
                iconName={item.icon}
                iconPosition="left"
                iconSize={16}
                className="justify-start px-3 py-2"
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default RoleAwareHeader;