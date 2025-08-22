import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeMessage = ({ onQuickStart }) => {
  const quickStartOptions = [
    {
      title: "Explain a Concept",
      description: "Get detailed explanations with examples",
      icon: "Lightbulb",
      action: () => onQuickStart("Explain the concept of photosynthesis in simple terms")
    },
    {
      title: "Practice Problems",
      description: "Get practice questions on any topic",
      icon: "Target",
      action: () => onQuickStart("Give me 5 practice problems on quadratic equations")
    },
    {
      title: "Study Plan",
      description: "Create a personalized study schedule",
      icon: "Calendar",
      action: () => onQuickStart("Help me create a study plan for my upcoming exams")
    },
    {
      title: "Homework Help",
      description: "Get step-by-step homework assistance",
      icon: "BookOpen",
      action: () => onQuickStart("I need help with my math homework")
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bot" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Welcome to EduTwin AI
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Your personal learning assistant is here to help you understand concepts, solve problems, and achieve your academic goals.
          </p>
        </div>

        {/* Quick Start Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {quickStartOptions.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={option.action}
              className="p-6 h-auto flex-col space-y-3 hover-lift"
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                <Icon name={option.icon} size={24} color="var(--color-primary)" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-text-primary mb-1">
                  {option.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {option.description}
                </p>
              </div>
            </Button>
          ))}
        </div>

        {/* Features */}
        <div className="bg-muted rounded-lg p-6">
          <h3 className="font-heading font-semibold text-text-primary mb-4">
            What I can help you with:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="MessageSquare" size={16} color="var(--color-success)" />
              <span className="text-text-secondary">Interactive conversations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Volume2" size={16} color="var(--color-success)" />
              <span className="text-text-secondary">Voice explanations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Image" size={16} color="var(--color-success)" />
              <span className="text-text-secondary">Visual diagrams</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={16} color="var(--color-success)" />
              <span className="text-text-secondary">Step-by-step solutions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Brain" size={16} color="var(--color-success)" />
              <span className="text-text-secondary">Personalized learning</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} color="var(--color-success)" />
              <span className="text-text-secondary">24/7 availability</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;