import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const LearningPreferencesCard = () => {
  const [preferences, setPreferences] = useState({
    contentFormats: ['visual', 'auditory'],
    sessionLength: '45',
    difficultyProgression: 'adaptive',
    learningStyle: 'visual',
    timeOfDay: 'morning',
    breakFrequency: '15',
    interactionLevel: 'high',
    feedbackType: 'immediate'
  });

  const [isEditing, setIsEditing] = useState(false);

  const contentFormatOptions = [
    { key: 'visual', label: 'Visual', icon: 'Eye', description: 'Charts, diagrams, images, and videos' },
    { key: 'auditory', label: 'Auditory', icon: 'Volume2', description: 'Audio explanations and narrations' },
    { key: 'kinesthetic', label: 'Kinesthetic', icon: 'Hand', description: 'Interactive simulations and activities' },
    { key: 'reading', label: 'Reading/Writing', icon: 'BookOpen', description: 'Text-based content and note-taking' }
  ];

  const sessionLengthOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' }
  ];

  const difficultyOptions = [
    { value: 'slow', label: 'Slow & Steady' },
    { value: 'adaptive', label: 'Adaptive' },
    { value: 'challenging', label: 'Challenging' },
    { value: 'accelerated', label: 'Accelerated' }
  ];

  const learningStyleOptions = [
    { value: 'visual', label: 'Visual Learner' },
    { value: 'auditory', label: 'Auditory Learner' },
    { value: 'kinesthetic', label: 'Kinesthetic Learner' },
    { value: 'mixed', label: 'Mixed Learning Style' }
  ];

  const timeOfDayOptions = [
    { value: 'morning', label: 'Morning (6AM - 12PM)' },
    { value: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
    { value: 'evening', label: 'Evening (6PM - 10PM)' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const breakFrequencyOptions = [
    { value: '10', label: 'Every 10 minutes' },
    { value: '15', label: 'Every 15 minutes' },
    { value: '30', label: 'Every 30 minutes' },
    { value: '45', label: 'Every 45 minutes' },
    { value: 'none', label: 'No breaks needed' }
  ];

  const interactionLevelOptions = [
    { value: 'low', label: 'Low - Minimal interaction' },
    { value: 'medium', label: 'Medium - Moderate interaction' },
    { value: 'high', label: 'High - Frequent interaction' }
  ];

  const feedbackTypeOptions = [
    { value: 'immediate', label: 'Immediate feedback' },
    { value: 'delayed', label: 'End-of-session feedback' },
    { value: 'weekly', label: 'Weekly summary' }
  ];

  const handleContentFormatChange = (format, checked) => {
    setPreferences(prev => ({
      ...prev,
      contentFormats: checked 
        ? [...prev.contentFormats, format]
        : prev.contentFormats.filter(f => f !== format)
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Mock save functionality
  };

  const getPreferenceIcon = (key) => {
    const icons = {
      contentFormats: 'Palette',
      sessionLength: 'Clock',
      difficultyProgression: 'TrendingUp',
      learningStyle: 'Brain',
      timeOfDay: 'Sun',
      breakFrequency: 'Coffee',
      interactionLevel: 'MessageSquare',
      feedbackType: 'MessageCircle'
    };
    return icons[key] || 'Settings';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Learning Preferences
        </h2>
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          iconName={isEditing ? "Check" : "Edit"}
          iconPosition="left"
          iconSize={16}
        >
          {isEditing ? "Save" : "Customize"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Content Formats */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Palette" size={18} className="text-primary" />
            <h3 className="font-medium text-text-primary">Preferred Content Formats</h3>
          </div>
          
          {isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contentFormatOptions.map((format) => (
                <div key={format.key} className="border border-border rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={preferences.contentFormats.includes(format.key)}
                      onChange={(e) => handleContentFormatChange(format.key, e.target.checked)}
                    />
                    <Icon name={format.icon} size={16} className="text-text-secondary" />
                    <div>
                      <p className="font-medium text-text-primary">{format.label}</p>
                      <p className="text-xs text-text-secondary">{format.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {preferences.contentFormats.map((format) => {
                const formatOption = contentFormatOptions.find(opt => opt.key === format);
                return (
                  <span key={format} className="inline-flex items-center space-x-1 px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm">
                    <Icon name={formatOption?.icon || 'Circle'} size={14} />
                    <span>{formatOption?.label}</span>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Other Preferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isEditing ? (
            <>
              <Select
                label="Optimal Session Length"
                options={sessionLengthOptions}
                value={preferences.sessionLength}
                onChange={(value) => setPreferences(prev => ({ ...prev, sessionLength: value }))}
              />

              <Select
                label="Difficulty Progression"
                options={difficultyOptions}
                value={preferences.difficultyProgression}
                onChange={(value) => setPreferences(prev => ({ ...prev, difficultyProgression: value }))}
              />

              <Select
                label="Learning Style"
                options={learningStyleOptions}
                value={preferences.learningStyle}
                onChange={(value) => setPreferences(prev => ({ ...prev, learningStyle: value }))}
              />

              <Select
                label="Preferred Time of Day"
                options={timeOfDayOptions}
                value={preferences.timeOfDay}
                onChange={(value) => setPreferences(prev => ({ ...prev, timeOfDay: value }))}
              />

              <Select
                label="Break Frequency"
                options={breakFrequencyOptions}
                value={preferences.breakFrequency}
                onChange={(value) => setPreferences(prev => ({ ...prev, breakFrequency: value }))}
              />

              <Select
                label="Interaction Level"
                options={interactionLevelOptions}
                value={preferences.interactionLevel}
                onChange={(value) => setPreferences(prev => ({ ...prev, interactionLevel: value }))}
              />

              <div className="md:col-span-2">
                <Select
                  label="Feedback Type"
                  options={feedbackTypeOptions}
                  value={preferences.feedbackType}
                  onChange={(value) => setPreferences(prev => ({ ...prev, feedbackType: value }))}
                />
              </div>
            </>
          ) : (
            <>
              {Object.entries(preferences).filter(([key]) => key !== 'contentFormats').map(([key, value]) => {
                const displayValue = key === 'sessionLength' 
                  ? `${value} minutes`
                  : key === 'breakFrequency' && value !== 'none'
                  ? `Every ${value} minutes`
                  : typeof value === 'string' 
                  ? value.charAt(0).toUpperCase() + value.slice(1).replace(/([A-Z])/g, ' $1')
                  : value;

                return (
                  <div key={key} className="flex items-center space-x-3 p-3 bg-muted bg-opacity-30 rounded-lg">
                    <Icon name={getPreferenceIcon(key)} size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </p>
                      <p className="text-sm text-text-secondary">{displayValue}</p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* AI Recommendation */}
        <div className="p-4 bg-accent bg-opacity-10 rounded-lg border border-accent border-opacity-20">
          <div className="flex items-start space-x-3">
            <Icon name="Sparkles" size={20} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-accent mb-1">AI Recommendation</h4>
              <p className="text-sm text-text-secondary">
                Based on your learning patterns, we recommend 30-minute visual learning sessions with interactive elements 
                during morning hours. This combination has shown 23% better retention rates for similar learners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPreferencesCard;