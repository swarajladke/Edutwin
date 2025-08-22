import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import TeacherLogin from "pages/teacher-login";
import StudentLogin from "pages/student-login";
import StudentRegistration from "pages/student-registration";
import AILearningAssistant from "pages/ai-learning-assistant";
import VirtualClassroomSession from "pages/virtual-classroom-session";
import TeacherAnalyticsDashboard from "pages/teacher-analytics-dashboard";
import StudentDashboard from "pages/student-dashboard"; // ✅ NEW
import StudentProfileManagement from "pages/student-profile-management";
import ClassManagementHub from "pages/class-management-hub";
import StudentProgressAnalytics from "pages/student-progress-analytics";
import TeacherDashboard from "pages/teacher-dashboard";

import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} /> {/* ✅ NEW */}
        <Route path="/ai-learning-assistant" element={<AILearningAssistant />} />
        <Route path="/virtual-classroom-session" element={<VirtualClassroomSession />} />
        <Route path="/teacher-analytics-dashboard" element={<TeacherAnalyticsDashboard />} />
        <Route path="/student-profile-management" element={<StudentProfileManagement />} />
        <Route path="/class-management-hub" element={<ClassManagementHub />} />
        <Route path="/student-progress-analytics" element={<StudentProgressAnalytics />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;