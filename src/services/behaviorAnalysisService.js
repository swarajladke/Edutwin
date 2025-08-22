import openai from './openaiClient';

/**
 * Behavior and Emotion Analysis Service
 * Simulates computer vision and emotion detection capabilities
 */
class BehaviorAnalysisService {
  constructor() {
    this.isAnalyzing = false;
    this.currentSession = null;
    this.analysisHistory = new Map();
  }

  /**
   * Starts behavior analysis session for a student
   * @param {string} studentId - Student identifier
   * @param {Object} sessionConfig - Session configuration
   */
  async startAnalysis(studentId, sessionConfig = {}) {
    if (this.isAnalyzing) {
      throw new Error('Analysis session already in progress');
    }

    this.isAnalyzing = true;
    this.currentSession = {
      studentId,
      startTime: new Date(),
      config: {
        attentionTracking: sessionConfig.attentionTracking ?? true,
        emotionDetection: sessionConfig.emotionDetection ?? true,
        engagementMonitoring: sessionConfig.engagementMonitoring ?? true,
        intervalMs: sessionConfig.intervalMs ?? 5000 // 5 seconds
      },
      data: []
    };

    // Start continuous monitoring
    this.startContinuousMonitoring();
    
    return {
      sessionId: this.generateSessionId(),
      status: 'started',
      studentId,
      startTime: this.currentSession.startTime
    };
  }

  /**
   * Generates a unique session ID
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Starts continuous behavior monitoring
   */
  startContinuousMonitoring() {
    if (!this.currentSession) return;

    const monitoringInterval = setInterval(() => {
      if (!this.isAnalyzing || !this.currentSession) {
        clearInterval(monitoringInterval);
        return;
      }

      this.captureAndAnalyzeBehavior();
    }, this.currentSession.config.intervalMs);
  }

  /**
   * Captures and analyzes current behavior data
   * Simulates real computer vision and emotion detection
   */
  async captureAndAnalyzeBehavior() {
    if (!this.currentSession) return;

    try {
      // Simulate behavior data capture (in real implementation, this would use webcam/sensors)
      const behaviorData = this.simulateBehaviorCapture();
      
      // Analyze behavior patterns using AI
      const analysis = await this.analyzeBehaviorPatterns(behaviorData);
      
      // Store the analysis data
      const analysisEntry = {
        timestamp: new Date(),
        rawData: behaviorData,
        analysis: analysis,
        sessionId: this.currentSession.sessionId
      };

      this.currentSession.data.push(analysisEntry);

      // Trigger real-time updates (in real app, this would emit WebSocket events)
      this.notifyBehaviorUpdate(analysisEntry);

    } catch (error) {
      console.error('Error in behavior analysis:', error);
    }
  }

  /**
   * Simulates behavior data capture from various sources
   * In real implementation, this would integrate with:
   * - WebRTC for video analysis
   * - OpenCV for computer vision
   * - MediaPipe for pose detection
   * - Facial emotion recognition libraries
   */
  simulateBehaviorCapture() {
    // Simulate realistic behavior patterns with some randomness
    const baseAttention = 75 + Math.random() * 20; // 75-95%
    const timeOfDay = new Date().getHours();
    
    // Attention typically drops in afternoon and late evening
    let attentionModifier = 1;
    if (timeOfDay >= 13 && timeOfDay <= 15) attentionModifier = 0.85; // Post-lunch dip
    if (timeOfDay >= 20) attentionModifier = 0.8; // Evening tiredness

    const emotions = ['focused', 'confident', 'neutral', 'confused', 'frustrated', 'engaged', 'tired'];
    const emotionWeights = [0.3, 0.2, 0.2, 0.1, 0.05, 0.1, 0.05]; // Weighted probabilities
    
    return {
      eyeTracking: {
        attentionLevel: Math.max(0, Math.min(100, baseAttention * attentionModifier + (Math.random() - 0.5) * 10)),
        gazeDirection: this.generateGazeDirection(),
        blinkRate: 12 + Math.random() * 8, // 12-20 blinks per minute
        eyeOpenness: 0.7 + Math.random() * 0.3 // 0.7-1.0
      },
      facialExpressions: {
        emotion: this.weightedRandomChoice(emotions, emotionWeights),
        confidence: 0.6 + Math.random() * 0.4, // 0.6-1.0
        valence: Math.random() * 2 - 1, // -1 to 1 (negative to positive)
        arousal: Math.random() * 2 - 1 // -1 to 1 (low to high energy)
      },
      headPose: {
        pitch: (Math.random() - 0.5) * 30, // -15 to 15 degrees
        yaw: (Math.random() - 0.5) * 20, // -10 to 10 degrees
        roll: (Math.random() - 0.5) * 10 // -5 to 5 degrees
      },
      physicalBehavior: {
        fidgeting: Math.random() * 0.5, // 0-0.5 (low to moderate)
        posture: Math.random() > 0.7 ? 'slouched' : 'upright',
        handGestures: Math.random() > 0.8 ? 'active' : 'still'
      },
      interactionMetrics: {
        mouseActivity: Math.random() * 100, // 0-100 clicks/movements per minute
        keyboardActivity: Math.random() * 200, // 0-200 keystrokes per minute
        scrollBehavior: Math.random() > 0.5 ? 'active' : 'minimal',
        pageEngagement: 0.3 + Math.random() * 0.7 // 0.3-1.0
      }
    };
  }

  /**
   * Generates realistic gaze direction data
   */
  generateGazeDirection() {
    const focusAreas = ['screen_center', 'screen_top', 'screen_bottom', 'off_screen', 'notes', 'distraction'];
    const weights = [0.6, 0.15, 0.1, 0.05, 0.08, 0.02];
    
    return {
      area: this.weightedRandomChoice(focusAreas, weights),
      x: Math.random(), // 0-1 (left to right)
      y: Math.random(), // 0-1 (top to bottom)
      duration: 1 + Math.random() * 4 // 1-5 seconds
    };
  }

  /**
   * Weighted random choice helper
   */
  weightedRandomChoice(choices, weights) {
    const random = Math.random();
    let sum = 0;
    
    for (let i = 0; i < choices.length; i++) {
      sum += weights[i];
      if (random <= sum) {
        return choices[i];
      }
    }
    
    return choices[choices.length - 1];
  }

  /**
   * Analyzes behavior patterns using AI to determine learning state
   * @param {Object} behaviorData - Raw behavior data
   */
  async analyzeBehaviorPatterns(behaviorData) {
    try {
      const prompt = `
      Analyze this student's real-time behavior data and provide insights for educational adaptation:
      
      Eye Tracking:
      - Attention Level: ${behaviorData.eyeTracking.attentionLevel}%
      - Gaze Focus: ${behaviorData.eyeTracking.gazeDirection.area}
      - Blink Rate: ${behaviorData.eyeTracking.blinkRate} per minute
      - Eye Openness: ${behaviorData.eyeTracking.eyeOpenness}
      
      Facial Expression:
      - Detected Emotion: ${behaviorData.facialExpressions.emotion}
      - Confidence: ${behaviorData.facialExpressions.confidence}
      - Emotional Valence: ${behaviorData.facialExpressions.valence}
      - Arousal Level: ${behaviorData.facialExpressions.arousal}
      
      Physical Behavior:
      - Head Pose: Pitch ${behaviorData.headPose.pitch}°, Yaw ${behaviorData.headPose.yaw}°
      - Posture: ${behaviorData.physicalBehavior.posture}
      - Fidgeting Level: ${behaviorData.physicalBehavior.fidgeting}
      
      Interaction Metrics:
      - Mouse Activity: ${behaviorData.interactionMetrics.mouseActivity}/min
      - Keyboard Activity: ${behaviorData.interactionMetrics.keyboardActivity}/min
      - Page Engagement: ${behaviorData.interactionMetrics.pageEngagement}
      
      Please analyze and provide:
      1. Overall engagement level (0-100)
      2. Attention quality assessment
      3. Emotional learning state
      4. Recommended interventions
      5. Difficulty adjustment suggestions
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are an expert in educational psychology and behavior analysis. Analyze student behavior data to optimize learning experiences.' },
          { role: 'user', content: prompt }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'behavior_analysis',
            schema: {
              type: 'object',
              properties: {
                engagementLevel: { type: 'number' },
                attentionQuality: { type: 'string' },
                learningState: { type: 'string' },
                recommendedInterventions: { type: 'array', items: { type: 'string' } },
                difficultyAdjustment: { type: 'string' },
                alertLevel: { type: 'string' }
              },
              required: ['engagementLevel', 'attentionQuality', 'learningState', 'recommendedInterventions', 'difficultyAdjustment', 'alertLevel'],
              additionalProperties: false
            }
          }
        }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error in AI behavior analysis:', error);
      
      // Fallback analysis without AI
      return this.fallbackBehaviorAnalysis(behaviorData);
    }
  }

  /**
   * Fallback behavior analysis without AI
   * @param {Object} behaviorData - Raw behavior data
   */
  fallbackBehaviorAnalysis(behaviorData) {
    const attention = behaviorData.eyeTracking.attentionLevel;
    const emotion = behaviorData.facialExpressions.emotion;
    const engagement = behaviorData.interactionMetrics.pageEngagement * 100;
    
    let learningState = 'optimal';
    let alertLevel = 'normal';
    let interventions = [];

    if (attention < 50) {
      learningState = 'distracted';
      alertLevel = 'high';
      interventions.push('Provide attention-grabbing content');
      interventions.push('Take a short break');
    } else if (attention < 70) {
      learningState = 'moderately_focused';
      alertLevel = 'medium';
      interventions.push('Increase interactivity');
    }

    if (emotion === 'confused' || emotion === 'frustrated') {
      interventions.push('Provide additional explanation');
      interventions.push('Offer alternative learning approach');
      alertLevel = 'high';
    }

    return {
      engagementLevel: Math.round(engagement),
      attentionQuality: attention > 80 ? 'excellent' : attention > 60 ? 'good' : 'needs_improvement',
      learningState,
      recommendedInterventions: interventions,
      difficultyAdjustment: attention < 50 ? 'decrease' : attention > 85 ? 'increase' : 'maintain',
      alertLevel
    };
  }

  /**
   * Notifies subscribers of behavior updates
   * @param {Object} analysisEntry - Analysis data entry
   */
  notifyBehaviorUpdate(analysisEntry) {
    // In real implementation, this would use WebSockets or event emitters
    if (window.behaviorUpdateCallbacks) {
      window.behaviorUpdateCallbacks.forEach(callback => {
        try {
          callback(analysisEntry);
        } catch (error) {
          console.error('Error in behavior update callback:', error);
        }
      });
    }
  }

  /**
   * Stops the current analysis session
   */
  async stopAnalysis() {
    if (!this.isAnalyzing || !this.currentSession) {
      return { status: 'no_active_session' };
    }

    const sessionSummary = await this.generateSessionSummary();
    
    // Store session history
    this.analysisHistory.set(this.currentSession.studentId, [
      ...(this.analysisHistory.get(this.currentSession.studentId) || []),
      {
        ...this.currentSession,
        endTime: new Date(),
        summary: sessionSummary
      }
    ]);

    this.isAnalyzing = false;
    this.currentSession = null;

    return {
      status: 'stopped',
      summary: sessionSummary
    };
  }

  /**
   * Generates a summary of the analysis session
   */
  async generateSessionSummary() {
    if (!this.currentSession || this.currentSession.data.length === 0) {
      return {
        duration: 0,
        averageAttention: 0,
        dominantEmotion: 'unknown',
        engagementTrend: 'insufficient_data'
      };
    }

    const data = this.currentSession.data;
    const duration = (new Date() - this.currentSession.startTime) / 1000 / 60; // minutes

    const averageAttention = data.reduce((sum, entry) => 
      sum + entry.rawData.eyeTracking.attentionLevel, 0) / data.length;

    const emotions = data.map(entry => entry.rawData.facialExpressions.emotion);
    const emotionCounts = emotions.reduce((counts, emotion) => {
      counts[emotion] = (counts[emotion] || 0) + 1;
      return counts;
    }, {});

    const dominantEmotion = Object.keys(emotionCounts).reduce((a, b) => 
      emotionCounts[a] > emotionCounts[b] ? a : b);

    const engagementLevels = data.map(entry => entry.analysis.engagementLevel);
    const engagementTrend = this.calculateTrend(engagementLevels);

    return {
      duration: Math.round(duration * 100) / 100,
      averageAttention: Math.round(averageAttention),
      dominantEmotion,
      engagementTrend,
      totalDataPoints: data.length,
      alertsTriggered: data.filter(entry => entry.analysis.alertLevel === 'high').length
    };
  }

  /**
   * Calculates trend from a series of values
   * @param {number[]} values - Array of numeric values
   */
  calculateTrend(values) {
    if (values.length < 3) return 'insufficient_data';
    
    const recent = values.slice(-Math.floor(values.length / 3));
    const earlier = values.slice(0, Math.floor(values.length / 3));
    
    const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    const earlierAvg = earlier.reduce((sum, val) => sum + val, 0) / earlier.length;
    
    const diff = recentAvg - earlierAvg;
    
    if (diff > 10) return 'improving';
    if (diff < -10) return 'declining';
    return 'stable';
  }

  /**
   * Gets behavior analysis history for a student
   * @param {string} studentId - Student identifier
   * @param {number} limit - Maximum number of sessions to return
   */
  getAnalysisHistory(studentId, limit = 10) {
    const history = this.analysisHistory.get(studentId) || [];
    return history.slice(-limit);
  }

  /**
   * Gets current behavior state if analysis is active
   */
  getCurrentBehaviorState() {
    if (!this.isAnalyzing || !this.currentSession || this.currentSession.data.length === 0) {
      return null;
    }

    const latestEntry = this.currentSession.data[this.currentSession.data.length - 1];
    return {
      timestamp: latestEntry.timestamp,
      attentionLevel: latestEntry.rawData.eyeTracking.attentionLevel,
      emotion: latestEntry.rawData.facialExpressions.emotion,
      engagementLevel: latestEntry.analysis.engagementLevel,
      learningState: latestEntry.analysis.learningState,
      alertLevel: latestEntry.analysis.alertLevel
    };
  }
}

export default new BehaviorAnalysisService();