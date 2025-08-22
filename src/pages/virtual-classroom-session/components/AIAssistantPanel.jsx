import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIAssistantPanel = ({ emotionData, currentTopic }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef(null);

  // Mock initial messages based on emotion and topic
  useEffect(() => {
    const initialMessages = [
      {
        id: 1,
        type: 'assistant',
        content: `Hi! I'm your AI learning assistant. I see you're studying "${currentTopic}". How can I help you today?`,
        timestamp: new Date(Date.now() - 300000),
        emotion: 'neutral'
      },
      {
        id: 2,
        type: 'system',
        content: `💡 Based on your current attention level, I've prepared some quick explanations that might help clarify the concepts.`,
        timestamp: new Date(Date.now() - 240000),
        emotion: emotionData?.dominant || 'neutral'
      }
    ];
    setMessages(initialMessages);
  }, [currentTopic, emotionData]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mock AI responses based on emotion and context
  const generateAIResponse = (userMessage) => {
    const responses = {
      confused: [
        "I notice you might be finding this challenging. Let me break it down into simpler steps.",
        "No worries! This concept can be tricky. Would you like me to explain it differently?",
        "I can see this is complex. Let's approach it from a different angle."
      ],
      frustrated: [
        "I understand this can be frustrating. Take a deep breath, and let's work through this together.",
        "It\'s okay to feel stuck sometimes. Let me provide a clearer explanation.",
        "Don't worry, everyone struggles with this topic initially. You're doing great!"
      ],
      focused: [
        "Great focus! You're really engaged with the material. What specific aspect would you like to explore further?",
        "I can see you\'re concentrating well. Let\'s dive deeper into this concept.",
        "Excellent attention! This is the perfect time to tackle more advanced topics."
      ],
      default: [
        "That\'s a great question! Let me help you understand this better.",
        "I'm here to help clarify any concepts you're unsure about.",
        "Let's explore this topic together. What specifically would you like to know?"
      ]
    };

    const emotionKey = emotionData?.dominant || 'default';
    const responseArray = responses[emotionKey] || responses.default;
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      emotion: emotionData?.dominant || 'neutral'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        emotion: 'helpful'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick action suggestions based on emotion
  const getQuickActions = () => {
    const baseActions = [
      { label: "Explain this concept", icon: "BookOpen" },
      { label: "Show examples", icon: "FileText" },
      { label: "Practice quiz", icon: "HelpCircle" }
    ];

    if (emotionData?.dominant === 'confused') {
      return [
        { label: "Simplify explanation", icon: "Lightbulb" },
        { label: "Show visual diagram", icon: "Image" },
        { label: "Break into steps", icon: "List" }
      ];
    }

    if (emotionData?.dominant === 'focused') {
      return [
        { label: "Advanced topics", icon: "TrendingUp" },
        { label: "Related concepts", icon: "GitBranch" },
        { label: "Challenge questions", icon: "Target" }
      ];
    }

    return baseActions;
  };

  const quickActions = getQuickActions();

  // Mock hints and tips
  const hints = [
    {
      id: 1,
      title: "Key Concept",
      content: "Machine Learning algorithms learn patterns from data to make predictions on new, unseen data.",
      type: "concept"
    },
    {
      id: 2,
      title: "Memory Tip",
      content: "Remember: Supervised = with labels, Unsupervised = without labels, Reinforcement = learning through rewards.",
      type: "memory"
    },
    {
      id: 3,
      title: "Common Mistake",
      content: "Don\'t confuse correlation with causation when interpreting ML model results.",
      type: "warning"
    }
  ];

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-96 bg-card border-l border-border h-full flex flex-col">
      {/* Panel Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            AI Assistant
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              emotionData?.dominant === 'focused' ? 'bg-success' :
              emotionData?.dominant === 'confused' ? 'bg-warning' :
              emotionData?.dominant === 'frustrated'? 'bg-error' : 'bg-primary'
            } animate-pulse`} />
            <span className="text-xs text-muted-foreground capitalize">
              {emotionData?.dominant || 'Active'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'chat' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="MessageCircle" size={16} />
            <span>Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('hints')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'hints' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Lightbulb" size={16} />
            <span>Hints</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? (
          /* Chat Interface */
          <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === 'user' ?'bg-primary text-primary-foreground' 
                      : message.type === 'system' ?'bg-accent text-accent-foreground' :'bg-muted text-foreground'
                  } rounded-lg p-3`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ?'text-primary-foreground opacity-70' :'text-muted-foreground'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground rounded-lg p-3">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-border">
              <div className="grid grid-cols-1 gap-2 mb-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(action.label)}
                    iconName={action.icon}
                    iconPosition="left"
                    iconSize={14}
                    className="justify-start"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Ask me anything..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  iconName="Send"
                  size="icon"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Hints & Tips */
          <div className="p-4 space-y-4 overflow-y-auto">
            <div className="text-sm text-muted-foreground mb-4">
              Personalized hints based on your learning progress and current emotion: 
              <span className="font-medium capitalize text-foreground ml-1">
                {emotionData?.dominant || 'Neutral'}
              </span>
            </div>

            {hints.map((hint) => (
              <div key={hint.id} className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={
                      hint.type === 'concept' ? 'BookOpen' :
                      hint.type === 'memory'? 'Brain' : 'AlertTriangle'
                    } 
                    size={16}
                    className={
                      hint.type === 'concept' ? 'text-primary' :
                      hint.type === 'memory'? 'text-accent' : 'text-warning'
                    }
                  />
                  <h4 className="font-medium text-foreground">{hint.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {hint.content}
                </p>
              </div>
            ))}

            {/* Emotion-based Recommendations */}
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Sparkles" size={16} className="text-primary" />
                <h4 className="font-medium text-foreground">Personalized Recommendation</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {emotionData?.dominant === 'confused' 
                  ? "Take a short break and try reviewing the previous topic before continuing. Sometimes stepping back helps clarify complex concepts."
                  : emotionData?.dominant === 'focused' ? "You're in a great learning state! This is the perfect time to tackle challenging practice problems or explore advanced topics." :"You're doing well! Consider taking notes on key concepts to reinforce your understanding."
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantPanel;