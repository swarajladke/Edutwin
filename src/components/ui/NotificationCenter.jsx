import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulate real-time notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'attention',
        title: 'Attention Alert',
        message: 'Student Sarah shows decreased attention in Math class',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        priority: 'high',
        icon: 'Eye'
      },
      {
        id: 2,
        type: 'achievement',
        title: 'Achievement Unlocked',
        message: 'You completed 5 learning modules this week!',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        priority: 'medium',
        icon: 'Award'
      },
      {
        id: 3,
        type: 'emotion',
        title: 'Emotional State Update',
        message: 'Positive engagement detected in Science class',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        icon: 'Heart'
      },
      {
        id: 4,
        type: 'system',
        title: 'System Update',
        message: 'New AI learning features are now available',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: false,
        priority: 'medium',
        icon: 'Settings'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'attention': return 'bg-warning bg-opacity-10 text-warning';
      case 'achievement': return 'bg-success bg-opacity-10 text-success';
      case 'emotion': return 'bg-primary bg-opacity-10 text-primary';
      case 'system': return 'bg-text-secondary bg-opacity-10 text-text-secondary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const toggleNotificationCenter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleNotificationCenter}
        className="relative"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center pulse-gentle">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Dropdown - Desktop/Tablet */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="lg:hidden fixed inset-0 z-1010 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Notification Panel */}
          <div className={`
            absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-lg shadow-prominent z-1020
            lg:w-96 lg:max-h-96
            max-lg:fixed max-lg:inset-x-4 max-lg:top-16 max-lg:bottom-4 max-lg:w-auto max-lg:max-h-none
            overflow-hidden
          `}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-heading font-medium text-text-primary">
                Notifications
              </h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-text-secondary">
                  <Icon name="Bell" size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        p-4 hover:bg-muted transition-smooth cursor-pointer
                        ${!notification.read ? 'bg-primary bg-opacity-5' : ''}
                      `}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                          ${getTypeColor(notification.type)}
                        `}>
                          <Icon name={notification.icon} size={16} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`
                              font-medium text-sm
                              ${!notification.read ? 'text-text-primary' : 'text-text-secondary'}
                            `}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-1 ml-2">
                              <span className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                •
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  clearNotification(notification.id);
                                }}
                                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Icon name="X" size={12} />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <span className="text-xs text-text-secondary mt-2 block">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>

                        {/* Unread Indicator */}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-border bg-muted">
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    // Navigate to full notifications page
                    setIsOpen(false);
                  }}
                  className="text-xs"
                >
                  View all notifications
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;