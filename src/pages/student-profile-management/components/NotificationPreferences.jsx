import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    assignments: {
      enabled: true,
      method: 'both',
      timing: 'immediate'
    },
    achievements: {
      enabled: true,
      method: 'push',
      timing: 'immediate'
    },
    learningRecommendations: {
      enabled: true,
      method: 'email',
      timing: 'daily'
    },
    classUpdates: {
      enabled: true,
      method: 'both',
      timing: 'immediate'
    },
    behavioralInsights: {
      enabled: false,
      method: 'email',
      timing: 'weekly'
    },
    systemUpdates: {
      enabled: true,
      method: 'email',
      timing: 'weekly'
    },
    parentalReports: {
      enabled: true,
      method: 'email',
      timing: 'weekly'
    },
    emergencyAlerts: {
      enabled: true,
      method: 'both',
      timing: 'immediate'
    }
  });

  const [globalSettings, setGlobalSettings] = useState({
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '07:00'
    },
    weekendNotifications: false,
    soundEnabled: true,
    vibrationEnabled: true
  });

  const [isEditing, setIsEditing] = useState(false);

  const methodOptions = [
    { value: 'push', label: 'Push Notifications' },
    { value: 'email', label: 'Email Only' },
    { value: 'both', label: 'Push + Email' },
    { value: 'none', label: 'Disabled' }
  ];

  const timingOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Hourly Digest' },
    { value: 'daily', label: 'Daily Summary' },
    { value: 'weekly', label: 'Weekly Report' }
  ];

  const notificationTypes = [
    {
      key: 'assignments',
      title: 'Assignment Notifications',
      description: 'New assignments, due date reminders, and submission confirmations',
      icon: 'FileText',
      category: 'Academic',
      importance: 'high'
    },
    {
      key: 'achievements',
      title: 'Achievement Alerts',
      description: 'Badges earned, milestones reached, and progress celebrations',
      icon: 'Award',
      category: 'Progress',
      importance: 'medium'
    },
    {
      key: 'learningRecommendations',
      title: 'Learning Recommendations',
      description: 'Personalized study suggestions and content recommendations',
      icon: 'Lightbulb',
      category: 'Learning',
      importance: 'medium'
    },
    {
      key: 'classUpdates',
      title: 'Class Updates',
      description: 'Schedule changes, announcements, and class-related information',
      icon: 'Users',
      category: 'Academic',
      importance: 'high'
    },
    {
      key: 'behavioralInsights',
      title: 'Behavioral Insights',
      description: 'Learning pattern analysis and attention tracking reports',
      icon: 'Brain',
      category: 'Analytics',
      importance: 'low'
    },
    {
      key: 'systemUpdates',
      title: 'System Updates',
      description: 'Platform updates, new features, and maintenance notifications',
      icon: 'Settings',
      category: 'System',
      importance: 'low'
    },
    {
      key: 'parentalReports',
      title: 'Parental Reports',
      description: 'Weekly progress reports sent to parents/guardians',
      icon: 'Users',
      category: 'Family',
      importance: 'medium'
    },
    {
      key: 'emergencyAlerts',
      title: 'Emergency Alerts',
      description: 'Critical system alerts and urgent communications',
      icon: 'AlertTriangle',
      category: 'Emergency',
      importance: 'critical'
    }
  ];

  const handlePreferenceChange = (type, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Mock save functionality
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getImportanceBadge = (importance) => {
    const colors = {
      critical: 'bg-error bg-opacity-10 text-error',
      high: 'bg-warning bg-opacity-10 text-warning',
      medium: 'bg-primary bg-opacity-10 text-primary',
      low: 'bg-text-secondary bg-opacity-10 text-text-secondary'
    };
    return colors[importance] || colors.low;
  };

  const groupedNotifications = notificationTypes.reduce((acc, notification) => {
    if (!acc[notification.category]) {
      acc[notification.category] = [];
    }
    acc[notification.category].push(notification);
    return acc;
  }, {});

  const getEnabledCount = () => {
    return Object.values(preferences).filter(pref => pref.enabled).length;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Notification Preferences
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            {getEnabledCount()} of {notificationTypes.length} notification types enabled
          </p>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          iconName={isEditing ? "Check" : "Settings"}
          iconPosition="left"
          iconSize={16}
        >
          {isEditing ? "Save Settings" : "Customize"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Global Settings */}
        <div>
          <h3 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Globe" size={18} className="text-primary" />
            <span>Global Settings</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <div className="font-medium text-text-primary">Quiet Hours</div>
                  <div className="text-sm text-text-secondary">
                    {globalSettings.quietHours.enabled 
                      ? `${globalSettings.quietHours.start} - ${globalSettings.quietHours.end}`
                      : 'Disabled'
                    }
                  </div>
                </div>
                <Checkbox
                  checked={globalSettings.quietHours.enabled}
                  onChange={(e) => setGlobalSettings(prev => ({
                    ...prev,
                    quietHours: { ...prev.quietHours, enabled: e.target.checked }
                  }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <div className="font-medium text-text-primary">Weekend Notifications</div>
                  <div className="text-sm text-text-secondary">Receive notifications on weekends</div>
                </div>
                <Checkbox
                  checked={globalSettings.weekendNotifications}
                  onChange={(e) => setGlobalSettings(prev => ({
                    ...prev,
                    weekendNotifications: e.target.checked
                  }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <div className="font-medium text-text-primary">Sound Notifications</div>
                  <div className="text-sm text-text-secondary">Play sound for notifications</div>
                </div>
                <Checkbox
                  checked={globalSettings.soundEnabled}
                  onChange={(e) => setGlobalSettings(prev => ({
                    ...prev,
                    soundEnabled: e.target.checked
                  }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <div className="font-medium text-text-primary">Vibration</div>
                  <div className="text-sm text-text-secondary">Vibrate for mobile notifications</div>
                </div>
                <Checkbox
                  checked={globalSettings.vibrationEnabled}
                  onChange={(e) => setGlobalSettings(prev => ({
                    ...prev,
                    vibrationEnabled: e.target.checked
                  }))}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Types by Category */}
        {Object.entries(groupedNotifications).map(([category, notifications]) => (
          <div key={category}>
            <h3 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
              <Icon 
                name={
                  category === 'Academic' ? 'BookOpen' :
                  category === 'Progress' ? 'TrendingUp' :
                  category === 'Learning' ? 'Brain' :
                  category === 'Analytics' ? 'BarChart3' :
                  category === 'System' ? 'Settings' :
                  category === 'Family' ? 'Users' :
                  category === 'Emergency' ? 'AlertTriangle' : 'Bell'
                } 
                size={18} 
                className="text-primary" 
              />
              <span>{category} Notifications</span>
            </h3>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.key}
                  className="border border-border rounded-lg p-4 hover:bg-muted hover:bg-opacity-30 transition-smooth"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${preferences[notification.key].enabled 
                        ? 'bg-primary bg-opacity-10 text-primary' :'bg-muted text-text-secondary'
                      }
                    `}>
                      <Icon name={notification.icon} size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-text-primary">
                            {notification.title}
                          </h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getImportanceBadge(notification.importance)}`}>
                            {notification.importance}
                          </span>
                        </div>
                        <Checkbox
                          checked={preferences[notification.key].enabled}
                          onChange={(e) => handlePreferenceChange(notification.key, 'enabled', e.target.checked)}
                          disabled={!isEditing}
                        />
                      </div>

                      <p className="text-sm text-text-secondary mb-3">
                        {notification.description}
                      </p>

                      {preferences[notification.key].enabled && isEditing && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Select
                            label="Delivery Method"
                            options={methodOptions}
                            value={preferences[notification.key].method}
                            onChange={(value) => handlePreferenceChange(notification.key, 'method', value)}
                          />
                          <Select
                            label="Timing"
                            options={timingOptions}
                            value={preferences[notification.key].timing}
                            onChange={(value) => handlePreferenceChange(notification.key, 'timing', value)}
                          />
                        </div>
                      )}

                      {preferences[notification.key].enabled && !isEditing && (
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <span>
                            Method: {methodOptions.find(opt => opt.value === preferences[notification.key].method)?.label}
                          </span>
                          <span>
                            Timing: {timingOptions.find(opt => opt.value === preferences[notification.key].timing)?.label}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Test Notification */}
        <div className="p-4 bg-accent bg-opacity-10 rounded-lg border border-accent border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-accent mb-1">Test Your Settings</h4>
              <p className="text-sm text-text-secondary">
                Send a test notification to verify your preferences are working correctly.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Mock test notification
                alert("Test notification sent! Check your email and push notifications.");
              }}
              iconName="Send"
              iconPosition="left"
              iconSize={16}
            >
              Send Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;