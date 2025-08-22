import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationSidebar = ({ isOpen, onClose, conversations, bookmarks, learningProgress }) => {
  const [activeTab, setActiveTab] = useState('conversations');

  const tabs = [
    { id: 'conversations', label: 'Chats', icon: 'MessageCircle' },
    { id: 'bookmarks', label: 'Saved', icon: 'Bookmark' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' }
  ];

  const mockConversations = [
    {
      id: 1,
      title: "Quadratic Equations Help",
      lastMessage: "Thanks for explaining the discriminant formula!",
      timestamp: new Date(Date.now() - 3600000),
      messageCount: 12,
      subject: "Mathematics"
    },
    {
      id: 2,
      title: "Photosynthesis Process",
      lastMessage: "Can you create a quiz on this topic?",
      timestamp: new Date(Date.now() - 7200000),
      messageCount: 8,
      subject: "Biology"
    },
    {
      id: 3,
      title: "World War II Timeline",
      lastMessage: "What were the major turning points?",
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 15,
      subject: "History"
    },
    {
      id: 4,
      title: "Python Programming Basics",
      lastMessage: "Help me debug this loop",
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 23,
      subject: "Computer Science"
    }
  ];

  const mockBookmarks = [
    {
      id: 1,
      title: "Pythagorean Theorem Explanation",
      content: "The Pythagorean theorem states that in a right triangle...",
      subject: "Mathematics",
      timestamp: new Date(Date.now() - 3600000),
      type: "explanation"
    },
    {
      id: 2,
      title: "Mitosis vs Meiosis Comparison",
      content: "Key differences between cell division processes...",
      subject: "Biology",
      timestamp: new Date(Date.now() - 7200000),
      type: "comparison"
    },
    {
      id: 3,
      title: "JavaScript Array Methods Quiz",
      content: "Practice quiz with 10 questions on array methods",
      subject: "Computer Science",
      timestamp: new Date(Date.now() - 86400000),
      type: "quiz"
    }
  ];

  const mockProgress = [
    {
      subject: "Mathematics",
      progress: 78,
      recentTopics: ["Quadratic Equations", "Trigonometry", "Calculus Basics"],
      timeSpent: "12h 30m",
      questionsAnswered: 145
    },
    {
      subject: "Biology",
      progress: 65,
      recentTopics: ["Cell Biology", "Genetics", "Ecology"],
      timeSpent: "8h 45m",
      questionsAnswered: 89
    },
    {
      subject: "History",
      progress: 82,
      recentTopics: ["World Wars", "Ancient Civilizations", "Modern History"],
      timeSpent: "15h 20m",
      questionsAnswered: 203
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const renderConversations = () => (
    <div className="space-y-2">
      {mockConversations.map((conversation) => (
        <div
          key={conversation.id}
          className="p-3 rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors duration-200"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-sm text-foreground line-clamp-1">
              {conversation.title}
            </h4>
            <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
              {formatTimestamp(conversation.timestamp)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {conversation.lastMessage}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
              {conversation.subject}
            </span>
            <span className="text-xs text-muted-foreground">
              {conversation.messageCount} messages
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBookmarks = () => (
    <div className="space-y-2">
      {mockBookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="p-3 rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors duration-200"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-sm text-foreground line-clamp-1">
              {bookmark.title}
            </h4>
            <Icon name="Bookmark" size={14} className="text-warning flex-shrink-0 ml-2" />
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {bookmark.content}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">
              {bookmark.subject}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(bookmark.timestamp)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-4">
      {mockProgress.map((subject) => (
        <div
          key={subject.subject}
          className="p-4 rounded-lg border border-border"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm text-foreground">
              {subject.subject}
            </h4>
            <span className="text-sm font-medium text-primary">
              {subject.progress}%
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 mb-3">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${subject.progress}%` }}
            ></div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Time Spent:</span>
              <span>{subject.timeSpent}</span>
            </div>
            <div className="flex justify-between">
              <span>Questions:</span>
              <span>{subject.questionsAnswered}</span>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">Recent Topics:</p>
            <div className="flex flex-wrap gap-1">
              {subject.recentTopics.slice(0, 3).map((topic, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-overlay lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-16 bottom-0 w-80 bg-card border-l border-border z-sidebar animate-slide-down lg:relative lg:top-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Learning Hub
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'conversations' && renderConversations()}
          {activeTab === 'bookmarks' && renderBookmarks()}
          {activeTab === 'progress' && renderProgress()}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            New Conversation
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConversationSidebar;