import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatSidebar = ({ isVisible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('history');

  const conversationHistory = [
    {
      id: 1,
      title: "Quadratic Equations Help",
      lastMessage: "Thanks for explaining the discriminant formula!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messageCount: 12
    },
    {
      id: 2,
      title: "Physics - Newton\'s Laws",
      lastMessage: "Can you give me more examples of the third law?",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messageCount: 8
    },
    {
      id: 3,
      title: "Chemistry Bonding",
      lastMessage: "The ionic vs covalent explanation was perfect!",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      messageCount: 15
    }
  ];

  const relatedResources = [
    {
      id: 1,
      title: "Algebra Fundamentals",
      type: "video",
      duration: "12:34",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Practice Problems Set",
      type: "document",
      pages: 8,
      thumbnail: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Interactive Quiz",
      type: "quiz",
      questions: 15,
      thumbnail: "https://images.pixabay.com/photo/2017/05/10/19/29/mathematics-2301293_1280.jpg?w=300&h=200&fit=crop"
    }
  ];

  const quickTopics = [
    { name: "Mathematics", icon: "Calculator", count: 24 },
    { name: "Physics", icon: "Atom", count: 18 },
    { name: "Chemistry", icon: "Flask", count: 12 },
    { name: "Biology", icon: "Microscope", count: 9 },
    { name: "History", icon: "Clock", count: 6 },
    { name: "Literature", icon: "BookOpen", count: 15 }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredHistory = conversationHistory.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="lg:hidden fixed inset-0 z-1010 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`
        fixed right-0 top-16 bottom-0 w-80 bg-surface border-l border-border shadow-prominent z-1020
        lg:relative lg:top-0 lg:shadow-none lg:border-l
        overflow-hidden flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-heading font-semibold text-text-primary">
            Learning Hub
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'history' ?'text-primary border-b-2 border-primary bg-primary bg-opacity-5' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'resources' ?'text-primary border-b-2 border-primary bg-primary bg-opacity-5' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveTab('topics')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'topics' ?'text-primary border-b-2 border-primary bg-primary bg-opacity-5' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Topics
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'history' && (
            <div className="p-4">
              {/* Search */}
              <div className="mb-4">
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Conversation List */}
              <div className="space-y-3">
                {filteredHistory.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="p-3 bg-muted rounded-lg hover:bg-muted-foreground hover:bg-opacity-10 cursor-pointer transition-colors"
                  >
                    <h4 className="font-medium text-text-primary text-sm mb-1">
                      {conversation.title}
                    </h4>
                    <p className="text-xs text-text-secondary line-clamp-2 mb-2">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>{formatTimestamp(conversation.timestamp)}</span>
                      <span>{conversation.messageCount} messages</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="p-4">
              <div className="space-y-4">
                {relatedResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-muted rounded-lg overflow-hidden hover:shadow-moderate transition-shadow cursor-pointer"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary to-secondary relative">
                      <img
                        src={resource.thumbnail}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <Icon 
                          name={resource.type === 'video' ? 'Play' : resource.type === 'quiz' ? 'HelpCircle' : 'FileText'} 
                          size={24} 
                          color="white" 
                        />
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-text-primary text-sm mb-1">
                        {resource.title}
                      </h4>
                      <p className="text-xs text-text-secondary">
                        {resource.type === 'video' && `${resource.duration} duration`}
                        {resource.type === 'document' && `${resource.pages} pages`}
                        {resource.type === 'quiz' && `${resource.questions} questions`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'topics' && (
            <div className="p-4">
              <div className="space-y-2">
                {quickTopics.map((topic) => (
                  <button
                    key={topic.name}
                    className="w-full flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted-foreground hover:bg-opacity-10 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                        <Icon name={topic.icon} size={16} color="var(--color-primary)" />
                      </div>
                      <span className="font-medium text-text-primary text-sm">
                        {topic.name}
                      </span>
                    </div>
                    <span className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-full">
                      {topic.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;