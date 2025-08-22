import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StudentRoster = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const students = [
    {
      id: 1,
      name: "Emma Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      email: "emma.johnson@school.edu",
      performance: 92,
      attention: 88,
      engagement: 95,
      emotion: "focused",
      lastActive: "2 minutes ago",
      status: "online",
      riskLevel: "low",
      completedTasks: 18,
      totalTasks: 20,
      learningStyle: "visual"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      email: "michael.chen@school.edu",
      performance: 78,
      attention: 65,
      engagement: 72,
      emotion: "confused",
      lastActive: "5 minutes ago",
      status: "online",
      riskLevel: "medium",
      completedTasks: 14,
      totalTasks: 20,
      learningStyle: "kinesthetic"
    },
    {
      id: 3,
      name: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      email: "sarah.williams@school.edu",
      performance: 96,
      attention: 94,
      engagement: 98,
      emotion: "engaged",
      lastActive: "1 minute ago",
      status: "online",
      riskLevel: "low",
      completedTasks: 20,
      totalTasks: 20,
      learningStyle: "auditory"
    },
    {
      id: 4,
      name: "David Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      email: "david.rodriguez@school.edu",
      performance: 65,
      attention: 58,
      engagement: 62,
      emotion: "frustrated",
      lastActive: "15 minutes ago",
      status: "away",
      riskLevel: "high",
      completedTasks: 11,
      totalTasks: 20,
      learningStyle: "visual"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      email: "lisa.thompson@school.edu",
      performance: 84,
      attention: 82,
      engagement: 86,
      emotion: "neutral",
      lastActive: "8 minutes ago",
      status: "online",
      riskLevel: "low",
      completedTasks: 16,
      totalTasks: 20,
      learningStyle: "reading"
    },
    {
      id: 6,
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      email: "james.wilson@school.edu",
      performance: 71,
      attention: 69,
      engagement: 74,
      emotion: "bored",
      lastActive: "12 minutes ago",
      status: "online",
      riskLevel: "medium",
      completedTasks: 13,
      totalTasks: 20,
      learningStyle: "kinesthetic"
    }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'performance', label: 'Performance' },
    { value: 'attention', label: 'Attention Score' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'riskLevel', label: 'Risk Level' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Students' },
    { value: 'online', label: 'Online Only' },
    { value: 'high-risk', label: 'High Risk' },
    { value: 'medium-risk', label: 'Medium Risk' },
    { value: 'low-risk', label: 'Low Risk' }
  ];

  const getEmotionColor = (emotion) => {
    const colors = {
      focused: 'text-success bg-success/10',
      engaged: 'text-primary bg-primary/10',
      neutral: 'text-muted-foreground bg-muted',
      confused: 'text-warning bg-warning/10',
      frustrated: 'text-error bg-error/10',
      bored: 'text-muted-foreground bg-muted'
    };
    return colors[emotion] || 'text-muted-foreground bg-muted';
  };

  const getRiskLevelColor = (level) => {
    const colors = {
      low: 'text-success bg-success/10',
      medium: 'text-warning bg-warning/10',
      high: 'text-error bg-error/10'
    };
    return colors[level] || 'text-muted-foreground bg-muted';
  };

  const getStatusColor = (status) => {
    const colors = {
      online: 'bg-success',
      away: 'bg-warning',
      offline: 'bg-muted-foreground'
    };
    return colors[status] || 'bg-muted-foreground';
  };

  const filteredAndSortedStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === 'all') return matchesSearch;
      if (filterBy === 'online') return matchesSearch && student.status === 'online';
      if (filterBy.includes('risk')) {
        const riskLevel = filterBy.split('-')[0];
        return matchesSearch && student.riskLevel === riskLevel;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'performance') return b.performance - a.performance;
      if (sortBy === 'attention') return b.attention - a.attention;
      if (sortBy === 'engagement') return b.engagement - a.engagement;
      if (sortBy === 'riskLevel') {
        const riskOrder = { high: 3, medium: 2, low: 1 };
        return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
      }
      return 0;
    });

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredAndSortedStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredAndSortedStudents.map(s => s.id));
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">Student Roster</h3>
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedStudents.length} of {students.length} students
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-full sm:w-40"
            />
            
            <Select
              options={filterOptions}
              value={filterBy}
              onChange={setFilterBy}
              placeholder="Filter"
              className="w-full sm:w-40"
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedStudents.length > 0 && (
          <div className="mt-4 p-4 bg-muted rounded-lg flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Send Message
              </Button>
              <Button variant="outline" size="sm">
                Generate Report
              </Button>
              <Button variant="outline" size="sm">
                Schedule Meeting
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedStudents.length === filteredAndSortedStudents.length && filteredAndSortedStudents.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Performance</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Attention</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Engagement</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Emotion</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Risk Level</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Progress</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedStudents.map((student) => (
              <tr key={student.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentSelect(student.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(student.status)}`}></div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                      <div className="text-xs text-muted-foreground">{student.lastActive}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${student.performance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-foreground w-12">{student.performance}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${student.attention}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-foreground w-12">{student.attention}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${student.engagement}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-foreground w-12">{student.engagement}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getEmotionColor(student.emotion)}`}>
                    {student.emotion}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getRiskLevelColor(student.riskLevel)}`}>
                    {student.riskLevel}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="font-medium text-foreground">{student.completedTasks}/{student.totalTasks}</div>
                    <div className="text-muted-foreground">tasks completed</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" title="View Details">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" title="Send Message">
                      <Icon name="MessageCircle" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" title="More Options">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedStudents.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No students found</h4>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StudentRoster;