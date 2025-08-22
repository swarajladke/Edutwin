import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicInfoCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showWebcamCapture, setShowWebcamCapture] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Emma Johnson",
    email: "emma.johnson@student.edu",
    grade: "10th Grade",
    school: "Lincoln High School",
    learningGoals: "Improve mathematics skills and prepare for SAT",
    profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  const gradeOptions = [
    { value: "6th", label: "6th Grade" },
    { value: "7th", label: "7th Grade" },
    { value: "8th", label: "8th Grade" },
    { value: "9th", label: "9th Grade" },
    { value: "10th", label: "10th Grade" },
    { value: "11th", label: "11th Grade" },
    { value: "12th", label: "12th Grade" }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Mock save functionality
  };

  const handleWebcamCapture = () => {
    setShowWebcamCapture(true);
    // Mock webcam capture
    setTimeout(() => {
      setShowWebcamCapture(false);
      setProfileData(prev => ({
        ...prev,
        profilePhoto: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face"
      }));
    }, 2000);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Basic Information
        </h2>
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          iconName={isEditing ? "Check" : "Edit"}
          iconPosition="left"
          iconSize={16}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo Section */}
        <div className="lg:col-span-1">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border bg-muted">
                <Image
                  src={profileData.profilePhoto}
                  alt="Profile Photo"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleWebcamCapture}
                      className="text-white hover:bg-white hover:bg-opacity-20"
                    >
                      <Icon name="Camera" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white hover:bg-opacity-20"
                    >
                      <Icon name="Upload" size={20} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {showWebcamCapture && (
              <div className="mt-4 p-4 bg-primary bg-opacity-10 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <Icon name="Camera" size={16} />
                  <span className="text-sm">Capturing photo...</span>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="mt-4 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={handleWebcamCapture}
                  iconName="Camera"
                  iconPosition="left"
                  iconSize={16}
                  disabled={showWebcamCapture}
                >
                  Take Photo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Upload"
                  iconPosition="left"
                  iconSize={16}
                >
                  Upload Photo
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-4">
          {isEditing ? (
            <>
              <Input
                label="Full Name"
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                required
                disabled
                description="Contact your administrator to change email"
              />

              <Select
                label="Grade Level"
                options={gradeOptions}
                value={profileData.grade}
                onChange={(value) => setProfileData(prev => ({ ...prev, grade: value }))}
                required
              />

              <Input
                label="School"
                type="text"
                value={profileData.school}
                onChange={(e) => setProfileData(prev => ({ ...prev, school: e.target.value }))}
                required
              />

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Learning Goals
                </label>
                <textarea
                  value={profileData.learningGoals}
                  onChange={(e) => setProfileData(prev => ({ ...prev, learningGoals: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  placeholder="Describe your learning goals and objectives..."
                />
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Full Name</label>
                <p className="text-text-primary font-medium">{profileData.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-text-secondary">Email Address</label>
                <p className="text-text-primary">{profileData.email}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Grade Level</label>
                  <p className="text-text-primary">{profileData.grade}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary">School</label>
                  <p className="text-text-primary">{profileData.school}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-text-secondary">Learning Goals</label>
                <p className="text-text-primary">{profileData.learningGoals}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoCard;