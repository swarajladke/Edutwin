import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsSidebar = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const analyticsData = {
    profileViews: 23,
    settingsChanges: 8,
    privacyUpdates: 3,
    lastLogin: "Today at 2:30 PM",
    accountAge: "8 months",
    dataUsage: "2.3 GB"
  };

  const learningHistory = [
    {
      date: "2025-01-26",
      activity: "Updated learning preferences",
      type: "settings",
      icon: "Settings"
    },
    {
      date: "2025-01-25",
      activity: "Changed privacy settings",
      type: "privacy",
      icon: "Shield"
    },
    {
      date: "2025-01-24",
      activity: "Updated profile photo",
      type: "profile",
      icon: "User"
    },
    {
      date: "2025-01-23",
      activity: "Enabled emotion detection",
      type: "privacy",
      icon: "Heart"
    },
    {
      date: "2025-01-22",
      activity: "Modified notification settings",
      type: "settings",
      icon: "Bell"
    }
  ];

  const preferenceTrends = [
    {
      category: "Visual Learning",
      trend: "increasing",
      percentage: 85,
      change: "+12%"
    },
    {
      category: "Session Length",
      trend: "stable",
      percentage: 45,
      change: "0%"
    },
    {
      category: "Interaction Level",
      trend: "increasing",
      percentage: 78,
      change: "+8%"
    },
    {
      category: "Break Frequency",
      trend: "decreasing",
      percentage: 32,
      change: "-5%"
    }
  ];

  const timeframeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'settings': return 'Settings';
      case 'privacy': return 'Shield';
      case 'profile': return 'User';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'settings': return 'text-primary';
      case 'privacy': return 'text-warning';
      case 'profile': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return 'TrendingUp';
      case 'decreasing': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing': return 'text-success';
      case 'decreasing': return 'text-error';
      case 'stable': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Account Overview */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
        <h3 className="font-heading font-medium text-text-primary mb-4">
          Account Overview
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Profile Views</span>
            <span className="font-medium text-text-primary">{analyticsData.profileViews}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Settings Changes</span>
            <span className="font-medium text-text-primary">{analyticsData.settingsChanges}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Privacy Updates</span>
            <span className="font-medium text-text-primary">{analyticsData.privacyUpdates}</span>
          </div>
          
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-text-secondary">Last Login</span>
            </div>
            <span className="text-sm font-medium text-text-primary">{analyticsData.lastLogin}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Account Age</span>
            <span className="text-sm font-medium text-text-primary">{analyticsData.accountAge}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Data Usage</span>
            <span className="text-sm font-medium text-text-primary">{analyticsData.dataUsage}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-medium text-text-primary">
            Recent Activity
          </h3>
          <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
        </div>
        
        <div className="space-y-3">
          {learningHistory.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                bg-muted ${getActivityColor(item.type)}
              `}>
                <Icon name={getActivityIcon(item.type)} size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">{item.activity}</p>
                <p className="text-xs text-text-secondary">{formatDate(item.date)}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          fullWidth 
          className="mt-3"
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          View All Activity
        </Button>
      </div>

      {/* Preference Trends */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-medium text-text-primary">
            Preference Trends
          </h3>
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="text-xs border border-border rounded px-2 py-1 bg-surface"
          >
            {timeframeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-3">
          {preferenceTrends.map((trend, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">{trend.category}</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getTrendIcon(trend.trend)} 
                    size={12} 
                    className={getTrendColor(trend.trend)} 
                  />
                  <span className={`text-xs ${getTrendColor(trend.trend)}`}>
                    {trend.change}
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${trend.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Insights */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
        <h3 className="font-heading font-medium text-text-primary mb-4">
          Data Insights
        </h3>
        
        <div className="space-y-3">
          <div className="p-3 bg-success bg-opacity-10 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Shield" size={14} className="text-success" />
              <span className="text-sm font-medium text-success">Privacy Compliant</span>
            </div>
            <p className="text-xs text-text-secondary">
              All data collection follows educational privacy standards
            </p>
          </div>
          
          <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Zap" size={14} className="text-primary" />
              <span className="text-sm font-medium text-primary">Optimized Learning</span>
            </div>
            <p className="text-xs text-text-secondary">
              Your preferences are improving learning efficiency by 18%
            </p>
          </div>
          
          <div className="p-3 bg-accent bg-opacity-10 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Target" size={14} className="text-accent" />
              <span className="text-sm font-medium text-accent">Goal Progress</span>
            </div>
            <p className="text-xs text-text-secondary">
              73% towards your personalization goals
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
        <h3 className="font-heading font-medium text-text-primary mb-4">
          Quick Actions
        </h3>
        
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            fullWidth
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export Data
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            fullWidth
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={14}
          >
            Reset Preferences
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            fullWidth
            iconName="HelpCircle"
            iconPosition="left"
            iconSize={14}
          >
            Get Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSidebar;