import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClassTabs = ({ activeTab, onTabChange }) => {
  const [showAllClasses, setShowAllClasses] = useState(false);

  const classes = [
    {
      id: 'math-101',
      name: 'Advanced Mathematics',
      code: 'MATH-101',
      students: 32,
      activeStudents: 28,
      avgPerformance: 87.5,
      lastSession: new Date(Date.now() - 3600000),
      status: 'active',
      color: 'bg-primary'
    },
    {
      id: 'phys-201',
      name: 'Quantum Physics',
      code: 'PHYS-201',
      students: 24,
      activeStudents: 22,
      avgPerformance: 79.2,
      lastSession: new Date(Date.now() - 7200000),
      status: 'scheduled',
      color: 'bg-secondary'
    },
    {
      id: 'chem-150',
      name: 'Organic Chemistry',
      code: 'CHEM-150',
      students: 28,
      activeStudents: 25,
      avgPerformance: 82.8,
      lastSession: new Date(Date.now() - 86400000),
      status: 'completed',
      color: 'bg-accent'
    },
    {
      id: 'bio-120',
      name: 'Molecular Biology',
      code: 'BIO-120',
      students: 30,
      activeStudents: 27,
      avgPerformance: 91.3,
      lastSession: new Date(Date.now() - 172800000),
      status: 'completed',
      color: 'bg-success'
    },
    {
      id: 'eng-101',
      name: 'Advanced English',
      code: 'ENG-101',
      students: 26,
      activeStudents: 24,
      avgPerformance: 88.7,
      lastSession: new Date(Date.now() - 259200000),
      status: 'scheduled',
      color: 'bg-warning'
    }
  ];

  const visibleClasses = showAllClasses ? classes : classes.slice(0, 3);

  const getStatusIcon = (status) => {
    const icons = {
      active: 'Play',
      scheduled: 'Clock',
      completed: 'CheckCircle'
    };
    return icons[status] || 'Circle';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-success',
      scheduled: 'text-warning',
      completed: 'text-muted-foreground'
    };
    return colors[status] || 'text-muted-foreground';
  };

  const formatLastSession = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="BookOpen" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">My Classes</h3>
          <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
            {classes.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllClasses(!showAllClasses)}
            iconName={showAllClasses ? "ChevronUp" : "ChevronDown"}
          >
            {showAllClasses ? 'Show Less' : 'Show All'}
          </Button>
          <Button variant="outline" size="sm" iconName="Plus">
            Add Class
          </Button>
        </div>
      </div>

      {/* Class Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {visibleClasses.map((classItem) => (
          <button
            key={classItem.id}
            onClick={() => onTabChange(classItem.id)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg border transition-all duration-200 hover:shadow-medium ${
              activeTab === classItem.id
                ? 'border-primary bg-primary/5 shadow-soft'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${classItem.color}`}></div>
            
            <div className="text-left">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-foreground text-sm">{classItem.name}</span>
                <Icon 
                  name={getStatusIcon(classItem.status)} 
                  size={12} 
                  className={getStatusColor(classItem.status)} 
                />
              </div>
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <span>{classItem.code}</span>
                <span>•</span>
                <span>{classItem.activeStudents}/{classItem.students} students</span>
                <span>•</span>
                <span>{formatLastSession(classItem.lastSession)}</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {classItem.avgPerformance}%
              </div>
              <div className="text-xs text-muted-foreground">avg</div>
            </div>
          </button>
        ))}
      </div>

      {/* Active Class Details */}
      {activeTab && (
        <div className="border-t border-border pt-6">
          {(() => {
            const currentClass = classes.find(c => c.id === activeTab);
            if (!currentClass) return null;

            return (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md font-heading font-semibold text-foreground">
                      {currentClass.name} ({currentClass.code})
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Last session: {formatLastSession(currentClass.lastSession)}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" iconName="Video">
                      Start Session
                    </Button>
                    <Button variant="outline" size="sm" iconName="Settings">
                      Manage
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Users" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">Total Students</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">{currentClass.students}</div>
                    <div className="text-xs text-success">
                      {currentClass.activeStudents} active
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="TrendingUp" size={16} className="text-secondary" />
                      <span className="text-sm font-medium text-foreground">Avg Performance</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">{currentClass.avgPerformance}%</div>
                    <div className="text-xs text-success">+2.3% this week</div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Activity" size={16} className="text-accent" />
                      <span className="text-sm font-medium text-foreground">Engagement</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">92%</div>
                    <div className="text-xs text-success">+5.1% this week</div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="AlertTriangle" size={16} className="text-warning" />
                      <span className="text-sm font-medium text-foreground">At Risk</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">2</div>
                    <div className="text-xs text-error">Needs attention</div>
                  </div>
                </div>

                {/* Quick Actions for Active Class */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  <Button variant="ghost" size="sm" iconName="BarChart3">
                    View Analytics
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Users">
                    Student List
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Calendar">
                    Schedule Session
                  </Button>
                  <Button variant="ghost" size="sm" iconName="FileText">
                    Generate Report
                  </Button>
                  <Button variant="ghost" size="sm" iconName="MessageSquare">
                    Send Announcement
                  </Button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default ClassTabs;