import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ContextualSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userRole, setUserRole] = useState('student');
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if sidebar should be shown based on current route
  const analyticsRoutes = ['/student-progress-analytics', '/teacher-dashboard'];
  const managementRoutes = ['/class-management-hub', '/student-profile-management'];
  const shouldShowSidebar = [...analyticsRoutes, ...managementRoutes].includes(location.pathname);

  // Simulate role detection
  useEffect(() => {
    if (location.pathname.includes('teacher') || location.pathname.includes('class-management')) {
      setUserRole('teacher');
    } else {
      setUserRole('student');
    }
  }, [location.pathname]);

  // Load expansion state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-expanded');
    if (savedState !== null) {
      setIsExpanded(JSON.parse(savedState));
    }
  }, []);

  // Save expansion state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

  const getContextualItems = () => {
    if (location.pathname === '/student-progress-analytics') {
      return [
        { label: 'Overview', icon: 'BarChart3', section: 'overview' },
        { label: 'Learning Patterns', icon: 'TrendingUp', section: 'patterns' },
        { label: 'Engagement Metrics', icon: 'Activity', section: 'engagement' },
        { label: 'Achievement Timeline', icon: 'Calendar', section: 'timeline' },
        { label: 'Behavioral Insights', icon: 'Brain', section: 'behavior' },
        { label: 'Recommendations', icon: 'Lightbulb', section: 'recommendations' },
      ];
    }

    if (location.pathname === '/teacher-dashboard') {
      return [
        { label: 'Live Sessions', icon: 'Video', section: 'live' },
        { label: 'Student Analytics', icon: 'Users', section: 'analytics' },
        { label: 'Attention Tracking', icon: 'Eye', section: 'attention' },
        { label: 'Emotion Monitoring', icon: 'Heart', section: 'emotion' },
        { label: 'Intervention Alerts', icon: 'AlertTriangle', section: 'alerts' },
        { label: 'Performance Reports', icon: 'FileText', section: 'reports' },
      ];
    }

    if (location.pathname === '/class-management-hub') {
      return [
        { label: 'Active Classes', icon: 'Users', section: 'active' },
        { label: 'Student Roster', icon: 'UserCheck', section: 'roster' },
        { label: 'Assignments', icon: 'FileText', section: 'assignments' },
        { label: 'Attendance', icon: 'Calendar', section: 'attendance' },
        { label: 'Gradebook', icon: 'BookOpen', section: 'grades' },
        { label: 'Communication', icon: 'MessageSquare', section: 'communication' },
      ];
    }

    if (location.pathname === '/student-profile-management') {
      return [
        { label: 'Personal Info', icon: 'User', section: 'personal' },
        { label: 'Learning Preferences', icon: 'Settings', section: 'preferences' },
        { label: 'Privacy Settings', icon: 'Shield', section: 'privacy' },
        { label: 'Notification Settings', icon: 'Bell', section: 'notifications' },
        { label: 'Data Export', icon: 'Download', section: 'export' },
        { label: 'Account Security', icon: 'Lock', section: 'security' },
      ];
    }

    return [];
  };

  const contextualItems = getContextualItems();

  const handleSectionClick = (section) => {
    // Simulate section navigation within the same page
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  if (!shouldShowSidebar || contextualItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`
        hidden lg:block fixed left-0 top-16 bottom-0 z-999 bg-surface border-r border-border
        transition-all duration-300 ease-smooth shadow-subtle
        ${isExpanded ? 'w-64' : 'w-16'}
      `}>
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {isExpanded && (
            <h3 className="font-heading font-medium text-text-primary">
              Navigation
            </h3>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            <Icon name={isExpanded ? "ChevronLeft" : "ChevronRight"} size={16} />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1">
          {contextualItems.map((item) => (
            <Button
              key={item.section}
              variant="ghost"
              fullWidth
              onClick={() => handleSectionClick(item.section)}
              iconName={item.icon}
              iconPosition="left"
              iconSize={16}
              className={`
                justify-start px-3 py-2 hover-lift
                ${!isExpanded ? 'px-2' : ''}
              `}
            >
              {isExpanded && item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Tablet/Mobile Drawer Overlay */}
      {isExpanded && (
        <div className="lg:hidden fixed inset-0 z-1020 bg-black bg-opacity-50" onClick={toggleSidebar}>
          <aside className="fixed left-0 top-16 bottom-0 w-64 bg-surface border-r border-border shadow-prominent">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-heading font-medium text-text-primary">
                Navigation
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="p-2 space-y-1">
              {contextualItems.map((item) => (
                <Button
                  key={item.section}
                  variant="ghost"
                  fullWidth
                  onClick={() => {
                    handleSectionClick(item.section);
                    setIsExpanded(false);
                  }}
                  iconName={item.icon}
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start px-3 py-2"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Mobile Bottom Sheet */}
      <div className="lg:hidden">
        {!isExpanded && (
          <Button
            variant="default"
            size="icon"
            onClick={toggleSidebar}
            className="fixed bottom-20 right-4 z-1010 rounded-full shadow-prominent"
          >
            <Icon name="Menu" size={20} />
          </Button>
        )}
      </div>
    </>
  );
};

export default ContextualSidebar;