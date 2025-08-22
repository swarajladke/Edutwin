import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementBadges = ({ achievements, onViewAll }) => {
  const getBadgeColor = (type) => {
    switch (type) {
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'silver': return 'text-gray-600 bg-gray-100';
      case 'bronze': return 'text-orange-600 bg-orange-100';
      default: return 'text-primary bg-primary bg-opacity-10';
    }
  };

  const getBadgeIcon = (category) => {
    switch (category) {
      case 'streak': return 'Flame';
      case 'completion': return 'CheckCircle';
      case 'performance': return 'Trophy';
      case 'participation': return 'Users';
      default: return 'Award';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-text-primary flex items-center space-x-2">
          <Icon name="Award" size={18} />
          <span>Achievement Badges</span>
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

      <div className="grid grid-cols-2 gap-3">
        {achievements.slice(0, 4).map((achievement) => (
          <div key={achievement.id} className="text-center p-3 bg-muted rounded-lg hover-lift">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${getBadgeColor(achievement.type)}`}>
              <Icon name={getBadgeIcon(achievement.category)} size={24} color="currentColor" />
            </div>
            <h4 className="font-medium text-text-primary text-sm mb-1">
              {achievement.title}
            </h4>
            <p className="text-xs text-text-secondary line-clamp-2">
              {achievement.description}
            </p>
            {achievement.isNew && (
              <div className="mt-2">
                <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                  New!
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          <Icon name="Award" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No achievements yet</p>
          <p className="text-xs mt-1">Complete lessons to earn badges!</p>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;