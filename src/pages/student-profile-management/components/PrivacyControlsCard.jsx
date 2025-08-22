import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacyControlsCard = () => {
  const [privacySettings, setPrivacySettings] = useState({
    emotionDetection: true,
    attentionMonitoring: true,
    eyeTracking: false,
    facialAnalysis: true,
    dataSharing: false,
    parentalAccess: true,
    anonymousAnalytics: true,
    thirdPartyIntegration: false
  });

  const [showParentalConsent, setShowParentalConsent] = useState(false);

  const privacyOptions = [
    {
      key: 'emotionDetection',
      title: 'Emotion Detection',
      description: 'Allow the system to analyze facial expressions to understand your emotional state during learning sessions.',
      benefits: 'Helps personalize content based on your engagement and emotional response.',
      icon: 'Heart',
      requiresConsent: false
    },
    {
      key: 'attentionMonitoring',
      title: 'Attention Monitoring',
      description: 'Track your focus levels and attention patterns during virtual classes.',
      benefits: 'Provides insights to improve concentration and learning effectiveness.',
      icon: 'Eye',
      requiresConsent: false
    },
    {
      key: 'eyeTracking',
      title: 'Eye Tracking',
      description: 'Monitor eye movements to understand reading patterns and visual attention.',
      benefits: 'Optimizes content layout and identifies areas of difficulty.',
      icon: 'Scan',
      requiresConsent: true
    },
    {
      key: 'facialAnalysis',
      title: 'Facial Analysis',
      description: 'Analyze facial features for drowsiness detection and engagement assessment.',
      benefits: 'Prevents fatigue-related learning issues and suggests optimal study times.',
      icon: 'ScanFace',
      requiresConsent: false
    },
    {
      key: 'dataSharing',
      title: 'Data Sharing with Teachers',
      description: 'Share behavioral insights and learning analytics with your teachers.',
      benefits: 'Enables teachers to provide personalized support and interventions.',
      icon: 'Share2',
      requiresConsent: true
    },
    {
      key: 'parentalAccess',
      title: 'Parental Access',
      description: 'Allow parents/guardians to view your learning progress and behavioral data.',
      benefits: 'Keeps parents informed about your educational journey and achievements.',
      icon: 'Users',
      requiresConsent: false
    },
    {
      key: 'anonymousAnalytics',
      title: 'Anonymous Analytics',
      description: 'Contribute to anonymized research to improve educational technology.',
      benefits: 'Helps develop better learning tools while protecting your identity.',
      icon: 'BarChart3',
      requiresConsent: false
    },
    {
      key: 'thirdPartyIntegration',
      title: 'Third-party Integration',
      description: 'Allow integration with external educational platforms and tools.',
      benefits: 'Seamless experience across different learning applications.',
      icon: 'Link',
      requiresConsent: true
    }
  ];

  const handleSettingChange = (key, value) => {
    const setting = privacyOptions.find(opt => opt.key === key);
    
    if (setting?.requiresConsent && value && !showParentalConsent) {
      setShowParentalConsent(true);
      return;
    }

    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleParentalConsent = (approved) => {
    setShowParentalConsent(false);
    if (approved) {
      // Mock parental consent process
      alert("Parental consent request sent. You'll receive an email confirmation.");
    }
  };

  const getEnabledCount = () => {
    return Object.values(privacySettings).filter(Boolean).length;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Privacy Controls
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            {getEnabledCount()} of {privacyOptions.length} features enabled
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-success" />
          <span className="text-sm font-medium text-success">Secure</span>
        </div>
      </div>

      {/* Privacy Settings Grid */}
      <div className="space-y-4">
        {privacyOptions.map((option) => (
          <div
            key={option.key}
            className="border border-border rounded-lg p-4 hover:bg-muted hover:bg-opacity-50 transition-smooth"
          >
            <div className="flex items-start space-x-4">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                ${privacySettings[option.key] 
                  ? 'bg-primary bg-opacity-10 text-primary' :'bg-muted text-text-secondary'
                }
              `}>
                <Icon name={option.icon} size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-text-primary">
                      {option.title}
                    </h3>
                    {option.requiresConsent && (
                      <span className="px-2 py-1 bg-warning bg-opacity-10 text-warning text-xs rounded-full">
                        Requires Consent
                      </span>
                    )}
                  </div>
                  <Checkbox
                    checked={privacySettings[option.key]}
                    onChange={(e) => handleSettingChange(option.key, e.target.checked)}
                  />
                </div>

                <p className="text-sm text-text-secondary mb-2">
                  {option.description}
                </p>

                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-accent">
                    <strong>Benefit:</strong> {option.benefits}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Data Retention Info */}
      <div className="mt-6 p-4 bg-muted bg-opacity-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-text-primary mb-1">Data Retention Policy</h4>
            <p className="text-sm text-text-secondary">
              Your behavioral data is stored securely and retained for the duration of your enrollment. 
              You can request data deletion at any time. All data is encrypted and complies with educational privacy standards.
            </p>
          </div>
        </div>
      </div>

      {/* Parental Consent Modal */}
      {showParentalConsent && (
        <div className="fixed inset-0 z-1020 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-border p-6 max-w-md w-full shadow-prominent">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Shield" size={24} className="text-warning" />
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Parental Consent Required
              </h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              This feature requires parental consent due to enhanced data collection. 
              We'll send a consent request to your parent/guardian's email address.
            </p>

            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={() => handleParentalConsent(true)}
                iconName="Send"
                iconPosition="left"
                iconSize={16}
                className="flex-1"
              >
                Send Request
              </Button>
              <Button
                variant="outline"
                onClick={() => handleParentalConsent(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyControlsCard;