import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const PerformanceMetrics = () => {
  const classMetrics = [
    { id: 1, title: "Class Average", value: "87.5%", change: "+5.2%", trend: "up", icon: "TrendingUp", color: "text-success" },
    { id: 2, title: "Engagement Level", value: "92.3%", change: "+2.1%", trend: "up", icon: "Activity", color: "text-primary" },
    { id: 3, title: "At-Risk Students", value: "3", change: "-2", trend: "down", icon: "AlertTriangle", color: "text-warning" },
    { id: 4, title: "Completion Rate", value: "94.7%", change: "+1.8%", trend: "up", icon: "CheckCircle", color: "text-success" }
  ];

  const performanceData = [
    { month: 'Jan', score: 78, engagement: 85 },
    { month: 'Feb', score: 82, engagement: 88 },
    { month: 'Mar', score: 85, engagement: 90 },
    { month: 'Apr', score: 87, engagement: 92 },
    { month: 'May', score: 89, engagement: 94 },
    { month: 'Jun', score: 91, engagement: 96 }
  ];

  const subjectDistribution = [
    { name: 'Mathematics', value: 35, color: '#2563EB' },
    { name: 'Science', value: 28, color: '#7C3AED' },
    { name: 'English', value: 22, color: '#059669' },
    { name: 'History', value: 15, color: '#F59E0B' }
  ];

  const weeklyActivity = [
    { day: 'Mon', active: 28, total: 32 },
    { day: 'Tue', active: 30, total: 32 },
    { day: 'Wed', active: 25, total: 32 },
    { day: 'Thu', active: 29, total: 32 },
    { day: 'Fri', active: 31, total: 32 },
    { day: 'Sat', active: 18, total: 32 },
    { day: 'Sun', active: 12, total: 32 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classMetrics.map((metric) => (
          <div key={metric.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-medium transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${metric.color}`}>
                <Icon name={metric.icon} size={24} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-success' : 'text-error'
              }`}>
                <Icon name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                <span>{metric.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
                {metric.value}
              </h3>
              <p className="text-sm text-muted-foreground">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-foreground">Performance Trends</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Average Score</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-muted-foreground">Engagement</span>
              </div>
            </div>
          </div>
          <div className="w-full h-64" aria-label="Performance Trends Line Chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }} 
                />
                <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={3} dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="engagement" stroke="#7C3AED" strokeWidth={3} dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-foreground">Subject Distribution</h3>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-64" aria-label="Subject Distribution Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {subjectDistribution.map((subject) => (
              <div key={subject.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                <span className="text-sm text-muted-foreground">{subject.name}</span>
                <span className="text-sm font-medium text-foreground">{subject.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">Weekly Student Activity</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} />
            <span>32 Total Students</span>
          </div>
        </div>
        <div className="w-full h-64" aria-label="Weekly Activity Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="active" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;