import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, onFileUpload, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const quickActions = [
    { label: 'Explain this concept', icon: 'Lightbulb', action: 'explain' },
    { label: 'Create practice quiz', icon: 'FileQuestion', action: 'quiz' },
    { label: 'Solve this problem', icon: 'Calculator', action: 'solve' },
    { label: 'Summarize topic', icon: 'FileText', action: 'summarize' },
    { label: 'Show examples', icon: 'List', action: 'examples' },
    { label: 'Create study plan', icon: 'Calendar', action: 'plan' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      setShowQuickActions(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      explain: "Can you explain this concept in simple terms?",
      quiz: "Create a practice quiz on this topic with 5 questions.",
      solve: "Help me solve this step by step.",
      summarize: "Please summarize the key points of this topic.",
      examples: "Show me some practical examples of this concept.",
      plan: "Create a study plan for mastering this topic."
    };

    setMessage(actionMessages[action]);
    setShowQuickActions(false);
    textareaRef.current?.focus();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would be implemented here
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {/* Quick Actions */}
      {showQuickActions && (
        <div className="mb-4 animate-slide-down">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Quick Actions</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowQuickActions(false)}
              iconName="X"
              iconSize={14}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.action}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.action)}
                iconName={action.icon}
                iconPosition="left"
                iconSize={16}
                className="justify-start text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-end space-x-2">
          {/* File Upload */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <Icon name="Paperclip" size={18} />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your studies..."
              className="w-full min-h-[44px] max-h-[120px] px-4 py-3 pr-12 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors duration-200"
              disabled={isLoading}
              rows={1}
            />
            
            {/* Quick Actions Toggle */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="absolute right-2 top-2"
              disabled={isLoading}
            >
              <Icon name="Zap" size={16} />
            </Button>
          </div>

          {/* Voice Recording */}
          <Button
            type="button"
            variant={isRecording ? "destructive" : "ghost"}
            size="icon"
            onClick={toggleRecording}
            disabled={isLoading}
          >
            <Icon name={isRecording ? "MicOff" : "Mic"} size={18} />
          </Button>

          {/* Send Button */}
          <Button
            type="submit"
            variant="default"
            size="icon"
            disabled={!message.trim() || isLoading}
            loading={isLoading}
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>

        {/* Input Status */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            {isRecording && (
              <div className="flex items-center space-x-1 text-destructive">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                <span>Recording...</span>
              </div>
            )}
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{message.length}/2000</span>
            {message.length > 1800 && (
              <Icon name="AlertTriangle" size={14} className="text-warning" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;