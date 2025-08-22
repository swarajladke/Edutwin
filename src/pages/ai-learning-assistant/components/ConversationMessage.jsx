import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConversationMessage = ({ message, onBookmark, onCopy, onRegenerate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMessageContent = () => {
    if (message.type === 'quiz') {
      return (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">{message.content.question}</h4>
          <div className="space-y-2">
            {message.content.options.map((option, index) => (
              <button
                key={index}
                className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors duration-200"
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (message.type === 'code') {
      return (
        <div className="bg-muted rounded-lg p-4 font-mono text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {message.content.language || 'Code'}
            </span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => navigator.clipboard.writeText(message.content.code)}
              iconName="Copy"
              iconSize={14}
            >
              Copy
            </Button>
          </div>
          <pre className="whitespace-pre-wrap text-foreground">
            {message.content.code}
          </pre>
        </div>
      );
    }

    if (message.type === 'image') {
      return (
        <div className="space-y-3">
          <p className="text-foreground">{message.content.text}</p>
          <div className="rounded-lg overflow-hidden">
            <Image
              src={message.content.imageUrl}
              alt={message.content.alt}
              className="w-full h-auto max-h-64 object-cover"
            />
          </div>
        </div>
      );
    }

    if (message.type === 'steps') {
      return (
        <div className="space-y-4">
          <p className="text-foreground">{message.content.intro}</p>
          <div className="space-y-3">
            {message.content.steps.map((step, index) => (
              <div key={index} className="flex space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-foreground">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <p className="text-foreground whitespace-pre-wrap">{message.content}</p>
        {message.relatedTopics && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.relatedTopics.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`flex space-x-3 p-4 rounded-lg transition-colors duration-200 ${
        message.sender === 'user' ?'bg-primary/5 ml-8' :'bg-card mr-8'
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {message.sender === 'user' ? (
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="white" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={16} color="white" />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm text-foreground">
              {message.sender === 'user' ? 'You' : 'AI Assistant'}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(message.timestamp)}
            </span>
            {message.isBookmarked && (
              <Icon name="Bookmark" size={14} className="text-warning" />
            )}
          </div>

          {/* Message Actions */}
          {showActions && (
            <div className="flex items-center space-x-1 opacity-0 animate-fade-in">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => onBookmark(message.id)}
                iconName={message.isBookmarked ? "BookmarkCheck" : "Bookmark"}
                iconSize={14}
              />
              <Button
                variant="ghost"
                size="xs"
                onClick={() => onCopy(message.content)}
                iconName="Copy"
                iconSize={14}
              />
              {message.sender === 'assistant' && (
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onRegenerate(message.id)}
                  iconName="RotateCcw"
                  iconSize={14}
                />
              )}
            </div>
          )}
        </div>

        {/* Message Body */}
        <div className={`${isExpanded ? '' : 'max-h-32 overflow-hidden'}`}>
          {renderMessageContent()}
        </div>

        {/* Expand/Collapse for long messages */}
        {message.content && message.content.length > 300 && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        )}

        {/* Voice Playback for AI responses */}
        {message.sender === 'assistant' && (
          <div className="flex items-center space-x-2 mt-3">
            <Button
              variant="ghost"
              size="xs"
              iconName="Volume2"
              iconSize={14}
            >
              Listen
            </Button>
            <Button
              variant="ghost"
              size="xs"
              iconName="ThumbsUp"
              iconSize={14}
            />
            <Button
              variant="ghost"
              size="xs"
              iconName="ThumbsDown"
              iconSize={14}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationMessage;