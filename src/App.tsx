import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TeacherSidebar } from './components/layout/TeacherSidebar';
import { Header } from './components/layout/Header';
import { SearchModal } from './components/common/SearchModal';

// Student Panel Views
import { DashboardView } from './views/DashboardView';
import { FacultiesView } from './views/FacultiesView';
import { PointHistoryView } from './views/PointHistoryView';
import { AnnouncementsView } from './views/AnnouncementsView';
import { EventsCalendarView } from './views/EventsCalendarView';
import { QuizzesView } from './views/QuizzesView';
import { AttendanceView } from './views/AttendanceView';
import { ClubsView } from './views/ClubsView';
import { MyAchievementsView } from './views/MyAchievementsView';
import { SuggestionsView } from './views/SuggestionsView';
import { ProfileSettingsView } from './views/ProfileSettingsView';

// Teacher Panel Views
import { TeacherDashboardView } from './views/teacher/TeacherDashboardView';
import { TeacherPointManagementView } from './views/teacher/TeacherPointManagementView';
import { TeacherLedgerView } from './views/teacher/TeacherLedgerView';
import { TeacherAchievementsView } from './views/teacher/TeacherAchievementsView';
import { TeacherAttendanceView } from './views/teacher/TeacherAttendanceView';
import { TeacherAnalyticsView } from './views/teacher/TeacherAnalyticsView';
import { TeacherQuizzesAndEventsView } from './views/teacher/TeacherQuizzesAndEventsView';
import { TeacherStudentsView } from './views/teacher/TeacherStudentsView';
import { TeacherAIToolsView } from './views/teacher/TeacherAIToolsView';
import { TeacherAuthModal } from './components/auth/TeacherAuthModal';
import { TeacherAccessDenied } from './components/auth/TeacherAccessDenied';
import { LoginView } from './views/LoginView';

import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    isAuthenticated,
    portalMode, 
    setPortalMode,
    isTeacherAuthenticated,
    setIsTeacherAuthModalOpen,
    currentSection, 
    teacherSection, 
    isSidebarCollapsed, 
    toastMessage 
  } = useApp();

  // If not logged in, render the Login Screen first
  if (!isAuthenticated) {
    return <LoginView />;
  }

  const isTeacher = portalMode === 'teacher' && isTeacherAuthenticated;
  const isUnauthorizedTeacherAttempt = portalMode === 'teacher' && !isTeacherAuthenticated;

  const renderStudentView = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardView />;
      case 'faculties':
        return <FacultiesView />;
      case 'point-history':
        return <PointHistoryView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'events':
        return <EventsCalendarView />;
      case 'quizzes':
        return <QuizzesView />;
      case 'attendance':
        return <AttendanceView />;
      case 'clubs':
        return <ClubsView />;
      case 'my-achievements':
        return <MyAchievementsView />;
      case 'suggestions':
        return <SuggestionsView />;
      case 'profile':
        return <ProfileSettingsView />;
      default:
        return <DashboardView />;
    }
  };

  const renderTeacherView = () => {
    switch (teacherSection) {
      case 'teacher-dashboard':
        return <TeacherDashboardView />;
      case 'teacher-points':
        return <TeacherPointManagementView />;
      case 'teacher-ledger':
        return <TeacherLedgerView />;
      case 'teacher-achievements':
        return <TeacherAchievementsView />;
      case 'teacher-attendance':
        return <TeacherAttendanceView />;
      case 'teacher-analytics':
        return <TeacherAnalyticsView />;
      case 'teacher-quizzes':
      case 'teacher-events':
      case 'teacher-suggestions':
        return <TeacherQuizzesAndEventsView />;
      case 'teacher-students':
        return <TeacherStudentsView />;
      case 'teacher-ai-tools':
        return <TeacherAIToolsView />;
      default:
        return <TeacherDashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      
      {/* Dynamic Sidebar based on Portal Mode */}
      {isTeacher ? <TeacherSidebar /> : <Sidebar />}

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'md:pl-[72px]' : 'md:pl-64'
        }`}
      >
        {/* Top Header with Portal Switcher */}
        <Header />

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {isUnauthorizedTeacherAttempt ? (
            <TeacherAccessDenied 
              onOpenLogin={() => setIsTeacherAuthModalOpen(true)} 
              onReturnStudent={() => setPortalMode('student')} 
            />
          ) : isTeacher ? (
            renderTeacherView()
          ) : (
            renderStudentView()
          )}
        </main>

        {/* Minimal Footer */}
        <footer className="py-6 px-4 border-t border-slate-200/80 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500">
          <p>© 2026 FacultyScore. Abu Ali ibn Sino nomidagi ixtisoslashtirilgan maktab (Farg‘ona filiali).</p>
          <p className="mt-1 text-[11px] text-slate-400/80">
            {isTeacher ? "O‘qituvchi va Ma’muriy Boshqaruv Tizimi" : "Bir maktab. To‘rt fakultet. Bir maqsad."}
          </p>
        </footer>
      </div>

      {/* Quick Search Modal (⌘K) */}
      <SearchModal />

      {/* Teacher Authentication Gate Modal */}
      <TeacherAuthModal />

      {/* Global Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl border border-slate-700 dark:border-slate-200 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 size={16} className="text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
