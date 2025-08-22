import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const LiveAnalyticsDashboard = ({ classData, selectedStudent }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock real-time data
  const attentionData = [
    { time: '10:00', attention: 85 },
    { time: '10:05', attention: 78 },
    { time: '10:10', attention: 82 },
    { time: '10:15', attention: 75 },
    { time: '10:20', attention: 88 },
    { time: '10:25', attention: 79 },
    { time: '10:30', attention: 84 }
  ];

  const participationData = [
    { name: 'Active', value: 12, color: '#10B981' },
    { name: 'Passive', value: 8, color: '#F59E0B' },
    { name: 'Distracted', value: 3, color: '#EF4444' }
  ];

  const emotionData = [
    { emotion: 'Happy', count: 8 },
    { emotion: 'Focused', count: 12 },
    { emotion: 'Confused', count: 2 },
    { emotion: 'Neutral', count: 1 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'attention', label: 'Attention', icon: 'Eye' },
    { id: 'emotions', label: 'Emotions', icon: 'Heart' },
    { id: 'alerts', label: 'Alerts', icon: 'AlertTriangle' }
  ];

  const renderOverview = () => (
    <div className="space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium">Active Students</span>
          </div>
          <p className="text-2xl font-bold text-text-primary mt-1">
            {classData.activeStudents}/{classData.totalStudents}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium">Avg Attention</span>
          </div>
          <p className="text-2xl font-bold text-text-primary mt-1">
            {classData.averageAttention}%
          </p>
        </div>
      </div>

      {/* Participation Chart */}
      <div className="bg-muted rounded-lg p-3">
        <h4 className="font-medium text-sm mb-3 flex items-center">
          <Icon name="PieChart" size={16} className="mr-2" />
          Participation Distribution
        </h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={participationData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={50}
                dataKey="value"
              >
                {participationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* At-Risk Students */}
      <div className="bg-muted rounded-lg p-3">
        <h4 className="font-medium text-sm mb-3 flex items-center">
          <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
          At-Risk Students
        </h4>
        <div className="space-y-2">
          {classData.atRiskStudents.map((student) => (
            <div key={student.id} className="flex items-center justify-between bg-surface rounded p-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-error rounded-full flex items-center justify-center">
                  <Icon name="User" size={12} color="white" />
                </div>
                <span className="text-sm">{student.name}</span>
              </div>
              <span className="text-xs text-error">{student.reason}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAttention = () => (
    <div className="space-y-4">
      <div className="bg-muted rounded-lg p-3">
        <h4 className="font-medium text-sm mb-3">Class Attention Trend</h4>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attentionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="attention" stroke="#2563EB" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attention Heatmap */}
      <div className="bg-muted rounded-lg p-3">
        <h4 className="font-medium text-sm mb-3">Attention Heatmap</h4>
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }, (_, i) => {
            const attention = Math.floor(Math.random() * 40) + 60;
            const color = attention >= 80 ? 'bg-success' : attention >= 60 ? 'bg-warning' : 'bg-error';
            return (
              <div key={i} className={`h-8 rounded ${color} opacity-70`} />
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderEmotions = () => (
    <div className="space-y-4">
      <div className="bg-muted rounded-lg p-3">
        <h4 className="font-medium text-sm mb-3">Emotion Distribution</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={emotionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="emotion" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Emotion Timeline */}
      <div className="bg-muted rounded-lg p-3">
        <h4 className="font-medium text-sm mb-3">Recent Emotion Changes</h4>
        <div className="space-y-2">
          {[
            { time: '10:28', student: 'Sarah Chen', emotion: 'confused', previous: 'focused' },
            { time: '10:25', student: 'Mike Johnson', emotion: 'happy', previous: 'neutral' },
            { time: '10:22', student: 'Emma Davis', emotion: 'focused', previous: 'distracted' }
          ].map((change, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">{change.time}</span>
              <span className="font-medium">{change.student}</span>
              <div className="flex items-center space-x-1">
                <span className="text-text-secondary">{change.previous}</span>
                <Icon name="ArrowRight" size={12} />
                <span className="text-primary">{change.emotion}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-3">
      {classData.recentAlerts.map((alert, index) => (
        <div key={index} className={`
          bg-muted rounded-lg p-3 border-l-4
          ${alert.priority === 'high' ? 'border-error' : 
            alert.priority === 'medium' ? 'border-warning' : 'border-primary'}
        `}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Icon 
                  name={alert.type === 'attention' ? 'Eye' : alert.type === 'emotion' ? 'Heart' : 'AlertTriangle'} 
                  size={14} 
                  className={
                    alert.priority === 'high' ? 'text-error' : 
                    alert.priority === 'medium' ? 'text-warning' : 'text-primary'
                  }
                />
                <span className="text-sm font-medium">{alert.student}</span>
                <span className="text-xs text-text-secondary">{alert.time}</span>
              </div>
              <p className="text-sm text-text-secondary">{alert.message}</p>
            </div>
            <button className="text-text-secondary hover:text-text-primary">
              <Icon name="X" size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-text-primary">Live Analytics</h3>
        <p className="text-sm text-text-secondary mt-1">Real-time class insights</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-1 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-1 px-3 py-2 rounded-md text-sm transition-smooth
                ${activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
            >
              <Icon name={tab.icon} size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'attention' && renderAttention()}
        {activeTab === 'emotions' && renderEmotions()}
        {activeTab === 'alerts' && renderAlerts()}
      </div>
    </div>
  );
};

export default LiveAnalyticsDashboard;