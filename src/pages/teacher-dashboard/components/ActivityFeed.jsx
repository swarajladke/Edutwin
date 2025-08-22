import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = () => {
  const [activities] = useState([
    {
      id: 1,
      type: 'attention',
      student: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      message: "Attention level dropped to 45% during Math lesson",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      priority: 'high',
      emotion: 'confused',
      actionTaken: false
    },
    {
      id: 2,
      type: 'achievement',
      student: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      message: "Completed Science quiz with 95% accuracy",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      priority: 'medium',
      emotion: 'happy',
      actionTaken: true
    },
    {
      id: 3,
      type: 'emotion',
      student: {
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      message: "Showing signs of frustration in English class",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      priority: 'high',
      emotion: 'frustrated',
      actionTaken: false
    },
    {
      id: 4,
      type: 'engagement',
      student: {
        name: "David Wilson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      message: "High engagement detected during History discussion",
      timestamp: new Date(Date.now() - 35 * 60 * 1000),
      priority: 'low',
      emotion: 'engaged',
      actionTaken: true
    },
    {
      id: 5,
      type: 'drowsiness',
      student: {
        name: "Lisa Anderson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      message: "Drowsiness detected - multiple yawns observed",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      priority: 'high',
      emotion: 'tired',
      actionTaken: false
    }
  ]);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'attention': return 'Eye';
      case 'achievement': return 'Award';
      case 'emotion': return 'Heart';
      case 'engagement': return 'Activity';
      case 'drowsiness': return 'Moon';
      default: return 'Bell';
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

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'happy': return 'text-success';
      case 'confused': return 'text-warning';
      case 'frustrated': return 'text-error';
      case 'tired': return 'text-text-secondary';
      case 'engaged': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Real-time Activity Feed
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full pulse-gentle"></div>
            <span className="text-sm text-text-secondary">Live</span>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`p-4 border-l-4 border-b border-border last:border-b-0 hover:bg-muted transition-smooth ${getPriorityColor(activity.priority)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Image
                  src={activity.student.avatar}
                  alt={activity.student.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-surface border border-border rounded-full flex items-center justify-center">
                  <Icon 
                    name={getActivityIcon(activity.type)} 
                    size={10} 
                    className={getEmotionColor(activity.emotion)}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-text-primary text-sm">
                      {activity.student.name}
                    </p>
                    <p className="text-sm text-text-secondary mt-1">
                      {activity.message}
                    </p>
                  </div>
                  <span className="text-xs text-text-secondary whitespace-nowrap ml-2">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full bg-opacity-20 ${
                      activity.priority === 'high' ? 'bg-error text-error' :
                      activity.priority === 'medium'? 'bg-warning text-warning' : 'bg-success text-success'
                    }`}>
                      {activity.priority} priority
                    </span>
                    <span className={`text-xs capitalize ${getEmotionColor(activity.emotion)}`}>
                      {activity.emotion}
                    </span>
                  </div>

                  {!activity.actionTaken && activity.priority === 'high' && (
                    <button className="text-xs text-primary hover:text-primary-foreground hover:bg-primary px-2 py-1 rounded transition-smooth">
                      Take Action
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border bg-muted">
        <button className="text-sm text-primary hover:text-primary-foreground hover:bg-primary px-3 py-1 rounded transition-smooth">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;