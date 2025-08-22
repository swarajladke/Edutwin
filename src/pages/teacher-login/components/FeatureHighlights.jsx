import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      icon: 'BarChart3',
      title: 'Real-time Analytics',
      description: 'Monitor student engagement and performance with AI-powered insights'
    },
    {
      icon: 'Brain',
      title: 'Behavior Analysis',
      description: 'Track attention levels, emotions, and learning patterns in real-time'
    },
    {
      icon: 'Users',
      title: 'Student Management',
      description: 'Comprehensive digital twin profiles for personalized education'
    },
    {
      icon: 'AlertTriangle',
      title: 'Early Intervention',
      description: 'Identify at-risk students and receive actionable recommendations'
    },
    {
      icon: 'Video',
      title: 'Virtual Classroom',
      description: 'Interactive sessions with advanced monitoring capabilities'
    },
    {
      icon: 'Bot',
      title: 'AI Assistant',
      description: 'Intelligent teaching support and content recommendations'
    }
  ];

  return (
    <div className="mt-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Powerful Teaching Tools
        </h3>
        <p className="text-sm text-muted-foreground">
          Everything you need to deliver personalized education experiences
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-card border border-border rounded-lg hover:shadow-soft transition-shadow duration-200"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature.icon} size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {feature.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Sparkles" size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">
            New Feature
          </span>
        </div>
        <p className="text-sm text-foreground">
          <strong>Emotion-based Learning Adaptation:</strong> Our latest AI update now automatically adjusts content difficulty based on student emotional states and engagement levels.
        </p>
      </div>
    </div>
  );
};

export default FeatureHighlights;