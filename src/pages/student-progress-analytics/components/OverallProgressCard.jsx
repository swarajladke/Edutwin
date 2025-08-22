import React from 'react';
import Icon from '../../../components/AppIcon';

const OverallProgressCard = ({ progressData }) => {
  const { completionPercentage, learningStreak, currentLevel, totalConcepts, masteredConcepts } = progressData;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Overall Progress</h3>
        <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
          <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
        </div>
      </div>

      {/* Progress Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="var(--color-border)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="var(--color-primary)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${completionPercentage * 3.14} 314`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-text-primary">
                {completionPercentage}%
              </div>
              <div className="text-xs text-text-secondary">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-success bg-opacity-10 rounded-lg mx-auto mb-2">
            <Icon name="Flame" size={16} color="var(--color-success)" />
          </div>
          <div className="text-lg font-heading font-semibold text-text-primary">{learningStreak}</div>
          <div className="text-xs text-text-secondary">Day Streak</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-accent bg-opacity-10 rounded-lg mx-auto mb-2">
            <Icon name="Star" size={16} color="var(--color-accent)" />
          </div>
          <div className="text-lg font-heading font-semibold text-text-primary">Level {currentLevel}</div>
          <div className="text-xs text-text-secondary">Current</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary bg-opacity-10 rounded-lg mx-auto mb-2">
            <Icon name="Target" size={16} color="var(--color-secondary)" />
          </div>
          <div className="text-lg font-heading font-semibold text-text-primary">{masteredConcepts}/{totalConcepts}</div>
          <div className="text-xs text-text-secondary">Mastered</div>
        </div>
      </div>
    </div>
  );
};

export default OverallProgressCard;