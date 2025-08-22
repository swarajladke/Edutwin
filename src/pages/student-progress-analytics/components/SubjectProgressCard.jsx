import React from 'react';
import Icon from '../../../components/AppIcon';

const SubjectProgressCard = ({ subject }) => {
  const { name, icon, masteryLevel, timeSpent, retentionScore, conceptsCompleted, totalConcepts, color } = subject;

  const getMasteryColor = (level) => {
    if (level >= 80) return 'text-success';
    if (level >= 60) return 'text-accent';
    return 'text-warning';
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-subtle hover-lift">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
            <Icon name={icon} size={20} color={color} />
          </div>
          <div>
            <h4 className="font-heading font-medium text-text-primary">{name}</h4>
            <p className="text-sm text-text-secondary">{conceptsCompleted}/{totalConcepts} concepts</p>
          </div>
        </div>
        <div className={`text-sm font-medium ${getMasteryColor(masteryLevel)}`}>
          {masteryLevel}% mastery
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>Progress</span>
          <span>{Math.round((conceptsCompleted / totalConcepts) * 100)}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${(conceptsCompleted / totalConcepts) * 100}%`,
              backgroundColor: color
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Clock" size={12} color="var(--color-text-secondary)" />
            <span className="text-xs text-text-secondary">Time Spent</span>
          </div>
          <div className="text-sm font-medium text-text-primary">{formatTime(timeSpent)}</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Brain" size={12} color="var(--color-text-secondary)" />
            <span className="text-xs text-text-secondary">Retention</span>
          </div>
          <div className="text-sm font-medium text-text-primary">{retentionScore}%</div>
        </div>
      </div>
    </div>
  );
};

export default SubjectProgressCard;