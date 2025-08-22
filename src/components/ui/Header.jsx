import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userRole, setUserRole] = useState('student'); // Mock user role
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation items based on user role
  const getNavigationItems = () => {
    if (userRole === 'teacher') {
      return [
        { label: 'Dashboard', path: '/teacher-analytics-dashboard', icon: 'BarChart3' },
        { label: 'Virtual Classroom', path: '/virtual-classroom-session', icon: 'Video' },
        { label: 'AI Assistant', path: '/ai-learning-assistant', icon: 'Bot' },
        { label: 'Students', path: '/student-management', icon: 'Users' },
      ];
    } else {
      return [
        { label: 'Dashboard', path: '/student-dashboard', icon: 'Home' },
        { label: 'Virtual Classroom', path: '/virtual-classroom-session', icon: 'Video' },
        { label: 'AI Assistant', path: '/ai-learning-assistant', icon: 'Bot' },
        { label: 'Progress', path: '/student-progress', icon: 'TrendingUp' },
      ];
    }
  };

  const navigationItems = getNavigationItems();
  const moreItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Support', path: '/support', icon: 'MessageCircle' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Handle logout logic
    navigate('/student-login');
    setIsProfileOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-navigation bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
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
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.slice(0, 4).map((item) => (
            <Button
              key={item.path}
              variant={isActivePath(item.path) ? "default" : "ghost"}
              onClick={() => handleNavigation(item.path)}
              iconName={item.icon}
              iconPosition="left"
              iconSize={18}
              className="px-4 py-2"
            >
              {item.label}
            </Button>
          ))}

          {/* More Menu */}
          <div className="relative" ref={menuRef}>
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              iconName="MoreHorizontal"
              iconSize={18}
              className="px-3 py-2"
            >
              More
            </Button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-medium z-dropdown animate-slide-down">
                <div className="py-2">
                  {moreItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                    >
                      <Icon name={item.icon} size={16} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors duration-200 focus-ring"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-foreground">
                  {userRole === 'teacher' ? 'Dr. Sarah Johnson' : 'Alex Chen'}
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {userRole}
                </div>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-medium z-dropdown animate-slide-down">
                <div className="p-4 border-b border-border">
                  <div className="text-sm font-medium text-popover-foreground">
                    {userRole === 'teacher' ? 'Dr. Sarah Johnson' : 'Alex Chen'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {userRole === 'teacher' ? 'sarah.johnson@school.edu' : 'alex.chen@student.edu'}
                  </div>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/preferences')}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                  <div className="border-t border-border my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-down">
          <div className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <div className="border-t border-border my-4"></div>
            {moreItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-foreground hover:bg-muted transition-colors duration-200"
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;