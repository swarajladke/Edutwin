import React, { useRef, useEffect } from 'react';
import ConversationMessage from './ConversationMessage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationArea = ({ 
  messages, 
  isLoading, 
  onBookmarkMessage, 
  onCopyMessage, 
  onRegenerateMessage,
  onScrollToTop 
}) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyMessage = (content) => {
    let textContent = '';
    
    if (typeof content === 'string') {
      textContent = content;
    } else if (content.text) {
      textContent = content.text;
    } else if (content.question) {
      textContent = content.question;
    } else if (content.code) {
      textContent = content.code;
    }

    navigator.clipboard.writeText(textContent);
    onCopyMessage(textContent);
  };

  const renderWelcomeMessage = () => (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
        <Icon name="Bot" size={32} color="white" />
      </div>
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
        Welcome to AI Learning Assistant
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        I'm here to help you learn, understand concepts, solve problems, and answer any questions you have about your studies.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        <Button
          variant="outline"
          iconName="Lightbulb"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          Explain a concept
        </Button>
        <Button
          variant="outline"
          iconName="FileQuestion"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          Create a quiz
        </Button>
        <Button
          variant="outline"
          iconName="Calculator"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          Solve a problem
        </Button>
        <Button
          variant="outline"
          iconName="BookOpen"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          Study planning
        </Button>
      </div>

      <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Pro Tip:</p>
            <p className="text-muted-foreground">
              I can analyze your current learning state and provide personalized explanations based on your attention level and emotional state.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTypingIndicator = () => (
    <div className="flex space-x-3 p-4 rounded-lg bg-card mr-8">
      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
        <Icon name="Bot" size={16} color="white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-medium text-sm text-foreground">AI Assistant</span>
          <span className="text-xs text-muted-foreground">typing...</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-background"
    >
      {messages.length === 0 ? (
        renderWelcomeMessage()
      ) : (
        <div className="space-y-4 p-4">
          {messages.map((message) => (
            <ConversationMessage
              key={message.id}
              message={message}
              onBookmark={onBookmarkMessage}
              onCopy={handleCopyMessage}
              onRegenerate={onRegenerateMessage}
            />
          ))}
          
          {isLoading && renderTypingIndicator()}
          
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Scroll to Top Button */}
      {messages.length > 5 && (
        <Button
          variant="secondary"
          size="icon"
          onClick={onScrollToTop}
          className="fixed bottom-24 right-6 z-floating shadow-medium"
        >
          <Icon name="ArrowUp" size={18} />
        </Button>
      )}
    </div>
  );
};

export default ConversationArea;