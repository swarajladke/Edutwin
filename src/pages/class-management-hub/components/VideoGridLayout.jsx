import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StudentVideoFeed from './StudentVideoFeed';

const VideoGridLayout = ({ students, onStudentSelect, selectedStudent, viewMode }) => {
  const [gridSize, setGridSize] = useState('medium');
  const [showControls, setShowControls] = useState(true);
  const [focusedStudent, setFocusedStudent] = useState(null);

  const gridSizes = {
    small: { cols: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6', maxVisible: 24 },
    medium: { cols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', maxVisible: 16 },
    large: { cols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', maxVisible: 9 }
  };

  const currentGrid = gridSizes[gridSize];
  const visibleStudents = students.slice(0, currentGrid.maxVisible);
  const hiddenCount = Math.max(0, students.length - currentGrid.maxVisible);

  const handleStudentSelect = (student) => {
    onStudentSelect(student);
    if (viewMode === 'focus') {
      setFocusedStudent(student);
    }
  };

  const renderGridView = () => (
    <div className={`grid ${currentGrid.cols} gap-4 p-4`}>
      {visibleStudents.map((student) => (
        <StudentVideoFeed
          key={student.id}
          student={student}
          onSelectStudent={handleStudentSelect}
          isSelected={selectedStudent?.id === student.id}
        />
      ))}
      
      {hiddenCount > 0 && (
        <div className="aspect-video bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center">
          <div className="text-center text-text-secondary">
            <Icon name="Users" size={32} className="mx-auto mb-2" />
            <p className="text-sm">+{hiddenCount} more students</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setGridSize('small')}
              className="mt-2"
            >
              Show All
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const renderFocusView = () => (
    <div className="flex h-full">
      {/* Main Focus Area */}
      <div className="flex-1 p-4">
        {focusedStudent ? (
          <div className="h-full">
            <StudentVideoFeed
              student={focusedStudent}
              onSelectStudent={handleStudentSelect}
              isSelected={true}
            />
          </div>
        ) : (
          <div className="h-full bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center">
            <div className="text-center text-text-secondary">
              <Icon name="Monitor" size={48} className="mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a student to focus</h3>
              <p className="text-sm">Click on any student from the sidebar to view them in focus mode</p>
            </div>
          </div>
        )}
      </div>

      {/* Student Thumbnails */}
      <div className="w-64 border-l border-border bg-surface p-2 overflow-y-auto">
        <div className="space-y-2">
          {students.map((student) => (
            <div
              key={student.id}
              className={`
                cursor-pointer rounded-lg overflow-hidden transition-smooth hover-lift
                ${focusedStudent?.id === student.id ? 'ring-2 ring-primary' : ''}
              `}
              onClick={() => setFocusedStudent(student)}
            >
              <StudentVideoFeed
                student={student}
                onSelectStudent={handleStudentSelect}
                isSelected={selectedStudent?.id === student.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPresentationView = () => (
    <div className="flex flex-col h-full">
      {/* Presentation Area */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Icon name="Presentation" size={64} className="mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Presentation Mode</h3>
          <p className="text-gray-300">Share your screen or start presenting</p>
          <Button
            variant="default"
            className="mt-4"
            iconName="Monitor"
            iconPosition="left"
          >
            Start Screen Share
          </Button>
        </div>
      </div>

      {/* Student Strip */}
      <div className="h-32 border-t border-border bg-surface p-2">
        <div className="flex space-x-2 overflow-x-auto h-full">
          {students.slice(0, 8).map((student) => (
            <div key={student.id} className="flex-shrink-0 w-24">
              <StudentVideoFeed
                student={student}
                onSelectStudent={handleStudentSelect}
                isSelected={selectedStudent?.id === student.id}
              />
            </div>
          ))}
          {students.length > 8 && (
            <div className="flex-shrink-0 w-24 h-full bg-muted border border-border rounded-lg flex items-center justify-center">
              <div className="text-center text-text-secondary">
                <Icon name="MoreHorizontal" size={16} />
                <p className="text-xs mt-1">+{students.length - 8}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative h-full bg-background">
      {/* View Controls */}
      {showControls && viewMode === 'grid' && (
        <div className="absolute top-4 right-4 z-10 bg-surface border border-border rounded-lg shadow-moderate p-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Grid Size:</span>
            {Object.keys(gridSizes).map((size) => (
              <Button
                key={size}
                variant={gridSize === size ? "default" : "ghost"}
                size="sm"
                onClick={() => setGridSize(size)}
                className="capitalize"
              >
                {size}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowControls(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Toggle Controls Button */}
      {!showControls && (
        <Button
          variant="default"
          size="icon"
          onClick={() => setShowControls(true)}
          className="absolute top-4 right-4 z-10"
        >
          <Icon name="Settings" size={16} />
        </Button>
      )}

      {/* Render Based on View Mode */}
      {viewMode === 'grid' && renderGridView()}
      {viewMode === 'focus' && renderFocusView()}
      {viewMode === 'presentation' && renderPresentationView()}

      {/* Student Count Indicator */}
      <div className="absolute bottom-4 left-4 bg-surface border border-border rounded-lg px-3 py-2 shadow-moderate">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-primary" />
          <span className="text-sm font-medium">
            {students.filter(s => s.status === 'active').length} / {students.length} active
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoGridLayout;