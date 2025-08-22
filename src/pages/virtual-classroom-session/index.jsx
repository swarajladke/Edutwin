import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import LessonContent from './components/LessonContent';
import CourseOutline from './components/CourseOutline';
import AIAssistantPanel from './components/AIAssistantPanel';
import BehaviorMonitor from './components/BehaviorMonitor';
import InteractiveQuiz from './components/InteractiveQuiz';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VirtualClassroomSession = () => {
  const navigate = useNavigate();
  const [currentProgress, setCurrentProgress] = useState(35);
  const [attentionLevel, setAttentionLevel] = useState(0.75);
  const [emotionData, setEmotionData] = useState({
    dominant: 'focused',
    confidence: 0.87,
    emotions: {
      focused: 0.45,
      neutral: 0.30,
      confused: 0.15,
      happy: 0.10
    }
  });
  const [currentTopic, setCurrentTopic] = useState('Introduction to Machine Learning');
  const [quizScore, setQuizScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock session data
  const sessionData = {
    id: 'session-001',
    title: 'Machine Learning Fundamentals - Live Session',
    instructor: 'Dr. Sarah Johnson',
    startTime: new Date(Date.now() - 2100000), // Started 35 minutes ago
    duration: '90 minutes',
    participants: 24,
    status: 'live'
  };

  const handleProgressUpdate = (progress) => {
    setCurrentProgress(progress);
  };

  const handleTopicSelect = (topic) => {
    setCurrentTopic(topic.title);
    setShowQuiz(false);
  };

  const handleEmotionUpdate = (emotion) => {
    setEmotionData(emotion);
  };

  const handleAttentionUpdate = (attention) => {
    setAttentionLevel(attention);
  };

  const handleScoreUpdate = (score) => {
    setQuizScore(score);
  };

  const toggleQuiz = () => {
    setShowQuiz(!showQuiz);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatSessionTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  const getAttentionFeedback = () => {
    if (attentionLevel > 0.8) return { message: 'Excellent focus!', color: 'text-success' };
    if (attentionLevel > 0.6) return { message: 'Good attention', color: 'text-primary' };
    if (attentionLevel > 0.4) return { message: 'Moderate focus', color: 'text-warning' };
    return { message: 'Low attention detected', color: 'text-error' };
  };

  const attentionFeedback = getAttentionFeedback();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar />
        
        <main className="flex-1 lg:ml-80">
          <Breadcrumb />
          
          {/* Session Header */}
          <div className="px-6 py-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-error rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">LIVE</span>
                </div>
                <div>
                  <h1 className="text-xl font-heading font-semibold text-foreground">
                    {sessionData.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>Instructor: {sessionData.instructor}</span>
                    <span>•</span>
                    <span>{sessionData.participants} participants</span>
                    <span>•</span>
                    <span>Duration: {formatSessionTime(sessionTime)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Attention Status */}
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted ${attentionFeedback.color}`}>
                  <Icon name="Eye" size={16} />
                  <span className="text-sm font-medium">{attentionFeedback.message}</span>
                </div>

                {/* Session Controls */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleQuiz}
                  iconName="HelpCircle"
                  iconPosition="left"
                  iconSize={16}
                >
                  {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  iconName={isFullscreen ? "Minimize" : "Maximize"}
                  iconSize={16}
                />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/student-dashboard')}
                  iconName="X"
                  iconSize={16}
                />
              </div>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="flex h-[calc(100vh-200px)]">
            {/* Course Outline Sidebar */}
            <CourseOutline 
              currentProgress={currentProgress}
              onTopicSelect={handleTopicSelect}
            />

            {/* Main Content Area */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {showQuiz ? (
                <InteractiveQuiz
                  onScoreUpdate={handleScoreUpdate}
                  attentionLevel={attentionLevel}
                  emotionData={emotionData}
                />
              ) : (
                <LessonContent
                  currentLesson={currentTopic}
                  onProgressUpdate={handleProgressUpdate}
                  attentionLevel={attentionLevel}
                />
              )}

              {/* Learning Analytics Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                      <Icon name="TrendingUp" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="text-lg font-semibold text-foreground">
                        {Math.round(currentProgress)}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center">
                      <Icon name="Brain" size={20} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Emotion</div>
                      <div className="text-lg font-semibold text-foreground capitalize">
                        {emotionData.dominant}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success bg-opacity-10 rounded-lg flex items-center justify-center">
                      <Icon name="Star" size={20} className="text-success" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Quiz Score</div>
                      <div className="text-lg font-semibold text-foreground">
                        {quizScore} pts
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant Panel */}
            <AIAssistantPanel 
              emotionData={emotionData}
              currentTopic={currentTopic}
            />
          </div>

          {/* Behavior Monitor Overlay */}
          <BehaviorMonitor
            onEmotionUpdate={handleEmotionUpdate}
            onAttentionUpdate={handleAttentionUpdate}
          />
        </main>
      </div>
    </div>
  );
};

export default VirtualClassroomSession;