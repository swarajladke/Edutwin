import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LearningCard = ({ lesson, onStart }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success bg-opacity-10';
      case 'Intermediate': return 'text-warning bg-warning bg-opacity-10';
      case 'Advanced': return 'text-error bg-error bg-opacity-10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'Play';
      case 'quiz': return 'HelpCircle';
      case 'reading': return 'BookOpen';
      case 'interactive': return 'Zap';
      default: return 'FileText';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle hover-lift transition-smooth overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        <Image 
          src={lesson.thumbnail} 
          alt={lesson.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <Icon name={getTypeIcon(lesson.type)} size={16} color="var(--color-primary)" />
          </div>
        </div>
        {lesson.isNew && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              New
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-heading font-medium text-text-primary mb-1 line-clamp-2">
            {lesson.title}
          </h3>
          <p className="text-sm text-text-secondary">{lesson.subject}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{lesson.duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{lesson.enrolled} students</span>
          </div>
        </div>

        {lesson.progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
              <span>Progress</span>
              <span>{lesson.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-primary rounded-full h-1.5 transition-all duration-300"
                style={{ width: `${lesson.progress}%` }}
              />
            </div>
          </div>
        )}

        <Button
          variant={lesson.progress > 0 ? "outline" : "default"}
          size="sm"
          fullWidth
          onClick={() => onStart(lesson)}
          iconName={lesson.progress > 0 ? "RotateCcw" : "Play"}
          iconPosition="left"
          iconSize={16}
        >
          {lesson.progress > 0 ? "Continue" : "Start Learning"}
        </Button>
      </div>
    </div>
  );
};

export default LearningCard;