import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningPatternsChart = ({ chartData }) => {
  const [activeChart, setActiveChart] = useState('attention');

  const chartTypes = [
    { key: 'attention', label: 'Attention Levels', icon: 'Eye', color: 'var(--color-primary)' },
    { key: 'emotion', label: 'Emotional State', icon: 'Heart', color: 'var(--color-success)' },
    { key: 'performance', label: 'Performance', icon: 'TrendingUp', color: 'var(--color-accent)' }
  ];

  const getCurrentData = () => {
    return chartData[activeChart] || [];
  };

  const getCurrentColor = () => {
    return chartTypes.find(type => type.key === activeChart)?.color || 'var(--color-primary)';
  };

  const formatTooltipValue = (value, name) => {
    if (activeChart === 'attention') return [`${value}%`, 'Attention Level'];
    if (activeChart === 'emotion') return [`${value}/10`, 'Emotional Score'];
    if (activeChart === 'performance') return [`${value}%`, 'Performance Score'];
    return [value, name];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Learning Patterns</h3>
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {chartTypes.map((type) => (
            <Button
              key={type.key}
              variant={activeChart === type.key ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveChart(type.key)}
              iconName={type.icon}
              iconPosition="left"
              iconSize={14}
              className="px-3 py-1.5 text-xs"
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === 'emotion' ? (
            <AreaChart data={getCurrentData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                domain={[0, 10]}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                labelStyle={{ color: 'var(--color-text-primary)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={getCurrentColor()}
                fill={getCurrentColor()}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <LineChart data={getCurrentData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                labelStyle={{ color: 'var(--color-text-primary)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={getCurrentColor()}
                strokeWidth={3}
                dot={{ fill: getCurrentColor(), strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: getCurrentColor(), strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Insights */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5" />
          <div>
            <p className="text-sm font-medium text-text-primary mb-1">AI Insight</p>
            <p className="text-xs text-text-secondary">
              {activeChart === 'attention' && "Your attention peaks during morning sessions (9-11 AM). Consider scheduling challenging topics during this time."}
              {activeChart === 'emotion' && "Positive emotional states correlate with better retention. Interactive content boosts your engagement by 23%."}
              {activeChart === 'performance' && "Performance improves with consistent practice. Your learning velocity increases by 15% with daily sessions."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPatternsChart;