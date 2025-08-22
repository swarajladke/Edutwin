import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LessonContent = ({ currentLesson, onProgressUpdate, attentionLevel }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [contentType, setContentType] = useState('video');

  // Mock lesson data
  const lessonData = {
    id: 1,
    title: "Introduction to Machine Learning",
    description: "Understanding the fundamentals of ML algorithms and their applications",
    duration: "45 minutes",
    slides: [
      {
        id: 1,
        title: "What is Machine Learning?",
        content: `Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed.\n\nKey characteristics:\n• Learns from data patterns\n• Improves performance over time\n• Makes predictions on new data`,
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
        type: "concept"
      },
      {
        id: 2,
        title: "Types of Machine Learning",
        content: `There are three main types of machine learning:\n\n1. Supervised Learning\n   - Uses labeled training data\n   - Examples: Classification, Regression\n\n2. Unsupervised Learning\n   - Finds patterns in unlabeled data\n   - Examples: Clustering, Association\n\n3. Reinforcement Learning\n   - Learns through trial and error\n   - Examples: Game playing, Robotics`,
        image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?w=800&h=600&fit=crop",
        type: "explanation"
      },
      {
        id: 3,
        title: "Real-world Applications",
        content: `Machine Learning is everywhere around us:\n\n• Recommendation Systems (Netflix, Amazon)\n• Image Recognition (Face detection, Medical imaging)\n• Natural Language Processing (Chatbots, Translation)\n• Autonomous Vehicles\n• Fraud Detection\n• Predictive Analytics`,
        image: "https://images.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg?w=800&h=600&fit=crop",
        type: "application"
      }
    ],
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    resources: [
      { name: "ML Fundamentals PDF", type: "pdf", size: "2.4 MB" },
      { name: "Practice Dataset", type: "csv", size: "1.8 MB" },
      { name: "Code Examples", type: "zip", size: "856 KB" }
    ]
  };

  // Adjust content based on attention level
  useEffect(() => {
    if (attentionLevel < 0.3) {
      setPlaybackSpeed(0.8); // Slow down for low attention
    } else if (attentionLevel > 0.8) {
      setPlaybackSpeed(1.2); // Speed up for high attention
    } else {
      setPlaybackSpeed(1);
    }
  }, [attentionLevel]);

  const handleSlideChange = (direction) => {
    const newSlide = direction === 'next' 
      ? Math.min(currentSlide + 1, lessonData.slides.length - 1)
      : Math.max(currentSlide - 1, 0);
    
    setCurrentSlide(newSlide);
    onProgressUpdate((newSlide + 1) / lessonData.slides.length * 100);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getAttentionFeedback = () => {
    if (attentionLevel < 0.3) {
      return { color: 'text-error', message: 'Low attention detected', icon: 'AlertTriangle' };
    } else if (attentionLevel < 0.6) {
      return { color: 'text-warning', message: 'Moderate attention', icon: 'Eye' };
    } else {
      return { color: 'text-success', message: 'High attention', icon: 'CheckCircle' };
    }
  };

  const attentionFeedback = getAttentionFeedback();
  const currentSlideData = lessonData.slides[currentSlide];

  return (
    <div className="flex-1 bg-card rounded-lg border border-border overflow-hidden">
      {/* Content Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              {lessonData.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {lessonData.description}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Attention Indicator */}
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted ${attentionFeedback.color}`}>
              <Icon name={attentionFeedback.icon} size={16} />
              <span className="text-sm font-medium">{attentionFeedback.message}</span>
            </div>
            
            {/* Content Type Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={contentType === 'video' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setContentType('video')}
                iconName="Play"
                iconPosition="left"
                iconSize={14}
              >
                Video
              </Button>
              <Button
                variant={contentType === 'slides' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setContentType('slides')}
                iconName="FileText"
                iconPosition="left"
                iconSize={14}
              >
                Slides
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / lessonData.slides.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>Slide {currentSlide + 1} of {lessonData.slides.length}</span>
          <span>{lessonData.duration}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {contentType === 'video' ? (
          /* Video Content */
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <iframe
                src={lessonData.videoUrl}
                title={lessonData.title}
                className="w-full h-full"
                allowFullScreen
              />
              
              {/* Video Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black bg-opacity-50 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePlayPause}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                  </Button>
                  <span className="text-white text-sm">
                    Speed: {playbackSpeed}x
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Volume2" size={16} className="text-white" />
                  <div className="w-20 h-1 bg-white bg-opacity-30 rounded-full">
                    <div className="w-3/4 h-1 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lessonData.resources.map((resource, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Download" size={18} color="white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {resource.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {resource.type.toUpperCase()} • {resource.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Slide Content */
          <div className="space-y-6">
            <div className="bg-background rounded-lg border border-border p-8 min-h-[400px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                {/* Slide Text */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-heading font-bold text-foreground">
                    {currentSlideData.title}
                  </h2>
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentSlideData.content}
                  </div>
                  
                  {/* Slide Type Badge */}
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium">
                    <Icon name="BookOpen" size={14} />
                    <span className="capitalize">{currentSlideData.type}</span>
                  </div>
                </div>

                {/* Slide Image */}
                <div className="flex items-center justify-center">
                  <div className="w-full h-80 rounded-lg overflow-hidden">
                    <Image
                      src={currentSlideData.image}
                      alt={currentSlideData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => handleSlideChange('prev')}
                disabled={currentSlide === 0}
                iconName="ChevronLeft"
                iconPosition="left"
                iconSize={16}
              >
                Previous
              </Button>

              {/* Slide Indicators */}
              <div className="flex items-center space-x-2">
                {lessonData.slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentSlide ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => handleSlideChange('next')}
                disabled={currentSlide === lessonData.slides.length - 1}
                iconName="ChevronRight"
                iconPosition="right"
                iconSize={16}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonContent;