import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SOC 2 Compliant',
      description: 'Enterprise-grade security standards'
    },
    {
      icon: 'Lock',
      title: 'FERPA Compliant',
      description: 'Student privacy protection'
    },
    {
      icon: 'Eye',
      title: 'COPPA Certified',
      description: 'Child online privacy protection'
    },
    {
      icon: 'CheckCircle',
      title: 'ISO 27001',
      description: 'Information security management'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-foreground mb-2">
          Trusted by Educational Institutions
        </h3>
        <p className="text-xs text-muted-foreground">
          Your data is protected with industry-leading security standards
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {securityFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg"
          >
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name={feature.icon} size={14} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground">
                {feature.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Protected by 256-bit SSL encryption • Session timeout: 30 minutes
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;