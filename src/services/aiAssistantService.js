import openai, { safeOpenAICall, isOpenAIAvailable } from './openaiClient';
import digitalTwinService from './digitalTwinService';

/**
 * AI Learning Assistant Service
 * Provides ChatGPT-like virtual learning assistant with contextual awareness
 */
class AIAssistantService {
  constructor() {
    this.conversationHistory = new Map();
    this.studentContext = new Map();
    this.knowledgeBase = new Map();
  }

  /**
   * Starts a new conversation session for a student
   * @param {string} studentId - Student identifier
   * @param {Object} context - Initial conversation context
   */
  async startConversation(studentId, context = {}) {
    const studentProfile = digitalTwinService.getStudentProfile(studentId);
    
    const conversation = {
      id: this.generateConversationId(),
      studentId,
      startTime: new Date(),
      context: {
        subject: context.subject || 'General',
        currentTopic: context.currentTopic || '',
        learningObjectives: context.learningObjectives || [],
        difficulty: studentProfile?.aiPersonalization?.difficultyLevel || 'medium',
        preferredStyle: studentProfile?.aiPersonalization?.preferredExplanationStyle || 'mixed'
      },
      messages: [],
      metadata: {
        totalMessages: 0,
        topicsDiscussed: [],
        helpRequests: 0,
        conceptsExplained: []
      }
    };

    // Generate personalized welcome message with improved error handling
    const welcomeMessage = await this.generateWelcomeMessage(studentProfile, context);
    conversation.messages.push({
      id: this.generateMessageId(),
      role: 'assistant',
      content: welcomeMessage.content,
      timestamp: new Date(),
      type: 'welcome',
      metadata: welcomeMessage.metadata
    });

    this.conversationHistory.set(conversation.id, conversation);
    this.studentContext.set(studentId, conversation.id);

    return conversation;
  }

  /**
   * Generates a personalized welcome message with comprehensive error handling
   * @param {Object} studentProfile - Student's digital twin profile
   * @param {Object} context - Conversation context
   */
  async generateWelcomeMessage(studentProfile, context) {
    // Always provide a basic welcome if no profile exists
    if (!studentProfile) {
      return {
        content: "Hello! I'm your AI Learning Assistant. I'm here to help you learn, answer questions, and support your educational journey. What would you like to explore today?",
        metadata: { personalized: false, reason: 'no_profile' }
      };
    }

    // Check if OpenAI is available before attempting API call
    if (!isOpenAIAvailable()) {
      const fallbackMessage = this.generatePersonalizedFallbackWelcome(studentProfile, context);
      return {
        content: fallbackMessage,
        metadata: { personalized: true, fallback: true, reason: 'openai_unavailable' }
      };
    }

    try {
      let prompt = `
      Create a personalized welcome message for a student starting a learning session:
      
      Student Context:
      - Name: ${studentProfile.personalInfo?.name || 'Student'}
      - Current Attention Level: ${studentProfile.behaviorMetrics.attentionLevel}%
      - Emotional State: ${studentProfile.behaviorMetrics.emotionalState}
      - Recent Performance: ${studentProfile.performanceMetrics.overallGrade}%
      - Preferred Learning Style: ${studentProfile.aiPersonalization.preferredExplanationStyle}
      - Subject Focus: ${context.subject || 'General Learning'}
      - Current Topic: ${context.currentTopic || 'Not specified'}
      
      Create a warm, encouraging welcome that:
      1. Acknowledges their current state
      2. References their learning preferences
      3. Mentions available support
      4. Invites them to start learning
      
      Keep it concise but personal.
      `;

      const response = await safeOpenAICall(
        (client) => client.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are a friendly, supportive AI learning assistant that creates personalized welcome messages for students.' },
            { role: 'user', content: prompt }
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'welcome_message',
              schema: {
                type: 'object',
                properties: {
                  greeting: { type: 'string' },
                  acknowledgment: { type: 'string' },
                  supportOffer: { type: 'string' },
                  invitation: { type: 'string' }
                },
                required: ['greeting', 'acknowledgment', 'supportOffer', 'invitation'],
                additionalProperties: false
              }
            }
          }
        }),
        'personalized welcome message generation'
      );

      const welcomeData = JSON.parse(response.choices[0].message.content);
      const content = `${welcomeData.greeting}\n\n${welcomeData.acknowledgment}\n\n${welcomeData.supportOffer}\n\n${welcomeData.invitation}`;

      return {
        content,
        metadata: { 
          personalized: true,
          components: welcomeData,
          source: 'openai'
        }
      };
    } catch (error) {
      console.error('Error generating personalized welcome:', error);
      
      // Use enhanced fallback with student profile information
      const fallbackMessage = this.generatePersonalizedFallbackWelcome(studentProfile, context);
      return {
        content: fallbackMessage,
        metadata: { 
          personalized: true, 
          fallback: true, 
          reason: 'api_error',
          error: error.message 
        }
      };
    }
  }

  /**
   * Generates a personalized fallback welcome message using student profile data
   * @param {Object} studentProfile - Student profile
   * @param {Object} context - Conversation context
   */
  generatePersonalizedFallbackWelcome(studentProfile, context) {
    const name = studentProfile.personalInfo?.name || 'there';
    const subject = context.subject || 'your studies';
    const attentionLevel = studentProfile.behaviorMetrics?.attentionLevel || 75;
    const emotionalState = studentProfile.behaviorMetrics?.emotionalState || 'ready to learn';
    const learningStyle = studentProfile.aiPersonalization?.preferredExplanationStyle || 'interactive';

    let greeting = `Hello ${name}! I'm your AI Learning Assistant.`;
    
    let acknowledgment = '';
    if (attentionLevel >= 80) {
      acknowledgment = `I can see you're highly focused and ${emotionalState} - that's fantastic for learning!`;
    } else if (attentionLevel >= 60) {
      acknowledgment = `You're showing good focus levels and seem ${emotionalState}. Great mindset for learning!`;
    } else {
      acknowledgment = `I notice you might need some extra support today, and that's perfectly okay!`;
    }

    let supportOffer = '';
    if (learningStyle === 'visual') {
      supportOffer = `I'm here to help you with visual explanations, diagrams, step-by-step breakdowns, and anything else you need for ${subject}.`;
    } else if (learningStyle === 'auditory') {
      supportOffer = `I can provide detailed explanations, discuss concepts, and talk through problems to help you with ${subject}.`;
    } else {
      supportOffer = `I'm here to help you with explanations, practice problems, quizzes, and personalized guidance for ${subject}.`;
    }

    const invitation = `What would you like to explore or learn about today?`;

    return `${greeting}\n\n${acknowledgment}\n\n${supportOffer}\n\n${invitation}`;
  }

  /**
   * Processes a student message and generates AI response
   * @param {string} studentId - Student identifier
   * @param {string} message - Student's message
   * @param {Object} options - Message options (type, attachments, etc.)
   */
  async processMessage(studentId, message, options = {}) {
    const conversationId = this.studentContext.get(studentId);
    if (!conversationId) {
      throw new Error('No active conversation found for student');
    }

    const conversation = this.conversationHistory.get(conversationId);
    const studentProfile = digitalTwinService.getStudentProfile(studentId);

    // Add user message to conversation
    const userMessage = {
      id: this.generateMessageId(),
      role: 'user',
      content: message,
      timestamp: new Date(),
      type: options.type || 'text',
      attachments: options.attachments || []
    };

    conversation.messages.push(userMessage);
    conversation.metadata.totalMessages++;

    // Analyze message intent and generate appropriate response
    const responseData = await this.generateAIResponse(
      conversation,
      studentProfile,
      message,
      options
    );

    // Add AI response to conversation
    const aiMessage = {
      id: this.generateMessageId(),
      role: 'assistant',
      content: responseData.content,
      timestamp: new Date(),
      type: responseData.type,
      metadata: responseData.metadata
    };

    conversation.messages.push(aiMessage);
    conversation.lastActivity = new Date();

    // Update conversation metadata
    this.updateConversationMetadata(conversation, message, responseData);

    this.conversationHistory.set(conversationId, conversation);

    return {
      message: aiMessage,
      conversation: conversation
    };
  }

  /**
   * Generates AI response based on message context and student profile
   * @param {Object} conversation - Current conversation
   * @param {Object} studentProfile - Student profile
   * @param {string} message - User message
   * @param {Object} options - Message options
   */
  async generateAIResponse(conversation, studentProfile, message, options) {
    const messageIntent = this.analyzeMessageIntent(message);
    const conversationContext = this.buildConversationContext(conversation, studentProfile);

    // Check if OpenAI is available
    if (!isOpenAIAvailable()) {
      return this.generateFallbackResponse(messageIntent, message);
    }

    try {
      const response = await this.callOpenAIForResponse(
        messageIntent,
        conversationContext,
        message,
        options
      );

      return response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      const fallbackResponse = this.generateFallbackResponse(messageIntent, message);
      fallbackResponse.metadata.error = error.message;
      return fallbackResponse;
    }
  }

  /**
   * Analyzes the intent of a user message
   * @param {string} message - User message
   */
  analyzeMessageIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    const intents = {
      explanation: ['explain', 'what is', 'how does', 'why', 'help me understand'],
      question: ['?', 'can you', 'would you', 'is it true', 'do you know'],
      problem_solving: ['solve', 'calculate', 'find', 'compute', 'work out'],
      quiz_request: ['quiz', 'test', 'practice', 'questions', 'challenge'],
      concept_check: ['correct', 'right', 'wrong', 'check', 'verify'],
      clarification: ['confused', 'don\'t understand', 'unclear', 'lost'],
      encouragement: ['struggling', 'difficult', 'hard', 'frustrated', 'help'],
      summary: ['summarize', 'recap', 'review', 'overview', 'main points']
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent;
      }
    }

    return 'general';
  }

  /**
   * Builds context for OpenAI API call
   * @param {Object} conversation - Current conversation
   * @param {Object} studentProfile - Student profile
   */
  buildConversationContext(conversation, studentProfile) {
    const recentMessages = conversation.messages.slice(-6); // Last 6 messages for context
    
    return {
      studentInfo: {
        attentionLevel: studentProfile?.behaviorMetrics?.attentionLevel || 75,
        emotionalState: studentProfile?.behaviorMetrics?.emotionalState || 'neutral',
        performanceLevel: studentProfile?.performanceMetrics?.overallGrade || 75,
        learningStyle: studentProfile?.aiPersonalization?.preferredExplanationStyle || 'mixed',
        difficultyLevel: studentProfile?.aiPersonalization?.difficultyLevel || 'medium'
      },
      conversationInfo: {
        subject: conversation.context.subject,
        currentTopic: conversation.context.currentTopic,
        messageCount: conversation.metadata.totalMessages,
        topicsDiscussed: conversation.metadata.topicsDiscussed,
        recentMessages: recentMessages.map(msg => ({
          role: msg.role,
          content: msg.content.substring(0, 200), // Truncate for context
          type: msg.type
        }))
      }
    };
  }

  /**
   * Calls OpenAI API to generate response with improved error handling
   * @param {string} messageIntent - Detected message intent
   * @param {Object} context - Conversation context
   * @param {string} message - User message
   * @param {Object} options - Message options
   */
  async callOpenAIForResponse(messageIntent, context, message, options) {
    const systemPrompt = this.buildSystemPrompt(messageIntent, context);
    const userPrompt = this.buildUserPrompt(message, context, options);

    const response = await safeOpenAICall(
      (client) => client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          ...context.conversationInfo.recentMessages.filter(msg => msg.role !== 'system'),
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
      'AI response generation'
    );

    const aiResponse = response.choices[0].message.content;

    // Determine response type based on intent
    const responseType = this.determineResponseType(messageIntent, aiResponse);

    return {
      content: aiResponse,
      type: responseType,
      metadata: {
        intent: messageIntent,
        confidence: response.choices[0].finish_reason === 'stop' ? 0.9 : 0.7,
        model: 'gpt-4o',
        tokens: response.usage?.total_tokens || 0,
        source: 'openai'
      }
    };
  }

  /**
   * Builds system prompt based on intent and context
   * @param {string} messageIntent - Message intent
   * @param {Object} context - Conversation context
   */
  buildSystemPrompt(messageIntent, context) {
    const basePrompt = `You are an AI Learning Assistant helping a student with their studies. You are knowledgeable, patient, encouraging, and adaptive to the student's needs.

Student Context:
- Attention Level: ${context.studentInfo.attentionLevel}%
- Emotional State: ${context.studentInfo.emotionalState}
- Performance Level: ${context.studentInfo.performanceLevel}%
- Learning Style: ${context.studentInfo.learningStyle}
- Current Subject: ${context.conversationInfo.subject}
- Current Topic: ${context.conversationInfo.currentTopic}

Guidelines:
- Adapt your explanation style to the student's learning preference
- Consider their current emotional state and attention level
- Provide encouragement and support
- Break down complex concepts into understandable parts
- Use examples and analogies when helpful
- Ask follow-up questions to check understanding`;

    const intentSpecificPrompts = {
      explanation: "\n\nFocus on providing clear, step-by-step explanations. Use the student's preferred learning style.",
      problem_solving: "\n\nGuide the student through problem-solving steps. Don't just give the answer - help them understand the process.",
      quiz_request: "\n\nCreate appropriate quiz questions based on the current topic and difficulty level.",
      clarification: "\n\nBe extra patient and try alternative explanation approaches. The student is confused.",
      encouragement: "\n\nBe especially supportive and motivating. The student may be struggling.",
      summary: "\n\nProvide a concise but comprehensive summary of the key points."
    };

    return basePrompt + (intentSpecificPrompts[messageIntent] || '');
  }

  /**
   * Builds user prompt with message and context
   * @param {string} message - User message
   * @param {Object} context - Conversation context
   * @param {Object} options - Message options
   */
  buildUserPrompt(message, context, options) {
    let prompt = message;

    if (options.attachments && options.attachments.length > 0) {
      prompt += "\n\nNote: The student has attached files: " + 
                options.attachments.map(att => att.name).join(', ');
    }

    if (context.conversationInfo.currentTopic) {
      prompt += `\n\nCurrent learning topic: ${context.conversationInfo.currentTopic}`;
    }

    return prompt;
  }

  /**
   * Determines response type based on intent and content
   * @param {string} intent - Message intent
   * @param {string} response - AI response
   */
  determineResponseType(intent, response) {
    if (intent === 'quiz_request' || response.includes('Question:') || response.includes('Quiz:')) {
      return 'quiz';
    }
    if (intent === 'problem_solving' && (response.includes('Step') || response.includes('Solution:'))) {
      return 'solution';
    }
    if (intent === 'explanation' || response.length > 300) {
      return 'explanation';
    }
    return 'text';
  }

  /**
   * Generates fallback response when AI is unavailable
   * @param {string} intent - Message intent
   * @param {string} message - Original message
   */
  generateFallbackResponse(intent, message) {
    const fallbackResponses = {
      explanation: "I'd be happy to explain this concept! However, I'm having some technical difficulties right now. Could you try asking your question again, or I can provide some general guidance on the topic?",
      problem_solving: "I can help you solve this step by step. Let me break down the problem... Actually, I'm experiencing some technical issues. Could you rephrase your question or try again in a moment?",
      quiz_request: "I'd love to create a quiz for you! Unfortunately, I'm having some connectivity issues right now. In the meantime, you could try reviewing your notes or textbook for practice questions.",
      general: "Thank you for your message! I'm here to help with your learning, but I'm experiencing some technical difficulties. Please try asking your question again, and I'll do my best to assist you."
    };

    return {
      content: fallbackResponses[intent] || fallbackResponses.general,
      type: 'text',
      metadata: {
        fallback: true,
        intent: intent
      }
    };
  }

  /**
   * Updates conversation metadata based on the interaction
   * @param {Object} conversation - Conversation object
   * @param {string} userMessage - User's message
   * @param {Object} responseData - AI response data
   */
  updateConversationMetadata(conversation, userMessage, responseData) {
    // Extract topics mentioned in the conversation
    const topics = this.extractTopicsFromMessage(userMessage);
    topics.forEach(topic => {
      if (!conversation.metadata.topicsDiscussed.includes(topic)) {
        conversation.metadata.topicsDiscussed.push(topic);
      }
    });

    // Count help requests
    if (responseData.metadata.intent === 'clarification' || 
        responseData.metadata.intent === 'encouragement') {
      conversation.metadata.helpRequests++;
    }

    // Track concepts explained
    if (responseData.metadata.intent === 'explanation') {
      const concepts = this.extractConceptsFromResponse(responseData.content);
      conversation.metadata.conceptsExplained.push(...concepts);
    }
  }

  /**
   * Extracts topics from user message
   * @param {string} message - User message
   */
  extractTopicsFromMessage(message) {
    // Simple topic extraction (in real implementation, could use NLP)
    const subjects = ['math', 'mathematics', 'algebra', 'geometry', 'calculus', 
                     'physics', 'chemistry', 'biology', 'history', 'english', 
                     'literature', 'science', 'computer science', 'programming'];
    
    const topics = [];
    const lowerMessage = message.toLowerCase();
    
    subjects.forEach(subject => {
      if (lowerMessage.includes(subject)) {
        topics.push(subject);
      }
    });
    
    return topics;
  }

  /**
   * Extracts concepts from AI response
   * @param {string} response - AI response content
   */
  extractConceptsFromResponse(response) {
    // Simple concept extraction
    const concepts = [];
    const sentences = response.split('.');
    
    sentences.forEach(sentence => {
      if (sentence.length > 10 && sentence.length < 50) {
        concepts.push(sentence.trim());
      }
    });
    
    return concepts.slice(0, 3); // Limit to 3 concepts per response
  }

  /**
   * Gets conversation history for a student
   * @param {string} studentId - Student identifier
   * @param {number} limit - Number of recent messages to return
   */
  getConversationHistory(studentId, limit = 20) {
    const conversationId = this.studentContext.get(studentId);
    if (!conversationId) return null;

    const conversation = this.conversationHistory.get(conversationId);
    if (!conversation) return null;

    return {
      ...conversation,
      messages: conversation.messages.slice(-limit)
    };
  }

  /**
   * Ends current conversation session
   * @param {string} studentId - Student identifier
   */
  async endConversation(studentId) {
    const conversationId = this.studentContext.get(studentId);
    if (!conversationId) return null;

    const conversation = this.conversationHistory.get(conversationId);
    if (!conversation) return null;

    // Generate conversation summary
    const summary = await this.generateConversationSummary(conversation);
    
    conversation.endTime = new Date();
    conversation.summary = summary;
    conversation.status = 'completed';

    // Update student's learning history
    await this.updateStudentLearningHistory(studentId, conversation);

    this.studentContext.delete(studentId);

    return {
      conversationId,
      summary,
      duration: (conversation.endTime - conversation.startTime) / 1000 / 60, // minutes
      messageCount: conversation.metadata.totalMessages,
      topicsDiscussed: conversation.metadata.topicsDiscussed
    };
  }

  /**
   * Generates conversation summary
   * @param {Object} conversation - Conversation object
   */
  async generateConversationSummary(conversation) {
    if (conversation.messages.length < 3) {
      return {
        keyTopics: conversation.metadata.topicsDiscussed,
        conceptsLearned: conversation.metadata.conceptsExplained.slice(0, 5),
        helpAreas: [],
        overallProgress: 'minimal_interaction'
      };
    }

    try {
      let prompt = `
      Summarize this learning conversation between a student and AI assistant:
      
      Conversation Context:
      - Subject: ${conversation.context.subject}
      - Topic: ${conversation.context.currentTopic}
      - Message Count: ${conversation.metadata.totalMessages}
      - Duration: ${Math.round((new Date() - conversation.startTime) / 1000 / 60)} minutes
      
      Key Messages:
      ${conversation.messages.slice(-10).map(msg => `${msg.role}: ${msg.content.substring(0, 100)}...`).join('\n')}
      
      Provide a summary including:
      1. Main topics discussed
      2. Key concepts learned
      3. Areas where student needed help
      4. Overall learning progress assessment
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are an educational AI that creates concise learning session summaries.' },
          { role: 'user', content: prompt }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'conversation_summary',
            schema: {
              type: 'object',
              properties: {
                keyTopics: { type: 'array', items: { type: 'string' } },
                conceptsLearned: { type: 'array', items: { type: 'string' } },
                helpAreas: { type: 'array', items: { type: 'string' } },
                overallProgress: { type: 'string' }
              },
              required: ['keyTopics', 'conceptsLearned', 'helpAreas', 'overallProgress'],
              additionalProperties: false
            }
          }
        }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error generating conversation summary:', error);
      return {
        keyTopics: conversation.metadata.topicsDiscussed,
        conceptsLearned: conversation.metadata.conceptsExplained.slice(0, 5),
        helpAreas: ['Unable to analyze'],
        overallProgress: 'completed_session'
      };
    }
  }

  /**
   * Updates student's learning history with conversation data
   * @param {string} studentId - Student identifier
   * @param {Object} conversation - Completed conversation
   */
  async updateStudentLearningHistory(studentId, conversation) {
    // This would integrate with the digitalTwinService to update learning history
    const learningData = {
      sessionType: 'ai_assistant',
      subject: conversation.context.subject,
      topic: conversation.context.currentTopic,
      duration: (conversation.endTime - conversation.startTime) / 1000 / 60,
      interactions: conversation.metadata.totalMessages,
      topicsDiscussed: conversation.metadata.topicsDiscussed,
      conceptsLearned: conversation.metadata.conceptsExplained,
      helpRequests: conversation.metadata.helpRequests,
      summary: conversation.summary
    };

    try {
      await digitalTwinService.updatePerformanceMetrics(studentId, {
        aiAssistantSession: learningData
      });
    } catch (error) {
      console.error('Error updating student learning history:', error);
    }
  }

  /**
   * Generates unique conversation ID
   */
  generateConversationId() {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generates unique message ID
   */
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Streams AI response for real-time display
   * @param {string} studentId - Student identifier
   * @param {string} message - User message
   * @param {Function} onChunk - Callback for response chunks
   */
  async streamResponse(studentId, message, onChunk) {
    const conversationId = this.studentContext.get(studentId);
    if (!conversationId) {
      throw new Error('No active conversation found for student');
    }

    const conversation = this.conversationHistory.get(conversationId);
    const studentProfile = digitalTwinService.getStudentProfile(studentId);
    const context = this.buildConversationContext(conversation, studentProfile);
    const messageIntent = this.analyzeMessageIntent(message);

    try {
      const systemPrompt = this.buildSystemPrompt(messageIntent, context);
      const userPrompt = this.buildUserPrompt(message, context, {});

      const stream = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          ...context.conversationInfo.recentMessages.filter(msg => msg.role !== 'system'),
          { role: 'user', content: userPrompt }
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 500
      });

      let fullResponse = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullResponse += content;
          onChunk(content);
        }
      }

      // Add messages to conversation history after streaming is complete
      const userMessage = {
        id: this.generateMessageId(),
        role: 'user',
        content: message,
        timestamp: new Date(),
        type: 'text'
      };

      const aiMessage = {
        id: this.generateMessageId(),
        role: 'assistant',
        content: fullResponse,
        timestamp: new Date(),
        type: this.determineResponseType(messageIntent, fullResponse),
        metadata: { intent: messageIntent, streamed: true }
      };

      conversation.messages.push(userMessage, aiMessage);
      conversation.metadata.totalMessages += 2;
      conversation.lastActivity = new Date();

      this.updateConversationMetadata(conversation, message, {
        content: fullResponse,
        metadata: { intent: messageIntent }
      });

      this.conversationHistory.set(conversationId, conversation);

      return aiMessage;
    } catch (error) {
      console.error('Error in streaming response:', error);
      const fallback = this.generateFallbackResponse(messageIntent, message);
      onChunk(fallback.content);
      return fallback;
    }
  }
}

export default new AIAssistantService();