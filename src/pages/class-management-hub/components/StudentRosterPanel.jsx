import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const StudentRosterPanel = ({ students, onStudentAction, selectedStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const statusFilters = [
    { value: 'all', label: 'All Students', count: students.length },
    { value: 'active', label: 'Active', count: students.filter(s => s.status === 'active').length },
    { value: 'inactive', label: 'Inactive', count: students.filter(s => s.status === 'inactive').length },
    { value: 'attention', label: 'Low Attention', count: students.filter(s => s.attentionLevel < 60).length }
  ];

  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || 
        (filterStatus === 'active' && student.status === 'active') ||
        (filterStatus === 'inactive' && student.status === 'inactive') ||
        (filterStatus === 'attention' && student.attentionLevel < 60);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'attention':
          return b.attentionLevel - a.attentionLevel;
        case 'participation':
          return b.participationScore - a.participationScore;
        default:
          return 0;
      }
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'inactive': return 'text-error';
      case 'away': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getAttentionBadge = (level) => {
    if (level >= 80) return { color: 'bg-success', text: 'High' };
    if (level >= 60) return { color: 'bg-warning', text: 'Medium' };
    return { color: 'bg-error', text: 'Low' };
  };

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-text-primary">Student Roster</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onStudentAction('refresh')}
          >
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-1 mb-3">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value)}
              className={`
                px-2 py-1 rounded-md text-xs transition-smooth
                ${filterStatus === filter.value 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-text-secondary hover:text-text-primary'
                }
              `}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm"
        >
          <option value="name">Sort by Name</option>
          <option value="attention">Sort by Attention</option>
          <option value="participation">Sort by Participation</option>
        </select>
      </div>

      {/* Student List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {filteredStudents.map((student) => {
            const attentionBadge = getAttentionBadge(student.attentionLevel);
            const isSelected = selectedStudent?.id === student.id;

            return (
              <div
                key={student.id}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-smooth hover-lift
                  ${isSelected 
                    ? 'border-primary bg-primary bg-opacity-5' :'border-border bg-surface hover:bg-muted'
                  }
                `}
                onClick={() => onStudentAction('select', student)}
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <Image
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className={`
                      absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface
                      ${student.status === 'active' ? 'bg-success' : 
                        student.status === 'away' ? 'bg-warning' : 'bg-error'}
                    `} />
                  </div>

                  {/* Student Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm text-text-primary truncate">
                        {student.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {student.handRaised && (
                          <Icon name="Hand" size={12} className="text-warning" />
                        )}
                        {student.isPresenting && (
                          <Icon name="Monitor" size={12} className="text-primary" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className={`
                          px-2 py-0.5 rounded-full text-xs text-white
                          ${attentionBadge.color}
                        `}>
                          {attentionBadge.text}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {student.attentionLevel}%
                        </span>
                      </div>
                    </div>

                    {/* Alerts */}
                    {student.alerts.length > 0 && (
                      <div className="mt-2">
                        {student.alerts.slice(0, 1).map((alert, index) => (
                          <div key={index} className="flex items-center space-x-1">
                            <Icon name="AlertTriangle" size={10} className="text-error" />
                            <span className="text-xs text-error truncate">{alert}</span>
                          </div>
                        ))}
                        {student.alerts.length > 1 && (
                          <span className="text-xs text-text-secondary">
                            +{student.alerts.length - 1} more alerts
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStudentAction('message', student);
                      }}
                      className="w-6 h-6"
                    >
                      <Icon name="MessageSquare" size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStudentAction('mute', student);
                      }}
                      className="w-6 h-6"
                    >
                      <Icon name="MicOff" size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStudentAction('spotlight', student);
                      }}
                      className="w-6 h-6"
                    >
                      <Icon name="Zap" size={12} />
                    </Button>
                  </div>
                  <div className="text-xs text-text-secondary">
                    Participation: {student.participationScore}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Users" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No students found</p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onStudentAction('exportRoster')}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onStudentAction('addStudent')}
            iconName="UserPlus"
            iconPosition="left"
            iconSize={14}
          >
            Add Student
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentRosterPanel;