import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [userRole, setUserRole] = useState('student'); // Mock user role
  const [activeSection, setActiveSection] = useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get contextual content based on current route and user role
  const getSidebarContent = () => {
    const currentPath = location.pathname;

    if (currentPath === '/virtual-classroom-session') {
      return {
        title: 'Classroom Session',
        sections: [
          {
            id: 'overview',
            label: 'Session Overview',
            icon: 'Eye',
            items: [
              { label: 'Current Topic', path: '#topic', icon: 'BookOpen' },
              { label: 'Participants', path: '#participants', icon: 'Users' },
              { label: 'Session Timer', path: '#timer', icon: 'Clock' },
            ]
          },
          {
            id: 'tools',
            label: 'Learning Tools',
            icon: 'Wrench',
            items: [
              { label: 'Whiteboard', path: '#whiteboard', icon: 'PenTool' },
              { label: 'Screen Share', path: '#screen', icon: 'Monitor' },
              { label: 'Breakout Rooms', path: '#breakout', icon: 'Users2' },
              { label: 'Polls & Quizzes', path: '#polls', icon: 'BarChart' },
            ]
          },
          {
            id: 'resources',
            label: 'Resources',
            icon: 'FolderOpen',
            items: [
              { label: 'Course Materials', path: '#materials', icon: 'FileText' },
              { label: 'Assignments', path: '#assignments', icon: 'Clipboard' },
              { label: 'Recordings', path: '#recordings', icon: 'Video' },
            ]
          }
        ]
      };
    }

    if (currentPath === '/teacher-analytics-dashboard') {
      return {
        title: 'Analytics Dashboard',
        sections: [
          {
            id: 'overview',
            label: 'Overview',
            icon: 'BarChart3',
            items: [
              { label: 'Class Performance', path: '#performance', icon: 'TrendingUp' },
              { label: 'Engagement Metrics', path: '#engagement', icon: 'Activity' },
              { label: 'Learning Progress', path: '#progress', icon: 'Target' },
            ]
          },
          {
            id: 'students',
            label: 'Student Management',
            icon: 'Users',
            items: [
              { label: 'Individual Reports', path: '#reports', icon: 'FileText' },
              { label: 'Behavior Analysis', path: '#behavior', icon: 'Brain' },
              { label: 'Attention Tracking', path: '#attention', icon: 'Eye' },
              { label: 'Emotional State', path: '#emotions', icon: 'Heart' },
            ]
          },
          {
            id: 'insights',
            label: 'AI Insights',
            icon: 'Lightbulb',
            items: [
              { label: 'Recommendations', path: '#recommendations', icon: 'Star' },
              { label: 'Predictions', path: '#predictions', icon: 'TrendingUp' },
              { label: 'Interventions', path: '#interventions', icon: 'AlertTriangle' },
            ]
          }
        ]
      };
    }

    if (currentPath === '/ai-learning-assistant') {
      return {
        title: 'AI Assistant',
        sections: [
          {
            id: 'conversation',
            label: 'Conversation',
            icon: 'MessageCircle',
            items: [
              { label: 'Chat History', path: '#history', icon: 'History' },
              { label: 'Saved Responses', path: '#saved', icon: 'Bookmark' },
              { label: 'Quick Actions', path: '#actions', icon: 'Zap' },
            ]
          },
          {
            id: 'learning',
            label: 'Learning Support',
            icon: 'GraduationCap',
            items: [
              { label: 'Study Plans', path: '#plans', icon: 'Calendar' },
              { label: 'Practice Tests', path: '#tests', icon: 'FileQuestion' },
              { label: 'Concept Maps', path: '#concepts', icon: 'GitBranch' },
              { label: 'Progress Tracking', path: '#tracking', icon: 'BarChart' },
            ]
          },
          {
            id: 'resources',
            label: 'Resources',
            icon: 'Library',
            items: [
              { label: 'Knowledge Base', path: '#knowledge', icon: 'Database' },
              { label: 'External Links', path: '#links', icon: 'ExternalLink' },
              { label: 'Multimedia', path: '#media', icon: 'Play' },
            ]
          }
        ]
      };
    }

    // Default sidebar content
    return {
      title: userRole === 'teacher' ? 'Teacher Dashboard' : 'Student Dashboard',
      sections: [
        {
          id: 'main',
          label: 'Main Navigation',
          icon: 'Home',
          items: [
            { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
            { label: 'Virtual Classroom', path: '/virtual-classroom-session', icon: 'Video' },
            { label: 'AI Assistant', path: '/ai-learning-assistant', icon: 'Bot' },
            { label: userRole === 'teacher' ? 'Analytics' : 'Progress', 
              path: userRole === 'teacher' ? '/teacher-analytics-dashboard' : '/progress', 
              icon: userRole === 'teacher' ? 'BarChart3' : 'TrendingUp' },
          ]
        },
        {
          id: 'tools',
          label: 'Tools & Resources',
          icon: 'Wrench',
          items: [
            { label: 'Calendar', path: '/calendar', icon: 'Calendar' },
            { label: 'Library', path: '/library', icon: 'Library' },
            { label: 'Assignments', path: '/assignments', icon: 'Clipboard' },
          ]
        }
      ]
    };
  };

  const sidebarContent = getSidebarContent();

  const handleNavigation = (path) => {
    if (path.startsWith('#')) {
      // Handle anchor links for same-page navigation
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isExpanded && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-sidebar lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-16 bottom-0 z-sidebar bg-card border-r border-border transition-all duration-300 ease-smooth ${
          isExpanded ? 'w-80' : 'w-16'
        } lg:w-80`}
      >
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {isExpanded && (
            <h2 className="text-lg font-heading font-semibold text-foreground">
              {sidebarContent.title}
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpanded}
            className="ml-auto"
          >
            <Icon 
              name={isExpanded ? "ChevronLeft" : "ChevronRight"} 
              size={18} 
            />
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {sidebarContent.sections.map((section) => (
            <div key={section.id} className="space-y-2">
              {isExpanded && (
                <div className="flex items-center space-x-2 px-2 py-1">
                  <Icon name={section.icon} size={16} className="text-muted-foreground" />
                  <h3 className="text-sm font-caption font-medium text-muted-foreground uppercase tracking-wide">
                    {section.label}
                  </h3>
                </div>
              )}

              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 hover-lift ${
                      location.pathname === item.path || location.hash === item.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    title={!isExpanded ? item.label : undefined}
                  >
                    <Icon name={item.icon} size={18} />
                    {isExpanded && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        {isExpanded && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Lightbulb" size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  Need Help?
                </p>
                <p className="text-xs text-muted-foreground">
                  Ask our AI assistant
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNavigation('/ai-learning-assistant')}
              >
                <Icon name="ArrowRight" size={16} />
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;