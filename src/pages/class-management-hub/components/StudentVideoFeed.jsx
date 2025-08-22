import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StudentVideoFeed = ({ student, onSelectStudent, isSelected }) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const getAttentionColor = (level) => {
    if (level >= 80) return 'bg-success';
    if (level >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      'happy': 'text-success',
      'focused': 'text-primary',
      'confused': 'text-warning',
      'frustrated': 'text-error',
      'neutral': 'text-text-secondary'
    };
    return colors[emotion] || 'text-text-secondary';
  };

  return (
    <div 
      className={`
        relative bg-surface border-2 rounded-lg overflow-hidden cursor-pointer transition-smooth hover-lift
        ${isSelected ? 'border-primary shadow-moderate' : 'border-border'}
      `}
      onClick={() => onSelectStudent(student)}
    >
      {/* Video Feed */}
      <div className="aspect-video bg-gray-900 relative">
        {isVideoEnabled ? (
          <Image
            src={student.videoFeed}
            alt={`${student.name} video feed`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="text-center text-white">
              <Icon name="VideoOff" size={32} className="mx-auto mb-2" />
              <p className="text-sm">{student.name}</p>
            </div>
          </div>
        )}

        {/* Behavioral Indicators Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Attention Level Bar */}
          <div className="absolute top-2 left-2 bg-black bg-opacity-60 rounded px-2 py-1">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} color="white" />
              <div className="w-16 h-1 bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getAttentionColor(student.attentionLevel)} transition-all duration-300`}
                  style={{ width: `${student.attentionLevel}%` }}
                />
              </div>
              <span className="text-white text-xs">{student.attentionLevel}%</span>
            </div>
          </div>

          {/* Emotion Indicator */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 rounded px-2 py-1">
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={12} color="white" />
              <span className={`text-xs ${getEmotionColor(student.emotion)}`}>
                {student.emotion}
              </span>
            </div>
          </div>

          {/* Engagement Ring */}
          {student.engagementLevel > 70 && (
            <div className="absolute inset-2 border-2 border-success rounded-lg pointer-events-none animate-pulse" />
          )}

          {/* Alert Indicators */}
          {student.alerts.length > 0 && (
            <div className="absolute bottom-2 left-2">
              {student.alerts.map((alert, index) => (
                <div key={index} className="bg-error text-error-foreground px-2 py-1 rounded text-xs mb-1">
                  <Icon name="AlertTriangle" size={12} className="inline mr-1" />
                  {alert}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Audio/Video Controls */}
        <div className="absolute bottom-2 right-2 flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsAudioEnabled(!isAudioEnabled);
            }}
            className={`
              w-6 h-6 rounded-full flex items-center justify-center text-white
              ${isAudioEnabled ? 'bg-success' : 'bg-error'}
            `}
          >
            <Icon name={isAudioEnabled ? "Mic" : "MicOff"} size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoEnabled(!isVideoEnabled);
            }}
            className={`
              w-6 h-6 rounded-full flex items-center justify-center text-white
              ${isVideoEnabled ? 'bg-success' : 'bg-error'}
            `}
          >
            <Icon name={isVideoEnabled ? "Video" : "VideoOff"} size={12} />
          </button>
        </div>
      </div>

      {/* Student Info */}
      <div className="p-2 bg-surface">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-sm text-text-primary">{student.name}</h4>
            <p className="text-xs text-text-secondary">ID: {student.id}</p>
          </div>
          <div className="flex items-center space-x-1">
            {student.handRaised && (
              <Icon name="Hand" size={16} className="text-warning" />
            )}
            {student.isPresenting && (
              <Icon name="Monitor" size={16} className="text-primary" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentVideoFeed;