import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailedBreakdown = ({ quizData, conceptDifficulty, feedbackData }) => {
  const [activeSection, setActiveSection] = useState('quiz');

  const sections = [
    { key: 'quiz', label: 'Quiz Performance', icon: 'FileQuestion' },
    { key: 'concepts', label: 'Concept Difficulty', icon: 'Target' },
    { key: 'feedback', label: 'AI Feedback', icon: 'MessageSquare' }
  ];

  const COLORS = ['var(--color-success)', 'var(--color-warning)', 'var(--color-error)', 'var(--color-primary)'];

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Easy': return 'text-success bg-success bg-opacity-10';
      case 'Medium': return 'text-warning bg-warning bg-opacity-10';
      case 'Hard': return 'text-error bg-error bg-opacity-10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const formatQuizScore = (score) => {
    return `${score}%`;
  };

  const renderQuizPerformance = () => (
    <div className="space-y-6">
      {/* Quiz Scores Chart */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-4">Recent Quiz Scores</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={quizData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="quiz" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Score']}
                labelStyle={{ color: 'var(--color-text-primary)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="score" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quiz Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-muted bg-opacity-50 rounded-lg">
          <div className="text-lg font-heading font-semibold text-text-primary">
            {Math.round(quizData.reduce((acc, quiz) => acc + quiz.score, 0) / quizData.length)}%
          </div>
          <div className="text-xs text-text-secondary">Average Score</div>
        </div>
        <div className="text-center p-3 bg-muted bg-opacity-50 rounded-lg">
          <div className="text-lg font-heading font-semibold text-text-primary">
            {Math.max(...quizData.map(q => q.score))}%
          </div>
          <div className="text-xs text-text-secondary">Best Score</div>
        </div>
        <div className="text-center p-3 bg-muted bg-opacity-50 rounded-lg">
          <div className="text-lg font-heading font-semibold text-text-primary">
            {quizData.length}
          </div>
          <div className="text-xs text-text-secondary">Quizzes Taken</div>
        </div>
        <div className="text-center p-3 bg-muted bg-opacity-50 rounded-lg">
          <div className="text-lg font-heading font-semibold text-text-primary">
            {quizData.filter(q => q.score >= 80).length}
          </div>
          <div className="text-xs text-text-secondary">High Scores</div>
        </div>
      </div>
    </div>
  );

  const renderConceptDifficulty = () => (
    <div className="space-y-6">
      {/* Difficulty Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-4">Difficulty Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conceptDifficulty.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {conceptDifficulty.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Concepts']}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-text-primary mb-4">Concept Breakdown</h4>
          <div className="space-y-3">
            {conceptDifficulty.concepts.map((concept) => (
              <div key={concept.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="BookOpen" size={14} color="var(--color-text-secondary)" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary text-sm">{concept.name}</p>
                    <p className="text-xs text-text-secondary">{concept.attempts} attempts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(concept.difficulty)}`}>
                    {concept.difficulty}
                  </span>
                  <span className="text-sm font-medium text-text-primary">{concept.mastery}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIFeedback = () => (
    <div className="space-y-4">
      {feedbackData.map((feedback) => (
        <div key={feedback.id} className="border border-border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Bot" size={16} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-text-primary">{feedback.topic}</h4>
                <span className="text-xs text-text-secondary">{feedback.date}</span>
              </div>
              <p className="text-sm text-text-secondary mb-3">{feedback.message}</p>
              
              {feedback.suggestions && (
                <div className="space-y-2">
                  <h5 className="text-xs font-medium text-text-primary">Suggestions:</h5>
                  <ul className="space-y-1">
                    {feedback.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={12} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-text-secondary">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback.resources && (
                <div className="mt-3 pt-3 border-t border-border">
                  <h5 className="text-xs font-medium text-text-primary mb-2">Recommended Resources:</h5>
                  <div className="flex flex-wrap gap-2">
                    {feedback.resources.map((resource, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        iconName="ExternalLink"
                        iconPosition="right"
                        iconSize={12}
                        className="text-xs px-2 py-1"
                      >
                        {resource}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Detailed Breakdown</h3>
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {sections.map((section) => (
            <Button
              key={section.key}
              variant={activeSection === section.key ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveSection(section.key)}
              iconName={section.icon}
              iconPosition="left"
              iconSize={14}
              className="px-3 py-1.5 text-xs"
            >
              {section.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        {activeSection === 'quiz' && renderQuizPerformance()}
        {activeSection === 'concepts' && renderConceptDifficulty()}
        {activeSection === 'feedback' && renderAIFeedback()}
      </div>
    </div>
  );
};

export default DetailedBreakdown;