import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleAwareHeader from '../../components/ui/RoleAwareHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ContextualSidebar from '../../components/ui/ContextualSidebar';
import ContinueLearningCard from './components/ContinueLearningCard';
import LearningCard from './components/LearningCard';
import QuickStatsWidget from './components/QuickStatsWidget';
import UpcomingAssignments from './components/UpcomingAssignments';
import RecentQuizScores from './components/RecentQuizScores';
import AchievementBadges from './components/AchievementBadges';
import WebcamPermissionPrompt from './components/WebcamPermissionPrompt';
import ProgressSidebar from './components/ProgressSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showWebcamPrompt, setShowWebcamPrompt] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check for first-time user and webcam permission
  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem('webcam-prompt-seen');
    if (!hasSeenPrompt) {
      setShowWebcamPrompt(true);
    }
  }, []);

  // Mock data for current lesson
  const currentLesson = {
    id: 1,
    title: "Introduction to Quadratic Equations",
    subject: "Mathematics",
    chapter: "Chapter 4: Algebra",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
    completedSteps: 3,
    totalSteps: 8,
    estimatedTime: 15
  };

  // Mock data for recommended lessons
  const recommendedLessons = [
    {
      id: 2,
      title: "Solving Linear Equations",
      subject: "Mathematics",
      type: "video",
      difficulty: "Beginner",
      duration: 25,
      enrolled: 1247,
      progress: 0,
      isNew: true,
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Chemical Bonding Quiz",
      subject: "Chemistry",
      type: "quiz",
      difficulty: "Intermediate",
      duration: 15,
      enrolled: 892,
      progress: 45,
      isNew: false,
      thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "World War II Timeline",
      subject: "History",
      type: "interactive",
      difficulty: "Beginner",
      duration: 30,
      enrolled: 654,
      progress: 0,
      isNew: false,
      thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Photosynthesis Process",
      subject: "Biology",
      type: "reading",
      difficulty: "Intermediate",
      duration: 20,
      enrolled: 1156,
      progress: 75,
      isNew: false,
      thumbnail: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Shakespeare\'s Sonnets",
      subject: "Literature",
      type: "video",
      difficulty: "Advanced",
      duration: 35,
      enrolled: 423,
      progress: 0,
      isNew: true,
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
    },
    {
      id: 7,
      title: "Physics Lab Simulation",
      subject: "Physics",
      type: "interactive",
      difficulty: "Advanced",
      duration: 45,
      enrolled: 789,
      progress: 20,
      isNew: false,
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop"
    }
  ];

  // Mock data for quick stats
  const quickStats = [
    { type: 'streak', value: '7', label: 'Day Streak' },
    { type: 'completed', value: '24', label: 'Completed' },
    { type: 'time', value: '156', label: 'Hours Learned' },
    { type: 'score', value: '87%', label: 'Avg Score' }
  ];

  // Mock data for upcoming assignments
  const upcomingAssignments = [
    {
      id: 1,
      title: "Math Problem Set 4.2",
      subject: "Mathematics",
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      priority: "high"
    },
    {
      id: 2,
      title: "Chemistry Lab Report",
      subject: "Chemistry",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      priority: "medium"
    },
    {
      id: 3,
      title: "History Essay Draft",
      subject: "History",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      priority: "low"
    }
  ];

  // Mock data for recent quiz scores
  const recentQuizzes = [
    {
      id: 1,
      title: "Algebra Basics",
      subject: "Mathematics",
      score: 92,
      questionsCorrect: 23,
      totalQuestions: 25,
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Periodic Table",
      subject: "Chemistry",
      score: 78,
      questionsCorrect: 39,
      totalQuestions: 50,
      date: "5 days ago"
    },
    {
      id: 3,
      title: "Cell Structure",
      subject: "Biology",
      score: 95,
      questionsCorrect: 19,
      totalQuestions: 20,
      date: "1 week ago"
    }
  ];

  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      title: "Math Master",
      description: "Completed 10 math lessons",
      category: "completion",
      type: "gold",
      isNew: true
    },
    {
      id: 2,
      title: "Quiz Champion",
      description: "Scored 90%+ on 5 quizzes",
      category: "performance",
      type: "silver",
      isNew: false
    },
    {
      id: 3,
      title: "Study Streak",
      description: "7 days of continuous learning",
      category: "streak",
      type: "bronze",
      isNew: false
    },
    {
      id: 4,
      title: "Team Player",
      description: "Participated in group discussions",
      category: "participation",
      type: "default",
      isNew: false
    }
  ];

  // Mock data for progress sidebar
  const progressData = {
    weeklyProgress: [
      { day: 'Mon', minutes: 45 },
      { day: 'Tue', minutes: 60 },
      { day: 'Wed', minutes: 30 },
      { day: 'Thu', minutes: 75 },
      { day: 'Fri', minutes: 90 },
      { day: 'Sat', minutes: 40 },
      { day: 'Sun', minutes: 55 }
    ],
    learningStreak: {
      current: 7,
      best: 12
    },
    subjectProgress: [
      { name: 'Mathematics', progress: 78 },
      { name: 'Chemistry', progress: 65 },
      { name: 'Physics', progress: 82 },
      { name: 'Biology', progress: 71 },
      { name: 'History', progress: 59 }
    ],
    recentActivity: [
      { action: 'Completed Quadratic Equations lesson', time: '2 hours ago' },
      { action: 'Scored 92% on Algebra quiz', time: '1 day ago' },
      { action: 'Started Chemistry bonding module', time: '2 days ago' },
      { action: 'Earned Math Master badge', time: '3 days ago' }
    ]
  };

  const handleContinueLearning = () => {
    navigate('/ai-learning-assistant', { state: { lessonId: currentLesson.id } });
  };

  const handleStartLesson = (lesson) => {
    navigate('/ai-learning-assistant', { state: { lessonId: lesson.id } });
  };

  const handleWebcamPermissionGranted = () => {
    localStorage.setItem('webcam-prompt-seen', 'true');
    localStorage.setItem('webcam-enabled', 'true');
    setShowWebcamPrompt(false);
  };

  const handleWebcamPromptDismiss = () => {
    localStorage.setItem('webcam-prompt-seen', 'true');
    setShowWebcamPrompt(false);
  };

  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleViewAllAssignments = () => {
    navigate('/student-profile-management', { state: { tab: 'assignments' } });
  };

  const handleViewAllQuizzes = () => {
    navigate('/student-progress-analytics', { state: { tab: 'quizzes' } });
  };

  const handleViewAllAchievements = () => {
    navigate('/student-profile-management', { state: { tab: 'achievements' } });
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleAwareHeader />
      <ContextualSidebar />
      
      <main className="pt-16 pb-20 lg:pb-6">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 lg:mr-80">
            <div className="px-4 lg:px-6 py-6">
              {/* Pull to Refresh Indicator */}
              {isRefreshing && (
                <div className="flex items-center justify-center py-4 mb-4">
                  <Icon name="RotateCw" size={20} className="animate-spin mr-2" />
                  <span className="text-sm text-text-secondary">Refreshing...</span>
                </div>
              )}

              {/* Webcam Permission Prompt */}
              {showWebcamPrompt && (
                <div className="mb-6">
                  <WebcamPermissionPrompt
                    onPermissionGranted={handleWebcamPermissionGranted}
                    onDismiss={handleWebcamPromptDismiss}
                  />
                </div>
              )}

              {/* Welcome Section */}
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                  Welcome back, Alex! 👋
                </h1>
                <p className="text-text-secondary">
                  Ready to continue your learning journey? Let's pick up where you left off.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="mb-6">
                <QuickStatsWidget stats={quickStats} />
              </div>

              {/* Continue Learning Card */}
              <div className="mb-6">
                <ContinueLearningCard
                  currentLesson={currentLesson}
                  onContinue={handleContinueLearning}
                />
              </div>

              {/* Recommended Learning Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Recommended for You
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePullToRefresh}
                    iconName="RefreshCw"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Refresh
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedLessons.map((lesson) => (
                    <LearningCard
                      key={lesson.id}
                      lesson={lesson}
                      onStart={handleStartLesson}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Access Widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <UpcomingAssignments
                    assignments={upcomingAssignments}
                    onViewAll={handleViewAllAssignments}
                  />
                  <AchievementBadges
                    achievements={achievements}
                    onViewAll={handleViewAllAchievements}
                  />
                </div>
                <div>
                  <RecentQuizScores
                    quizzes={recentQuizzes}
                    onViewAll={handleViewAllQuizzes}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Progress Sidebar */}
          <div className="hidden lg:block fixed right-0 top-16 bottom-0 w-80 bg-muted border-l border-border overflow-y-auto">
            <div className="p-6">
              <ProgressSidebar progressData={progressData} />
            </div>
          </div>
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default StudentDashboard;