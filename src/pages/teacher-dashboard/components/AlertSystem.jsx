import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AlertSystem = () => {
  const [alerts] = useState([
    {
      id: 1,
      student: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        class: "Grade 10A"
      },
      type: 'attention',
      priority: 'high',
      message: "Attention level consistently below 50% for 15 minutes",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      suggestions: [
        "Take a 5-minute break",
        "Switch to interactive content",
        "Ask direct questions"
      ],
      resolved: false
    },
    {
      id: 2,
      student: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        class: "Grade 10A"
      },
      type: 'emotion',
      priority: 'high',
      message: "Showing signs of frustration and stress",
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      suggestions: [
        "Provide individual support",
        "Simplify current task",
        "Offer encouragement"
      ],
      resolved: false
    },
    {
      id: 3,
      student: {
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        class: "Grade 10B"
      },
      type: 'drowsiness',
      priority: 'medium',
      message: "Multiple yawns detected in the last 10 minutes",
      timestamp: new Date(Date.now() - 18 * 60 * 1000),
      suggestions: [
        "Suggest physical movement",
        "Increase room lighting",
        "Check if student needs break"
      ],
      resolved: true
    },
    {
      id: 4,
      student: {
        name: "David Wilson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        class: "Grade 9A"
      },
      type: 'performance',
      priority: 'medium',
      message: "Quiz performance dropped by 25% compared to average",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      suggestions: [
        "Review previous concepts",
        "Provide additional practice",
        "Schedule one-on-one session"
      ],
      resolved: false
    }
  ]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'attention': return 'Eye';
      case 'emotion': return 'Heart';
      case 'drowsiness': return 'Moon';
      case 'performance': return 'TrendingDown';
      default: return 'AlertTriangle';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error bg-error bg-opacity-5';
      case 'medium': return 'border-l-warning bg-warning bg-opacity-5';
      case 'low': return 'border-l-success bg-success bg-opacity-5';
      default: return 'border-l-border bg-muted';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  const handleResolveAlert = (alertId) => {
    console.log(`Resolving alert ${alertId}`);
  };

  const handleTakeAction = (alertId, suggestion) => {
    console.log(`Taking action for alert ${alertId}: ${suggestion}`);
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const resolvedAlerts = alerts.filter(alert => alert.resolved);

  return (
    <div className="space-y-6">
      {/* Active Alerts */}
      <div className="bg-surface border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Active Alerts
              </h3>
              <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full pulse-gentle">
                {activeAlerts.length}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              iconSize={16}
            >
              Configure
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border">
          {activeAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-6 border-l-4 ${getPriorityColor(alert.priority)}`}
            >
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Image
                    src={alert.student.avatar}
                    alt={alert.student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-surface border border-border rounded-full flex items-center justify-center">
                    <Icon 
                      name={getAlertIcon(alert.type)} 
                      size={12} 
                      className="text-error"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-text-primary">
                        {alert.student.name}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {alert.student.class}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBadgeColor(alert.priority)}`}>
                        {alert.priority}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary mb-4">
                    {alert.message}
                  </p>

                  {/* Intervention Suggestions */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-text-primary mb-2">
                      Suggested Interventions:
                    </h5>
                    <div className="space-y-2">
                      {alert.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleTakeAction(alert.id, suggestion)}
                          className="flex items-center justify-between w-full p-2 text-sm text-left bg-muted hover:bg-text-secondary hover:text-surface rounded transition-smooth"
                        >
                          <span>{suggestion}</span>
                          <Icon name="ArrowRight" size={14} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleResolveAlert(alert.id)}
                      iconName="Check"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Mark Resolved
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageSquare"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Contact Student
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      iconPosition="left"
                      iconSize={14}
                    >
                      More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeAlerts.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-success opacity-50" />
            <h4 className="font-medium text-text-primary mb-2">All Clear!</h4>
            <p className="text-sm text-text-secondary">
              No active alerts at the moment. Great job managing your classroom!
            </p>
          </div>
        )}
      </div>

      {/* Recently Resolved */}
      {resolvedAlerts.length > 0 && (
        <div className="bg-surface border border-border rounded-lg">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Recently Resolved
            </h3>
          </div>

          <div className="divide-y divide-border">
            {resolvedAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 opacity-60 hover:opacity-80 transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={alert.student.avatar}
                    alt={alert.student.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">
                      {alert.student.name} - {alert.message}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Resolved {formatTimestamp(alert.timestamp)}
                    </p>
                  </div>
                  <Icon name="CheckCircle" size={16} className="text-success" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertSystem;