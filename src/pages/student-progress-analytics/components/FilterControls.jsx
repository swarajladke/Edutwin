import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ onFiltersChange, subjects }) => {
  const [filters, setFilters] = useState({
    dateRange: '7days',
    subject: 'all',
    metric: 'all',
    startDate: '',
    endDate: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '3months', label: 'Last 3 months' },
    { value: '6months', label: 'Last 6 months' },
    { value: 'custom', label: 'Custom range' }
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    ...subjects.map(subject => ({
      value: subject.id,
      label: subject.name
    }))
  ];

  const metricOptions = [
    { value: 'all', label: 'All Metrics' },
    { value: 'attention', label: 'Attention Levels' },
    { value: 'emotion', label: 'Emotional State' },
    { value: 'performance', label: 'Performance' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'retention', label: 'Retention' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: '7days',
      subject: 'all',
      metric: 'all',
      startDate: '',
      endDate: ''
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = () => {
    return filters.subject !== 'all' || 
           filters.metric !== 'all' || 
           filters.dateRange !== '7days' ||
           filters.startDate || 
           filters.endDate;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-subtle mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} color="var(--color-text-secondary)" />
          <h3 className="font-medium text-text-primary">Filters</h3>
          {hasActiveFilters() && (
            <div className="w-2 h-2 bg-primary rounded-full" />
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
              className="text-xs"
            >
              Clear
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

      <div className={`
        grid gap-4 transition-all duration-300
        ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] lg:grid-rows-[1fr]'}
        lg:grid-cols-4
      `}>
        <div className="overflow-hidden">
          <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4">
            {/* Date Range */}
            <div>
              <Select
                label="Date Range"
                options={dateRangeOptions}
                value={filters.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
                className="w-full"
              />
            </div>

            {/* Subject Filter */}
            <div>
              <Select
                label="Subject"
                options={subjectOptions}
                value={filters.subject}
                onChange={(value) => handleFilterChange('subject', value)}
                className="w-full"
              />
            </div>

            {/* Metric Filter */}
            <div>
              <Select
                label="Metric"
                options={metricOptions}
                value={filters.metric}
                onChange={(value) => handleFilterChange('metric', value)}
                className="w-full"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex items-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={14}
                className="flex-1"
              >
                Export
              </Button>
            </div>
          </div>

          {/* Custom Date Range */}
          {filters.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
              <Input
                label="Start Date"
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <span>Active filters:</span>
            <div className="flex flex-wrap gap-1">
              {filters.subject !== 'all' && (
                <span className="px-2 py-1 bg-primary bg-opacity-10 text-primary rounded-full">
                  {subjectOptions.find(s => s.value === filters.subject)?.label}
                </span>
              )}
              {filters.metric !== 'all' && (
                <span className="px-2 py-1 bg-primary bg-opacity-10 text-primary rounded-full">
                  {metricOptions.find(m => m.value === filters.metric)?.label}
                </span>
              )}
              {filters.dateRange !== '7days' && (
                <span className="px-2 py-1 bg-primary bg-opacity-10 text-primary rounded-full">
                  {dateRangeOptions.find(d => d.value === filters.dateRange)?.label}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;