import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ConversationHeader from './components/ConversationHeader';
import ConversationArea from './components/ConversationArea';
import MessageInput from './components/MessageInput';
import ConversationSidebar from './components/ConversationSidebar';
import aiAssistantService from '../../services/aiAssistantService';
import digitalTwinService from '../../services/digitalTwinService';

const AILearningAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('');
  const [conversation, setConversation] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);

  // Mock student ID (in real app, this would come from authentication)
  const STUDENT_ID = 'student_123';

  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      // Initialize or get student profile
      let profile = digitalTwinService.getStudentProfile(STUDENT_ID);
      if (!profile) {
        profile = await digitalTwinService.createStudentProfile(STUDENT_ID, {
          personalInfo: { name: 'Alex Johnson' },
          learningPreferences: { visualLearning: true, interactiveContent: true }
        });
      }
      setStudentProfile(profile);

      // Start AI conversation
      const newConversation = await aiAssistantService.startConversation(STUDENT_ID, {
        subject: 'Mathematics',
        currentTopic: 'Algebra',
        learningObjectives: ['Understand basic equations', 'Solve linear problems']
      });

      setConversation(newConversation);
      setMessages(newConversation.messages);
      setCurrentTopic(newConversation.context.currentTopic);
    } catch (error) {
      console.error('Error initializing session:', error);
      // Fallback to previous mock data behavior
      const mockInitialMessages = [
        {
          id: 1,
          sender: 'assistant',
          content: `Hello Alex! I'm your AI Learning Assistant. I can see you're currently studying Mathematics and your attention level is at 85% - that's great!\n\nI'm here to help you with:\n• Explaining complex concepts in simple terms\n• Creating practice quizzes and tests\n• Solving step-by-step problems\n• Providing personalized study plans\n• Answering any questions you have\n\nWhat would you like to learn about today?`,
          timestamp: new Date(Date.now() - 300000),
          type: 'text',
          relatedTopics: ['Mathematics', 'Study Planning', 'Problem Solving']
        }
      ];
      setMessages(mockInitialMessages);
    }
  };

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: messageText,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Process message through AI assistant service
      const response = await aiAssistantService.processMessage(STUDENT_ID, messageText);
      
      const aiMessage = {
        id: response.message.id,
        sender: 'assistant',
        content: response.message.content,
        timestamp: response.message.timestamp,
        type: response.message.type,
        metadata: response.message.metadata
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Update current topic if needed
      if (response.conversation.context.currentTopic !== currentTopic) {
        setCurrentTopic(response.conversation.context.currentTopic);
      }

      // Update conversation state
      setConversation(response.conversation);

    } catch (error) {
      console.error('Error processing message:', error);
      
      // Fallback to mock response
      setTimeout(() => {
        const aiResponse = generateMockAIResponse(messageText);
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        updateCurrentTopic(messageText);
      }, 2000);
      return;
    }

    setIsLoading(false);
  };

  const generateMockAIResponse = (userMessage) => {
    const responses = {
      'explain': {
        content: `I'd be happy to explain this concept! Based on your current attention level of 85% and confident emotional state, I can provide a detailed explanation.\n\nLet me break this down step by step:\n\n1. First, let's understand the fundamental principle\n2. Then we\'ll look at practical applications\n3. Finally, we'll work through some examples\n\nWhich specific aspect would you like me to focus on first?`,
        type: 'text',
        relatedTopics: ['Step-by-Step Learning', 'Concept Explanation', 'Mathematics']
      },
      'quiz': {
        content: {
          question: "Which of the following best describes the Pythagorean theorem?",
          options: [
            "a² + b² = c² for any triangle",
            "a² + b² = c² for right triangles only",
            "a + b = c for right triangles",
            "a² - b² = c² for right triangles"
          ]
        },
        type: 'quiz'
      },
      'solve': {
        content: `Let me help you solve this step by step. I notice your comprehension level is at 78%, so I'll provide detailed explanations for each step.\n\nGiven the problem, here's how we approach it:\n\nStep 1: Identify what we know\nStep 2: Determine what we need to find\nStep 3: Choose the appropriate method\nStep 4: Execute the solution\nStep 5: Verify our answer\n\nWould you like me to work through a specific problem with you?`,
        type: 'text',
        relatedTopics: ['Problem Solving', 'Step-by-Step Solutions', 'Mathematics']
      },
      'default': {
        content: `That's a great question! Based on your current learning state, I can provide a personalized explanation.\n\nI notice you're focused and confident right now, which is perfect for tackling new concepts. Let me help you understand this better.\n\nWould you like me to:\n• Provide a detailed explanation\n• Create practice problems\n• Show visual examples\n• Generate a quiz to test your understanding`,
        type: 'text',
        relatedTopics: ['Learning Support', 'Personalized Help', 'Study Assistance']
      }
    };

    const messageKey = userMessage.toLowerCase().includes('explain') ? 'explain' :
                      userMessage.toLowerCase().includes('quiz') ? 'quiz' :
                      userMessage.toLowerCase().includes('solve') ? 'solve' : 'default';

    return {
      id: Date.now() + 1,
      sender: 'assistant',
      ...responses[messageKey],
      timestamp: new Date()
    };
  };

  const updateCurrentTopic = (message) => {
    const topics = {
      'math': 'Mathematics',
      'biology': 'Biology', 
      'history': 'History',
      'physics': 'Physics',
      'chemistry': 'Chemistry',
      'english': 'English Literature'
    };

    const detectedTopic = Object.keys(topics).find(key => 
      message.toLowerCase().includes(key)
    );

    if (detectedTopic) {
      setCurrentTopic(topics[detectedTopic]);
    }
  };

  const handleFileUpload = (file) => {
    const fileMessage = {
      id: Date.now(),
      sender: 'user',
      content: `Uploaded file: ${file.name}`,
      timestamp: new Date(),
      type: 'file',
      fileInfo: {
        name: file.name,
        size: file.size,
        type: file.type
      }
    };

    setMessages(prev => [...prev, fileMessage]);
    setIsLoading(true);

    // Simulate AI processing the file
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'assistant',
        content: `I've analyzed your uploaded file "${file.name}". I can help you with:\n\n• Explaining concepts from the document\n• Creating questions based on the content\n• Summarizing key points\n• Providing additional resources\n\nWhat specific help do you need with this material?`,
        timestamp: new Date(),
        type: 'text',
        relatedTopics: ['File Analysis', 'Document Review', 'Study Materials']
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 3000);
  };

  const handleBookmarkMessage = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isBookmarked: !msg.isBookmarked }
        : msg
    ));
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard?.writeText(content);
    console.log('Message copied to clipboard');
  };

  const handleRegenerateMessage = (messageId) => {
    setIsLoading(true);
    setTimeout(() => {
      const newResponse = {
        id: Date.now(),
        sender: 'assistant',
        content: `Here's an alternative explanation of the same concept:\n\nLet me approach this from a different angle that might be clearer. Based on your learning preferences, I'll use more visual examples this time.\n\nWould you like me to continue with this approach or try yet another method?`,
        timestamp: new Date(),
        type: 'text',
        relatedTopics: ['Alternative Explanations', 'Learning Styles', 'Concept Clarity']
      };
      setMessages(prev => [...prev, newResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleClearChat = async () => {
    try {
      if (conversation) {
        await aiAssistantService.endConversation(STUDENT_ID);
      }
      // Start a new conversation
      await initializeSession();
    } catch (error) {
      console.error('Error clearing chat:', error);
      setMessages([]);
      setCurrentTopic('');
    }
  };

  const handleExportChat = () => {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: messages,
      topic: currentTopic,
      studentId: STUDENT_ID,
      conversationId: conversation?.id
    };
    
    const dataStr = JSON.stringify(chatData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-chat-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const handleScrollToTop = () => {
    const container = document.querySelector('.overflow-y-auto');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar />
        
        <main className="flex-1 lg:ml-80 flex flex-col h-screen">
          <Breadcrumb />
          
          <div className="flex-1 flex">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              <ConversationHeader
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                onClearChat={handleClearChat}
                onExportChat={handleExportChat}
                currentTopic={currentTopic}
              />
              
              <ConversationArea
                messages={messages}
                isLoading={isLoading}
                onBookmarkMessage={handleBookmarkMessage}
                onCopyMessage={handleCopyMessage}
                onRegenerateMessage={handleRegenerateMessage}
                onScrollToTop={handleScrollToTop}
              />
              
              <MessageInput
                onSendMessage={handleSendMessage}
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
              />
            </div>

            {/* Right Sidebar */}
            <ConversationSidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              conversations={[]}
              bookmarks={[]}
              learningProgress={[]}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AILearningAssistant;