import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    class: '',
    dateRange: 'today',
    metric: 'all',
    priority: 'all',
    searchTerm: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const classOptions = [
    { value: '', label: 'All Classes' },
    { value: 'grade-9a', label: 'Grade 9A' },
    { value: 'grade-9b', label: 'Grade 9B' },
    { value: 'grade-10a', label: 'Grade 10A' },
    { value: 'grade-10b', label: 'Grade 10B' },
    { value: 'grade-11a', label: 'Grade 11A' },
    { value: 'grade-11b', label: 'Grade 11B' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const metricOptions = [
    { value: 'all', label: 'All Metrics' },
    { value: 'attention', label: 'Attention Level' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'emotion', label: 'Emotional State' },
    { value: 'performance', label: 'Performance' },
    { value: 'drowsiness', label: 'Drowsiness' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      class: '',
      dateRange: 'today',
      metric: 'all',
      priority: 'all',
      searchTerm: ''
    };
    setFilters(resetFilters);
    onFiltersChange?.(resetFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== 'all' && value !== 'today'
  );

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-text-secondary" />
            <h3 className="font-medium text-text-primary">Filters</h3>
            {hasActiveFilters && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                iconName="X"
                iconPosition="left"
                iconSize={14}
              >
                Reset
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className={`
        p-4 space-y-4
        ${isExpanded ? 'block' : 'hidden lg:block'}
      `}>
        {/* Search */}
        <div>
          <Input
            type="search"
            placeholder="Search students, activities..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Quick Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Class"
            options={classOptions}
            value={filters.class}
            onChange={(value) => handleFilterChange('class', value)}
            placeholder="Select class"
          />

          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />

          <Select
            label="Metric Type"
            options={metricOptions}
            value={filters.metric}
            onChange={(value) => handleFilterChange('metric', value)}
          />

          <Select
            label="Priority Level"
            options={priorityOptions}
            value={filters.priority}
            onChange={(value) => handleFilterChange('priority', value)}
          />
        </div>

        {/* Custom Date Range */}
        {filters.dateRange === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <Input
              type="date"
              label="Start Date"
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
            <Input
              type="date"
              label="End Date"
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>
        )}

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('priority', 'high')}
            iconName="AlertTriangle"
            iconPosition="left"
            iconSize={14}
          >
            High Priority Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('metric', 'attention')}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            Attention Issues
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('dateRange', 'today')}
            iconName="Calendar"
            iconPosition="left"
            iconSize={14}
          >
            Today Only
          </Button>
        </div>

        {/* Applied Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-border">
            <p className="text-sm text-text-secondary mb-2">Applied filters:</p>
            <div className="flex flex-wrap gap-2">
              {filters.class && (
                <span className="inline-flex items-center space-x-1 bg-primary bg-opacity-10 text-primary text-xs px-2 py-1 rounded">
                  <span>Class: {classOptions.find(opt => opt.value === filters.class)?.label}</span>
                  <button onClick={() => handleFilterChange('class', '')}>
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters.dateRange !== 'today' && (
                <span className="inline-flex items-center space-x-1 bg-primary bg-opacity-10 text-primary text-xs px-2 py-1 rounded">
                  <span>Date: {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}</span>
                  <button onClick={() => handleFilterChange('dateRange', 'today')}>
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters.metric !== 'all' && (
                <span className="inline-flex items-center space-x-1 bg-primary bg-opacity-10 text-primary text-xs px-2 py-1 rounded">
                  <span>Metric: {metricOptions.find(opt => opt.value === filters.metric)?.label}</span>
                  <button onClick={() => handleFilterChange('metric', 'all')}>
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters.priority !== 'all' && (
                <span className="inline-flex items-center space-x-1 bg-primary bg-opacity-10 text-primary text-xs px-2 py-1 rounded">
                  <span>Priority: {priorityOptions.find(opt => opt.value === filters.priority)?.label}</span>
                  <button onClick={() => handleFilterChange('priority', 'all')}>
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterControls;