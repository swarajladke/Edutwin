import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DigitalTwinVisualization = () => {
  const [selectedInsight, setSelectedInsight] = useState('learning-style');

  const digitalTwinData = {
    learningStyle: {
      primary: "Visual Learner",
      confidence: 87,
      characteristics: [
        "Processes information best through visual aids",
        "Strong spatial awareness and pattern recognition",
        "Prefers diagrams and charts over text explanations",
        "Benefits from color-coded organization"
      ],
      recommendations: [
        "Use mind maps for complex topics",
        "Incorporate more visual examples",
        "Try infographic-style summaries"
      ]
    },
    engagementPatterns: {
      averageAttention: 78,
      peakHours: "9:00 AM - 11:00 AM",
      attentionSpan: "35 minutes",
      engagementTrends: [
        { subject: "Mathematics", score: 85, trend: "increasing" },
        { subject: "Science", score: 92, trend: "stable" },
        { subject: "History", score: 67, trend: "decreasing" },
        { subject: "Literature", score: 74, trend: "increasing" }
      ]
    },
    emotionalState: {
      dominantEmotion: "Focused",
      emotionDistribution: [
        { emotion: "Focused", percentage: 45, color: "text-success" },
        { emotion: "Curious", percentage: 28, color: "text-primary" },
        { emotion: "Confused", percentage: 15, color: "text-warning" },
        { emotion: "Frustrated", percentage: 8, color: "text-error" },
        { emotion: "Excited", percentage: 4, color: "text-accent" }
      ],
      moodTrend: "Positive"
    },
    achievementProgress: {
      overallProgress: 73,
      completedModules: 28,
      totalModules: 38,
      streakDays: 12,
      badges: [
        { name: "Quick Learner", icon: "Zap", earned: true },
        { name: "Consistent Student", icon: "Calendar", earned: true },
        { name: "Problem Solver", icon: "Puzzle", earned: false },
        { name: "Team Player", icon: "Users", earned: true }
      ]
    }
  };

  const insightOptions = [
    { key: 'learning-style', label: 'Learning Style', icon: 'Brain' },
    { key: 'engagement', label: 'Engagement', icon: 'Activity' },
    { key: 'emotions', label: 'Emotions', icon: 'Heart' },
    { key: 'achievements', label: 'Achievements', icon: 'Award' }
  ];

  const renderLearningStyleInsight = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-text-primary">
          {digitalTwinData.learningStyle.primary}
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-success rounded-full transition-all duration-500"
              style={{ width: `${digitalTwinData.learningStyle.confidence}%` }}
            />
          </div>
          <span className="text-sm font-medium text-success">
            {digitalTwinData.learningStyle.confidence}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-text-primary mb-2">Characteristics</h4>
          <ul className="space-y-2">
            {digitalTwinData.learningStyle.characteristics.map((char, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-text-primary mb-2">Recommendations</h4>
          <ul className="space-y-2">
            {digitalTwinData.learningStyle.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                <Icon name="Lightbulb" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderEngagementInsight = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted bg-opacity-30 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {digitalTwinData.engagementPatterns.averageAttention}%
          </div>
          <div className="text-sm text-text-secondary">Average Attention</div>
        </div>
        <div className="text-center p-3 bg-muted bg-opacity-30 rounded-lg">
          <div className="text-lg font-bold text-text-primary">
            {digitalTwinData.engagementPatterns.peakHours}
          </div>
          <div className="text-sm text-text-secondary">Peak Hours</div>
        </div>
        <div className="text-center p-3 bg-muted bg-opacity-30 rounded-lg">
          <div className="text-lg font-bold text-text-primary">
            {digitalTwinData.engagementPatterns.attentionSpan}
          </div>
          <div className="text-sm text-text-secondary">Attention Span</div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-text-primary mb-3">Subject Engagement</h4>
        <div className="space-y-3">
          {digitalTwinData.engagementPatterns.engagementTrends.map((subject) => (
            <div key={subject.subject} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-text-primary">{subject.subject}</span>
                <Icon 
                  name={subject.trend === 'increasing' ? 'TrendingUp' : subject.trend === 'decreasing' ? 'TrendingDown' : 'Minus'} 
                  size={16} 
                  className={
                    subject.trend === 'increasing' ? 'text-success' : 
                    subject.trend === 'decreasing' ? 'text-error' : 'text-text-secondary'
                  } 
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-text-primary w-8">
                  {subject.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEmotionalInsight = () => (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-primary mb-1">
          {digitalTwinData.emotionalState.dominantEmotion}
        </div>
        <div className="text-sm text-text-secondary">
          Dominant Emotional State
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Emotion Distribution</h4>
        {digitalTwinData.emotionalState.emotionDistribution.map((emotion) => (
          <div key={emotion.emotion} className="flex items-center justify-between">
            <span className="text-sm text-text-primary">{emotion.emotion}</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    emotion.emotion === 'Focused' ? 'bg-success' :
                    emotion.emotion === 'Curious' ? 'bg-primary' :
                    emotion.emotion === 'Confused' ? 'bg-warning' :
                    emotion.emotion === 'Frustrated' ? 'bg-error' : 'bg-accent'
                  }`}
                  style={{ width: `${emotion.percentage}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${emotion.color}`}>
                {emotion.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-success bg-opacity-10 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">
            Mood Trend: {digitalTwinData.emotionalState.moodTrend}
          </span>
        </div>
      </div>
    </div>
  );

  const renderAchievementInsight = () => (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-3xl font-bold text-primary mb-1">
          {digitalTwinData.achievementProgress.overallProgress}%
        </div>
        <div className="text-sm text-text-secondary">
          Overall Progress
        </div>
        <div className="text-sm text-text-secondary mt-1">
          {digitalTwinData.achievementProgress.completedModules} of {digitalTwinData.achievementProgress.totalModules} modules completed
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center space-x-2 px-3 py-2 bg-accent bg-opacity-10 rounded-full">
          <Icon name="Flame" size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">
            {digitalTwinData.achievementProgress.streakDays} day streak!
          </span>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-text-primary mb-3">Achievement Badges</h4>
        <div className="grid grid-cols-2 gap-3">
          {digitalTwinData.achievementProgress.badges.map((badge) => (
            <div 
              key={badge.name} 
              className={`
                p-3 rounded-lg border text-center transition-smooth
                ${badge.earned 
                  ? 'border-success bg-success bg-opacity-10' :'border-border bg-muted bg-opacity-30'
                }
              `}
            >
              <Icon 
                name={badge.icon} 
                size={24} 
                className={`mx-auto mb-2 ${badge.earned ? 'text-success' : 'text-text-secondary'}`} 
              />
              <div className={`text-sm font-medium ${badge.earned ? 'text-success' : 'text-text-secondary'}`}>
                {badge.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInsightContent = () => {
    switch (selectedInsight) {
      case 'learning-style':
        return renderLearningStyleInsight();
      case 'engagement':
        return renderEngagementInsight();
      case 'emotions':
        return renderEmotionalInsight();
      case 'achievements':
        return renderAchievementInsight();
      default:
        return renderLearningStyleInsight();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Your Digital Twin Insights
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Sparkles" size={20} className="text-accent" />
          <span className="text-sm font-medium text-accent">AI Powered</span>
        </div>
      </div>

      {/* Insight Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {insightOptions.map((option) => (
          <Button
            key={option.key}
            variant={selectedInsight === option.key ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedInsight(option.key)}
            iconName={option.icon}
            iconPosition="left"
            iconSize={16}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Insight Content */}
      <div className="min-h-[300px]">
        {renderInsightContent()}
      </div>

      {/* Last Updated */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>Last updated: January 26, 2025 at 4:48 PM</span>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left" iconSize={14}>
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinVisualization;