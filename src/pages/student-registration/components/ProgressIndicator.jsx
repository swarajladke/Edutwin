import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              index + 1 < currentStep 
                ? 'bg-success border-success text-success-foreground' 
                : index + 1 === currentStep
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-background border-border text-muted-foreground'
            }`}>
              {index + 1 < currentStep ? (
                <Icon name="Check" size={16} />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                index + 1 < currentStep ? 'bg-success' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          {steps[currentStep - 1]?.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;