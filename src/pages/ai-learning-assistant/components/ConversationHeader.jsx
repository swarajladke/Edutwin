import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationHeader = ({ onToggleSidebar, onClearChat, onExportChat, currentTopic }) => {
  const [showOptions, setShowOptions] = useState(false);

  const mockStudentData = {
    name: "Alex Chen",
    currentSubject: "Mathematics",
    learningState: "Focused",
    emotionState: "Confident",
    attentionLevel: 85,
    comprehensionLevel: 78
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      'Confident': 'text-success',
      'Confused': 'text-warning',
      'Frustrated': 'text-destructive',
      'Excited': 'text-primary',
      'Neutral': 'text-muted-foreground'
    };
    return colors[emotion] || 'text-muted-foreground';
  };

  const getAttentionColor = (level) => {
    if (level >= 80) return 'text-success';
    if (level >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      {/* Left Section - AI Assistant Info */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
          <Icon name="Bot" size={20} color="white" />
        </div>
        <div>
          <h1 className="text-lg font-heading font-semibold text-foreground">
            AI Learning Assistant
          </h1>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Online & Ready to Help</span>
            {currentTopic && (
              <>
                <span>•</span>
                <span className="text-accent">{currentTopic}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Center Section - Student State (Desktop) */}
      <div className="hidden lg:flex items-center space-x-6 px-6 py-2 bg-muted rounded-lg">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Attention</div>
          <div className={`text-sm font-medium ${getAttentionColor(mockStudentData.attentionLevel)}`}>
            {mockStudentData.attentionLevel}%
          </div>
        </div>
        <div className="w-px h-8 bg-border"></div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Emotion</div>
          <div className={`text-sm font-medium ${getEmotionColor(mockStudentData.emotionState)}`}>
            {mockStudentData.emotionState}
          </div>
        </div>
        <div className="w-px h-8 bg-border"></div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Comprehension</div>
          <div className="text-sm font-medium text-primary">
            {mockStudentData.comprehensionLevel}%
          </div>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center space-x-2">
        {/* Mobile Student State Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setShowOptions(!showOptions)}
        >
          <Icon name="Activity" size={18} />
        </Button>

        {/* Export Chat */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onExportChat}
          title="Export conversation"
        >
          <Icon name="Download" size={18} />
        </Button>

        {/* Clear Chat */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClearChat}
          title="Clear conversation"
        >
          <Icon name="Trash2" size={18} />
        </Button>

        {/* Toggle Sidebar */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          title="Toggle sidebar"
        >
          <Icon name="PanelRight" size={18} />
        </Button>

        {/* More Options */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowOptions(!showOptions)}
          >
            <Icon name="MoreVertical" size={18} />
          </Button>

          {showOptions && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-medium z-dropdown animate-slide-down">
              <div className="py-2">
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200">
                  <Icon name="Settings" size={16} />
                  <span>Assistant Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200">
                  <Icon name="Volume2" size={16} />
                  <span>Voice Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200">
                  <Icon name="Palette" size={16} />
                  <span>Theme Settings</span>
                </button>
                <div className="border-t border-border my-2"></div>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200">
                  <Icon name="HelpCircle" size={16} />
                  <span>Help & Tips</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200">
                  <Icon name="MessageCircle" size={16} />
                  <span>Feedback</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Student State Panel */}
      {showOptions && (
        <div className="absolute top-full left-0 right-0 bg-card border-b border-border p-4 z-dropdown animate-slide-down lg:hidden">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground">Attention</div>
              <div className={`text-sm font-medium ${getAttentionColor(mockStudentData.attentionLevel)}`}>
                {mockStudentData.attentionLevel}%
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Emotion</div>
              <div className={`text-sm font-medium ${getEmotionColor(mockStudentData.emotionState)}`}>
                {mockStudentData.emotionState}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Comprehension</div>
              <div className="text-sm font-medium text-primary">
                {mockStudentData.comprehensionLevel}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationHeader;