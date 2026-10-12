import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  Award, 
  CheckSquare, 
  TrendingUp, 
  HelpCircle, 
  MessageSquare, 
  Users, 
  Sparkles,
  ChevronLeft, 
  ChevronRight,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TeacherNavigationSection } from '../../types';

interface TeacherNavItem {
  id: TeacherNavigationSection;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: number | string;
}

export const TeacherSidebar: React.FC = () => {
  const { 
    teacherSection, 
    setTeacherSection, 
    isSidebarCollapsed, 
    toggleSidebar, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen,
    currentStaffUser,
    achievements,
    suggestions,
    logoutTeacher
  } = useApp();

  const pendingAchievementsCount = achievements.filter(a => a.status === 'kutilmoqda').length;
  const pendingSuggestionsCount = suggestions.filter(s => s.status === 'korib_chiqilmoqda').length;

  const navItems: TeacherNavItem[] = [
    { id: 'teacher-dashboard', label: 'Boshqaruv markazi', icon: LayoutDashboard },
    { id: 'teacher-points', label: 'Ballar boshqaruvi', icon: PlusCircle },
    { id: 'teacher-ledger', label: 'Tranzaksiyalar & Audit', icon: FileText },
    { id: 'teacher-achievements', label: 'Yutuqlarni tekshirish', icon: Award, badge: pendingAchievementsCount > 0 ? pendingAchievementsCount : undefined },
    { id: 'teacher-attendance', label: 'Davomat nazorati', icon: CheckSquare },
    { id: 'teacher-analytics', label: 'Analitika & Hisobotlar', icon: TrendingUp },
    { id: 'teacher-quizzes', label: 'Viktorina & Tadbirlar', icon: HelpCircle },
    { id: 'teacher-suggestions', label: 'Takliflarni ko‘rish', icon: MessageSquare, badge: pendingSuggestionsCount > 0 ? pendingSuggestionsCount : undefined },
    { id: 'teacher-students', label: '14 ta sinf o‘quvchilari', icon: Users },
    { id: 'teacher-ai-tools', label: 'AI yordamchi vositalar', icon: Sparkles },
  ];

  const handleNavClick = (id: TeacherNavigationSection) => {
    setTeacherSection(id);
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

      {/* Main Teacher sidebar container */}
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
            onClick={() => handleNavClick('teacher-dashboard')}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white truncate">
                  Faculty<span className="text-blue-600 dark:text-blue-400">Score</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase truncate">
                  O‘qituvchi Boshqaruvi
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
          <div className="px-3 py-2.5 mx-3 mt-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  Abu Ali ibn Sino maktabi
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  Ma’muriy portal · 2026–2027
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section title */}
        {!isSidebarCollapsed && (
          <div className="px-5 pt-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
            Boshqaruv menyusi
          </div>
        )}

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = teacherSection === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group
                  ${isActive 
                    ? 'bg-slate-900 text-white dark:bg-blue-600 dark:text-white font-bold shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                  }
                  ${isSidebarCollapsed ? 'justify-center px-0' : ''}
                `}
              >
                <Icon 
                  size={17} 
                  className={`shrink-0 transition-colors ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                  }`} 
                />

                {!isSidebarCollapsed && (
                  <span className="flex-1 text-left truncate">
                    {item.label}
                  </span>
                )}

                {!isSidebarCollapsed && item.badge !== undefined && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-black rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Staff User Card & Secure Session Logout */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className={`flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 ${isSidebarCollapsed ? 'justify-center p-1' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {currentStaffUser.avatar}
            </div>

            {!isSidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {currentStaffUser.name}
                </p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                  {currentStaffUser.roleTitle.split(' ')[0]} (Hakam)
                </p>
              </div>
            )}
          </div>

          {/* Secure Logout Action */}
          <button
            onClick={logoutTeacher}
            title={isSidebarCollapsed ? "Sessiyani yopish va chiqish" : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50 ${
              isSidebarCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <LogOut size={15} className="shrink-0" />
            {!isSidebarCollapsed && (
              <span>Sessiyani yopish (Chiqish)</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
