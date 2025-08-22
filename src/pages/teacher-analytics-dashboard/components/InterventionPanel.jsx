import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InterventionPanel = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    {
      id: 1,
      type: "attention",
      priority: "high",
      student: {
        name: "David Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        id: "STU001"
      },
      message: "Attention level dropped below 50% for 10+ minutes",
      timestamp: new Date(Date.now() - 300000),
      suggestions: [
        "Send private message to check understanding",
        "Initiate breakout room discussion",
        "Ask direct question to re-engage",
        "Suggest short break or movement activity"
      ],
      status: "pending"
    },
    {
      id: 2,
      type: "emotion",
      priority: "medium",
      student: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        id: "STU002"
      },
      message: "Showing signs of confusion for extended period",
      timestamp: new Date(Date.now() - 180000),
      suggestions: [
        "Provide additional explanation of current topic",
        "Share supplementary learning materials",
        "Schedule one-on-one clarification session",
        "Pair with peer mentor for support"
      ],
      status: "pending"
    },
    {
      id: 3,
      type: "performance",
      priority: "high",
      student: {
        name: "Lisa Thompson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        id: "STU003"
      },
      message: "Quiz performance significantly below average (45%)",
      timestamp: new Date(Date.now() - 600000),
      suggestions: [
        "Review quiz answers together",
        "Assign additional practice exercises",
        "Recommend tutoring resources",
        "Adjust learning path difficulty"
      ],
      status: "in-progress"
    },
    {
      id: 4,
      type: "engagement",
      priority: "low",
      student: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        id: "STU004"
      },
      message: "Low participation in class discussions",
      timestamp: new Date(Date.now() - 900000),
      suggestions: [
        "Encourage participation with easier questions",
        "Use interactive polling to increase engagement",
        "Create small group activities",
        "Provide positive reinforcement for contributions"
      ],
      status: "resolved"
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: "Adaptive Content Delivery",
      description: "3 students showing difficulty with current pace",
      action: "Slow down explanation and add visual aids",
      impact: "High",
      effort: "Low",
      icon: "BookOpen"
    },
    {
      id: 2,
      title: "Interactive Break",
      description: "Class attention average dropped to 72%",
      action: "Implement 5-minute interactive activity",
      impact: "Medium",
      effort: "Low",
      icon: "Activity"
    },
    {
      id: 3,
      title: "Concept Reinforcement",
      description: "Quiz results indicate knowledge gaps",
      action: "Review key concepts with different approach",
      impact: "High",
      effort: "Medium",
      icon: "RefreshCw"
    },
    {
      id: 4,
      title: "Peer Learning",
      description: "Some students excelling, others struggling",
      action: "Form mixed-ability study groups",
      impact: "Medium",
      effort: "Medium",
      icon: "Users"
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error bg-error/10 border-error/20',
      medium: 'text-warning bg-warning/10 border-warning/20',
      low: 'text-success bg-success/10 border-success/20'
    };
    return colors[priority] || 'text-muted-foreground bg-muted border-border';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-warning bg-warning/10',
      'in-progress': 'text-primary bg-primary/10',
      resolved: 'text-success bg-success/10'
    };
    return colors[status] || 'text-muted-foreground bg-muted';
  };

  const getTypeIcon = (type) => {
    const icons = {
      attention: 'Eye',
      emotion: 'Heart',
      performance: 'TrendingDown',
      engagement: 'Activity'
    };
    return icons[type] || 'AlertTriangle';
  };

  const getImpactColor = (impact) => {
    const colors = {
      High: 'text-error',
      Medium: 'text-warning',
      Low: 'text-success'
    };
    return colors[impact] || 'text-muted-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - timestamp) / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const handleAlertAction = (alertId, action) => {
    console.log(`Performing action: ${action} for alert: ${alertId}`);
    // Handle alert action
  };

  const handleRecommendationAction = (recommendationId) => {
    console.log(`Implementing recommendation: ${recommendationId}`);
    // Handle recommendation action
  };

  return (
    <div className="space-y-6">
      {/* Active Alerts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <h3 className="text-lg font-heading font-semibold text-foreground">Active Alerts</h3>
            <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
              {alerts.filter(a => a.status === 'pending').length}
            </span>
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure Alerts
          </Button>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${getPriorityColor(alert.priority)} ${
                selectedAlert === alert.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={alert.student.avatar}
                    alt={alert.student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name={getTypeIcon(alert.type)} size={16} />
                    <span className="font-medium text-foreground">{alert.student.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(alert.status)}`}>
                      {alert.status.replace('-', ' ')}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(alert.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-foreground mb-3">{alert.message}</p>
                  
                  {selectedAlert === alert.id && (
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Suggested Actions:</h5>
                        <div className="space-y-2">
                          {alert.suggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <span className="text-sm text-foreground">{suggestion}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAlertAction(alert.id, suggestion)}
                              >
                                Apply
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2 border-t border-border">
                        <Button variant="outline" size="sm" iconName="MessageCircle">
                          Message Student
                        </Button>
                        <Button variant="outline" size="sm" iconName="Calendar">
                          Schedule Meeting
                        </Button>
                        <Button variant="outline" size="sm" iconName="FileText">
                          Create Report
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                  >
                    <Icon name={selectedAlert === alert.id ? "ChevronUp" : "ChevronDown"} size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">AI Recommendations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border border-border rounded-lg p-4 hover:shadow-medium transition-shadow duration-200">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={rec.icon} size={20} className="text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                  <p className="text-sm text-foreground mb-3">{rec.action}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="flex items-center space-x-1">
                        <span className="text-muted-foreground">Impact:</span>
                        <span className={`font-medium ${getImpactColor(rec.impact)}`}>{rec.impact}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="text-muted-foreground">Effort:</span>
                        <span className={`font-medium ${getImpactColor(rec.effort)}`}>{rec.effort}</span>
                      </span>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRecommendationAction(rec.id)}
                    >
                      Implement
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intervention History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">Recent Interventions</h3>
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 1,
              action: "Sent clarification message to Michael Chen",
              timestamp: new Date(Date.now() - 1800000),
              result: "Attention improved by 25%",
              success: true
            },
            {
              id: 2,
              action: "Initiated breakout room for struggling students",
              timestamp: new Date(Date.now() - 3600000),
              result: "3 students showed improved engagement",
              success: true
            },
            {
              id: 3,
              action: "Adjusted content difficulty for advanced learners",
              timestamp: new Date(Date.now() - 5400000),
              result: "Class average performance increased by 12%",
              success: true
            },
            {
              id: 4,
              action: "Scheduled follow-up session with at-risk students",
              timestamp: new Date(Date.now() - 7200000),
              result: "2 out of 3 students attended",
              success: false
            }
          ].map((intervention) => (
            <div key={intervention.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                intervention.success ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'
              }`}>
                <Icon name={intervention.success ? "CheckCircle" : "AlertCircle"} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{intervention.action}</p>
                <p className="text-xs text-muted-foreground">{intervention.result}</p>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {formatTimeAgo(intervention.timestamp)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterventionPanel;