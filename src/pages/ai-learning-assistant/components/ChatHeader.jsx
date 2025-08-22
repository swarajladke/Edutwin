import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ assistantName, isOnline, onToggleSidebar, showSidebar }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-surface border-b border-border shadow-subtle">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} color="white" />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface ${
            isOnline ? 'bg-success' : 'bg-muted-foreground'
          }`} />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-text-primary">{assistantName}</h2>
          <p className="text-sm text-text-secondary">
            {isOnline ? 'Online • Ready to help' : 'Offline'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hidden lg:flex"
        >
          <Icon name={showSidebar ? "PanelRightClose" : "PanelRightOpen"} size={20} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {/* Handle settings */}}
        >
          <Icon name="Settings" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;