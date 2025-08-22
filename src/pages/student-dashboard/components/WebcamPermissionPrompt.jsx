import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WebcamPermissionPrompt = ({ onPermissionGranted, onDismiss }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState('');

  const requestPermission = async () => {
    setIsRequesting(true);
    setError('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      
      // Stop the stream immediately as we just needed permission
      stream.getTracks().forEach(track => track.stop());
      
      onPermissionGranted();
    } catch (err) {
      console.error('Camera permission denied:', err);
      setError('Camera access is required for personalized learning features. Please allow camera access and try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white shadow-moderate">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Camera" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold mb-2">
            Enable Smart Learning Features
          </h3>
          <p className="text-sm opacity-90 mb-4">
            Allow camera access to enable emotion tracking, attention monitoring, and personalized learning recommendations for a better educational experience.
          </p>
          
          <div className="space-y-2 text-sm opacity-80 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} />
              <span>Real-time attention tracking</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Heart" size={16} />
              <span>Emotion-based content adaptation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Brain" size={16} />
              <span>Personalized learning insights</span>
            </div>
          </div>

          {error && (
            <div className="bg-error bg-opacity-20 border border-error border-opacity-30 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={16} className="flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={requestPermission}
              loading={isRequesting}
              iconName="Camera"
              iconPosition="left"
              iconSize={16}
              className="bg-white text-primary hover:bg-gray-100"
            >
              {isRequesting ? 'Requesting Access...' : 'Enable Camera'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="text-white hover:bg-white hover:bg-opacity-10"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamPermissionPrompt;