import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, color = "primary" }) => {
  const getColorClasses = (colorType) => {
    switch (colorType) {
      case 'success':
        return 'bg-success bg-opacity-10 text-success border-success border-opacity-20';
      case 'warning':
        return 'bg-warning bg-opacity-10 text-warning border-warning border-opacity-20';
      case 'error':
        return 'bg-error bg-opacity-10 text-error border-error border-opacity-20';
      default:
        return 'bg-primary bg-opacity-10 text-primary border-primary border-opacity-20';
    }
  };

  const getTrendColor = (trendType) => {
    return trendType === 'up' ? 'text-success' : trendType === 'down' ? 'text-error' : 'text-text-secondary';
  };

  const getTrendIcon = (trendType) => {
    return trendType === 'up' ? 'TrendingUp' : trendType === 'down' ? 'TrendingDown' : 'Minus';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover-lift transition-smooth">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-3xl font-bold text-text-primary mb-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center mt-4 pt-4 border-t border-border">
          <Icon 
            name={getTrendIcon(trend)} 
            size={16} 
            className={getTrendColor(trend)}
          />
          <span className={`text-sm font-medium ml-1 ${getTrendColor(trend)}`}>
            {trendValue}
          </span>
          <span className="text-sm text-text-secondary ml-1">vs last week</span>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;