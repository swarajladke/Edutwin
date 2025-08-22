import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSidebar = ({ progressData }) => {
  const { weeklyProgress, learningStreak, subjectProgress, recentActivity } = progressData;

  return (
    <div className="space-y-6">
      {/* Learning Streak */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
        <h3 className="font-heading font-medium text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="Flame" size={18} color="var(--color-accent)" />
          <span>Learning Streak</span>
        </h3>
        <div className="text-center">
          <div className="text-3xl font-heading font-bold text-accent mb-1">
            {learningStreak.current}
          </div>
          <div className="text-sm text-text-secondary mb-3">
            days in a row
          </div>
          <div className="text-xs text-text-secondary">
            Best streak: {learningStreak.best} days
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
        <h3 className="font-heading font-medium text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="BarChart3" size={18} />
          <span>This Week</span>
        </h3>
        <div className="space-y-2">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-text-secondary w-8">{day.day}</span>
              <div className="flex-1 mx-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-300"
                    style={{ width: `${(day.minutes / 120) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-text-secondary w-8 text-right">
                {day.minutes}m
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
        <h3 className="font-heading font-medium text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="BookOpen" size={18} />
          <span>Subject Progress</span>
        </h3>
        <div className="space-y-3">
          {subjectProgress.map((subject, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-text-primary">
                  {subject.name}
                </span>
                <span className="text-xs text-text-secondary">
                  {subject.progress}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className="bg-primary rounded-full h-1.5 transition-all duration-300"
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
        <h3 className="font-heading font-medium text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="Activity" size={18} />
          <span>Recent Activity</span>
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-text-primary">{activity.action}</p>
                <p className="text-xs text-text-secondary">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressSidebar;