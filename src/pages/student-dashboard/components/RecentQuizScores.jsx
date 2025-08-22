import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentQuizScores = ({ quizzes, onViewAll }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getGradeIcon = (score) => {
    if (score >= 90) return 'Trophy';
    if (score >= 70) return 'Star';
    return 'AlertCircle';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-text-primary flex items-center space-x-2">
          <Icon name="BarChart3" size={18} />
          <span>Recent Quiz Scores</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {quizzes.slice(0, 3).map((quiz) => (
          <div key={quiz.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full bg-opacity-10 flex items-center justify-center ${getScoreColor(quiz.score)} bg-current`}>
                <Icon name={getGradeIcon(quiz.score)} size={16} color="currentColor" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary text-sm mb-1">
                  {quiz.title}
                </h4>
                <div className="flex items-center space-x-3 text-xs text-text-secondary">
                  <span>{quiz.subject}</span>
                  <span>•</span>
                  <span>{quiz.date}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-lg font-heading font-semibold ${getScoreColor(quiz.score)}`}>
                {quiz.score}%
              </div>
              <div className="text-xs text-text-secondary">
                {quiz.questionsCorrect}/{quiz.totalQuestions}
              </div>
            </div>
          </div>
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          <Icon name="BarChart3" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No recent quiz scores</p>
        </div>
      )}
    </div>
  );
};

export default RecentQuizScores;