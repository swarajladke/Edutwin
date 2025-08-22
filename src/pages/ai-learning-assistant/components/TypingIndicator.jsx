import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%]">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={12} color="white" />
          </div>
          <span className="text-sm font-medium text-text-primary">EduTwin AI</span>
        </div>
        
        <div className="bg-surface border border-border rounded-2xl px-4 py-3 mr-4 shadow-subtle">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-text-secondary ml-2">AI is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;