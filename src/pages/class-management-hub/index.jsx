import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleAwareHeader from '../../components/ui/RoleAwareHeader';
import ContextualSidebar from '../../components/ui/ContextualSidebar';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import SessionToolbar from './components/SessionToolbar';
import VideoGridLayout from './components/VideoGridLayout';
import LiveAnalyticsDashboard from './components/LiveAnalyticsDashboard';
import StudentRosterPanel from './components/StudentRosterPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ClassManagementHub = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showRoster, setShowRoster] = useState(false);
  const [isAnalyticsExpanded, setIsAnalyticsExpanded] = useState(true);

  // Mock session data
  const sessionData = {
    className: "Advanced Mathematics - Grade 10",
    duration: "45:23",
    activeStudents: 23,
    totalStudents: 25,
    sessionId: "MATH-2025-001",
    startTime: "10:00 AM"
  };

  // Mock students data with behavioral indicators
  const [students, setStudents] = useState([
    {
      id: "STU001",
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      videoFeed: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop",
      status: "active",
      attentionLevel: 85,
      emotion: "focused",
      engagementLevel: 78,
      participationScore: 92,
      handRaised: false,
      isPresenting: false,
      alerts: []
    },
    {
      id: "STU002",
      name: "Michael Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      videoFeed: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      status: "active",
      attentionLevel: 45,
      emotion: "confused",
      engagementLevel: 52,
      participationScore: 68,
      handRaised: true,
      isPresenting: false,
      alerts: ["Low attention detected", "Needs assistance"]
    },
    {
      id: "STU003",
      name: "Emma Thompson",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      videoFeed: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop",
      status: "active",
      attentionLevel: 92,
      emotion: "happy",
      engagementLevel: 88,
      participationScore: 95,
      handRaised: false,
      isPresenting: true,
      alerts: []
    },
    {
      id: "STU004",
      name: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      videoFeed: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
      status: "inactive",
      attentionLevel: 25,
      emotion: "frustrated",
      engagementLevel: 30,
      participationScore: 45,
      handRaised: false,
      isPresenting: false,
      alerts: ["Student appears distracted", "Multiple yawns detected"]
    },
    {
      id: "STU005",
      name: "Olivia Davis",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      videoFeed: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
      status: "active",
      attentionLevel: 76,
      emotion: "neutral",
      engagementLevel: 72,
      participationScore: 83,
      handRaised: false,
      isPresenting: false,
      alerts: []
    },
    {
      id: "STU006",
      name: "David Kim",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      videoFeed: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop",
      status: "active",
      attentionLevel: 88,
      emotion: "focused",
      engagementLevel: 85,
      participationScore: 90,
      handRaised: false,
      isPresenting: false,
      alerts: []
    }
  ]);

  // Mock class analytics data
  const classData = {
    activeStudents: 23,
    totalStudents: 25,
    averageAttention: 72,
    atRiskStudents: [
      { id: "STU002", name: "Michael Rodriguez", reason: "Low attention" },
      { id: "STU004", name: "James Wilson", reason: "Distracted" }
    ],
    recentAlerts: [
      {
        id: 1,
        student: "Michael Rodriguez",
        type: "attention",
        message: "Attention level dropped below 50%",
        time: "2 min ago",
        priority: "high"
      },
      {
        id: 2,
        student: "James Wilson",
        type: "emotion",
        message: "Showing signs of frustration",
        time: "5 min ago",
        priority: "medium"
      },
      {
        id: 3,
        student: "Sarah Chen",
        type: "achievement",
        message: "Excellent participation in discussion",
        time: "8 min ago",
        priority: "low"
      }
    ]
  };

  // Handle toolbar actions
  const handleToolAction = (action, data) => {
    switch (action) {
      case 'recording': console.log('Recording:', data ? 'started' : 'stopped');
        break;
      case 'screenShare': console.log('Screen sharing:', data ? 'started' : 'stopped');
        break;
      case 'quiz': console.log('Deploying quiz');
        break;
      case 'poll': console.log('Creating poll');
        break;
      case 'breakout': console.log('Creating breakout rooms');
        break;
      case 'whiteboard': console.log('Opening whiteboard');
        break;
      case 'gridView': setViewMode('grid');
        break;
      case 'focusView': setViewMode('focus');
        break;
      case 'presentationView': setViewMode('presentation');
        break;
      case 'endSession':
        if (confirm('Are you sure you want to end the session?')) {
          navigate('/teacher-dashboard');
        }
        break;
      default:
        console.log('Action:', action, data);
    }
  };

  // Handle student actions
  const handleStudentAction = (action, student) => {
    switch (action) {
      case 'select':
        setSelectedStudent(student);
        break;
      case 'message': console.log('Sending message to:', student.name);
        break;
      case 'mute': console.log('Muting student:', student.name);
        break;
      case 'spotlight': console.log('Spotlighting student:', student.name);
        break;
      case 'refresh': console.log('Refreshing roster');
        break;
      case 'exportRoster':
        console.log('Exporting roster');
        break;
      case 'addStudent': console.log('Adding new student');
        break;
      default:
        console.log('Student action:', action, student);
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStudents(prevStudents => 
        prevStudents.map(student => ({
          ...student,
          attentionLevel: Math.max(20, Math.min(100, 
            student.attentionLevel + (Math.random() - 0.5) * 10
          )),
          engagementLevel: Math.max(20, Math.min(100,
            student.engagementLevel + (Math.random() - 0.5) * 8
          ))
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <RoleAwareHeader />
      <ContextualSidebar />
      
      <div className="pt-16 lg:pl-16">
        {/* Session Toolbar */}
        <SessionToolbar 
          sessionData={sessionData}
          onToolAction={handleToolAction}
        />

        {/* Main Content Area */}
        <div className="flex h-[calc(100vh-8rem)]">
          {/* Video Grid Area */}
          <div className={`
            flex-1 transition-all duration-300
            ${isAnalyticsExpanded ? 'lg:mr-80' : ''}
          `}>
            <VideoGridLayout
              students={students}
              onStudentSelect={setSelectedStudent}
              selectedStudent={selectedStudent}
              viewMode={viewMode}
            />
          </div>

          {/* Right Panel - Analytics Dashboard */}
          <div className={`
            fixed right-0 top-32 bottom-0 bg-surface border-l border-border transition-all duration-300 z-30
            ${isAnalyticsExpanded ? 'w-80' : 'w-12'}
            hidden lg:block
          `}>
            {/* Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAnalyticsExpanded(!isAnalyticsExpanded)}
              className="absolute -left-6 top-4 bg-surface border border-border rounded-l-lg"
            >
              <Icon name={isAnalyticsExpanded ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>

            {isAnalyticsExpanded && (
              <LiveAnalyticsDashboard
                classData={classData}
                selectedStudent={selectedStudent}
              />
            )}
          </div>

          {/* Mobile Analytics Overlay */}
          <div className="lg:hidden">
            {isAnalyticsExpanded && (
              <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsAnalyticsExpanded(false)}>
                <div className="absolute right-0 top-16 bottom-0 w-80 max-w-full">
                  <LiveAnalyticsDashboard
                    classData={classData}
                    selectedStudent={selectedStudent}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Student Roster Panel - Mobile/Tablet */}
        {showRoster && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowRoster(false)}>
            <div className="absolute left-0 top-16 bottom-0 w-80 max-w-full">
              <StudentRosterPanel
                students={students}
                onStudentAction={handleStudentAction}
                selectedStudent={selectedStudent}
              />
            </div>
          </div>
        )}

        {/* Floating Action Buttons - Mobile */}
        <div className="lg:hidden fixed bottom-20 right-4 flex flex-col space-y-2 z-30">
          <Button
            variant="default"
            size="icon"
            onClick={() => setIsAnalyticsExpanded(true)}
            className="rounded-full shadow-prominent"
          >
            <Icon name="BarChart3" size={20} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setShowRoster(true)}
            className="rounded-full shadow-prominent"
          >
            <Icon name="Users" size={20} />
          </Button>
        </div>

        {/* Emergency Alert Banner */}
        {classData.atRiskStudents.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 lg:left-20 lg:right-84 bg-error text-error-foreground rounded-lg p-3 shadow-prominent z-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} />
                <span className="font-medium text-sm">
                  {classData.atRiskStudents.length} student(s) need attention
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedStudent(students.find(s => s.id === classData.atRiskStudents[0].id))}
                className="text-error-foreground hover:bg-error-foreground hover:bg-opacity-20"
              >
                View Details
              </Button>
            </div>
          </div>
        )}
      </div>

      <BottomTabNavigation />
    </div>
  );
};

export default ClassManagementHub;