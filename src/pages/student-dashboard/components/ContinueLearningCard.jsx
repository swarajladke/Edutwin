import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContinueLearningCard = ({ currentLesson, onContinue }) => {
  const progressPercentage = Math.round((currentLesson.completedSteps / currentLesson.totalSteps) * 100);

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white shadow-moderate hover-lift">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-heading font-semibold mb-2">Continue Learning</h2>
          <h3 className="text-lg font-medium opacity-90 mb-1">{currentLesson.title}</h3>
          <p className="text-sm opacity-75">{currentLesson.subject} • {currentLesson.chapter}</p>
        </div>
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-white bg-opacity-20 flex-shrink-0 ml-4">
          <Image 
            src={currentLesson.thumbnail} 
            alt={currentLesson.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="opacity-90">Progress</span>
          <span className="font-medium">{progressPercentage}% Complete</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{currentLesson.estimatedTime} min left</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="BookOpen" size={16} />
            <span>Step {currentLesson.completedSteps + 1} of {currentLesson.totalSteps}</span>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onContinue}
          iconName="Play"
          iconPosition="left"
          iconSize={16}
          className="bg-white text-primary hover:bg-gray-100"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ContinueLearningCard;