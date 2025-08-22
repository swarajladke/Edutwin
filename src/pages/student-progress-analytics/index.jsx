import React, { useState, useEffect } from 'react';
import RoleAwareHeader from '../../components/ui/RoleAwareHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ContextualSidebar from '../../components/ui/ContextualSidebar';
import OverallProgressCard from './components/OverallProgressCard';
import SubjectProgressCard from './components/SubjectProgressCard';
import LearningPatternsChart from './components/LearningPatternsChart';
import AchievementSection from './components/AchievementSection';
import AIInsightsCard from './components/AIInsightsCard';
import DetailedBreakdown from './components/DetailedBreakdown';
import FilterControls from './components/FilterControls';
import Icon from '../../components/AppIcon';

const StudentProgressAnalytics = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [filters, setFilters] = useState({});

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data for overall progress
  const overallProgressData = {
    completionPercentage: 78,
    learningStreak: 12,
    currentLevel: 5,
    totalConcepts: 45,
    masteredConcepts: 35
  };

  // Mock data for subjects
  const subjectsData = [
    {
      id: 1,
      name: "Mathematics",
      icon: "Calculator",
      masteryLevel: 85,
      timeSpent: 240,
      retentionScore: 92,
      conceptsCompleted: 12,
      totalConcepts: 15,
      color: "#3B82F6"
    },
    {
      id: 2,
      name: "Science",
      icon: "Atom",
      masteryLevel: 72,
      timeSpent: 180,
      retentionScore: 88,
      conceptsCompleted: 8,
      totalConcepts: 12,
      color: "#10B981"
    },
    {
      id: 3,
      name: "English",
      icon: "BookOpen",
      masteryLevel: 90,
      timeSpent: 200,
      retentionScore: 95,
      conceptsCompleted: 10,
      totalConcepts: 11,
      color: "#F59E0B"
    },
    {
      id: 4,
      name: "History",
      icon: "Clock",
      masteryLevel: 65,
      timeSpent: 120,
      retentionScore: 78,
      conceptsCompleted: 5,
      totalConcepts: 9,
      color: "#EF4444"
    }
  ];

  // Mock data for learning patterns charts
  const chartData = {
    attention: [
      { time: "9:00", value: 85 },
      { time: "10:00", value: 92 },
      { time: "11:00", value: 88 },
      { time: "12:00", value: 75 },
      { time: "1:00", value: 65 },
      { time: "2:00", value: 78 },
      { time: "3:00", value: 82 },
      { time: "4:00", value: 90 }
    ],
    emotion: [
      { time: "9:00", value: 7.5 },
      { time: "10:00", value: 8.2 },
      { time: "11:00", value: 8.0 },
      { time: "12:00", value: 6.8 },
      { time: "1:00", value: 6.2 },
      { time: "2:00", value: 7.1 },
      { time: "3:00", value: 7.8 },
      { time: "4:00", value: 8.5 }
    ],
    performance: [
      { time: "9:00", value: 78 },
      { time: "10:00", value: 85 },
      { time: "11:00", value: 82 },
      { time: "12:00", value: 70 },
      { time: "1:00", value: 68 },
      { time: "2:00", value: 75 },
      { time: "3:00", value: 80 },
      { time: "4:00", value: 88 }
    ]
  };

  // Mock data for achievements
  const badgesData = [
    {
      id: 1,
      name: "Math Master",
      icon: "Award",
      rarity: "legendary",
      earned: true,
      earnedDate: "2025-01-20",
      description: "Complete 10 advanced math concepts",
      isNew: true
    },
    {
      id: 2,
      name: "Streak Keeper",
      icon: "Flame",
      rarity: "epic",
      earned: true,
      earnedDate: "2025-01-18",
      description: "Maintain 7-day learning streak"
    },
    {
      id: 3,
      name: "Quick Learner",
      icon: "Zap",
      rarity: "rare",
      earned: true,
      earnedDate: "2025-01-15",
      description: "Complete lesson in under 30 minutes"
    },
    {
      id: 4,
      name: "Perfect Score",
      icon: "Target",
      rarity: "epic",
      earned: false,
      description: "Score 100% on any quiz"
    },
    {
      id: 5,
      name: "Night Owl",
      icon: "Moon",
      rarity: "rare",
      earned: true,
      earnedDate: "2025-01-12",
      description: "Complete lesson after 9 PM"
    },
    {
      id: 6,
      name: "Early Bird",
      icon: "Sun",
      rarity: "rare",
      earned: false,
      description: "Complete lesson before 7 AM"
    },
    {
      id: 7,
      name: "Curious Mind",
      icon: "HelpCircle",
      rarity: "common",
      earned: true,
      earnedDate: "2025-01-10",
      description: "Ask 5 questions in AI assistant"
    },
    {
      id: 8,
      name: "Team Player",
      icon: "Users",
      rarity: "rare",
      earned: false,
      description: "Participate in group study session"
    }
  ];

  const milestonesData = [
    {
      id: 1,
      title: "Complete First Module",
      description: "Finish your first learning module with 80% score",
      icon: "CheckCircle",
      completed: true,
      completedDate: "2025-01-10"
    },
    {
      id: 2,
      title: "Reach Level 5",
      description: "Advance to level 5 by mastering core concepts",
      icon: "Star",
      completed: true,
      completedDate: "2025-01-18"
    },
    {
      id: 3,
      title: "Master 50 Concepts",
      description: "Demonstrate mastery in 50 different concepts",
      icon: "Target",
      completed: false,
      progress: { current: 35, target: 50 }
    },
    {
      id: 4,
      title: "30-Day Streak",
      description: "Maintain consistent learning for 30 consecutive days",
      icon: "Calendar",
      completed: false,
      progress: { current: 12, target: 30 }
    }
  ];

  // Mock data for AI insights
  const aiInsightsData = [
    {
      id: 1,
      type: "learning_style",
      title: "Visual Learning Preference Detected",
      summary: "Your performance improves by 23% when content includes visual elements like diagrams and charts.",
      detailed_analysis: `Based on your interaction patterns and performance data, you show a strong preference for visual learning. Your attention levels peak when content includes diagrams, charts, and visual representations. Eye-tracking data indicates 40% longer focus duration on visual content compared to text-only materials.`,
      recommendations: [
        "Request visual aids for complex topics",
        "Use mind maps for note-taking",
        "Seek video explanations for difficult concepts",
        "Practice with interactive simulations"
      ],
      priority: "high",
      confidence: 87,
      metrics: {
        visual_engagement: "92%",
        retention_boost: "23%"
      }
    },
    {
      id: 2,
      type: "optimal_time",
      title: "Peak Learning Hours Identified",
      summary: "Your cognitive performance is highest between 9-11 AM, with attention levels averaging 90%.",
      detailed_analysis: `Analysis of your behavioral data reveals consistent patterns in cognitive performance throughout the day. Morning sessions (9-11 AM) show the highest attention levels, emotional engagement, and retention rates. Performance gradually declines after lunch, with a slight recovery around 3-4 PM.`,
      recommendations: [
        "Schedule challenging subjects in the morning",
        "Use afternoon for review and practice",
        "Take regular breaks every 45 minutes",
        "Avoid heavy learning after 6 PM"
      ],
      priority: "medium",
      confidence: 94,
      metrics: {
        morning_attention: "90%",
        afternoon_attention: "72%"
      }
    },
    {
      id: 3,
      type: "focus_areas",
      title: "Algebra Concepts Need Attention",
      summary: "Quadratic equations and polynomial functions show lower mastery scores and require focused practice.",
      detailed_analysis: `Your performance data indicates specific challenges with algebraic concepts, particularly quadratic equations (65% mastery) and polynomial functions (58% mastery). Error patterns suggest difficulty with factoring and graphing techniques. Emotional analysis shows increased stress levels during these topics.`,
      recommendations: [
        "Practice factoring techniques daily",
        "Use graphing tools for visualization",
        "Break complex problems into smaller steps",
        "Seek additional practice problems"
      ],
      priority: "high",
      confidence: 91,
      metrics: {
        current_mastery: "62%",
        target_mastery: "80%"
      }
    }
  ];

  // Mock data for detailed breakdown
  const quizData = [
    { quiz: "Math Quiz 1", score: 85, date: "2025-01-20" },
    { quiz: "Science Quiz 2", score: 92, date: "2025-01-18" },
    { quiz: "English Quiz 1", score: 88, date: "2025-01-15" },
    { quiz: "History Quiz 1", score: 76, date: "2025-01-12" },
    { quiz: "Math Quiz 2", score: 90, date: "2025-01-10" }
  ];

  const conceptDifficultyData = {
    distribution: [
      { name: "Easy", value: 15 },
      { name: "Medium", value: 20 },
      { name: "Hard", value: 10 }
    ],
    concepts: [
      {
        id: 1,
        name: "Quadratic Equations",
        difficulty: "Hard",
        mastery: 65,
        attempts: 8
      },
      {
        id: 2,
        name: "Photosynthesis",
        difficulty: "Medium",
        mastery: 88,
        attempts: 5
      },
      {
        id: 3,
        name: "Grammar Rules",
        difficulty: "Easy",
        mastery: 95,
        attempts: 3
      },
      {
        id: 4,
        name: "World War II",
        difficulty: "Medium",
        mastery: 78,
        attempts: 6
      }
    ]
  };

  const feedbackData = [
    {
      id: 1,
      topic: "Mathematics - Algebra",
      date: "2025-01-20",
      message: `Great progress on linear equations! Your problem-solving approach has improved significantly. Focus on quadratic equations next to build on this foundation.`,
      suggestions: [
        "Practice more word problems to strengthen application skills",
        "Review factoring techniques for complex expressions",
        "Use graphing tools to visualize equation solutions"
      ],
      resources: ["Khan Academy Algebra", "Practice Worksheets", "Video Tutorials"]
    },
    {
      id: 2,
      topic: "Science - Biology",
      date: "2025-01-18",
      message: `Excellent understanding of cellular processes! Your attention during microscopy sessions was outstanding. Consider exploring advanced topics in genetics.`,
      suggestions: [
        "Create concept maps for complex biological processes",
        "Practice labeling diagrams to reinforce visual learning",
        "Connect biological concepts to real-world examples"
      ],
      resources: ["Interactive Simulations", "Lab Exercises", "Research Articles"]
    },
    {
      id: 3,
      topic: "English - Writing Skills",
      date: "2025-01-15",
      message: `Your essay structure has improved remarkably! The introduction and conclusion are well-crafted. Work on developing stronger supporting arguments in body paragraphs.`,
      suggestions: [
        "Use more varied sentence structures",
        "Include specific examples to support main points",
        "Practice transition words for better flow"
      ],
      resources: ["Writing Guides", "Essay Examples", "Grammar Checker"]
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch
    console.log('Filters changed:', newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleAwareHeader />
      <ContextualSidebar />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 lg:pb-8 lg:pl-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
              <span>Dashboard</span>
              <Icon name="ChevronRight" size={14} />
              <span className="text-text-primary">Progress Analytics</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
              Your Learning Progress
            </h1>
            <p className="text-text-secondary mt-2">
              Comprehensive insights into your learning journey and performance metrics
            </p>
          </div>

          {/* Filter Controls */}
          <FilterControls 
            onFiltersChange={handleFiltersChange}
            subjects={subjectsData}
          />

          {/* Progress Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Overall Progress */}
            <div className="lg:col-span-4">
              <OverallProgressCard progressData={overallProgressData} />
            </div>
            
            {/* Learning Patterns Chart */}
            <div className="lg:col-span-8">
              <LearningPatternsChart chartData={chartData} />
            </div>
          </div>

          {/* Subject Progress Cards */}
          <div className="mb-8">
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
              Subject Progress
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjectsData.map((subject) => (
                <SubjectProgressCard key={subject.id} subject={subject} />
              ))}
            </div>
          </div>

          {/* AI Insights and Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AIInsightsCard insights={aiInsightsData} />
            <AchievementSection 
              achievements={[]}
              badges={badgesData}
              milestones={milestonesData}
            />
          </div>

          {/* Detailed Breakdown */}
          <DetailedBreakdown 
            quizData={quizData}
            conceptDifficulty={conceptDifficultyData}
            feedbackData={feedbackData}
          />
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default StudentProgressAnalytics;