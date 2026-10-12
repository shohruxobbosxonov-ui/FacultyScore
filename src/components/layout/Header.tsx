import React from 'react';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Sparkles,
  Trophy,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Lock,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationSection, TeacherNavigationSection } from '../../types';

const STUDENT_SECTION_TITLES: Record<NavigationSection, { title: string; subtitle: string }> = {
  'dashboard': { title: 'Bosh sahifa', subtitle: 'Fakultet umumiy ko‘rsatkichlari va so‘nggi yangiliklar' },
  'faculties': { title: 'Fakultetlar', subtitle: 'To‘rt fakultet reytingi va toifalar bo‘yicha solishtirma' },
  'point-history': { title: 'Ballar tarixi', subtitle: 'Barcha fakultetlarning ball o‘zgarishlari jurnali' },
  'announcements': { title: 'E’lonlar', subtitle: 'Maktab ma’muriyati va to‘garaklar rasmiy xabarlari' },
  'events': { title: 'Tadbirlar taqvimi', subtitle: 'Yaqinlashayotgan maktab musobaqalari va bayramlar' },
  'quizzes': { title: 'Bilim viktorinalari', subtitle: 'Intellektual savollar va fakultet uchun qo‘shimcha ballar' },
  'attendance': { title: 'Davomat', subtitle: 'Shaxsiy davomat monitoringi va darslardagi ishtirok' },
  'clubs': { title: 'To‘garaklar', subtitle: 'Ilmiy, texnologik va ijodiy mashg‘ulotlar katalogi' },
  'my-achievements': { title: 'Mening yutuqlarim', subtitle: 'Shaxsiy portfolio va tasdiqlangan sertifikatlar' },
  'suggestions': { title: 'Takliflar qutisi', subtitle: 'Maktab muhitini yaxshilash bo‘yicha o‘quvchilar tashabbuslari' },
  'profile': { title: 'Profil va sozlamalar', subtitle: 'O‘quvchi kartasi va shaxsiy parametrlari' },
};

const TEACHER_SECTION_TITLES: Record<TeacherNavigationSection, { title: string; subtitle: string }> = {
  'teacher-dashboard': { title: 'Boshqaruv markazi', subtitle: 'Maktab fakultetlari, navbat va operatsion ko‘rsatkichlar' },
  'teacher-points': { title: 'Ballar boshqaruvi', subtitle: 'Fakultetlarga ball berish va intizomiy choralarni qo‘llash' },
  'teacher-ledger': { title: 'Tranzaksiyalar & Audit', subtitle: 'Barcha ball yozuvlari, qidiruv va bekor qilish (reversal)' },
  'teacher-achievements': { title: 'Yutuqlarni moderatsiya qilish', subtitle: 'O‘quvchilar diplom va sertifikatlarini tekshirish' },
  'teacher-attendance': { title: 'Davomat nazorati', subtitle: '14 ta sinf bo‘yicha kundalik qatnashuv jurnali' },
  'teacher-analytics': { title: 'Analitika & Hisobotlar', subtitle: 'Chuqur tahlil, haftalik dinamika va sinflar monitoringi' },
  'teacher-quizzes': { title: 'Viktorina boshqaruvi', subtitle: 'Yangi viktorinalar va bilim testlarini e’lon qilish' },
  'teacher-events': { title: 'Tadbirlar boshqaruvi', subtitle: 'Maktab musobaqalari va tadbirlarini rejalashtirish' },
  'teacher-suggestions': { title: 'Takliflar moderatsiyasi', subtitle: 'O‘quvchilar takliflariga ma’muriy javob berish' },
  'teacher-students': { title: '14 ta sinf o‘quvchilari', subtitle: 'Barcha sinflar o‘quvchilari va ularning yutuqlar portfoliyasi' },
  'teacher-ai-tools': { title: 'AI Yordamchi vositalar', subtitle: 'AI orqali viktorina tuzish va tahliliy tavsiyalar' },
};

export const Header: React.FC = () => {
  const { 
    currentUser,
    logout,
    portalMode,
    setPortalMode,
    isTeacherAuthenticated,
    setIsTeacherAuthModalOpen,
    currentSection, 
    teacherSection, 
    isDarkMode, 
    toggleDarkMode, 
    setIsMobileMenuOpen,
    setIsSearchOpen,
    currentStudent,
    currentStaffUser,
    faculties
  } = useApp();

  const isTeacher = portalMode === 'teacher' && isTeacherAuthenticated;
  const userRole = currentUser?.role || (isTeacher ? 'teacher' : 'student');
  const studentFaculty = faculties.find(f => f.id === currentStudent.facultyId);
  const currentMeta = isTeacher
    ? (TEACHER_SECTION_TITLES[teacherSection] || { title: 'O‘qituvchi boshqaruvi', subtitle: '' })
    : (STUDENT_SECTION_TITLES[currentSection] || { title: 'FacultyScore', subtitle: '' });

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Menyuni ochish"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <h1 className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate flex items-center gap-2">
              <span>{currentMeta.title}</span>
            </h1>
            <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 truncate">
              {currentMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions, Portal Mode Badge as shown in screenshot & User Status */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* USER ROLE INDICATOR (O'quvchi yoki O'qituvchi) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-semibold border border-slate-200/60 dark:border-slate-700/60">
            {userRole === 'student' ? (
              /* Student Role Badge */
              <div 
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                title="Siz o‘quvchi hisobi bilan kirgansiz"
              >
                <GraduationCap size={14} className="text-blue-600 dark:text-blue-400" />
                <span>O‘quvchi</span>
              </div>
            ) : (
              /* Teacher Role Badge */
              <div 
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 text-white dark:bg-blue-600 shadow-xs font-bold"
                title="Siz o‘qituvchi / hakam hisobi bilan kirgansiz"
              >
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>O‘qituvchi</span>
              </div>
            )}

            {/* Logout button to return to login screen */}
            <button
              onClick={logout}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors font-medium text-xs"
              title="Tizimdan chiqish (Kirish oynasiga qaytish)"
            >
              <LogOut size={12} />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>

          {/* Quick Search trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors border border-transparent dark:border-slate-700/60"
            title="Qidiruv oynasini ochish"
          >
            <Search size={14} />
            <span className="hidden md:inline">Qidiruv</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 rounded border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Current Identity Chip */}
          {!isTeacher ? (
            <div 
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border
                bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
            >
              <Trophy size={13} className="text-blue-600 dark:text-blue-400" />
              <span>Blue: {studentFaculty?.totalPoints} ball</span>
            </div>
          ) : (
            <div 
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border
                bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{currentStaffUser.name.split(' ')[0]} ({currentStaffUser.roleTitle.split(' ')[0]})</span>
            </div>
          )}

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            title={isDarkMode ? "Yorug‘ rejimga o‘tish" : "Qorong‘i rejimga o‘tish"}
            aria-label="Mavzuni almashtirish"
          >
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
        </div>

      </div>
    </header>
  );
};
