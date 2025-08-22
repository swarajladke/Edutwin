import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsWidget = ({ stats }) => {
  const getStatIcon = (type) => {
    switch (type) {
      case 'streak': return 'Flame';
      case 'completed': return 'CheckCircle';
      case 'time': return 'Clock';
      case 'score': return 'Star';
      default: return 'BarChart3';
    }
  };

  const getStatColor = (type) => {
    switch (type) {
      case 'streak': return 'text-accent';
      case 'completed': return 'text-success';
      case 'time': return 'text-primary';
      case 'score': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4 text-center hover-lift">
          <div className={`w-10 h-10 rounded-full bg-opacity-10 flex items-center justify-center mx-auto mb-2 ${getStatColor(stat.type)} bg-current`}>
            <Icon name={getStatIcon(stat.type)} size={20} color="currentColor" />
          </div>
          <div className="text-2xl font-heading font-semibold text-text-primary mb-1">
            {stat.value}
          </div>
          <div className="text-xs text-text-secondary">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsWidget;