import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ message, isUser, timestamp, onRegenerate, onCopy, onSpeak }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(message.content);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      onSpeak && onSpeak();
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        );
      
      case 'code':
        return (
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-secondary">Code</span>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => navigator.clipboard.writeText(message.content)}
                iconName="Copy"
                iconSize={12}
              >
                Copy
              </Button>
            </div>
            <pre className="whitespace-pre-wrap text-text-primary">{message.content}</pre>
          </div>
        );
      
      case 'image':
        return (
          <div className="max-w-xs">
            <img 
              src={message.content} 
              alt="Generated diagram" 
              className="rounded-lg w-full h-auto"
            />
          </div>
        );
      
      case 'attachment':
        return (
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="font-medium text-text-primary">{message.fileName}</p>
              <p className="text-sm text-text-secondary">{message.fileSize}</p>
            </div>
          </div>
        );
      
      default:
        return <p>{message.content}</p>;
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name="Bot" size={12} color="white" />
            </div>
            <span className="text-sm font-medium text-text-primary">EduTwin AI</span>
          </div>
        )}
        
        <div className={`
          rounded-2xl px-4 py-3 shadow-subtle
          ${isUser 
            ? 'bg-primary text-primary-foreground ml-4' 
            : 'bg-surface border border-border mr-4'
          }
        `}>
          {renderContent()}
        </div>
        
        <div className={`flex items-center space-x-2 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-text-secondary">
            {formatTimestamp(timestamp)}
          </span>
          
          {!isUser && (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="xs"
                onClick={handleSpeak}
                iconName={isPlaying ? "VolumeX" : "Volume2"}
                iconSize={12}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Button
                variant="ghost"
                size="xs"
                onClick={() => navigator.clipboard.writeText(message.content)}
                iconName="Copy"
                iconSize={12}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Button
                variant="ghost"
                size="xs"
                onClick={onRegenerate}
                iconName="RotateCcw"
                iconSize={12}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;