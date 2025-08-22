import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionToolbar = ({ sessionData, onToolAction }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const handleRecording = () => {
    setIsRecording(!isRecording);
    onToolAction('recording', !isRecording);
  };

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    onToolAction('screenShare', !isScreenSharing);
  };

  const quickActions = [
    { id: 'quiz', label: 'Deploy Quiz', icon: 'HelpCircle', color: 'primary' },
    { id: 'poll', label: 'Create Poll', icon: 'BarChart3', color: 'secondary' },
    { id: 'breakout', label: 'Breakout Rooms', icon: 'Users', color: 'accent' },
    { id: 'whiteboard', label: 'Whiteboard', icon: 'Edit', color: 'success' }
  ];

  return (
    <div className="bg-surface border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* Session Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            <span className="font-medium text-text-primary">Live Session</span>
          </div>
          <div className="text-sm text-text-secondary">
            {sessionData.className} • {sessionData.duration}
          </div>
          <div className="text-sm text-text-secondary">
            {sessionData.activeStudents} students active
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center space-x-2">
          {/* Recording */}
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={handleRecording}
            iconName={isRecording ? "Square" : "Circle"}
            iconPosition="left"
            iconSize={16}
          >
            {isRecording ? "Stop Recording" : "Record"}
          </Button>

          {/* Screen Share */}
          <Button
            variant={isScreenSharing ? "default" : "outline"}
            size="sm"
            onClick={handleScreenShare}
            iconName="Monitor"
            iconPosition="left"
            iconSize={16}
          >
            {isScreenSharing ? "Stop Sharing" : "Share Screen"}
          </Button>

          {/* Quick Actions Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQuickActions(!showQuickActions)}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Quick Actions
            </Button>

            {showQuickActions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-prominent z-50">
                <div className="p-2 space-y-1">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => {
                        onToolAction(action.id);
                        setShowQuickActions(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-smooth"
                    >
                      <Icon name={action.icon} size={16} className={`text-${action.color}`} />
                      <span className="text-sm">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToolAction('settings')}
          >
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      </div>

      {/* Secondary Toolbar */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        {/* View Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">View:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToolAction('gridView')}
            iconName="Grid3X3"
            iconSize={16}
          >
            Grid
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToolAction('focusView')}
            iconName="Maximize"
            iconSize={16}
          >
            Focus
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToolAction('presentationView')}
            iconName="Presentation"
            iconSize={16}
          >
            Presentation
          </Button>
        </div>

        {/* Audio/Video Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToolAction('muteAll')}
            iconName="MicOff"
            iconSize={16}
          >
            Mute All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToolAction('videoOff')}
            iconName="VideoOff"
            iconSize={16}
          >
            Turn Off Videos
          </Button>
        </div>

        {/* Session Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToolAction('attendance')}
            iconName="UserCheck"
            iconSize={16}
          >
            Take Attendance
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onToolAction('endSession')}
            iconName="PhoneOff"
            iconSize={16}
          >
            End Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionToolbar;