import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveQuiz = ({ onScoreUpdate, attentionLevel, emotionData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [showExplanation, setShowExplanation] = useState(false);

  // Mock quiz data with adaptive difficulty
  const quizData = {
    easy: [
      {
        id: 1,
        question: "What does ML stand for?",
        options: ["Machine Learning", "Multiple Learning", "Manual Logic", "Memory Logic"],
        correct: 0,
        explanation: "ML stands for Machine Learning, which is a subset of artificial intelligence that enables computers to learn from data."
      },
      {
        id: 2,
        question: "Which type of learning uses labeled data?",
        options: ["Unsupervised", "Supervised", "Reinforcement", "Deep"],
        correct: 1,
        explanation: "Supervised learning uses labeled training data to learn patterns and make predictions on new data."
      }
    ],
    medium: [
      {
        id: 3,
        question: "What is the main goal of clustering algorithms?",
        options: [
          "Predict future values",
          "Group similar data points",
          "Classify labeled data",
          "Optimize rewards"
        ],
        correct: 1,
        explanation: "Clustering algorithms group similar data points together without using labeled data, making it an unsupervised learning technique."
      },
      {
        id: 4,
        question: "Which algorithm is commonly used for classification?",
        options: ["K-means", "Linear Regression", "Decision Tree", "PCA"],
        correct: 2,
        explanation: "Decision Trees are commonly used for classification tasks as they can split data based on features to make categorical predictions."
      }
    ],
    hard: [
      {
        id: 5,
        question: "What is the purpose of cross-validation in machine learning?",
        options: [
          "To increase model complexity",
          "To evaluate model performance and prevent overfitting",
          "To reduce training time",
          "To increase dataset size"
        ],
        correct: 1,
        explanation: "Cross-validation helps evaluate how well a model generalizes to unseen data and helps prevent overfitting by testing on multiple data splits."
      },
      {
        id: 6,
        question: "In neural networks, what is backpropagation used for?",
        options: [
          "Forward data flow",
          "Weight initialization",
          "Updating weights based on errors",
          "Data preprocessing"
        ],
        correct: 2,
        explanation: "Backpropagation is an algorithm used to update neural network weights by propagating errors backward through the network."
      }
    ]
  };

  // Adaptive difficulty based on attention and emotion
  useEffect(() => {
    if (attentionLevel < 0.4 || emotionData?.dominant === 'confused') {
      setDifficulty('easy');
    } else if (attentionLevel > 0.8 && emotionData?.dominant === 'focused') {
      setDifficulty('hard');
    } else {
      setDifficulty('medium');
    }
  }, [attentionLevel, emotionData]);

  // Timer countdown
  useEffect(() => {
    let timer;
    if (isQuizActive && timeLeft > 0 && !isAnswered) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [isQuizActive, timeLeft, isAnswered]);

  const currentQuizSet = quizData[difficulty];
  const question = currentQuizSet[currentQuestion];

  const startQuiz = () => {
    setIsQuizActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === question.correct) {
      const timeBonus = Math.floor(timeLeft / 5); // Bonus points for quick answers
      const newScore = score + 10 + timeBonus;
      setScore(newScore);
      onScoreUpdate(newScore);
    }
    
    setShowExplanation(true);
  };

  const handleTimeUp = () => {
    setIsAnswered(true);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuizSet.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
      setShowExplanation(false);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setIsQuizActive(false);
    // Show final results
  };

  const getAnswerStyle = (index) => {
    if (!isAnswered) {
      return selectedAnswer === index 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-muted hover:bg-muted/80';
    }
    
    if (index === question.correct) {
      return 'bg-success text-success-foreground';
    }
    
    if (index === selectedAnswer && index !== question.correct) {
      return 'bg-error text-error-foreground';
    }
    
    return 'bg-muted';
  };

  const getScoreColor = () => {
    const percentage = (score / (currentQuizSet.length * 10)) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  if (!isQuizActive) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="HelpCircle" size={32} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              Interactive Quiz
            </h3>
            <p className="text-muted-foreground">
              Test your understanding with adaptive questions based on your learning progress.
            </p>
          </div>
          
          {/* Difficulty Indicator */}
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Target" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Current difficulty: 
              <span className={`ml-1 font-medium capitalize ${
                difficulty === 'easy' ? 'text-success' :
                difficulty === 'medium'? 'text-warning' : 'text-error'
              }`}>
                {difficulty}
              </span>
            </span>
          </div>

          <Button
            onClick={startQuiz}
            iconName="Play"
            iconPosition="left"
            iconSize={18}
            className="px-8"
          >
            Start Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Quiz Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Question {currentQuestion + 1} of {currentQuizSet.length}
            </h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              difficulty === 'easy' ? 'bg-success bg-opacity-10 text-success' :
              difficulty === 'medium'? 'bg-warning bg-opacity-10 text-warning' : 'bg-error bg-opacity-10 text-error'
            }`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Timer */}
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
              timeLeft <= 10 ? 'bg-error bg-opacity-10 text-error' : 'bg-muted'
            }`}>
              <Icon name="Clock" size={16} />
              <span className="font-mono font-medium">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </span>
            </div>
            
            {/* Score */}
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className={getScoreColor()} />
              <span className={`font-medium ${getScoreColor()}`}>
                {score} pts
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / currentQuizSet.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-xl font-heading font-medium text-foreground mb-6">
            {question.question}
          </h4>
          
          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  getAnswerStyle(index)
                } ${!isAnswered ? 'hover-lift focus-ring' : 'cursor-default'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    isAnswered && index === question.correct ? 'border-success bg-success text-success-foreground' :
                    isAnswered && index === selectedAnswer && index !== question.correct ? 'border-error bg-error text-error-foreground' :
                    selectedAnswer === index ? 'border-primary bg-primary text-primary-foreground': 'border-muted-foreground'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium">{option}</span>
                  {isAnswered && index === question.correct && (
                    <Icon name="CheckCircle" size={20} className="text-success ml-auto" />
                  )}
                  {isAnswered && index === selectedAnswer && index !== question.correct && (
                    <Icon name="XCircle" size={20} className="text-error ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-muted rounded-lg p-4 space-y-2 animate-slide-down">
            <div className="flex items-center space-x-2">
              <Icon name="Lightbulb" size={16} className="text-accent" />
              <h5 className="font-medium text-foreground">Explanation</h5>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {isAnswered && (
          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {selectedAnswer === question.correct ? (
                <>
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-success font-medium">Correct!</span>
                  {timeLeft > 20 && <span>+ Time bonus!</span>}
                </>
              ) : (
                <>
                  <Icon name="XCircle" size={16} className="text-error" />
                  <span className="text-error font-medium">Incorrect</span>
                </>
              )}
            </div>
            
            <Button
              onClick={nextQuestion}
              iconName={currentQuestion < currentQuizSet.length - 1 ? "ArrowRight" : "Flag"}
              iconPosition="right"
              iconSize={16}
            >
              {currentQuestion < currentQuizSet.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveQuiz;