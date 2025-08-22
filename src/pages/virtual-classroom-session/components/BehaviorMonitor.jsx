import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BehaviorMonitor = ({ onEmotionUpdate, onAttentionUpdate }) => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [attentionLevel, setAttentionLevel] = useState(0.75);
  const [eyeTrackingData, setEyeTrackingData] = useState({ x: 0, y: 0 });
  const [headPose, setHeadPose] = useState({ pitch: 0, yaw: 0, roll: 0 });
  const [drowsinessLevel, setDrowsinessLevel] = useState(0.1);
  const [blinkRate, setBlinkRate] = useState(15);
  const [isYawning, setIsYawning] = useState(false);

  // Mock emotion detection data
  const emotionData = {
    emotions: {
      happy: 0.15,
      sad: 0.05,
      angry: 0.02,
      surprised: 0.08,
      fear: 0.03,
      disgust: 0.01,
      neutral: 0.66,
      confused: 0.12,
      focused: 0.45,
      frustrated: 0.08
    },
    dominant: 'focused',
    confidence: 0.87
  };

  // Simulate real-time behavior analysis
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate attention level fluctuation
      const newAttention = Math.max(0, Math.min(1, attentionLevel + (Math.random() - 0.5) * 0.1));
      setAttentionLevel(newAttention);
      onAttentionUpdate(newAttention);

      // Simulate emotion changes
      const emotions = ['focused', 'neutral', 'confused', 'happy', 'frustrated'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      if (Math.random() < 0.1) { // 10% chance to change emotion
        setCurrentEmotion(randomEmotion);
        onEmotionUpdate({ ...emotionData, dominant: randomEmotion });
      }

      // Simulate eye tracking
      setEyeTrackingData({
        x: Math.random() * 100,
        y: Math.random() * 100
      });

      // Simulate head pose
      setHeadPose({
        pitch: (Math.random() - 0.5) * 30,
        yaw: (Math.random() - 0.5) * 40,
        roll: (Math.random() - 0.5) * 20
      });

      // Simulate drowsiness detection
      const newDrowsiness = Math.max(0, Math.min(1, drowsinessLevel + (Math.random() - 0.5) * 0.05));
      setDrowsinessLevel(newDrowsiness);

      // Simulate blink rate (normal: 12-20 blinks per minute)
      setBlinkRate(Math.floor(12 + Math.random() * 8));

      // Simulate yawning detection
      setIsYawning(Math.random() < 0.02); // 2% chance of yawning
    }, 1000);

    return () => clearInterval(interval);
  }, [attentionLevel, drowsinessLevel, onAttentionUpdate, onEmotionUpdate]);

  const toggleWebcam = () => {
    setIsWebcamActive(!isWebcamActive);
  };

  const getAttentionColor = () => {
    if (attentionLevel > 0.7) return 'text-success';
    if (attentionLevel > 0.4) return 'text-warning';
    return 'text-error';
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      happy: 'text-success',
      focused: 'text-primary',
      neutral: 'text-muted-foreground',
      confused: 'text-warning',
      frustrated: 'text-error',
      sad: 'text-error',
      angry: 'text-error',
      surprised: 'text-accent'
    };
    return colors[emotion] || 'text-muted-foreground';
  };

  const getDrowsinessAlert = () => {
    if (drowsinessLevel > 0.7) return { level: 'high', color: 'text-error', message: 'High drowsiness detected' };
    if (drowsinessLevel > 0.4) return { level: 'medium', color: 'text-warning', message: 'Moderate drowsiness' };
    return { level: 'low', color: 'text-success', message: 'Alert and focused' };
  };

  const drowsinessAlert = getDrowsinessAlert();

  return (
    <div className="fixed bottom-4 left-6 right-6 bg-card border border-border rounded-lg shadow-medium p-4 z-overlay">
      <div className="flex items-center justify-between">
        {/* Webcam Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isWebcamActive ? 'bg-success animate-pulse' : 'bg-muted'}`} />
            <span className="text-sm font-medium text-foreground">
              {isWebcamActive ? 'Webcam Active' : 'Webcam Inactive'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleWebcam}
              iconName={isWebcamActive ? "VideoOff" : "Video"}
              iconSize={16}
            >
              {isWebcamActive ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </div>

        {/* Behavior Metrics */}
        {isWebcamActive && (
          <div className="flex items-center space-x-6">
            {/* Attention Level */}
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} className={getAttentionColor()} />
              <div className="text-sm">
                <span className="text-muted-foreground">Attention: </span>
                <span className={`font-medium ${getAttentionColor()}`}>
                  {Math.round(attentionLevel * 100)}%
                </span>
              </div>
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    attentionLevel > 0.7 ? 'bg-success' :
                    attentionLevel > 0.4 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${attentionLevel * 100}%` }}
                />
              </div>
            </div>

            {/* Current Emotion */}
            <div className="flex items-center space-x-2">
              <Icon name="Smile" size={16} className={getEmotionColor(currentEmotion)} />
              <div className="text-sm">
                <span className="text-muted-foreground">Emotion: </span>
                <span className={`font-medium capitalize ${getEmotionColor(currentEmotion)}`}>
                  {currentEmotion}
                </span>
              </div>
            </div>

            {/* Drowsiness Alert */}
            <div className="flex items-center space-x-2">
              <Icon 
                name={drowsinessAlert.level === 'high' ? "AlertTriangle" : "Moon"} 
                size={16} 
                className={drowsinessAlert.color} 
              />
              <div className="text-sm">
                <span className="text-muted-foreground">State: </span>
                <span className={`font-medium ${drowsinessAlert.color}`}>
                  {drowsinessAlert.message}
                </span>
              </div>
            </div>

            {/* Yawning Detection */}
            {isYawning && (
              <div className="flex items-center space-x-2 px-2 py-1 bg-warning bg-opacity-10 rounded-lg">
                <Icon name="AlertCircle" size={16} className="text-warning" />
                <span className="text-sm font-medium text-warning">Yawning detected</span>
              </div>
            )}
          </div>
        )}

        {/* Advanced Metrics Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="BarChart3"
            iconSize={16}
          >
            Metrics
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            iconSize={16}
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Detailed Analytics (Expandable) */}
      {isWebcamActive && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {/* Eye Tracking */}
            <div className="space-y-1">
              <div className="text-muted-foreground">Eye Position</div>
              <div className="font-medium text-foreground">
                X: {Math.round(eyeTrackingData.x)}%, Y: {Math.round(eyeTrackingData.y)}%
              </div>
            </div>

            {/* Head Pose */}
            <div className="space-y-1">
              <div className="text-muted-foreground">Head Pose</div>
              <div className="font-medium text-foreground">
                P: {Math.round(headPose.pitch)}°, Y: {Math.round(headPose.yaw)}°
              </div>
            </div>

            {/* Blink Rate */}
            <div className="space-y-1">
              <div className="text-muted-foreground">Blink Rate</div>
              <div className="font-medium text-foreground">
                {blinkRate}/min
              </div>
            </div>

            {/* Session Time */}
            <div className="space-y-1">
              <div className="text-muted-foreground">Session Time</div>
              <div className="font-medium text-foreground">
                {Math.floor(Date.now() / 60000) % 60}:
                {String(Math.floor(Date.now() / 1000) % 60).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BehaviorMonitor;