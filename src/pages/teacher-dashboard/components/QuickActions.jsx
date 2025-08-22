import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "Start Live Session",
      description: "Begin a new classroom session with real-time monitoring",
      icon: "Video",
      color: "primary",
      action: () => console.log("Starting live session")
    },
    {
      id: 2,
      title: "Send Alert",
      description: "Notify students about important announcements",
      icon: "Bell",
      color: "warning",
      action: () => console.log("Sending alert")
    },
    {
      id: 3,
      title: "Generate Report",
      description: "Create detailed analytics report for current class",
      icon: "FileText",
      color: "secondary",
      action: () => console.log("Generating report")
    },
    {
      id: 4,
      title: "Intervention Mode",
      description: "Enable focused monitoring for at-risk students",
      icon: "Shield",
      color: "error",
      action: () => console.log("Enabling intervention mode")
    },
    {
      id: 5,
      title: "Break Timer",
      description: "Start a timed break for the class",
      icon: "Clock",
      color: "success",
      action: () => console.log("Starting break timer")
    },
    {
      id: 6,
      title: "Quick Quiz",
      description: "Launch an instant assessment for engagement",
      icon: "HelpCircle",
      color: "primary",
      action: () => console.log("Launching quick quiz")
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary bg-opacity-10 text-primary border-primary border-opacity-20 hover:bg-primary hover:text-primary-foreground';
      case 'secondary':
        return 'bg-secondary bg-opacity-10 text-secondary border-secondary border-opacity-20 hover:bg-secondary hover:text-secondary-foreground';
      case 'success':
        return 'bg-success bg-opacity-10 text-success border-success border-opacity-20 hover:bg-success hover:text-success-foreground';
      case 'warning':
        return 'bg-warning bg-opacity-10 text-warning border-warning border-opacity-20 hover:bg-warning hover:text-warning-foreground';
      case 'error':
        return 'bg-error bg-opacity-10 text-error border-error border-opacity-20 hover:bg-error hover:text-error-foreground';
      default:
        return 'bg-muted text-text-secondary border-border hover:bg-text-secondary hover:text-surface';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Quick Actions
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Immediate classroom management tools
        </p>
      </div>

      <div className="p-6 space-y-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`
              w-full p-4 border rounded-lg text-left transition-smooth hover-lift
              ${getColorClasses(action.color)}
            `}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon name={action.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1">
                  {action.title}
                </h4>
                <p className="text-xs opacity-80 line-clamp-2">
                  {action.description}
                </p>
              </div>
              <Icon name="ChevronRight" size={16} className="opacity-50" />
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-border bg-muted">
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          iconName="Settings"
          iconPosition="left"
          iconSize={16}
        >
          Customize Actions
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;