import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Faculty, 
  Student, 
  PointRecord, 
  Achievement, 
  Announcement, 
  SchoolEvent, 
  Quiz, 
  Club, 
  AttendanceDay, 
  Suggestion,
  NavigationSection,
  TeacherNavigationSection,
  FacultyId,
  PointCategory,
  SchoolClassName,
  PortalMode,
  StaffUser,
  AuditLogEntry
} from '../types';
import { 
  INITIAL_FACULTIES, 
  CURRENT_STUDENT, 
  INITIAL_POINT_RECORDS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_EVENTS, 
  INITIAL_QUIZZES, 
  INITIAL_CLUBS, 
  INITIAL_ATTENDANCE_DAYS, 
  INITIAL_SUGGESTIONS,
  DEFAULT_STAFF_USER,
  MOCK_STAFF_USERS,
  INITIAL_AUDIT_LOGS,
  MOCK_STUDENTS_LIST
} from '../data/mockData';

interface AppContextType {
  // Portal & Role
  portalMode: PortalMode;
  setPortalMode: (mode: PortalMode) => void;
  currentStaffUser: StaffUser;
  setCurrentStaffUser: (user: StaffUser) => void;
  mockStaffUsers: StaffUser[];
  isTeacherAuthenticated: boolean;
  isTeacherAuthModalOpen: boolean;
  setIsTeacherAuthModalOpen: (open: boolean) => void;
  loginTeacher: (staffId: string, pin: string) => { success: boolean; message: string };
  logoutTeacher: () => void;

  // Navigation
  currentSection: NavigationSection;
  setCurrentSection: (section: NavigationSection) => void;
  teacherSection: TeacherNavigationSection;
  setTeacherSection: (section: TeacherNavigationSection) => void;

  // Layout UI
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Authoritative Core Data
  faculties: Faculty[];
  currentStudent: Student;
  studentsList: Student[];
  pointRecords: PointRecord[];
  achievements: Achievement[];
  announcements: Announcement[];
  events: SchoolEvent[];
  quizzes: Quiz[];
  clubs: Club[];
  attendanceDays: AttendanceDay[];
  suggestions: Suggestion[];
  auditLogs: AuditLogEntry[];

  // Student Actions
  submitAchievement: (achievementData: {
    title: string;
    category: Achievement['category'];
    description: string;
    certificateNumber?: string;
    attachmentName?: string;
  }) => void;

  submitSuggestion: (suggestionData: {
    title: string;
    content: string;
    category: Suggestion['category'];
    isAnonymous: boolean;
  }) => void;

  upvoteSuggestion: (id: string) => void;
  completeQuiz: (quizId: string, scorePointsEarned: number) => void;
  toggleEventRegistration: (eventId: string) => void;
  toggleClubEnrollment: (clubId: string) => void;

  // Teacher / Administrative Actions
  awardFacultyPoints: (params: {
    facultyId: FacultyId;
    points: number;
    category: PointCategory;
    reason: string;
    attributedStudentName?: string;
    attributedClass: SchoolClassName;
  }) => { success: boolean; message: string; transactionCode?: string };

  reversePointTransaction: (recordId: string, reversalReason: string) => { success: boolean; message: string };

  reviewAchievement: (
    achievementId: string, 
    status: 'tasdiqlangan' | 'rad_etilgan', 
    reviewerNote: string, 
    pointsToAward?: number
  ) => void;

  respondToSuggestion: (suggestionId: string, status: 'qabul_qilindi' | 'rad_etildi', adminResponse: string) => void;

  createQuiz: (quizData: Omit<Quiz, 'id'>) => void;

  createEvent: (eventData: Omit<SchoolEvent, 'id' | 'registeredCount'>) => void;

  createAnnouncement: (annData: Omit<Announcement, 'id'>) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Teacher Authentication state: by default false so students cannot enter
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('facultyscore_teacher_auth') === 'true';
  });

  const [isTeacherAuthModalOpen, setIsTeacherAuthModalOpen] = useState<boolean>(false);

  // Portal Mode: Default student. If teacher mode was previously set but auth is missing, reset to student.
  const [portalMode, setPortalModeState] = useState<PortalMode>(() => {
    const isAuth = localStorage.getItem('facultyscore_teacher_auth') === 'true';
    const saved = localStorage.getItem('facultyscore_portal_mode');
    if (saved === 'teacher' && isAuth) {
      return 'teacher';
    }
    return 'student';
  });

  const setPortalMode = (mode: PortalMode) => {
    if (mode === 'teacher') {
      if (!isTeacherAuthenticated) {
        setIsTeacherAuthModalOpen(true);
        showToast("O‘qituvchi paneliga kirish uchun xodim PIN-kodi talab qilinadi");
        return;
      }
      setPortalModeState('teacher');
      localStorage.setItem('facultyscore_portal_mode', 'teacher');
    } else {
      setPortalModeState('student');
      localStorage.setItem('facultyscore_portal_mode', 'student');
    }
  };

  // Staff User & Permissions
  const [currentStaffUser, setCurrentStaffUser] = useState<StaffUser>(() => {
    const saved = localStorage.getItem('facultyscore_staff_user');
    return saved ? JSON.parse(saved) : DEFAULT_STAFF_USER;
  });

  useEffect(() => {
    localStorage.setItem('facultyscore_staff_user', JSON.stringify(currentStaffUser));
  }, [currentStaffUser]);

  const loginTeacher = (staffId: string, pin: string) => {
    const cleanPin = pin.trim();
    if (cleanPin !== '2026' && cleanPin !== 'sino2026') {
      return { 
        success: false, 
        message: 'Maxfiy PIN-kod noto‘g‘ri! O‘quvchilarga o‘qituvchi paneliga kirish qat’iyan taqiqlangan.' 
      };
    }

    const staff = MOCK_STAFF_USERS.find(s => s.id === staffId) || DEFAULT_STAFF_USER;
    setCurrentStaffUser(staff);
    setIsTeacherAuthenticated(true);
    localStorage.setItem('facultyscore_teacher_auth', 'true');
    setPortalModeState('teacher');
    localStorage.setItem('facultyscore_portal_mode', 'teacher');
    setTeacherSection('teacher-dashboard');
    showToast(`O‘qituvchi sifatida tizimga kirildi: ${staff.name}`);
    return { success: true, message: 'Muvaffaqiyatli' };
  };

  const logoutTeacher = () => {
    setIsTeacherAuthenticated(false);
    localStorage.removeItem('facultyscore_teacher_auth');
    setPortalModeState('student');
    localStorage.setItem('facultyscore_portal_mode', 'student');
    setCurrentSection('dashboard');
    showToast("O‘qituvchi kabinetidan chiqildi. O‘quvchi rejimi faollashdi.");
  };

  // Navigation State
  const [currentSection, setCurrentSection] = useState<NavigationSection>('dashboard');
  const [teacherSection, setTeacherSection] = useState<TeacherNavigationSection>('teacher-dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('facultyscore_theme');
    if (saved) return saved === 'dark';
    return false; // Default Light mode
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('facultyscore_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('facultyscore_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  // Authoritative data with localStorage persistence
  const [faculties, setFaculties] = useState<Faculty[]>(() => {
    const saved = localStorage.getItem('facultyscore_faculties');
    return saved ? JSON.parse(saved) : INITIAL_FACULTIES;
  });

  const [currentStudent, setCurrentStudent] = useState<Student>(() => {
    const saved = localStorage.getItem('facultyscore_student');
    return saved ? JSON.parse(saved) : CURRENT_STUDENT;
  });

  const [studentsList, setStudentsList] = useState<Student[]>(() => {
    const saved = localStorage.getItem('facultyscore_students_list');
    return saved ? JSON.parse(saved) : MOCK_STUDENTS_LIST;
  });

  const [pointRecords, setPointRecords] = useState<PointRecord[]>(() => {
    const saved = localStorage.getItem('facultyscore_records');
    return saved ? JSON.parse(saved) : INITIAL_POINT_RECORDS;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('facultyscore_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('facultyscore_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [events, setEvents] = useState<SchoolEvent[]>(() => {
    const saved = localStorage.getItem('facultyscore_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem('facultyscore_quizzes');
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });

  const [clubs, setClubs] = useState<Club[]>(() => {
    const saved = localStorage.getItem('facultyscore_clubs');
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  const [attendanceDays] = useState<AttendanceDay[]>(INITIAL_ATTENDANCE_DAYS);

  const [suggestions, setSuggestions] = useState<Suggestion[]>(() => {
    const saved = localStorage.getItem('facultyscore_suggestions');
    return saved ? JSON.parse(saved) : INITIAL_SUGGESTIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('facultyscore_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('facultyscore_faculties', JSON.stringify(faculties));
  }, [faculties]);

  useEffect(() => {
    localStorage.setItem('facultyscore_student', JSON.stringify(currentStudent));
  }, [currentStudent]);

  useEffect(() => {
    localStorage.setItem('facultyscore_students_list', JSON.stringify(studentsList));
  }, [studentsList]);

  useEffect(() => {
    localStorage.setItem('facultyscore_records', JSON.stringify(pointRecords));
  }, [pointRecords]);

  useEffect(() => {
    localStorage.setItem('facultyscore_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('facultyscore_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('facultyscore_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('facultyscore_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('facultyscore_clubs', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('facultyscore_suggestions', JSON.stringify(suggestions));
  }, [suggestions]);

  useEffect(() => {
    localStorage.setItem('facultyscore_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Recalculate faculties totals and ranks based on all active transactions
  const recalculateFaculties = (records: PointRecord[]) => {
    const initialMap: Record<FacultyId, { total: number; weekly: number; breakdown: Faculty['breakdown'] }> = {
      Blue: { total: 0, weekly: 0, breakdown: { academics: 0, events: 0, sports: 0, clubs: 0, discipline: 0 } },
      Green: { total: 0, weekly: 0, breakdown: { academics: 0, events: 0, sports: 0, clubs: 0, discipline: 0 } },
      White: { total: 0, weekly: 0, breakdown: { academics: 0, events: 0, sports: 0, clubs: 0, discipline: 0 } },
      Red: { total: 0, weekly: 0, breakdown: { academics: 0, events: 0, sports: 0, clubs: 0, discipline: 0 } },
    };

    // Calculate from records that are not reversed
    records.forEach(rec => {
      if (rec.isReversed) return;
      const target = initialMap[rec.facultyId];
      if (target) {
        target.total += rec.points;
        target.weekly += rec.points;
        target.breakdown[rec.category] = (target.breakdown[rec.category] || 0) + rec.points;
      }
    });

    setFaculties(prev => {
      const updated = prev.map(f => {
        const stats = initialMap[f.id];
        // Merge with initial baseline
        const baseTotal = f.id === 'Blue' ? 1220 : f.id === 'Green' ? 1165 : f.id === 'White' ? 1090 : 1055;
        const totalPoints = baseTotal + stats.total;
        return {
          ...f,
          totalPoints: Math.max(0, totalPoints),
          weeklyChange: Math.max(0, stats.weekly + (f.id === 'Blue' ? 90 : 70)),
          breakdown: {
            academics: Math.max(0, f.breakdown.academics + (stats.breakdown.academics > 0 ? 0 : 0)),
            events: f.breakdown.events,
            sports: f.breakdown.sports,
            clubs: f.breakdown.clubs,
            discipline: f.breakdown.discipline
          }
        };
      });

      const sorted = [...updated].sort((a, b) => b.totalPoints - a.totalPoints);
      return sorted.map((item, index) => ({
        ...item,
        rank: index + 1
      }));
    });
  };

  // Add audit log
  const logAudit = (action: string, target: string, details: string, severity: 'info' | 'warning' | 'critical' = 'info') => {
    const now = new Date();
    const dateFormatted = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()} · ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newLog: AuditLogEntry = {
      id: `aud_${Date.now()}`,
      action,
      performedBy: `${currentStaffUser.name} (${currentStaffUser.roleTitle})`,
      target,
      timestamp: Date.now(),
      date: dateFormatted,
      details,
      severity
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // TEACHER: Award or Deduct Faculty Points with full transaction ledger
  const awardFacultyPoints = (params: {
    facultyId: FacultyId;
    points: number;
    category: PointCategory;
    reason: string;
    attributedStudentName?: string;
    attributedClass: SchoolClassName;
  }) => {
    // Permission check
    if (params.points > 0 && !currentStaffUser.permissions.canAwardPoints) {
      return { success: false, message: 'Sizda ball qo‘shish huquqi mavjud emas.' };
    }
    if (params.points < 0 && !currentStaffUser.permissions.canDeductPoints) {
      return { success: false, message: 'Sizda ball ayirish huquqi mavjud emas.' };
    }

    const now = new Date();
    const dateFormatted = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()} · ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const txNum = Math.floor(1000 + Math.random() * 9000);
    const transactionCode = `TX-2026-${txNum}`;

    const newRecord: PointRecord = {
      id: `pr_${Date.now()}`,
      transactionCode,
      title: params.reason,
      reason: params.reason,
      facultyId: params.facultyId,
      points: params.points,
      category: params.category,
      attributedStudentName: params.attributedStudentName,
      attributedClass: params.attributedClass,
      date: dateFormatted,
      timestamp: Date.now(),
      verifiedBy: currentStaffUser.name
    };

    setPointRecords(prev => {
      const nextRecords = [newRecord, ...prev];
      recalculateFaculties(nextRecords);
      return nextRecords;
    });

    logAudit(
      params.points > 0 ? `Ball berildi (+${params.points})` : `Ball ayirildi (${params.points})`,
      `${params.facultyId} fakulteti (${transactionCode})`,
      `Sabab: ${params.reason} · Sinf: ${params.attributedClass}` + (params.attributedStudentName ? ` · O‘quvchi: ${params.attributedStudentName}` : ''),
      params.points < 0 ? 'warning' : 'info'
    );

    showToast(`${params.facultyId} fakultetiga ${params.points > 0 ? `+${params.points}` : params.points} ball rasmiylashtirildi! (${transactionCode})`);
    return { success: true, message: 'Tranzaksiya muvaffaqiyatli saqlandi', transactionCode };
  };

  // TEACHER: Reverse transaction with auditable inverse record
  const reversePointTransaction = (recordId: string, reversalReason: string) => {
    if (!currentStaffUser.permissions.canReverseTransactions) {
      return { success: false, message: 'Sizda tranzaksiyani bekor qilish huquqi mavjud emas.' };
    }

    const targetRecord = pointRecords.find(r => r.id === recordId);
    if (!targetRecord) {
      return { success: false, message: 'Tranzaksiya topilmadi.' };
    }
    if (targetRecord.isReversed) {
      return { success: false, message: 'Ushbu tranzaksiya allaqachon bekor qilingan.' };
    }

    const now = new Date();
    const dateFormatted = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()} · ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setPointRecords(prev => {
      const nextRecords = prev.map(rec => {
        if (rec.id === recordId) {
          return {
            ...rec,
            isReversed: true,
            reversalReason,
            reversedBy: currentStaffUser.name,
            reversedAt: dateFormatted
          };
        }
        return rec;
      });
      recalculateFaculties(nextRecords);
      return nextRecords;
    });

    logAudit(
      'Tranzaksiya bekor qilindi (Reversal)',
      `${targetRecord.facultyId} fakulteti (${targetRecord.transactionCode})`,
      `Asl ball: ${targetRecord.points} · Bekor qilish asosi: ${reversalReason}`,
      'critical'
    );

    showToast(`${targetRecord.transactionCode} tranzaksiyasi bekor qilindi va ballar qayta hisoblandi.`);
    return { success: true, message: 'Tranzaksiya muvaffaqiyatli bekor qilindi.' };
  };

  // TEACHER: Review Achievement (Approve or Reject with optional faculty points)
  const reviewAchievement = (
    achievementId: string, 
    status: 'tasdiqlangan' | 'rad_etilgan', 
    reviewerNote: string, 
    pointsToAward: number = 25
  ) => {
    const targetAch = achievements.find(a => a.id === achievementId);
    if (!targetAch) return;

    setAchievements(prev => prev.map(a => {
      if (a.id === achievementId) {
        return {
          ...a,
          status,
          reviewerNote,
          pointsAwarded: status === 'tasdiqlangan' ? pointsToAward : 0
        };
      }
      return a;
    }));

    if (status === 'tasdiqlangan' && pointsToAward > 0) {
      awardFacultyPoints({
        facultyId: targetAch.facultyId,
        points: pointsToAward,
        category: 'academics',
        reason: `Tasdiqlangan yutuq: ${targetAch.title}`,
        attributedStudentName: targetAch.studentName,
        attributedClass: targetAch.className
      });
    }

    logAudit(
      status === 'tasdiqlangan' ? 'Yutuq tasdiqlandi' : 'Yutuq rad etildi',
      `${targetAch.studentName} (${targetAch.className})`,
      `Yutuq: ${targetAch.title} · Xulosa: ${reviewerNote}`,
      status === 'tasdiqlangan' ? 'info' : 'warning'
    );

    showToast(status === 'tasdiqlangan' ? 'Yutuq tasdiqlandi va fakultetga ball qo‘shildi!' : 'Yutuq rad etildi.');
  };

  // TEACHER: Respond to suggestion
  const respondToSuggestion = (suggestionId: string, status: 'qabul_qilindi' | 'rad_etildi', adminResponse: string) => {
    setSuggestions(prev => prev.map(sug => {
      if (sug.id === suggestionId) {
        return {
          ...sug,
          status,
          adminResponse
        };
      }
      return sug;
    }));

    logAudit(
      'Taklifga rasmiy javob berildi',
      `Taklif ID: ${suggestionId}`,
      `Holat: ${status} · Javob: ${adminResponse}`
    );

    showToast('Taklifga rasmiy javob saqlandi!');
  };

  // TEACHER: Create Quiz
  const createQuiz = (quizData: Omit<Quiz, 'id'>) => {
    const newQuiz: Quiz = {
      ...quizData,
      id: `qz_${Date.now()}`
    };
    setQuizzes(prev => [newQuiz, ...prev]);
    logAudit('Yangi viktorina yaratildi', newQuiz.title, `Savollar: ${newQuiz.questionsCount} ta · Ball: +${newQuiz.potentialPoints}`);
    showToast('Yangi viktorina muvaffaqiyatli e’lon qilindi!');
  };

  // TEACHER: Create Event
  const createEvent = (eventData: Omit<SchoolEvent, 'id' | 'registeredCount'>) => {
    const newEvent: SchoolEvent = {
      ...eventData,
      id: `ev_${Date.now()}`,
      registeredCount: 0
    };
    setEvents(prev => [newEvent, ...prev]);
    logAudit('Yangi maktab tadbiri e’lon qilindi', newEvent.title, `${newEvent.displayDate} · ${newEvent.location}`);
    showToast('Tadbir taqvimga kiritildi!');
  };

  // TEACHER: Create Announcement
  const createAnnouncement = (annData: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = {
      ...annData,
      id: `ann_${Date.now()}`
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    logAudit('Rasmiy e’lon chop etildi', newAnn.title, `Toifa: ${newAnn.category}`);
    showToast('E’lon barcha o‘quvchilarga e’lon qilindi!');
  };

  // STUDENT ACTIONS
  const submitAchievement = (data: {
    title: string;
    category: Achievement['category'];
    description: string;
    certificateNumber?: string;
    attachmentName?: string;
  }) => {
    const now = new Date();
    const dateFormatted = `${now.getDate()}-oktabr, ${now.getFullYear()}`;
    const newAch: Achievement = {
      id: `ach_${Date.now()}`,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      className: currentStudent.className,
      facultyId: currentStudent.facultyId,
      title: data.title,
      category: data.category,
      description: data.description,
      pointsAwarded: 0,
      date: dateFormatted,
      status: 'kutilmoqda',
      certificateNumber: data.certificateNumber,
      attachmentName: data.attachmentName || 'hujjat_ilova.pdf',
      reviewerNote: 'Maktab ma’muriyati ko‘rib chiqish jarayonida.'
    };

    setAchievements(prev => [newAch, ...prev]);
    showToast('Yutug‘ingiz ko‘rib chiqish uchun yuborildi!');
  };

  const submitSuggestion = (data: {
    title: string;
    content: string;
    category: Suggestion['category'];
    isAnonymous: boolean;
  }) => {
    const now = new Date();
    const dateFormatted = `${now.getDate()}-oktabr, ${now.getFullYear()}`;
    const newSug: Suggestion = {
      id: `sug_${Date.now()}`,
      studentId: currentStudent.id,
      studentName: data.isAnonymous ? 'Anonim o‘quvchi' : currentStudent.name,
      className: currentStudent.className,
      facultyId: currentStudent.facultyId,
      title: data.title,
      content: data.content,
      category: data.category,
      isAnonymous: data.isAnonymous,
      status: 'korib_chiqilmoqda',
      createdAt: dateFormatted,
      upvotes: 1,
      hasUpvoted: true
    };

    setSuggestions(prev => [newSug, ...prev]);
    showToast('Taklifingiz muvaffaqiyatli qabul qilindi!');
  };

  const upvoteSuggestion = (id: string) => {
    setSuggestions(prev => prev.map(sug => {
      if (sug.id === id) {
        const isUpvoted = sug.hasUpvoted;
        return {
          ...sug,
          upvotes: isUpvoted ? sug.upvotes - 1 : sug.upvotes + 1,
          hasUpvoted: !isUpvoted
        };
      }
      return sug;
    }));
  };

  const completeQuiz = (quizId: string, scorePointsEarned: number) => {
    setQuizzes(prev => prev.map(q => {
      if (q.id === quizId) {
        return {
          ...q,
          isCompleted: true,
          userScore: scorePointsEarned
        };
      }
      return q;
    }));

    if (scorePointsEarned > 0) {
      awardFacultyPoints({
        facultyId: currentStudent.facultyId,
        points: scorePointsEarned,
        category: 'academics',
        reason: `Bilim viktorinasi muvaffaqiyatli yakunlandi: +${scorePointsEarned} ball`,
        attributedStudentName: currentStudent.name,
        attributedClass: currentStudent.className
      });
    }

    setCurrentStudent(prev => ({
      ...prev,
      quizParticipationsCount: prev.quizParticipationsCount + 1
    }));
  };

  const toggleEventRegistration = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const nextState = !ev.isRegistered;
        return {
          ...ev,
          isRegistered: nextState,
          registeredCount: nextState ? ev.registeredCount + 1 : ev.registeredCount - 1
        };
      }
      return ev;
    }));
  };

  const toggleClubEnrollment = (clubId: string) => {
    setClubs(prev => prev.map(cl => {
      if (cl.id === clubId) {
        const nextEnrolled = !cl.isEnrolled;
        return {
          ...cl,
          isEnrolled: nextEnrolled,
          membersCount: nextEnrolled ? cl.membersCount + 1 : cl.membersCount - 1
        };
      }
      return cl;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        portalMode,
        setPortalMode,
        currentStaffUser,
        setCurrentStaffUser,
        mockStaffUsers: MOCK_STAFF_USERS,
        isTeacherAuthenticated,
        isTeacherAuthModalOpen,
        setIsTeacherAuthModalOpen,
        loginTeacher,
        logoutTeacher,
        currentSection,
        setCurrentSection,
        teacherSection,
        setTeacherSection,
        isDarkMode,
        toggleDarkMode,
        isSidebarCollapsed,
        toggleSidebar,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        faculties,
        currentStudent,
        studentsList,
        pointRecords,
        achievements,
        announcements,
        events,
        quizzes,
        clubs,
        attendanceDays,
        suggestions,
        auditLogs,
        submitAchievement,
        submitSuggestion,
        upvoteSuggestion,
        completeQuiz,
        toggleEventRegistration,
        toggleClubEnrollment,
        awardFacultyPoints,
        reversePointTransaction,
        reviewAchievement,
        respondToSuggestion,
        createQuiz,
        createEvent,
        createAnnouncement,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
