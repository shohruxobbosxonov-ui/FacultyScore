export type FacultyId = 'Blue' | 'Green' | 'White' | 'Red';

export type SchoolGrade = 7 | 8 | 9 | 10;

// Exact 14 classes required:
// Grade 7: 7-Blue, 7-Green, 7-White
// Grade 8: 8-Blue, 8-Green, 8-White, 8-Red
// Grade 9: 9-Blue, 9-Green, 9-White, 9-Red
// Grade 10: 10-Blue, 10-Green, 10-White
export type SchoolClassName = 
  | '7-Blue' | '7-Green' | '7-White'
  | '8-Blue' | '8-Green' | '8-White' | '8-Red'
  | '9-Blue' | '9-Green' | '9-White' | '9-Red'
  | '10-Blue' | '10-Green' | '10-White';

export interface Faculty {
  id: FacultyId;
  name: string; // "Blue", "Green", "White", "Red"
  uzName: string; // "Ko‘k fakultet", "Yashil fakultet", etc.
  symbol: string;
  motto: string;
  totalPoints: number;
  weeklyChange: number;
  monthlyChange: number;
  rank: number;
  classesCount: number; // Blue: 4, Green: 4, White: 4, Red: 2
  studentsCount: number;
  color: {
    primary: string;
    bgLight: string;
    bgDark: string;
    border: string;
    text: string;
  };
  breakdown: {
    academics: number; // Fan olimpiadalari va tanlovlar
    events: number;    // Maktab tadbirlari va Zakovat
    sports: number;    // Sport musobaqalari
    clubs: number;     // To'garaklar va loyihalar
    discipline: number; // Intizom va namunali xulq (musbat yoki manfiy)
  };
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentIdNumber: string;
  grade: SchoolGrade;
  className: SchoolClassName;
  facultyId: FacultyId;
  avatar: string;
  personalContributionPoints: number;
  verifiedAchievementsCount: number;
  quizParticipationsCount: number;
  joinedClubsCount: number;
  attendanceRate: number; // e.g. 96.5%
}

export type PointCategory = 'academics' | 'events' | 'sports' | 'clubs' | 'discipline';

export interface PointRecord {
  id: string;
  transactionCode: string; // e.g. "TX-2026-1042"
  title: string;
  reason: string;
  facultyId: FacultyId;
  points: number; // positive (+20) or negative (-5)
  category: PointCategory;
  attributedStudentName?: string;
  attributedClass: SchoolClassName;
  date: string; // "07.10.2026 · 09:30"
  timestamp: number;
  verifiedBy: string;
  isReversed?: boolean;
  reversalReason?: string;
  reversedBy?: string;
  reversedAt?: string;
}

export type AchievementCategory = 'olimpiada' | 'sertifikat' | 'loyiha' | 'sport' | 'ijod' | 'jamoat';

export type VerificationStatus = 'tasdiqlangan' | 'kutilmoqda' | 'rad_etilgan';

export interface Achievement {
  id: string;
  studentId: string;
  studentName: string;
  className: SchoolClassName;
  facultyId: FacultyId;
  title: string;
  category: AchievementCategory;
  description: string;
  pointsAwarded: number;
  date: string;
  status: VerificationStatus;
  certificateNumber?: string;
  attachmentName?: string;
  reviewerNote?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'muhim' | 'yangilik' | 'tadbir' | 'olimpiada';
  author: string;
  date: string;
  readTime: string;
  isPinned?: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO format "2026-10-15"
  displayDate: string; // "15-oktabr, 2026"
  time: string; // "14:00"
  location: string;
  category: 'viktorina' | 'sport' | 'ijod' | 'akademik';
  pointsReward: string; // "+30 ball g'olib fakultetga"
  registeredCount: number;
  isRegistered?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  description: string;
  questionsCount: number;
  durationMinutes: number;
  deadlineDate: string;
  potentialPoints: number; // e.g. 25 points to student's faculty
  questions: QuizQuestion[];
  isCompleted?: boolean;
  userScore?: number;
}

export interface Club {
  id: string;
  title: string;
  mentor: string;
  mentorRole: string;
  schedule: string;
  room: string;
  description: string;
  category: 'it' | 'ilm-fan' | 'sanat' | 'til' | 'sport';
  membersCount: number;
  maxCapacity: number;
  isEnrolled?: boolean;
}

export interface AttendanceDay {
  date: string;
  dayName: string;
  status: 'kelgan' | 'kechikkan' | 'sababli' | 'sababsiz';
  lessonCount: number;
  attendedLessons: number;
  note?: string;
}

export interface Suggestion {
  id: string;
  studentId: string;
  studentName: string;
  className: SchoolClassName;
  facultyId: FacultyId;
  title: string;
  content: string;
  category: 'oquv_jarayoni' | 'maktab_oshxonasi' | 'sport_va_tadbir' | 'kutubxona' | 'boshqa';
  isAnonymous: boolean;
  status: 'korib_chiqilmoqda' | 'qabul_qilindi' | 'rad_etildi';
  createdAt: string;
  adminResponse?: string;
  upvotes: number;
  hasUpvoted?: boolean;
}

export type PortalMode = 'student' | 'teacher';

export type StaffRole = 'admin' | 'teacher' | 'moderator';

export interface StaffUser {
  id: string;
  name: string;
  role: StaffRole;
  roleTitle: string;
  department: string;
  assignedClasses: SchoolClassName[];
  avatar: string;
  permissions: {
    canAwardPoints: boolean;
    canDeductPoints: boolean;
    canReverseTransactions: boolean;
    canApproveAchievements: boolean;
    canMarkAttendance: boolean;
    canManageQuizzes: boolean;
    canPublishAnnouncements: boolean;
    canRespondToSuggestions: boolean;
  };
}

export interface AuditLogEntry {
  id: string;
  action: string;
  performedBy: string;
  target: string;
  timestamp: number;
  date: string;
  details: string;
  severity: 'info' | 'warning' | 'critical';
}

export type NavigationSection = 
  | 'dashboard'
  | 'faculties'
  | 'point-history'
  | 'announcements'
  | 'events'
  | 'quizzes'
  | 'attendance'
  | 'clubs'
  | 'my-achievements'
  | 'suggestions'
  | 'profile';

export type TeacherNavigationSection = 
  | 'teacher-dashboard'
  | 'teacher-points'
  | 'teacher-ledger'
  | 'teacher-achievements'
  | 'teacher-attendance'
  | 'teacher-analytics'
  | 'teacher-quizzes'
  | 'teacher-events'
  | 'teacher-suggestions'
  | 'teacher-students'
  | 'teacher-ai-tools';

