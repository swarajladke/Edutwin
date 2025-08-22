import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/', icon: 'Home' }];

    // Route mapping for better labels
    const routeLabels = {
      'student-login': 'Student Login',
      'student-registration': 'Student Registration',
      'virtual-classroom-session': 'Virtual Classroom',
      'ai-learning-assistant': 'AI Learning Assistant',
      'teacher-login': 'Teacher Login',
      'teacher-analytics-dashboard': 'Analytics Dashboard',
      'dashboard': 'Dashboard',
      'profile': 'Profile',
      'settings': 'Settings',
      'help': 'Help Center',
      'support': 'Support',
      'calendar': 'Calendar',
      'library': 'Library',
      'assignments': 'Assignments',
      'progress': 'Progress',
      'student-management': 'Student Management',
    };

    // Route icons mapping
    const routeIcons = {
      'student-login': 'LogIn',
      'student-registration': 'UserPlus',
      'virtual-classroom-session': 'Video',
      'ai-learning-assistant': 'Bot',
      'teacher-login': 'LogIn',
      'teacher-analytics-dashboard': 'BarChart3',
      'dashboard': 'Home',
      'profile': 'User',
      'settings': 'Settings',
      'help': 'HelpCircle',
      'support': 'MessageCircle',
      'calendar': 'Calendar',
      'library': 'Library',
      'assignments': 'Clipboard',
      'progress': 'TrendingUp',
      'student-management': 'Users',
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const icon = routeIcons[segment] || 'ChevronRight';
      
      breadcrumbs.push({
        label,
        path: currentPath,
        icon,
        isLast: index === pathSegments.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login/registration pages or home
  if (location.pathname === '/'|| location.pathname.includes('login') || 
      location.pathname.includes('registration')) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 px-6 py-4 text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground" 
              />
            )}
            
            {crumb.isLast ? (
              <span className="flex items-center space-x-2 text-foreground font-medium">
                <Icon name={crumb.icon} size={16} />
                <span>{crumb.label}</span>
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(crumb.path)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 focus-ring rounded px-2 py-1"
              >
                <Icon name={crumb.icon} size={16} />
                <span>{crumb.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;