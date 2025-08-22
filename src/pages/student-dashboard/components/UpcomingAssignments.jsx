import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingAssignments = ({ assignments, onViewAll }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error bg-opacity-10';
      case 'medium': return 'text-warning bg-warning bg-opacity-10';
      case 'low': return 'text-success bg-success bg-opacity-10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const formatDueDate = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 1) return `Due in ${diffDays} days`;
    return 'Overdue';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-text-primary flex items-center space-x-2">
          <Icon name="Calendar" size={18} />
          <span>Upcoming Assignments</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {assignments.slice(0, 3).map((assignment) => (
          <div key={assignment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-text-primary text-sm mb-1">
                {assignment.title}
              </h4>
              <div className="flex items-center space-x-3 text-xs text-text-secondary">
                <span>{assignment.subject}</span>
                <span>•</span>
                <span>{formatDueDate(assignment.dueDate)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                {assignment.priority}
              </span>
              <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
            </div>
          </div>
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          <Icon name="Calendar" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No upcoming assignments</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingAssignments;