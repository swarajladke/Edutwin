import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleAwareHeader from '../../components/ui/RoleAwareHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ContextualSidebar from '../../components/ui/ContextualSidebar';
import NotificationCenter from '../../components/ui/NotificationCenter';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import AnalyticsCharts from './components/AnalyticsCharts';
import AlertSystem from './components/AlertSystem';
import FilterControls from './components/FilterControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TeacherDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filters, setFilters] = useState({});
  const [isLiveSession, setIsLiveSession] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock metrics data
  const metricsData = [
    {
      title: "Total Students",
      value: "42",
      subtitle: "Across 3 active classes",
      icon: "Users",
      color: "primary",
      trend: "up",
      trendValue: "+3"
    },
    {
      title: "Average Engagement",
      value: "87%",
      subtitle: "Above target of 80%",
      icon: "Activity",
      color: "success",
      trend: "up",
      trendValue: "+5%"
    },
    {
      title: "At-Risk Alerts",
      value: "4",
      subtitle: "Require immediate attention",
      icon: "AlertTriangle",
      color: "error",
      trend: "down",
      trendValue: "-2"
    },
    {
      title: "Session Completion",
      value: "94%",
      subtitle: "Students completed today\'s lessons",
      icon: "CheckCircle",
      color: "success",
      trend: "up",
      trendValue: "+2%"
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const toggleLiveSession = () => {
    setIsLiveSession(!isLiveSession);
  };

  return (
    <>
      <Helmet>
        <title>Teacher Dashboard - EduTwin</title>
        <meta name="description" content="Monitor classroom analytics and manage student interventions effectively with real-time insights and behavioral tracking." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <RoleAwareHeader />

        {/* Sidebar */}
        <ContextualSidebar />

        {/* Main Content */}
        <main className="lg:ml-16 pt-16 pb-16 lg:pb-4">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                    Teacher Dashboard
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={16} />
                      <span>{currentTime.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={16} />
                      <span>{currentTime.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isLiveSession ? 'bg-success pulse-gentle' : 'bg-text-secondary'}`}></div>
                    <span className="text-sm text-text-secondary">
                      {isLiveSession ? 'Live Session Active' : 'No Active Session'}
                    </span>
                  </div>
                  <Button
                    variant={isLiveSession ? "destructive" : "default"}
                    onClick={toggleLiveSession}
                    iconName={isLiveSession ? "Square" : "Play"}
                    iconPosition="left"
                    iconSize={16}
                  >
                    {isLiveSession ? 'End Session' : 'Start Session'}
                  </Button>
                  <NotificationCenter />
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="mb-6">
              <FilterControls onFiltersChange={handleFiltersChange} />
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metricsData.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  subtitle={metric.subtitle}
                  icon={metric.icon}
                  color={metric.color}
                  trend={metric.trend}
                  trendValue={metric.trendValue}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              {/* Activity Feed */}
              <div className="lg:col-span-8">
                <ActivityFeed />
              </div>

              {/* Quick Actions */}
              <div className="lg:col-span-4">
                <QuickActions />
              </div>
            </div>

            {/* Analytics Charts */}
            <div className="mb-8">
              <AnalyticsCharts />
            </div>

            {/* Alert System */}
            <div className="mb-8">
              <AlertSystem />
            </div>

            {/* Additional Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Student Clustering Visualization */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Student Performance Clusters
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-success bg-opacity-10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="font-medium text-text-primary">High Performers</span>
                    </div>
                    <span className="text-sm text-text-secondary">12 students (28%)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary bg-opacity-10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="font-medium text-text-primary">Steady Learners</span>
                    </div>
                    <span className="text-sm text-text-secondary">18 students (43%)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-warning bg-opacity-10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <span className="font-medium text-text-primary">Need Support</span>
                    </div>
                    <span className="text-sm text-text-secondary">8 students (19%)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-error bg-opacity-10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-error rounded-full"></div>
                      <span className="font-medium text-text-primary">At Risk</span>
                    </div>
                    <span className="text-sm text-text-secondary">4 students (10%)</span>
                  </div>
                </div>
              </div>

              {/* Export & Reports */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Reports & Export
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="FileText"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Generate Weekly Report
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Download"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Export Student Data
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="BarChart3"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Analytics Summary
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Share"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Share with Administration
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomTabNavigation />
      </div>
    </>
  );
};

export default TeacherDashboard;