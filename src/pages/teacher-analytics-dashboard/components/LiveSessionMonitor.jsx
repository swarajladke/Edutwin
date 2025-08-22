import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveSessionMonitor = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const liveSessions = [
    {
      id: 1,
      title: "Advanced Mathematics - Calculus",
      subject: "Mathematics",
      startTime: new Date(2025, 6, 26, 14, 30),
      duration: 90,
      participants: 28,
      activeParticipants: 26,
      avgAttention: 87,
      avgEngagement: 92,
      status: "active",
      instructor: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "Physics - Quantum Mechanics",
      subject: "Physics",
      startTime: new Date(2025, 6, 26, 16, 0),
      duration: 75,
      participants: 22,
      activeParticipants: 20,
      avgAttention: 79,
      avgEngagement: 84,
      status: "active",
      instructor: "Prof. Michael Chen"
    },
    {
      id: 3,
      title: "Chemistry Lab Session",
      subject: "Chemistry",
      startTime: new Date(2025, 6, 26, 17, 30),
      duration: 120,
      participants: 18,
      activeParticipants: 18,
      avgAttention: 94,
      avgEngagement: 96,
      status: "active",
      instructor: "Dr. Emily Rodriguez"
    }
  ];

  const realtimeData = [
    {
      id: 1,
      studentName: "Emma Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      attention: 95,
      emotion: "focused",
      handRaised: false,
      speaking: false,
      cameraOn: true,
      micOn: true
    },
    {
      id: 2,
      studentName: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      attention: 72,
      emotion: "confused",
      handRaised: true,
      speaking: false,
      cameraOn: true,
      micOn: false
    },
    {
      id: 3,
      studentName: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      attention: 88,
      emotion: "engaged",
      handRaised: false,
      speaking: true,
      cameraOn: true,
      micOn: true
    },
    {
      id: 4,
      studentName: "David Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      attention: 45,
      emotion: "distracted",
      handRaised: false,
      speaking: false,
      cameraOn: false,
      micOn: false
    },
    {
      id: 5,
      studentName: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      attention: 91,
      emotion: "focused",
      handRaised: false,
      speaking: false,
      cameraOn: true,
      micOn: false
    },
    {
      id: 6,
      studentName: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      attention: 67,
      emotion: "bored",
      handRaised: false,
      speaking: false,
      cameraOn: true,
      micOn: false
    }
  ];

  const currentSession = liveSessions.find(s => s.id === selectedSession);
  const sessionDuration = Math.floor((currentTime - currentSession?.startTime) / (1000 * 60));

  const getEmotionColor = (emotion) => {
    const colors = {
      focused: 'text-success',
      engaged: 'text-primary',
      confused: 'text-warning',
      distracted: 'text-error',
      bored: 'text-muted-foreground'
    };
    return colors[emotion] || 'text-muted-foreground';
  };

  const getAttentionColor = (attention) => {
    if (attention >= 80) return 'text-success';
    if (attention >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Session Selector */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">Live Sessions</h3>
          <div className="flex items-center space-x-2 text-sm text-success">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>

        <div className="space-y-3">
          {liveSessions.map((session) => (
            <div
              key={session.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedSession === session.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedSession(session.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{session.title}</h4>
                  <p className="text-sm text-muted-foreground">{session.instructor}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <span className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{session.activeParticipants}/{session.participants}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{Math.floor((currentTime - session.startTime) / (1000 * 60))}min</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{session.avgAttention}%</div>
                  <div className="text-xs text-muted-foreground">Avg Attention</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session Details */}
      {currentSession && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {currentSession.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                Duration: {sessionDuration} minutes • {currentSession.activeParticipants} active participants
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" iconName="Settings">
                Controls
              </Button>
              <Button variant="outline" size="sm" iconName="BarChart3">
                Analytics
              </Button>
            </div>
          </div>

          {/* Session Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Eye" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Average Attention</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{currentSession.avgAttention}%</div>
              <div className="text-xs text-success">+3% from last session</div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Activity" size={16} className="text-secondary" />
                <span className="text-sm font-medium text-foreground">Engagement Level</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{currentSession.avgEngagement}%</div>
              <div className="text-xs text-success">+5% from last session</div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Users" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">Participation Rate</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {Math.round((currentSession.activeParticipants / currentSession.participants) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">
                {currentSession.activeParticipants}/{currentSession.participants} students
              </div>
            </div>
          </div>

          {/* Real-time Student Grid */}
          <div>
            <h4 className="text-md font-heading font-semibold text-foreground mb-4">Real-time Student Monitoring</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {realtimeData.map((student) => (
                <div key={student.id} className="bg-muted/30 rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="relative">
                      <img
                        src={student.avatar}
                        alt={student.studentName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {student.speaking && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="Mic" size={10} color="white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm truncate">
                        {student.studentName}
                      </div>
                      <div className={`text-xs capitalize ${getEmotionColor(student.emotion)}`}>
                        {student.emotion}
                      </div>
                    </div>
                    {student.handRaised && (
                      <Icon name="Hand" size={16} className="text-warning" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Attention</span>
                      <span className={`font-medium ${getAttentionColor(student.attention)}`}>
                        {student.attention}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          student.attention >= 80 ? 'bg-success' :
                          student.attention >= 60 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${student.attention}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-2">
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${
                          student.cameraOn ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          <Icon name={student.cameraOn ? "Video" : "VideoOff"} size={12} />
                        </div>
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${
                          student.micOn ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          <Icon name={student.micOn ? "Mic" : "MicOff"} size={12} />
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Icon name="MoreHorizontal" size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-heading font-semibold text-foreground mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Icon name="MessageSquare" size={20} />
            <span className="text-sm">Send Alert</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Icon name="Users" size={20} />
            <span className="text-sm">Breakout Rooms</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Icon name="BarChart" size={20} />
            <span className="text-sm">Start Poll</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Icon name="FileText" size={20} />
            <span className="text-sm">Generate Report</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionMonitor;