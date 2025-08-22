import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const AcademicInfoForm = ({ formData, errors, onChange }) => {
  const handleSelectChange = (field) => (value) => {
    onChange(field, value);
  };

  const handleSubjectsChange = (subject, checked) => {
    const currentSubjects = formData.subjectsOfInterest || [];
    if (checked) {
      onChange('subjectsOfInterest', [...currentSubjects, subject]);
    } else {
      onChange('subjectsOfInterest', currentSubjects.filter(s => s !== subject));
    }
  };

  const gradeLevelOptions = [
    { value: 'elementary-1', label: 'Grade 1' },
    { value: 'elementary-2', label: 'Grade 2' },
    { value: 'elementary-3', label: 'Grade 3' },
    { value: 'elementary-4', label: 'Grade 4' },
    { value: 'elementary-5', label: 'Grade 5' },
    { value: 'middle-6', label: 'Grade 6' },
    { value: 'middle-7', label: 'Grade 7' },
    { value: 'middle-8', label: 'Grade 8' },
    { value: 'high-9', label: 'Grade 9' },
    { value: 'high-10', label: 'Grade 10' },
    { value: 'high-11', label: 'Grade 11' },
    { value: 'high-12', label: 'Grade 12' },
    { value: 'college-freshman', label: 'College Freshman' },
    { value: 'college-sophomore', label: 'College Sophomore' },
    { value: 'college-junior', label: 'College Junior' },
    { value: 'college-senior', label: 'College Senior' },
    { value: 'graduate', label: 'Graduate Student' }
  ];

  const institutionTypeOptions = [
    { value: 'public-school', label: 'Public School' },
    { value: 'private-school', label: 'Private School' },
    { value: 'charter-school', label: 'Charter School' },
    { value: 'homeschool', label: 'Homeschool' },
    { value: 'community-college', label: 'Community College' },
    { value: 'university', label: 'University' },
    { value: 'online-school', label: 'Online School' },
    { value: 'other', label: 'Other' }
  ];

  const learningStyleOptions = [
    { value: 'visual', label: 'Visual Learner' },
    { value: 'auditory', label: 'Auditory Learner' },
    { value: 'kinesthetic', label: 'Kinesthetic Learner' },
    { value: 'reading-writing', label: 'Reading/Writing Learner' },
    { value: 'mixed', label: 'Mixed Learning Style' }
  ];

  const subjects = [
    'Mathematics',
    'Science',
    'English Language Arts',
    'History',
    'Geography',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Art',
    'Music',
    'Physical Education',
    'Foreign Languages',
    'Economics',
    'Psychology'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Current Grade Level"
          placeholder="Select your grade level"
          options={gradeLevelOptions}
          value={formData.gradeLevel}
          onChange={handleSelectChange('gradeLevel')}
          error={errors.gradeLevel}
          required
          searchable
        />
        <Select
          label="Institution Type"
          placeholder="Select institution type"
          options={institutionTypeOptions}
          value={formData.institutionType}
          onChange={handleSelectChange('institutionType')}
          error={errors.institutionType}
          required
        />
      </div>

      <Select
        label="Preferred Learning Style"
        placeholder="Select your learning style"
        description="This helps us personalize your learning experience"
        options={learningStyleOptions}
        value={formData.learningStyle}
        onChange={handleSelectChange('learningStyle')}
        error={errors.learningStyle}
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Subjects of Interest
          <span className="text-destructive ml-1">*</span>
        </label>
        <p className="text-sm text-muted-foreground">
          Select at least 3 subjects you're interested in learning
        </p>
        {errors.subjectsOfInterest && (
          <p className="text-sm text-destructive">{errors.subjectsOfInterest}</p>
        )}
        <CheckboxGroup>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subjects.map((subject) => (
              <Checkbox
                key={subject}
                label={subject}
                checked={formData.subjectsOfInterest?.includes(subject) || false}
                onChange={(e) => handleSubjectsChange(subject, e.target.checked)}
              />
            ))}
          </div>
        </CheckboxGroup>
      </div>
    </div>
  );
};

export default AcademicInfoForm;