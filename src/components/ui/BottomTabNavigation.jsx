import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const [userRole, setUserRole] = useState('student');
  const [notificationCount, setNotificationCount] = useState(2);
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

  const studentTabItems = [
    { label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
    { label: 'Learning', path: '/ai-learning-assistant', icon: 'BookOpen' },
    { label: 'Analytics', path: '/student-progress-analytics', icon: 'BarChart3' },
    { label: 'Profile', path: '/student-profile-management', icon: 'User' },
  ];

  const teacherTabItems = [
    { label: 'Dashboard', path: '/teacher-dashboard', icon: 'LayoutDashboard' },
    { label: 'Classes', path: '/class-management-hub', icon: 'Users' },
    { label: 'Analytics', path: '/student-progress-analytics', icon: 'BarChart3' },
    { label: 'Learning', path: '/ai-learning-assistant', icon: 'BookOpen' },
  ];

  const currentTabItems = userRole === 'teacher' ? teacherTabItems : studentTabItems;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Only show for mobile and student role primarily
  const shouldShow = window.innerWidth < 768;

  if (!shouldShow) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-1000 bg-surface border-t border-border shadow-prominent md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {currentTabItems.map((item, index) => {
          const isActive = isActivePath(item.path);
          const hasNotification = item.path === '/student-progress-analytics' && notificationCount > 0;
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 relative
                transition-smooth hover-lift
                ${isActive 
                  ? 'text-primary' :'text-text-secondary hover:text-text-primary'
                }
              `}
              style={{ minHeight: '44px' }}
            >
              <div className="relative">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color={isActive ? 'var(--color-primary)' : 'currentColor'}
                />
                {hasNotification && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center pulse-gentle">
                    {notificationCount}
                  </span>
                )}
              </div>
              <span className={`
                text-xs mt-1 font-caption truncate w-full text-center
                ${isActive ? 'font-medium' : 'font-normal'}
              `}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;