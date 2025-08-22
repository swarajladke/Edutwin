import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PerformanceMetrics from './components/PerformanceMetrics';
import StudentRoster from './components/StudentRoster';
import LiveSessionMonitor from './components/LiveSessionMonitor';
import InterventionPanel from './components/InterventionPanel';
import ClassTabs from './components/ClassTabs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TeacherAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('math-101');
  const [activeView, setActiveView] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate real-time notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'alert',
        message: 'David Rodriguez needs attention - low engagement detected',
        timestamp: new Date(Date.now() - 300000),
        priority: 'high'
      },
      {
        id: 2,
        type: 'achievement',
        message: 'Sarah Williams completed all assignments with 98% accuracy',
        timestamp: new Date(Date.now() - 600000),
        priority: 'low'
      },
      {
        id: 3,
        type: 'session',
        message: 'Quantum Physics session starting in 15 minutes',
        timestamp: new Date(Date.now() - 900000),
        priority: 'medium'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'students', label: 'Students', icon: 'Users' },
    { id: 'live', label: 'Live Sessions', icon: 'Video' },
    { id: 'interventions', label: 'Interventions', icon: 'AlertTriangle' }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <PerformanceMetrics />;
      case 'students':
        return <StudentRoster />;
      case 'live':
        return <LiveSessionMonitor />;
      case 'interventions':
        return <InterventionPanel />;
      default:
        return <PerformanceMetrics />;
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Teacher Analytics Dashboard - EduTwin</title>
        <meta name="description" content="Comprehensive analytics dashboard for educators with real-time student insights, performance tracking, and intervention recommendations." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="lg:ml-80 pt-16">
          <Breadcrumb />
          
          <div className="p-6 space-y-6">
            {/* Dashboard Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Analytics Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="Bell" size={20} />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </div>
                
                {/* Quick Actions */}
                <Button variant="outline" iconName="Download">
                  Export Report
                </Button>
                <Button variant="default" iconName="Video">
                  Start Live Session
                </Button>
              </div>
            </div>

            {/* Class Tabs */}
            <ClassTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* View Navigation */}
            <div className="bg-card border border-border rounded-lg p-2">
              <div className="flex flex-wrap gap-1">
                {viewOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveView(option.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeView === option.id
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={option.icon} size={16} />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Primary Content */}
              <div className="xl:col-span-3">
                {renderActiveView()}
              </div>

              {/* Right Sidebar */}
              <div className="xl:col-span-1 space-y-6">
                {/* Quick Stats */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    Today's Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Users" size={16} className="text-primary" />
                        <span className="text-sm text-muted-foreground">Active Students</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">127</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Video" size={16} className="text-secondary" />
                        <span className="text-sm text-muted-foreground">Live Sessions</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={16} className="text-warning" />
                        <span className="text-sm text-muted-foreground">Alerts</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm text-muted-foreground">Completed Tasks</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">89%</span>
                    </div>
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      Recent Notifications
                    </h3>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.priority === 'high' ? 'bg-error' :
                          notification.priority === 'medium' ? 'bg-warning' : 'bg-success'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.floor((Date.now() - notification.timestamp) / (1000 * 60))}m ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Button variant="outline" fullWidth iconName="MessageSquare" iconPosition="left">
                      Send Announcement
                    </Button>
                    <Button variant="outline" fullWidth iconName="Calendar" iconPosition="left">
                      Schedule Session
                    </Button>
                    <Button variant="outline" fullWidth iconName="FileText" iconPosition="left">
                      Create Assignment
                    </Button>
                    <Button variant="outline" fullWidth iconName="Users" iconPosition="left">
                      Manage Students
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TeacherAnalyticsDashboard;