import React from 'react';
import { 
  Home, 
  Trophy, 
  History, 
  Bell, 
  Calendar, 
  HelpCircle, 
  CheckSquare, 
  Sparkles, 
  Award, 
  MessageSquare, 
  User, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap,
  Lock,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationSection } from '../../types';

interface NavItem {
  id: NavigationSection;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: number | string;
}

export const Sidebar: React.FC = () => {
  const { 
    currentSection, 
    setCurrentSection, 
    isSidebarCollapsed, 
    toggleSidebar, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen,
    currentStudent,
    announcements,
    quizzes,
    setIsTeacherAuthModalOpen,
    logout
  } = useApp();

  const activeQuizzesCount = quizzes.filter(q => !q.isCompleted).length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Bosh sahifa', icon: Home },
    { id: 'faculties', label: 'Fakultetlar', icon: Trophy },
    { id: 'point-history', label: 'Ballar tarixi', icon: History },
    { id: 'announcements', label: 'E’lonlar', icon: Bell, badge: announcements.length },
    { id: 'events', label: 'Tadbirlar taqvimi', icon: Calendar },
    { id: 'quizzes', label: 'Bilim viktorinalari', icon: HelpCircle, badge: activeQuizzesCount > 0 ? activeQuizzesCount : undefined },
    { id: 'attendance', label: 'Davomat', icon: CheckSquare },
    { id: 'clubs', label: 'To‘garaklar', icon: Sparkles },
    { id: 'my-achievements', label: 'Mening yutuqlarim', icon: Award },
    { id: 'suggestions', label: 'Takliflar qutisi', icon: MessageSquare },
    { id: 'profile', label: 'Profil va sozlamalar', icon: User },
  ];

  const handleNavClick = (id: NavigationSection) => {
    setCurrentSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Main sidebar container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out border-r
          bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800
          ${isSidebarCollapsed ? 'w-[72px]' : 'w-64'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Brand header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800/80">
          <div 
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
              <GraduationCap className="w-6 h-6" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white truncate">
                  Faculty<span className="text-blue-600 dark:text-blue-400">Score</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                  O‘quvchi portali
                </span>
              </div>
            )}
          </div>

          {/* Desktop collapse button */}
          <button
            onClick={toggleSidebar}
            title={isSidebarCollapsed ? "Menyuni kengaytirish" : "Menyuni yig‘ish"}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* School Identity Block */}
        {!isSidebarCollapsed && (
          <div className="px-3 py-3 mx-3 mt-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 text-xs font-bold">
                IS
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  Abu Ali ibn Sino maktabi
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Farg‘ona filiali · 2026–2027
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section title */}
        {!isSidebarCollapsed && (
          <div className="px-5 pt-4 pb-1 text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
            Asosiy bo‘limlar
          </div>
        )}

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-semibold shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                  }
                  ${isSidebarCollapsed ? 'justify-center px-0' : ''}
                `}
              >
                <Icon 
                  size={19} 
                  className={`shrink-0 transition-colors ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                  }`} 
                />

                {!isSidebarCollapsed && (
                  <span className="flex-1 text-left truncate">
                    {item.label}
                  </span>
                )}

                {!isSidebarCollapsed && item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 text-[11px] font-semibold rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Student Mini Profile Footer & Teacher Entrance */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <button
            onClick={() => handleNavClick('profile')}
            className={`w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left
              ${isSidebarCollapsed ? 'justify-center p-1' : ''}
            `}
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 ring-2 ring-blue-100 dark:ring-blue-900/50">
              {currentStudent.avatar}
            </div>

            {!isSidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {currentStudent.name}
                </p>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium truncate">
                  {currentStudent.className} · {currentStudent.facultyId}
                </p>
              </div>
            )}
          </button>

          {/* Logout button to return to login screen */}
          <button
            onClick={() => {
              logout();
              setIsMobileMenuOpen(false);
            }}
            title={isSidebarCollapsed ? "Tizimdan chiqish" : undefined}
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
              isSidebarCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <LogOut size={13} className="shrink-0" />
            {!isSidebarCollapsed && (
              <span className="truncate">Tizimdan chiqish</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
