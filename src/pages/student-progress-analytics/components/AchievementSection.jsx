import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementSection = ({ achievements, badges, milestones }) => {
  const [activeTab, setActiveTab] = useState('badges');

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-purple-500 to-pink-500';
      case 'epic': return 'from-blue-500 to-purple-500';
      case 'rare': return 'from-green-500 to-blue-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Achievements</h3>
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          <Button
            variant={activeTab === 'badges' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab('badges')}
            iconName="Award"
            iconPosition="left"
            iconSize={14}
            className="px-3 py-1.5 text-xs"
          >
            Badges
          </Button>
          <Button
            variant={activeTab === 'milestones' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab('milestones')}
            iconName="Flag"
            iconPosition="left"
            iconSize={14}
            className="px-3 py-1.5 text-xs"
          >
            Milestones
          </Button>
        </div>
      </div>

      {activeTab === 'badges' && (
        <div className="space-y-4">
          {/* Recent Badges */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Recent Badges</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {badges.slice(0, 8).map((badge) => (
                <div
                  key={badge.id}
                  className="relative group cursor-pointer"
                  title={badge.description}
                >
                  <div className={`
                    w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${getBadgeColor(badge.rarity)}
                    flex items-center justify-center shadow-moderate hover-lift
                    ${badge.earned ? '' : 'opacity-30 grayscale'}
                  `}>
                    <Icon name={badge.icon} size={24} color="white" />
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs font-medium text-text-primary truncate">{badge.name}</p>
                    {badge.earned && (
                      <p className="text-xs text-text-secondary">{formatDate(badge.earnedDate)}</p>
                    )}
                  </div>
                  {badge.isNew && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">!</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Badge Progress */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Badge Collection</span>
              <span className="text-sm font-medium text-text-primary">
                {badges.filter(b => b.earned).length}/{badges.length}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                style={{ width: `${(badges.filter(b => b.earned).length / badges.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'milestones' && (
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex items-start space-x-4">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${milestone.completed 
                  ? 'bg-success text-white' 
                  : index === 0 
                    ? 'bg-primary text-white' :'bg-muted text-text-secondary'
                }
              `}>
                <Icon 
                  name={milestone.completed ? "Check" : milestone.icon} 
                  size={16} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`
                    font-medium
                    ${milestone.completed ? 'text-text-primary' : 'text-text-secondary'}
                  `}>
                    {milestone.title}
                  </h4>
                  {milestone.completed && (
                    <span className="text-xs text-success font-medium">
                      {formatDate(milestone.completedDate)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary mt-1">{milestone.description}</p>
                {!milestone.completed && milestone.progress && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-text-secondary mb-1">
                      <span>Progress</span>
                      <span>{milestone.progress.current}/{milestone.progress.target}</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-1.5">
                      <div 
                        className="h-1.5 bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${(milestone.progress.current / milestone.progress.target) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementSection;