import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseOutline = ({ currentProgress, onTopicSelect }) => {
  const [expandedModules, setExpandedModules] = useState([1]);

  // Mock course outline data
  const courseOutline = {
    title: "Machine Learning Fundamentals",
    totalDuration: "8 hours",
    completedDuration: "2.5 hours",
    modules: [
      {
        id: 1,
        title: "Introduction to ML",
        duration: "2 hours",
        progress: 85,
        status: "in-progress",
        topics: [
          { id: 1, title: "What is Machine Learning?", duration: "15 min", completed: true, current: false },
          { id: 2, title: "Types of ML", duration: "20 min", completed: true, current: true },
          { id: 3, title: "Applications", duration: "25 min", completed: false, current: false },
          { id: 4, title: "ML Workflow", duration: "30 min", completed: false, current: false },
          { id: 5, title: "Tools & Libraries", duration: "20 min", completed: false, current: false }
        ]
      },
      {
        id: 2,
        title: "Supervised Learning",
        duration: "3 hours",
        progress: 0,
        status: "locked",
        topics: [
          { id: 6, title: "Linear Regression", duration: "45 min", completed: false, current: false },
          { id: 7, title: "Logistic Regression", duration: "45 min", completed: false, current: false },
          { id: 8, title: "Decision Trees", duration: "40 min", completed: false, current: false },
          { id: 9, title: "Random Forest", duration: "35 min", completed: false, current: false },
          { id: 10, title: "SVM", duration: "35 min", completed: false, current: false }
        ]
      },
      {
        id: 3,
        title: "Unsupervised Learning",
        duration: "2.5 hours",
        progress: 0,
        status: "locked",
        topics: [
          { id: 11, title: "K-Means Clustering", duration: "40 min", completed: false, current: false },
          { id: 12, title: "Hierarchical Clustering", duration: "35 min", completed: false, current: false },
          { id: 13, title: "PCA", duration: "45 min", completed: false, current: false },
          { id: 14, title: "Association Rules", duration: "30 min", completed: false, current: false }
        ]
      },
      {
        id: 4,
        title: "Model Evaluation",
        duration: "1.5 hours",
        progress: 0,
        status: "locked",
        topics: [
          { id: 15, title: "Cross Validation", duration: "25 min", completed: false, current: false },
          { id: 16, title: "Metrics", duration: "30 min", completed: false, current: false },
          { id: 17, title: "Overfitting", duration: "35 min", completed: false, current: false }
        ]
      }
    ]
  };

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleTopicClick = (topic) => {
    if (topic.completed || topic.current) {
      onTopicSelect(topic);
    }
  };

  const getModuleIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'PlayCircle';
      case 'locked': return 'Lock';
      default: return 'Circle';
    }
  };

  const getTopicIcon = (topic) => {
    if (topic.completed) return 'CheckCircle';
    if (topic.current) return 'PlayCircle';
    return 'Circle';
  };

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      {/* Course Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
          {courseOutline.title}
        </h2>
        <div className="space-y-3">
          {/* Overall Progress */}
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Overall Progress</span>
              <span>{Math.round(currentProgress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>

          {/* Time Stats */}
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-muted-foreground">Completed: </span>
              <span className="text-foreground font-medium">{courseOutline.completedDuration}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Total: </span>
              <span className="text-foreground font-medium">{courseOutline.totalDuration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modules */}
      <div className="p-4 space-y-2">
        {courseOutline.modules.map((module) => (
          <div key={module.id} className="space-y-2">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors duration-200 focus-ring"
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getModuleIcon(module.status)} 
                  size={18}
                  className={`${
                    module.status === 'completed' ? 'text-success' :
                    module.status === 'in-progress'? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <div className="text-left">
                  <div className="text-sm font-medium text-foreground">
                    {module.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {module.duration} • {module.progress}% complete
                  </div>
                </div>
              </div>
              <Icon 
                name={expandedModules.includes(module.id) ? "ChevronDown" : "ChevronRight"} 
                size={16}
                className="text-muted-foreground"
              />
            </button>

            {/* Module Progress Bar */}
            {module.progress > 0 && (
              <div className="mx-3 mb-2">
                <div className="w-full bg-muted rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Module Topics */}
            {expandedModules.includes(module.id) && (
              <div className="ml-6 space-y-1">
                {module.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic)}
                    disabled={!topic.completed && !topic.current}
                    className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-colors duration-200 ${
                      topic.current 
                        ? 'bg-primary bg-opacity-10 border border-primary border-opacity-20' 
                        : topic.completed
                        ? 'hover:bg-muted' :'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <Icon 
                      name={getTopicIcon(topic)} 
                      size={16}
                      className={`${
                        topic.completed ? 'text-success' : topic.current ?'text-primary': 'text-muted-foreground'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {topic.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {topic.duration}
                      </div>
                    </div>
                    {topic.current && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border mt-auto">
        <div className="space-y-2">
          <Button
            variant="outline"
            fullWidth
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Download Materials
          </Button>
          <Button
            variant="ghost"
            fullWidth
            iconName="BookOpen"
            iconPosition="left"
            iconSize={16}
          >
            Course Notes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseOutline;