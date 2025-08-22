import openai, { safeOpenAICall, isOpenAIAvailable } from './openaiClient';
import digitalTwinService from './digitalTwinService';

/**
 * AI-Powered Personalization Engine
 * Provides adaptive learning paths, content recommendations, and curriculum adaptation
 */
class AIPersonalizationService {
  constructor() {
    this.learningPaths = new Map();
    this.contentRecommendations = new Map();
    this.adaptationHistory = new Map();
  }

  /**
   * Generates adaptive learning path based on student's digital twin
   * @param {string} studentId - Student identifier
   * @param {string} subject - Subject area
   * @param {Object} goals - Learning goals and preferences
   */
  async generateAdaptiveLearningPath(studentId, subject, goals = {}) {
    const studentProfile = digitalTwinService.getStudentProfile(studentId);
    if (!studentProfile) {
      throw new Error(`Student profile not found: ${studentId}`);
    }

    const behaviorAnalysis = digitalTwinService.getBehaviorAnalysis(studentId);
    
    try {
      const learningPath = await this.createPersonalizedPath(
        studentProfile,
        behaviorAnalysis,
        subject,
        goals
      );

      // Store the generated path
      const pathKey = `${studentId}_${subject}`;
      this.learningPaths.set(pathKey, {
        ...learningPath,
        createdAt: new Date(),
        studentId,
        subject
      });

      return learningPath;
    } catch (error) {
      console.error('Error generating adaptive learning path:', error);
      return this.generateFallbackLearningPath(subject, goals);
    }
  }

  /**
   * Creates personalized learning path using OpenAI with enhanced error handling
   * @param {Object} studentProfile - Student's digital twin profile
   * @param {Object} behaviorAnalysis - Behavior analysis data
   * @param {string} subject - Subject area
   * @param {Object} goals - Learning goals
   */
  async createPersonalizedPath(studentProfile, behaviorAnalysis, subject, goals) {
    // Use fallback if OpenAI is not available
    if (!isOpenAIAvailable()) {
      console.warn('OpenAI not available, using fallback learning path generation');
      return this.generateFallbackLearningPath(subject, goals);
    }

    try {
      const prompt = `
      Create a personalized learning path for a student based on their digital twin profile:
      
      Student Profile:
      - Learning Preferences: ${JSON.stringify(studentProfile.learningPreferences)}
      - Current Performance: ${studentProfile.performanceMetrics.overallGrade}%
      - Attention Level: ${behaviorAnalysis.averageAttention}%
      - Engagement Level: ${behaviorAnalysis.averageEngagement}%
      - Dominant Emotion: ${behaviorAnalysis.dominantEmotion}
      - Behavior Trend: ${behaviorAnalysis.trendAnalysis}
      - Preferred Explanation Style: ${studentProfile.aiPersonalization.preferredExplanationStyle}
      - Current Difficulty Level: ${studentProfile.aiPersonalization.difficultyLevel}
      
      Subject: ${subject}
      Learning Goals: ${JSON.stringify(goals)}
      
      Create a comprehensive learning path that includes:
      1. Sequence of topics/concepts to learn
      2. Recommended learning activities for each topic
      3. Assessment methods
      4. Time allocation suggestions
      5. Difficulty progression
      6. Adaptation triggers (when to adjust difficulty/approach)
      7. Resource recommendations
      8. Intervention points for support
      `;

      const response = await safeOpenAICall(
        (client) => client.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are an expert educational AI that creates personalized learning paths based on student data and learning science principles.' },
            { role: 'user', content: prompt }
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'adaptive_learning_path',
              schema: {
                type: 'object',
                properties: {
                  pathId: { type: 'string' },
                  topics: { 
                    type: 'array', 
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        difficulty: { type: 'string' },
                        estimatedTime: { type: 'number' },
                        prerequisites: { type: 'array', items: { type: 'string' } },
                        activities: { type: 'array', items: { type: 'string' } },
                        assessments: { type: 'array', items: { type: 'string' } }
                      }
                    }
                  },
                  overallDifficulty: { type: 'string' },
                  totalEstimatedHours: { type: 'number' },
                  adaptationTriggers: { type: 'array', items: { type: 'string' } },
                  resourceRecommendations: { type: 'array', items: { type: 'string' } },
                  interventionPoints: { type: 'array', items: { type: 'string' } }
                },
                required: ['pathId', 'topics', 'overallDifficulty', 'totalEstimatedHours', 'adaptationTriggers', 'resourceRecommendations', 'interventionPoints'],
                additionalProperties: false
              }
            }
          }
        }),
        'personalized learning path creation'
      );

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error creating personalized learning path:', error);
      return this.generateFallbackLearningPath(subject, goals);
    }
  }

  /**
   * Generates fallback learning path when AI is unavailable
   * @param {string} subject - Subject area
   * @param {Object} goals - Learning goals
   */
  generateFallbackLearningPath(subject, goals) {
    const commonPaths = {
      'Mathematics': {
        pathId: `math_basic_${Date.now()}`,
        topics: [
          {
            id: 'math_001',
            title: 'Basic Arithmetic',
            description: 'Fundamental operations: addition, subtraction, multiplication, division',
            difficulty: 'easy',
            estimatedTime: 2,
            prerequisites: [],
            activities: ['Practice problems', 'Interactive exercises', 'Real-world applications'],
            assessments: ['Quick quiz', 'Problem-solving tasks']
          },
          {
            id: 'math_002',
            title: 'Fractions and Decimals',
            description: 'Understanding and working with fractions and decimal numbers',
            difficulty: 'medium',
            estimatedTime: 3,
            prerequisites: ['math_001'],
            activities: ['Visual fraction models', 'Decimal conversion practice', 'Word problems'],
            assessments: ['Fraction quiz', 'Decimal calculations']
          }
        ],
        overallDifficulty: 'medium',
        totalEstimatedHours: 5,
        adaptationTriggers: ['Low quiz scores', 'Decreased attention', 'Frustration indicators'],
        resourceRecommendations: ['Khan Academy videos', 'Interactive math games', 'Practice worksheets'],
        interventionPoints: ['After each topic assessment', 'When attention drops below 60%']
      }
    };

    return commonPaths[subject] || commonPaths['Mathematics'];
  }

  /**
   * Provides real-time content recommendations during learning
   * @param {string} studentId - Student identifier
   * @param {string} currentTopic - Current topic being studied
   * @param {Object} currentContext - Current learning context
   */
  async getContentRecommendations(studentId, currentTopic, currentContext = {}) {
    const studentProfile = digitalTwinService.getStudentProfile(studentId);
    if (!studentProfile) {
      throw new Error(`Student profile not found: ${studentId}`);
    }

    try {
      const recommendations = await this.generateContentRecommendations(
        studentProfile,
        currentTopic,
        currentContext
      );

      // Cache recommendations
      const cacheKey = `${studentId}_${currentTopic}`;
      this.contentRecommendations.set(cacheKey, {
        ...recommendations,
        timestamp: new Date(),
        context: currentContext
      });

      return recommendations;
    } catch (error) {
      console.error('Error getting content recommendations:', error);
      return this.getFallbackRecommendations(currentTopic);
    }
  }

  /**
   * Generates AI-powered content recommendations with error handling
   * @param {Object} studentProfile - Student profile
   * @param {string} currentTopic - Current topic
   * @param {Object} currentContext - Learning context
   */
  async generateContentRecommendations(studentProfile, currentTopic, currentContext) {
    if (!isOpenAIAvailable()) {
      console.warn('OpenAI not available, using fallback content recommendations');
      return this.getFallbackRecommendations(currentTopic);
    }

    try {
      const prompt = `
      Provide personalized content recommendations for a student currently learning about "${currentTopic}":
      
      Student Context:
      - Attention Level: ${studentProfile.behaviorMetrics.attentionLevel}%
      - Emotional State: ${studentProfile.behaviorMetrics.emotionalState}
      - Comprehension Rate: ${studentProfile.behaviorMetrics.comprehensionRate}%
      - Preferred Learning Style: ${studentProfile.aiPersonalization.preferredExplanationStyle}
      - Difficulty Level: ${studentProfile.aiPersonalization.difficultyLevel}
      
      Current Learning Context:
      - Time Spent on Topic: ${currentContext.timeSpent || 0} minutes
      - Quiz Attempts: ${currentContext.quizAttempts || 0}
      - Last Quiz Score: ${currentContext.lastQuizScore || 'N/A'}
      - Struggling Areas: ${JSON.stringify(currentContext.strugglingAreas || [])}
      
      Performance History:
      - Overall Grade: ${studentProfile.performanceMetrics.overallGrade}%
      - Subject Scores: ${JSON.stringify(studentProfile.performanceMetrics.subjectScores)}
      
      Provide recommendations for:
      1. Alternative explanation approaches
      2. Supplementary resources
      3. Practice activities
      4. Assessment modifications
      5. Break recommendations
      6. Motivation strategies
      `;

      const response = await safeOpenAICall(
        (client) => client.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are an adaptive learning system that provides real-time content recommendations to optimize student learning experiences.' },
            { role: 'user', content: prompt }
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'content_recommendations',
              schema: {
                type: 'object',
                properties: {
                  alternativeExplanations: { type: 'array', items: { type: 'string' } },
                  supplementaryResources: { type: 'array', items: { type: 'string' } },
                  practiceActivities: { type: 'array', items: { type: 'string' } },
                  assessmentModifications: { type: 'array', items: { type: 'string' } },
                  breakRecommendations: { type: 'array', items: { type: 'string' } },
                  motivationStrategies: { type: 'array', items: { type: 'string' } },
                  priorityLevel: { type: 'string' },
                  confidenceScore: { type: 'number' }
                },
                required: ['alternativeExplanations', 'supplementaryResources', 'practiceActivities', 'assessmentModifications', 'breakRecommendations', 'motivationStrategies', 'priorityLevel', 'confidenceScore'],
                additionalProperties: false
              }
            }
          }
        }),
        'content recommendations generation'
      );

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error generating content recommendations:', error);
      return this.getFallbackRecommendations(currentTopic);
    }
  }

  /**
   * Provides fallback recommendations when AI is unavailable
   * @param {string} currentTopic - Current topic
   */
  getFallbackRecommendations(currentTopic) {
    return {
      alternativeExplanations: [
        'Try visual diagrams and charts',
        'Use real-world examples and analogies',
        'Break down into smaller steps'
      ],
      supplementaryResources: [
        'Educational videos on the topic',
        'Interactive simulations',
        'Additional reading materials'
      ],
      practiceActivities: [
        'Complete practice problems',
        'Try interactive exercises',
        'Discuss with study group'
      ],
      assessmentModifications: [
        'Provide more time for completion',
        'Offer hint system',
        'Allow multiple attempts'
      ],
      breakRecommendations: [
        'Take a 5-minute break',
        'Do some light stretching',
        'Practice deep breathing'
      ],
      motivationStrategies: [
        'Celebrate small wins',
        'Set achievable goals',
        'Track progress visually'
      ],
      priorityLevel: 'medium',
      confidenceScore: 0.7
    };
  }

  /**
   * Adapts curriculum difficulty based on real-time performance
   * @param {string} studentId - Student identifier
   * @param {Object} performanceData - Recent performance data
   */
  async adaptCurriculumDifficulty(studentId, performanceData) {
    const studentProfile = digitalTwinService.getStudentProfile(studentId);
    if (!studentProfile) {
      throw new Error(`Student profile not found: ${studentId}`);
    }

    const adaptationDecision = await this.makeAdaptationDecision(
      studentProfile,
      performanceData
    );

    // Record adaptation history
    const adaptationEntry = {
      timestamp: new Date(),
      studentId,
      previousDifficulty: studentProfile.aiPersonalization.difficultyLevel,
      newDifficulty: adaptationDecision.newDifficulty,
      reason: adaptationDecision.reason,
      performanceData,
      confidenceScore: adaptationDecision.confidenceScore
    };

    const history = this.adaptationHistory.get(studentId) || [];
    history.push(adaptationEntry);
    this.adaptationHistory.set(studentId, history);

    // Update student profile
    await digitalTwinService.updatePerformanceMetrics(studentId, {
      difficultyAdaptation: adaptationEntry
    });

    return adaptationDecision;
  }

  /**
   * Makes curriculum adaptation decisions using AI
   * @param {Object} studentProfile - Student profile
   * @param {Object} performanceData - Performance data
   */
  async makeAdaptationDecision(studentProfile, performanceData) {
    try {
      const prompt = `
      Analyze student performance and recommend curriculum difficulty adaptation:
      
      Current Student State:
      - Current Difficulty Level: ${studentProfile.aiPersonalization.difficultyLevel}
      - Overall Grade: ${studentProfile.performanceMetrics.overallGrade}%
      - Attention Level: ${studentProfile.behaviorMetrics.attentionLevel}%
      - Emotional State: ${studentProfile.behaviorMetrics.emotionalState}
      - Comprehension Rate: ${studentProfile.behaviorMetrics.comprehensionRate}%
      
      Recent Performance:
      - Quiz Scores: ${JSON.stringify(performanceData.recentQuizScores || [])}
      - Time Spent Learning: ${performanceData.timeSpent || 0} minutes
      - Concept Mastery: ${JSON.stringify(performanceData.conceptMastery || {})}
      - Error Patterns: ${JSON.stringify(performanceData.errorPatterns || [])}
      - Help Requests: ${performanceData.helpRequests || 0}
      
      Determine if difficulty should be:
      1. Increased (if student is performing very well with minimal challenge)
      2. Decreased (if student is struggling significantly)
      3. Maintained (if current level is appropriate)
      
      Consider both immediate performance and longer-term learning goals.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are an adaptive learning algorithm that makes intelligent decisions about curriculum difficulty based on student performance data.' },
          { role: 'user', content: prompt }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'adaptation_decision',
            schema: {
              type: 'object',
              properties: {
                newDifficulty: { type: 'string' },
                adaptationType: { type: 'string' },
                reason: { type: 'string' },
                confidenceScore: { type: 'number' },
                recommendedActions: { type: 'array', items: { type: 'string' } },
                monitoringPoints: { type: 'array', items: { type: 'string' } }
              },
              required: ['newDifficulty', 'adaptationType', 'reason', 'confidenceScore', 'recommendedActions', 'monitoringPoints'],
              additionalProperties: false
            }
          }
        }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error in adaptation decision:', error);
      return this.makeFallbackAdaptationDecision(studentProfile, performanceData);
    }
  }

  /**
   * Makes fallback adaptation decision without AI
   * @param {Object} studentProfile - Student profile
   * @param {Object} performanceData - Performance data
   */
  makeFallbackAdaptationDecision(studentProfile, performanceData) {
    const currentDifficulty = studentProfile.aiPersonalization.difficultyLevel;
    const averageScore = performanceData.recentQuizScores ? 
      performanceData.recentQuizScores.reduce((sum, score) => sum + score, 0) / performanceData.recentQuizScores.length : 
      studentProfile.performanceMetrics.overallGrade;

    let newDifficulty = currentDifficulty;
    let adaptationType = 'maintain';
    let reason = 'Performance within acceptable range';

    if (averageScore > 90 && studentProfile.behaviorMetrics.attentionLevel > 80) {
      newDifficulty = currentDifficulty === 'easy' ? 'medium' : currentDifficulty === 'medium' ? 'hard' : 'hard';
      adaptationType = 'increase';
      reason = 'Excellent performance indicates readiness for higher difficulty';
    } else if (averageScore < 60 || studentProfile.behaviorMetrics.emotionalState === 'frustrated') {
      newDifficulty = currentDifficulty === 'hard' ? 'medium' : currentDifficulty === 'medium' ? 'easy' : 'easy';
      adaptationType = 'decrease';
      reason = 'Struggling performance requires easier content for confidence building';
    }

    return {
      newDifficulty,
      adaptationType,
      reason,
      confidenceScore: 0.7,
      recommendedActions: ['Monitor progress closely', 'Provide additional support if needed'],
      monitoringPoints: ['Next quiz performance', 'Attention level changes', 'Emotional state updates']
    };
  }

  /**
   * Gets personalized feedback based on student's current state
   * @param {string} studentId - Student identifier
   * @param {Object} activityData - Current activity data
   */
  async getPersonalizedFeedback(studentId, activityData) {
    const studentProfile = digitalTwinService.getStudentProfile(studentId);
    if (!studentProfile) {
      throw new Error(`Student profile not found: ${studentId}`);
    }

    try {
      const feedback = await this.generatePersonalizedFeedback(studentProfile, activityData);
      return feedback;
    } catch (error) {
      console.error('Error generating personalized feedback:', error);
      return this.getFallbackFeedback(activityData);
    }
  }

  /**
   * Generates AI-powered personalized feedback
   * @param {Object} studentProfile - Student profile
   * @param {Object} activityData - Activity data
   */
  async generatePersonalizedFeedback(studentProfile, activityData) {
    const prompt = `
    Generate personalized feedback for a student based on their learning activity:
    
    Student Profile:
    - Learning Style: ${studentProfile.aiPersonalization.preferredExplanationStyle}
    - Current Emotional State: ${studentProfile.behaviorMetrics.emotionalState}
    - Attention Level: ${studentProfile.behaviorMetrics.attentionLevel}%
    - Overall Performance: ${studentProfile.performanceMetrics.overallGrade}%
    
    Activity Data:
    - Activity Type: ${activityData.type}
    - Score/Result: ${activityData.score || 'N/A'}
    - Time Taken: ${activityData.timeSpent || 0} minutes
    - Attempts: ${activityData.attempts || 1}
    - Correct Answers: ${activityData.correctAnswers || 0}
    - Total Questions: ${activityData.totalQuestions || 0}
    - Mistakes Made: ${JSON.stringify(activityData.mistakes || [])}
    
    Provide encouraging, specific, and actionable feedback that:
    1. Acknowledges the student's effort
    2. Highlights strengths
    3. Addresses areas for improvement
    4. Provides specific next steps
    5. Maintains motivation
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a supportive educational AI that provides personalized, encouraging feedback to help students learn and grow.' },
        { role: 'user', content: prompt }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'personalized_feedback',
          schema: {
            type: 'object',
            properties: {
              encouragement: { type: 'string' },
              strengths: { type: 'array', items: { type: 'string' } },
              improvements: { type: 'array', items: { type: 'string' } },
              nextSteps: { type: 'array', items: { type: 'string' } },
              motivationalMessage: { type: 'string' },
              tone: { type: 'string' }
            },
            required: ['encouragement', 'strengths', 'improvements', 'nextSteps', 'motivationalMessage', 'tone'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Provides fallback feedback when AI is unavailable
   * @param {Object} activityData - Activity data
   */
  getFallbackFeedback(activityData) {
    const score = activityData.score || 0;
    const isGoodPerformance = score >= 80;
    const isMediumPerformance = score >= 60;

    return {
      encouragement: isGoodPerformance 
        ? "Great work! You're making excellent progress." 
        : isMediumPerformance 
        ? "Good effort! You're on the right track."
        : "Keep trying! Learning takes practice and persistence.",
      strengths: isGoodPerformance 
        ? ["Strong understanding of concepts", "Consistent performance"]
        : ["Willingness to learn", "Effort and persistence"],
      improvements: isGoodPerformance 
        ? ["Continue practicing to maintain skills"]
        : ["Review challenging concepts", "Practice more problems"],
      nextSteps: [
        "Review any incorrect answers",
        "Practice similar problems",
        "Ask for help if needed"
      ],
      motivationalMessage: "Every step forward is progress. Keep learning!",
      tone: "encouraging"
    };
  }

  /**
   * Gets adaptation history for a student
   * @param {string} studentId - Student identifier
   * @param {number} limit - Maximum number of adaptations to return
   */
  getAdaptationHistory(studentId, limit = 10) {
    const history = this.adaptationHistory.get(studentId) || [];
    return history.slice(-limit);
  }

  /**
   * Gets cached learning path for student and subject
   * @param {string} studentId - Student identifier
   * @param {string} subject - Subject area
   */
  getCachedLearningPath(studentId, subject) {
    const pathKey = `${studentId}_${subject}`;
    return this.learningPaths.get(pathKey);
  }

  /**
   * Gets cached content recommendations
   * @param {string} studentId - Student identifier
   * @param {string} currentTopic - Current topic
   */
  getCachedContentRecommendations(studentId, currentTopic) {
    const cacheKey = `${studentId}_${currentTopic}`;
    const cached = this.contentRecommendations.get(cacheKey);
    
    // Check if cache is still valid (within 30 minutes)
    if (cached && (new Date() - cached.timestamp) < 30 * 60 * 1000) {
      return cached;
    }
    
    return null;
  }
}

export default new AIPersonalizationService();