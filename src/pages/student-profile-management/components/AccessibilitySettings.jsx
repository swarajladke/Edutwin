import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    textSize: 'medium',
    contrast: 'normal',
    colorBlindSupport: false,
    screenReader: false,
    keyboardNavigation: true,
    reducedMotion: false,
    audioDescriptions: false,
    closedCaptions: true,
    focusIndicators: true,
    highContrastMode: false
  });

  const [isEditing, setIsEditing] = useState(false);

  const textSizeOptions = [
    { value: 'small', label: 'Small (14px)' },
    { value: 'medium', label: 'Medium (16px)' },
    { value: 'large', label: 'Large (18px)' },
    { value: 'extra-large', label: 'Extra Large (20px)' }
  ];

  const contrastOptions = [
    { value: 'normal', label: 'Normal Contrast' },
    { value: 'high', label: 'High Contrast' },
    { value: 'extra-high', label: 'Extra High Contrast' }
  ];

  const accessibilityFeatures = [
    {
      key: 'colorBlindSupport',
      title: 'Color Blind Support',
      description: 'Enhanced color patterns and alternative visual indicators',
      icon: 'Palette',
      category: 'Visual'
    },
    {
      key: 'screenReader',
      title: 'Screen Reader Optimization',
      description: 'Improved compatibility with screen reading software',
      icon: 'Volume2',
      category: 'Audio'
    },
    {
      key: 'keyboardNavigation',
      title: 'Enhanced Keyboard Navigation',
      description: 'Full keyboard accessibility with clear focus indicators',
      icon: 'Keyboard',
      category: 'Navigation'
    },
    {
      key: 'reducedMotion',
      title: 'Reduced Motion',
      description: 'Minimize animations and transitions for comfort',
      icon: 'Pause',
      category: 'Motion'
    },
    {
      key: 'audioDescriptions',
      title: 'Audio Descriptions',
      description: 'Spoken descriptions of visual content and actions',
      icon: 'Mic',
      category: 'Audio'
    },
    {
      key: 'closedCaptions',
      title: 'Closed Captions',
      description: 'Text captions for all audio and video content',
      icon: 'Subtitles',
      category: 'Audio'
    },
    {
      key: 'focusIndicators',
      title: 'Enhanced Focus Indicators',
      description: 'Clear visual indicators for focused elements',
      icon: 'Target',
      category: 'Visual'
    },
    {
      key: 'highContrastMode',
      title: 'High Contrast Mode',
      description: 'Maximum contrast for better visibility',
      icon: 'Sun',
      category: 'Visual'
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Apply accessibility settings
    applyAccessibilitySettings();
  };

  const applyAccessibilitySettings = () => {
    // Mock implementation of applying settings
    const root = document.documentElement;
    
    // Apply text size
    const textSizeMap = {
      'small': '14px',
      'medium': '16px',
      'large': '18px',
      'extra-large': '20px'
    };
    root.style.setProperty('--base-font-size', textSizeMap[settings.textSize]);

    // Apply contrast settings
    if (settings.contrast === 'high' || settings.highContrastMode) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0s');
    } else {
      root.style.removeProperty('--animation-duration');
    }
  };

  const getPreviewText = () => {
    const sizeMap = {
      'small': 'text-sm',
      'medium': 'text-base',
      'large': 'text-lg',
      'extra-large': 'text-xl'
    };
    return sizeMap[settings.textSize] || 'text-base';
  };

  const groupedFeatures = accessibilityFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {});

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Accessibility Settings
        </h2>
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          iconName={isEditing ? "Check" : "Settings"}
          iconPosition="left"
          iconSize={16}
        >
          {isEditing ? "Apply Settings" : "Customize"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Text and Display Settings */}
        <div>
          <h3 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Type" size={18} className="text-primary" />
            <span>Text & Display</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isEditing ? (
              <>
                <Select
                  label="Text Size"
                  options={textSizeOptions}
                  value={settings.textSize}
                  onChange={(value) => setSettings(prev => ({ ...prev, textSize: value }))}
                />

                <Select
                  label="Contrast Level"
                  options={contrastOptions}
                  value={settings.contrast}
                  onChange={(value) => setSettings(prev => ({ ...prev, contrast: value }))}
                />
              </>
            ) : (
              <>
                <div className="p-3 bg-muted bg-opacity-30 rounded-lg">
                  <div className="text-sm font-medium text-text-primary">Text Size</div>
                  <div className="text-sm text-text-secondary">
                    {textSizeOptions.find(opt => opt.value === settings.textSize)?.label}
                  </div>
                </div>
                <div className="p-3 bg-muted bg-opacity-30 rounded-lg">
                  <div className="text-sm font-medium text-text-primary">Contrast Level</div>
                  <div className="text-sm text-text-secondary">
                    {contrastOptions.find(opt => opt.value === settings.contrast)?.label}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Text Preview */}
          <div className="mt-4 p-4 border border-border rounded-lg bg-muted bg-opacity-20">
            <div className="text-sm font-medium text-text-primary mb-2">Preview</div>
            <div className={`${getPreviewText()} text-text-primary`}>
              This is how text will appear with your current settings. 
              The quick brown fox jumps over the lazy dog.
            </div>
          </div>
        </div>

        {/* Accessibility Features by Category */}
        {Object.entries(groupedFeatures).map(([category, features]) => (
          <div key={category}>
            <h3 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
              <Icon 
                name={
                  category === 'Visual' ? 'Eye' :
                  category === 'Audio' ? 'Volume2' :
                  category === 'Navigation' ? 'Navigation' :
                  category === 'Motion' ? 'Zap' : 'Settings'
                } 
                size={18} 
                className="text-primary" 
              />
              <span>{category} Accessibility</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.key}
                  className="border border-border rounded-lg p-4 hover:bg-muted hover:bg-opacity-30 transition-smooth"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Icon name={feature.icon} size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <div className="ml-3">
                      <Checkbox
                        checked={settings[feature.key]}
                        onChange={(e) => setSettings(prev => ({ 
                          ...prev, 
                          [feature.key]: e.target.checked 
                        }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Assistive Technology Compatibility */}
        <div className="p-4 bg-primary bg-opacity-10 rounded-lg border border-primary border-opacity-20">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-primary mb-1">Assistive Technology Support</h4>
              <p className="text-sm text-text-secondary mb-2">
                EduTwin is compatible with popular assistive technologies including:
              </p>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• JAWS, NVDA, and VoiceOver screen readers</li>
                <li>• Dragon NaturallySpeaking voice recognition</li>
                <li>• Switch navigation devices</li>
                <li>• Eye-tracking systems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {isEditing && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSettings(prev => ({
                  ...prev,
                  textSize: 'large',
                  contrast: 'high',
                  highContrastMode: true,
                  focusIndicators: true
                }));
              }}
              iconName="Eye"
              iconPosition="left"
              iconSize={16}
            >
              Vision Optimized
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSettings(prev => ({
                  ...prev,
                  screenReader: true,
                  audioDescriptions: true,
                  closedCaptions: true,
                  keyboardNavigation: true
                }));
              }}
              iconName="Volume2"
              iconPosition="left"
              iconSize={16}
            >
              Audio Optimized
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSettings(prev => ({
                  ...prev,
                  reducedMotion: true,
                  keyboardNavigation: true,
                  focusIndicators: true
                }));
              }}
              iconName="Zap"
              iconPosition="left"
              iconSize={16}
            >
              Motor Optimized
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibilitySettings;