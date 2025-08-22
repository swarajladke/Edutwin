import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsCharts = () => {
  const [activeChart, setActiveChart] = useState('mastery');

  // Mock data for concept mastery heatmap
  const conceptMasteryData = [
    { name: 'Algebra', Math: 85, Science: 0, English: 0, History: 0 },
    { name: 'Geometry', Math: 78, Science: 0, English: 0, History: 0 },
    { name: 'Physics', Math: 0, Science: 92, English: 0, History: 0 },
    { name: 'Chemistry', Math: 0, Science: 88, English: 0, History: 0 },
    { name: 'Literature', Math: 0, Science: 0, English: 91, History: 0 },
    { name: 'Grammar', Math: 0, Science: 0, English: 76, History: 0 },
    { name: 'World Wars', Math: 0, Science: 0, English: 0, History: 89 },
    { name: 'Ancient History', Math: 0, Science: 0, English: 0, History: 82 }
  ];

  // Mock data for learning preferences
  const learningPreferencesData = [
    { name: 'Visual', value: 35, color: '#2563EB' },
    { name: 'Auditory', value: 28, color: '#059669' },
    { name: 'Kinesthetic', value: 22, color: '#F59E0B' },
    { name: 'Reading/Writing', value: 15, color: '#EF4444' }
  ];

  // Mock data for performance trends
  const performanceTrendsData = [
    { week: 'Week 1', attention: 78, engagement: 82, completion: 85 },
    { week: 'Week 2', attention: 82, engagement: 85, completion: 88 },
    { week: 'Week 3', attention: 75, engagement: 79, completion: 82 },
    { week: 'Week 4', attention: 88, engagement: 91, completion: 94 },
    { week: 'Week 5', attention: 85, engagement: 88, completion: 91 },
    { week: 'Week 6', attention: 90, engagement: 93, completion: 96 }
  ];

  // Mock data for student clustering
  const studentClusteringData = [
    { name: 'High Performers', students: 12, avgScore: 92, color: '#10B981' },
    { name: 'Steady Learners', students: 18, avgScore: 78, color: '#2563EB' },
    { name: 'Need Support', students: 8, avgScore: 65, color: '#F59E0B' },
    { name: 'At Risk', students: 4, avgScore: 52, color: '#EF4444' }
  ];

  const chartTabs = [
    { id: 'mastery', label: 'Concept Mastery', icon: 'BarChart3' },
    { id: 'preferences', label: 'Learning Preferences', icon: 'PieChart' },
    { id: 'trends', label: 'Performance Trends', icon: 'TrendingUp' },
    { id: 'clustering', label: 'Student Clustering', icon: 'Users' }
  ];

  const renderConceptMastery = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={conceptMasteryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
          <YAxis stroke="#6B7280" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E5E7EB', 
              borderRadius: '8px',
              fontSize: '12px'
            }} 
          />
          <Bar dataKey="Math" fill="#2563EB" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Science" fill="#059669" radius={[2, 2, 0, 0]} />
          <Bar dataKey="English" fill="#F59E0B" radius={[2, 2, 0, 0]} />
          <Bar dataKey="History" fill="#EF4444" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderLearningPreferences = () => (
    <div className="h-80 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={learningPreferencesData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
          >
            {learningPreferencesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E5E7EB', 
              borderRadius: '8px',
              fontSize: '12px'
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const renderPerformanceTrends = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={performanceTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="week" stroke="#6B7280" fontSize={12} />
          <YAxis stroke="#6B7280" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E5E7EB', 
              borderRadius: '8px',
              fontSize: '12px'
            }} 
          />
          <Line type="monotone" dataKey="attention" stroke="#2563EB" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="engagement" stroke="#059669" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="completion" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderStudentClustering = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={studentClusteringData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
          <YAxis stroke="#6B7280" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E5E7EB', 
              borderRadius: '8px',
              fontSize: '12px'
            }} 
          />
          <Bar dataKey="students" fill="#2563EB" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'mastery': return renderConceptMastery();
      case 'preferences': return renderLearningPreferences();
      case 'trends': return renderPerformanceTrends();
      case 'clustering': return renderStudentClustering();
      default: return renderConceptMastery();
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Analytics Dashboard
          </h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
        </div>

        {/* Chart Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {chartTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth
                ${activeChart === tab.id 
                  ? 'bg-surface text-text-primary shadow-subtle' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface hover:bg-opacity-50'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {renderActiveChart()}
      </div>

      {/* Chart Legend/Info */}
      <div className="p-4 border-t border-border bg-muted">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            {activeChart === 'mastery' && (
              <>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span className="text-text-secondary">Math</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-secondary rounded"></div>
                  <span className="text-text-secondary">Science</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-warning rounded"></div>
                  <span className="text-text-secondary">English</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-error rounded"></div>
                  <span className="text-text-secondary">History</span>
                </div>
              </>
            )}
            {activeChart === 'trends' && (
              <>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span className="text-text-secondary">Attention</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-secondary rounded"></div>
                  <span className="text-text-secondary">Engagement</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-warning rounded"></div>
                  <span className="text-text-secondary">Completion</span>
                </div>
              </>
            )}
          </div>
          <span className="text-text-secondary">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;