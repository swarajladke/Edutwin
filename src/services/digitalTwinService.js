import openai, { safeOpenAICall, isOpenAIAvailable } from './openaiClient';

/**
 * Digital Twin Service for student behavior analysis and personalization
 */
class DigitalTwinService {
  constructor() {
    this.studentProfiles = new Map();
    this.behaviorPatterns = new Map();
    this.performanceHistory = new Map();
  }

  /**
   * Creates or updates a student's digital twin profile
   * @param {string} studentId - Unique student identifier
   * @param {Object} profileData - Student profile information
   */
  async createStudentProfile(studentId, profileData) {
    const profile = {
      id: studentId,
      personalInfo: profileData.personalInfo || {},
      learningPreferences: profileData.learningPreferences || {},
      behaviorMetrics: {
        attentionLevel: 0,
        emotionalState: 'neutral',
        engagementLevel: 0,
        comprehensionRate: 0,
        lastUpdated: new Date()
      },
      performanceMetrics: {
        overallGrade: 0,
        subjectScores: {},
        conceptMastery: {},
        timeSpentPerTopic: {},
        quizResults: []
      },
      aiPersonalization: {
        preferredExplanationStyle: 'visual',
        difficultyLevel: 'medium',
        learningPath: [],
        recommendedResources: []
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.studentProfiles.set(studentId, profile);
    return profile;
  }

  /**
   * Updates student behavior metrics in real-time
   * @param {string} studentId - Student identifier
   * @param {Object} behaviorData - Real-time behavior data
   */
  async updateBehaviorMetrics(studentId, behaviorData) {
    const profile = this.studentProfiles.get(studentId);
    if (!profile) {
      throw new Error(`Student profile not found: ${studentId}`);
    }

    // Update behavior metrics
    profile.behaviorMetrics = {
      ...profile.behaviorMetrics,
      attentionLevel: behaviorData.attentionLevel || profile.behaviorMetrics.attentionLevel,
      emotionalState: behaviorData.emotionalState || profile.behaviorMetrics.emotionalState,
      engagementLevel: behaviorData.engagementLevel || profile.behaviorMetrics.engagementLevel,
      comprehensionRate: behaviorData.comprehensionRate || profile.behaviorMetrics.comprehensionRate,
      lastUpdated: new Date()
    };

    // Store behavior pattern history
    const behaviorHistory = this.behaviorPatterns.get(studentId) || [];
    behaviorHistory.push({
      ...behaviorData,
      timestamp: new Date()
    });
    this.behaviorPatterns.set(studentId, behaviorHistory);

    profile.updatedAt = new Date();
    this.studentProfiles.set(studentId, profile);

    // Trigger AI personalization update
    await this.updatePersonalization(studentId);

    return profile;
  }

  /**
   * Updates student performance data
   * @param {string} studentId - Student identifier
   * @param {Object} performanceData - Performance metrics
   */
  async updatePerformanceMetrics(studentId, performanceData) {
    const profile = this.studentProfiles.get(studentId);
    if (!profile) {
      throw new Error(`Student profile not found: ${studentId}`);
    }

    // Update performance metrics
    if (performanceData.quizResult) {
      profile.performanceMetrics.quizResults.push({
        ...performanceData.quizResult,
        timestamp: new Date()
      });
    }

    if (performanceData.subjectScore) {
      profile.performanceMetrics.subjectScores = {
        ...profile.performanceMetrics.subjectScores,
        [performanceData.subjectScore.subject]: performanceData.subjectScore.score
      };
    }

    if (performanceData.conceptMastery) {
      profile.performanceMetrics.conceptMastery = {
        ...profile.performanceMetrics.conceptMastery,
        [performanceData.conceptMastery.concept]: performanceData.conceptMastery.level
      };
    }

    if (performanceData.timeSpent) {
      profile.performanceMetrics.timeSpentPerTopic = {
        ...profile.performanceMetrics.timeSpentPerTopic,
        [performanceData.timeSpent.topic]: (profile.performanceMetrics.timeSpentPerTopic[performanceData.timeSpent.topic] || 0) + performanceData.timeSpent.duration
      };
    }

    // Store performance history
    const performanceHistory = this.performanceHistory.get(studentId) || [];
    performanceHistory.push({
      ...performanceData,
      timestamp: new Date()
    });
    this.performanceHistory.set(studentId, performanceHistory);

    profile.updatedAt = new Date();
    this.studentProfiles.set(studentId, profile);

    // Trigger AI personalization update
    await this.updatePersonalization(studentId);

    return profile;
  }

  /**
   * Updates AI-driven personalization based on student data
   * @param {string} studentId - Student identifier
   */
  async updatePersonalization(studentId) {
    const profile = this.studentProfiles.get(studentId);
    if (!profile) return;

    const behaviorHistory = this.behaviorPatterns.get(studentId) || [];
    const performanceHistory = this.performanceHistory.get(studentId) || [];

    try {
      // Generate personalized learning recommendations using OpenAI
      const personalizedRecommendations = await this.generatePersonalizedRecommendations(
        profile,
        behaviorHistory,
        performanceHistory
      );

      profile.aiPersonalization = {
        ...profile.aiPersonalization,
        ...personalizedRecommendations,
        lastUpdated: new Date()
      };

      this.studentProfiles.set(studentId, profile);
    } catch (error) {
      console.error('Error updating personalization:', error);
    }
  }

  /**
   * Generates personalized learning recommendations using OpenAI with error handling
   * @param {Object} profile - Student profile
   * @param {Array} behaviorHistory - Behavior pattern history
   * @param {Array} performanceHistory - Performance history
   */
  async generatePersonalizedRecommendations(profile, behaviorHistory, performanceHistory) {
    // Return basic recommendations if OpenAI is not available
    if (!isOpenAIAvailable()) {
      return this.generateFallbackRecommendations(profile, behaviorHistory);
    }

    try {
      const prompt = `
      As an AI education specialist, analyze this student's digital twin data and provide personalized learning recommendations:
      
      Student Profile:
      - Attention Level: ${profile.behaviorMetrics.attentionLevel}%
      - Emotional State: ${profile.behaviorMetrics.emotionalState}
      - Engagement Level: ${profile.behaviorMetrics.engagementLevel}%
      - Comprehension Rate: ${profile.behaviorMetrics.comprehensionRate}%
      
      Recent Performance:
      - Overall Grade: ${profile.performanceMetrics.overallGrade}
      - Recent Quiz Results: ${profile.performanceMetrics.quizResults.slice(-3).map(q => q.score).join(', ')}
      
      Behavior Patterns (last 5 sessions):
      ${behaviorHistory.slice(-5).map(b => `- Attention: ${b.attentionLevel}%, Emotion: ${b.emotionalState}, Engagement: ${b.engagementLevel}%`).join('\n')}
      
      Please provide recommendations for:
      1. Preferred explanation style (visual, auditory, kinesthetic, reading)
      2. Optimal difficulty level (easy, medium, hard)
      3. Learning path suggestions
      4. Specific intervention strategies
      `;

      const response = await safeOpenAICall(
        (client) => client.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are an expert educational AI that provides personalized learning recommendations based on student digital twin data.' },
            { role: 'user', content: prompt }
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'personalization_recommendations',
              schema: {
                type: 'object',
                properties: {
                  preferredExplanationStyle: { type: 'string' },
                  difficultyLevel: { type: 'string' },
                  learningPath: { type: 'array', items: { type: 'string' } },
                  interventionStrategies: { type: 'array', items: { type: 'string' } },
                  recommendedResources: { type: 'array', items: { type: 'string' } }
                },
                required: ['preferredExplanationStyle', 'difficultyLevel', 'learningPath', 'interventionStrategies', 'recommendedResources'],
                additionalProperties: false
              }
            }
          }
        }),
        'personalized recommendations generation'
      );

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error generating personalized recommendations:', error);
      return this.generateFallbackRecommendations(profile, behaviorHistory);
    }
  }

  /**
   * Generates fallback recommendations when AI is unavailable
   * @param {Object} profile - Student profile
   * @param {Array} behaviorHistory - Behavior history
   */
  generateFallbackRecommendations(profile, behaviorHistory) {
    const attentionLevel = profile.behaviorMetrics.attentionLevel || 75;
    const emotionalState = profile.behaviorMetrics.emotionalState || 'neutral';
    const performanceGrade = profile.performanceMetrics.overallGrade || 75;

    // Determine explanation style based on current metrics
    let preferredExplanationStyle = 'mixed';
    if (attentionLevel < 60) {
      preferredExplanationStyle = 'visual'; // Visual aids help with low attention
    } else if (performanceGrade > 85) {
      preferredExplanationStyle = 'reading'; // High performers often prefer text
    } else {
      preferredExplanationStyle = 'interactive'; // Default for most students
    }

    // Determine difficulty level
    let difficultyLevel = 'medium';
    if (performanceGrade > 85 && attentionLevel > 80) {
      difficultyLevel = 'hard';
    } else if (performanceGrade < 65 || emotionalState === 'frustrated') {
      difficultyLevel = 'easy';
    }

    // Generate learning path based on current state
    const learningPath = [];
    if (performanceGrade < 70) {
      learningPath.push('Review fundamental concepts');
      learningPath.push('Practice basic skills');
      learningPath.push('Build confidence with easier problems');
    } else {
      learningPath.push('Reinforce current knowledge');
      learningPath.push('Introduce new concepts gradually');
      learningPath.push('Apply knowledge to complex problems');
    }

    // Intervention strategies based on emotional state and performance
    const interventionStrategies = [];
    if (emotionalState === 'frustrated' || attentionLevel < 50) {
      interventionStrategies.push('Provide frequent breaks');
      interventionStrategies.push('Use positive reinforcement');
      interventionStrategies.push('Simplify explanations');
    } else if (attentionLevel > 85) {
      interventionStrategies.push('Increase challenge level');
      interventionStrategies.push('Provide enrichment activities');
    } else {
      interventionStrategies.push('Maintain steady pace');
      interventionStrategies.push('Check understanding regularly');
    }

    const recommendedResources = [
      'Interactive practice exercises',
      'Video explanations',
      'Step-by-step tutorials',
      'Progress tracking tools'
    ];

    return {
      preferredExplanationStyle,
      difficultyLevel,
      learningPath,
      interventionStrategies,
      recommendedResources
    };
  }

  /**
   * Gets student's digital twin profile
   * @param {string} studentId - Student identifier
   */
  getStudentProfile(studentId) {
    return this.studentProfiles.get(studentId);
  }

  /**
   * Gets behavior analysis for a student
   * @param {string} studentId - Student identifier
   * @param {number} days - Number of days to analyze
   */
  getBehaviorAnalysis(studentId, days = 7) {
    const behaviorHistory = this.behaviorPatterns.get(studentId) || [];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const recentBehavior = behaviorHistory.filter(b => b.timestamp >= cutoffDate);

    if (recentBehavior.length === 0) {
      return {
        averageAttention: 0,
        dominantEmotion: 'neutral',
        averageEngagement: 0,
        trendAnalysis: 'insufficient data'
      };
    }

    const averageAttention = recentBehavior.reduce((sum, b) => sum + (b.attentionLevel || 0), 0) / recentBehavior.length;
    const averageEngagement = recentBehavior.reduce((sum, b) => sum + (b.engagementLevel || 0), 0) / recentBehavior.length;

    const emotionCounts = recentBehavior.reduce((counts, b) => {
      counts[b.emotionalState] = (counts[b.emotionalState] || 0) + 1;
      return counts;
    }, {});

    const dominantEmotion = Object.keys(emotionCounts).reduce((a, b) => 
      emotionCounts[a] > emotionCounts[b] ? a : b
    );

    return {
      averageAttention: Math.round(averageAttention),
      dominantEmotion,
      averageEngagement: Math.round(averageEngagement),
      trendAnalysis: this.analyzeTrends(recentBehavior),
      totalSessions: recentBehavior.length
    };
  }

  /**
   * Analyzes behavioral trends
   * @param {Array} behaviorData - Behavior data array
   */
  analyzeTrends(behaviorData) {
    if (behaviorData.length < 3) return 'insufficient data';

    const recent = behaviorData.slice(-3);
    const earlier = behaviorData.slice(0, 3);

    const recentAvgAttention = recent.reduce((sum, b) => sum + (b.attentionLevel || 0), 0) / recent.length;
    const earlierAvgAttention = earlier.reduce((sum, b) => sum + (b.attentionLevel || 0), 0) / earlier.length;

    const attentionDiff = recentAvgAttention - earlierAvgAttention;

    if (attentionDiff > 10) return 'improving attention';
    if (attentionDiff < -10) return 'declining attention';
    return 'stable attention';
  }

  /**
   * Gets at-risk students based on digital twin analysis
   */
  getAtRiskStudents() {
    const atRiskStudents = [];

    for (const [studentId, profile] of this.studentProfiles) {
      const behaviorAnalysis = this.getBehaviorAnalysis(studentId);
      const isAtRisk = 
        behaviorAnalysis.averageAttention < 60 ||
        behaviorAnalysis.averageEngagement < 50 ||
        profile.performanceMetrics.overallGrade < 70 ||
        behaviorAnalysis.dominantEmotion === 'frustrated' ||
        behaviorAnalysis.dominantEmotion === 'confused';

      if (isAtRisk) {
        atRiskStudents.push({
          studentId,
          profile,
          behaviorAnalysis,
          riskFactors: this.identifyRiskFactors(profile, behaviorAnalysis)
        });
      }
    }

    return atRiskStudents;
  }

  /**
   * Identifies specific risk factors for a student
   * @param {Object} profile - Student profile
   * @param {Object} behaviorAnalysis - Behavior analysis
   */
  identifyRiskFactors(profile, behaviorAnalysis) {
    const riskFactors = [];

    if (behaviorAnalysis.averageAttention < 60) {
      riskFactors.push('Low attention level');
    }
    if (behaviorAnalysis.averageEngagement < 50) {
      riskFactors.push('Low engagement');
    }
    if (profile.performanceMetrics.overallGrade < 70) {
      riskFactors.push('Poor academic performance');
    }
    if (behaviorAnalysis.dominantEmotion === 'frustrated') {
      riskFactors.push('Frequent frustration');
    }
    if (behaviorAnalysis.dominantEmotion === 'confused') {
      riskFactors.push('Frequent confusion');
    }
    if (behaviorAnalysis.trendAnalysis === 'declining attention') {
      riskFactors.push('Declining attention trend');
    }

    return riskFactors;
  }
}

export default new DigitalTwinService();