import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleAwareHeader from '../../components/ui/RoleAwareHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ContextualSidebar from '../../components/ui/ContextualSidebar';
import BasicInfoCard from './components/BasicInfoCard';
import PrivacyControlsCard from './components/PrivacyControlsCard';
import LearningPreferencesCard from './components/LearningPreferencesCard';
import DigitalTwinVisualization from './components/DigitalTwinVisualization';
import AccessibilitySettings from './components/AccessibilitySettings';
import NotificationPreferences from './components/NotificationPreferences';
import AnalyticsSidebar from './components/AnalyticsSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentProfileManagement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('basic-info');
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const profileSections = [
    { id: 'basic-info', label: 'Basic Information', icon: 'User' },
    { id: 'privacy', label: 'Privacy Controls', icon: 'Shield' },
    { id: 'learning', label: 'Learning Preferences', icon: 'Brain' },
    { id: 'digital-twin', label: 'Digital Twin', icon: 'Sparkles' },
    { id: 'accessibility', label: 'Accessibility', icon: 'Eye' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-8">
        <div id="basic-info">
          <BasicInfoCard />
        </div>
        
        <div id="privacy">
          <PrivacyControlsCard />
        </div>
        
        <div id="learning">
          <LearningPreferencesCard />
        </div>
        
        <div id="digital-twin">
          <DigitalTwinVisualization />
        </div>
        
        <div id="accessibility">
          <AccessibilitySettings />
        </div>
        
        <div id="notifications">
          <NotificationPreferences />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Student Profile Management - EduTwin</title>
        <meta name="description" content="Customize your digital twin settings, privacy preferences, and learning experience in EduTwin's intelligent educational platform." />
      </Helmet>

      <RoleAwareHeader />
      <ContextualSidebar />

      <main className={`
        pt-16 pb-20 lg:pb-8 transition-all duration-300
        ${isMobile ? 'px-4' : 'lg:pl-20 px-6'}
      `}>
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
              <span>Dashboard</span>
              <Icon name="ChevronRight" size={14} />
              <span>Profile Management</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                  Profile Management
                </h1>
                <p className="text-text-secondary mt-1">
                  Customize your digital twin settings and learning preferences
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}
                >
                  Export Data
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Save"
                  iconPosition="left"
                  iconSize={16}
                >
                  Save All
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Section Navigation */}
          {isMobile && (
            <div className="mb-6">
              <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
                {profileSections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => scrollToSection(section.id)}
                    iconName={section.icon}
                    iconPosition="left"
                    iconSize={16}
                    className="whitespace-nowrap flex-shrink-0"
                  >
                    {section.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              {renderSectionContent()}
            </div>

            {/* Desktop Analytics Sidebar */}
            {!isMobile && (
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <AnalyticsSidebar />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Analytics Section */}
          {isMobile && (
            <div className="mt-8">
              <div className="mb-4">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Analytics & Insights
                </h2>
              </div>
              <AnalyticsSidebar />
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 p-6 bg-primary bg-opacity-5 rounded-lg border border-primary border-opacity-20">
            <div className="flex items-start space-x-4">
              <Icon name="HelpCircle" size={24} className="text-primary mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-heading font-medium text-text-primary mb-2">
                  Need Help with Your Profile?
                </h3>
                <p className="text-text-secondary mb-4">
                  Our support team is here to help you optimize your learning experience. 
                  Get assistance with privacy settings, learning preferences, or digital twin insights.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Live Chat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Mail"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Email Support
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="BookOpen"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Help Center
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default StudentProfileManagement;