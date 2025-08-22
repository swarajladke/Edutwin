import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsCard = ({ insights }) => {
  const [expandedInsight, setExpandedInsight] = useState(null);

  const getInsightIcon = (type) => {
    switch (type) {
      case 'learning_style': return 'Brain';
      case 'optimal_time': return 'Clock';
      case 'focus_areas': return 'Target';
      case 'study_habits': return 'BookOpen';
      case 'performance_trend': return 'TrendingUp';
      default: return 'Lightbulb';
    }
  };

  const getInsightColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-primary';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error bg-opacity-10 text-error',
      medium: 'bg-warning bg-opacity-10 text-warning',
      low: 'bg-success bg-opacity-10 text-success'
    };
    return colors[priority] || colors.medium;
  };

  const toggleExpanded = (id) => {
    setExpandedInsight(expandedInsight === id ? null : id);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={16} color="var(--color-primary)" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">AI Insights</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full pulse-gentle" />
          <span className="text-xs text-text-secondary">Live Analysis</span>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="border border-border rounded-lg p-4 hover:bg-muted hover:bg-opacity-50 transition-smooth"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={getInsightIcon(insight.type)} 
                    size={16} 
                    color="var(--color-text-secondary)" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-text-primary">{insight.title}</h4>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${getPriorityBadge(insight.priority)}
                    `}>
                      {insight.priority}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">{insight.summary}</p>
                  
                  {expandedInsight === insight.id && (
                    <div className="space-y-3">
                      <div className="p-3 bg-muted bg-opacity-50 rounded-lg">
                        <p className="text-sm text-text-primary">{insight.detailed_analysis}</p>
                      </div>
                      
                      {insight.recommendations && (
                        <div>
                          <h5 className="text-sm font-medium text-text-primary mb-2">Recommendations:</h5>
                          <ul className="space-y-1">
                            {insight.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <Icon name="ArrowRight" size={12} color="var(--color-primary)" className="mt-1 flex-shrink-0" />
                                <span className="text-sm text-text-secondary">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {insight.metrics && (
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(insight.metrics).map(([key, value]) => (
                            <div key={key} className="text-center p-2 bg-background rounded">
                              <div className="text-lg font-heading font-semibold text-text-primary">{value}</div>
                              <div className="text-xs text-text-secondary capitalize">{key.replace('_', ' ')}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleExpanded(insight.id)}
                className="flex-shrink-0"
              >
                <Icon 
                  name={expandedInsight === insight.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                />
              </Button>
            </div>

            {/* Confidence Score */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Confidence Score</span>
                <span className={`font-medium ${getInsightColor(insight.priority)}`}>
                  {insight.confidence}%
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-1 mt-1">
                <div 
                  className="h-1 bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${insight.confidence}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
          iconSize={14}
        >
          Refresh Analysis
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          iconSize={14}
        >
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default AIInsightsCard;