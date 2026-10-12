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
  SchoolClassName,
  StaffUser,
  AuditLogEntry 
} from '../types';

export const ALL_SCHOOL_CLASSES: SchoolClassName[] = [
  '7-Blue', '7-Green', '7-White',
  '8-Blue', '8-Green', '8-White', '8-Red',
  '9-Blue', '9-Green', '9-White', '9-Red',
  '10-Blue', '10-Green', '10-White'
];

export const INITIAL_FACULTIES: Faculty[] = [
  {
    id: 'Blue',
    name: 'Blue',
    uzName: 'Ko‘k fakultet',
    symbol: 'Muzqaymoq & Burgut',
    motto: 'Bilim va teran fikr — qudratimiz poydevori',
    totalPoints: 1250,
    weeklyChange: 120,
    monthlyChange: 430,
    rank: 1,
    classesCount: 4, // 7-Blue, 8-Blue, 9-Blue, 10-Blue
    studentsCount: 142,
    color: {
      primary: '#2563EB',
      bgLight: '#EFF6FF',
      bgDark: '#1E293B',
      border: '#BFDBFE',
      text: '#1D4ED8',
    },
    breakdown: {
      academics: 540,
      events: 310,
      sports: 180,
      clubs: 240,
      discipline: -20,
    }
  },
  {
    id: 'Green',
    name: 'Green',
    uzName: 'Yashil fakultet',
    symbol: 'Yashil Baraka & Qoplon',
    motto: 'Doimiy o‘sish, tabiat va kuchli jamoaviylik',
    totalPoints: 1190,
    weeklyChange: 95,
    monthlyChange: 380,
    rank: 2,
    classesCount: 4, // 7-Green, 8-Green, 9-Green, 10-Green
    studentsCount: 138,
    color: {
      primary: '#16A34A',
      bgLight: '#F0FDF4',
      bgDark: '#143823',
      border: '#BBF7D0',
      text: '#15803D',
    },
    breakdown: {
      academics: 480,
      events: 330,
      sports: 210,
      clubs: 190,
      discipline: -20,
    }
  },
  {
    id: 'White',
    name: 'White',
    uzName: 'Oq fakultet',
    symbol: 'Kumush Oqqush & Quyosh',
    motto: 'Sof niyat, adolat va yuksak odob',
    totalPoints: 1135,
    weeklyChange: 85,
    monthlyChange: 360,
    rank: 3,
    classesCount: 4, // 7-White, 8-White, 9-White, 10-White
    studentsCount: 136,
    color: {
      primary: '#475569',
      bgLight: '#F8FAFC',
      bgDark: '#1E2430',
      border: '#CBD5E1',
      text: '#334155',
    },
    breakdown: {
      academics: 450,
      events: 290,
      sports: 225,
      clubs: 180,
      discipline: -10,
    }
  },
  {
    id: 'Red',
    name: 'Red',
    uzName: 'Qizil fakultet',
    symbol: 'Olov & Sher',
    motto: 'Shijoat, g‘alaba va yetakchilik ruhi',
    totalPoints: 1080,
    weeklyChange: 70,
    monthlyChange: 340,
    rank: 4,
    classesCount: 2, // 8-Red, 9-Red
    studentsCount: 84,
    color: {
      primary: '#DC2626',
      bgLight: '#FEF2F2',
      bgDark: '#3B1818',
      border: '#FECACA',
      text: '#B91C1C',
    },
    breakdown: {
      academics: 420,
      events: 270,
      sports: 250,
      clubs: 165,
      discipline: -25,
    }
  }
];

export const CURRENT_STUDENT: Student = {
  id: 'std_9b_001',
  name: 'Muhammad Aliyev',
  email: 'muhammad.aliyev@sinoedu.uz',
  studentIdNumber: 'SINO-2026-0941',
  grade: 9,
  className: '9-Blue',
  facultyId: 'Blue',
  avatar: 'MA',
  personalContributionPoints: 115,
  verifiedAchievementsCount: 5,
  quizParticipationsCount: 8,
  joinedClubsCount: 2,
  attendanceRate: 98.2,
};

export const INITIAL_POINT_RECORDS: PointRecord[] = [
  {
    id: 'pr_1',
    transactionCode: 'TX-2026-0001',
    title: 'Matematika fani tuman olimpiadasi',
    reason: 'Tuman bosqichida mutlaq 1-o‘rinni egalladi',
    facultyId: 'Blue',
    points: 30,
    category: 'academics',
    attributedStudentName: 'Muhammad Aliyev',
    attributedClass: '9-Blue',
    date: '11.10.2026 · 14:20',
    timestamp: 1791728400000,
    verifiedBy: 'Maktab Ilmiy Kengashi'
  },
  {
    id: 'pr_2',
    transactionCode: 'TX-2026-0002',
    title: 'Kitobxonlik tanlovi 1-bosqich',
    reason: 'O‘zbek adabiyoti durdonalari bo‘yicha 1-o‘rin',
    facultyId: 'Green',
    points: 25,
    category: 'academics',
    attributedStudentName: 'Madina Karimova',
    attributedClass: '8-Green',
    date: '11.10.2026 · 11:30',
    timestamp: 1791718200000,
    verifiedBy: 'Kutubxona mudirasi'
  },
  {
    id: 'pr_3',
    transactionCode: 'TX-2026-0003',
    title: 'Robototexnika jamoaviy loyihasi',
    reason: 'Ixtisoslashgan aqlli saralovchi robot namoyishi',
    facultyId: 'White',
    points: 20,
    category: 'clubs',
    attributedStudentName: 'Azizbek Abdullayev',
    attributedClass: '10-White',
    date: '10.10.2026 · 16:45',
    timestamp: 1791650700000,
    verifiedBy: 'To‘garak rahbari'
  },
  {
    id: 'pr_4',
    transactionCode: 'TX-2026-0004',
    title: 'Maktab sport musobaqasi: Voleybol',
    reason: 'Fakultetlararo voleybol birinchiligida 1-o‘rin',
    facultyId: 'Red',
    points: 25,
    category: 'sports',
    attributedStudentName: 'Jasur Bekmurodov',
    attributedClass: '9-Red',
    date: '10.10.2026 · 15:10',
    timestamp: 1791645000000,
    verifiedBy: 'Jismoniy tarbiya kafedrasi'
  },
  {
    id: 'pr_5',
    transactionCode: 'TX-2026-0005',
    title: 'Ko‘ngillilar kuni: Maktab kutubxonasiga ko‘mak',
    reason: 'Yangi darslik fondini saralashda faol ishtirok',
    facultyId: 'Red',
    points: 15,
    category: 'events',
    attributedStudentName: 'Zilola Rahimova',
    attributedClass: '9-Red',
    date: '09.10.2026 · 14:00',
    timestamp: 1791554400000,
    verifiedBy: 'Yoshlar yetakchisi'
  },
  {
    id: 'pr_6',
    transactionCode: 'TX-2026-0006',
    title: 'Darsga asossiz kechikish',
    reason: 'Namunaviy intizom qoidasi buzilishi (birinchi darsga 15 daqiqa kechikish)',
    facultyId: 'Red',
    points: -5,
    category: 'discipline',
    attributedStudentName: 'Namunaviy qayd',
    attributedClass: '8-Red',
    date: '09.10.2026 · 08:45',
    timestamp: 1791535500000,
    verifiedBy: 'Maktab ma’muriyati'
  },
  {
    id: 'pr_7',
    transactionCode: 'TX-2026-0007',
    title: 'Ingliz tili Zakovat intellektual turniri',
    reason: 'Xalqaro muloqot haftaligida jamoaviy g‘alaba',
    facultyId: 'Blue',
    points: 35,
    category: 'events',
    attributedStudentName: 'Fakultet terma jamoasi',
    attributedClass: '9-Blue',
    date: '08.10.2026 · 17:00',
    timestamp: 1791478800000,
    verifiedBy: 'Zakovat klubi hakamlari'
  },
  {
    id: 'pr_8',
    transactionCode: 'TX-2026-0008',
    title: 'Kimyo fanidan amaliy laboratoriya loyihasi',
    reason: 'Tabiiy moddalardan indikatorlar olish tadqiqoti',
    facultyId: 'Green',
    points: 20,
    category: 'academics',
    attributedStudentName: 'Shahnoza Oripova',
    attributedClass: '9-Green',
    date: '07.10.2026 · 15:30',
    timestamp: 1791387000000,
    verifiedBy: 'Kimyo o‘qituvchisi'
  },
  {
    id: 'pr_9',
    transactionCode: 'TX-2026-0009',
    title: 'Sport formasi qoidalariga rioya qilmaslik',
    reason: 'Bir necha bor ogohlantirishga qaramay zal kiyimisiz kelish',
    facultyId: 'Blue',
    points: -5,
    category: 'discipline',
    attributedStudentName: 'Namunaviy qayd',
    attributedClass: '7-Blue',
    date: '06.10.2026 · 09:15',
    timestamp: 1791278100000,
    verifiedBy: 'Maktab ma’muriyati'
  },
  {
    id: 'pr_10',
    transactionCode: 'TX-2026-0010',
    title: 'Maktab bog‘ini ko‘kalamzorlashtirish aksiyasi',
    reason: 'Ekologik haftalikda eng namunali ishtirok',
    facultyId: 'White',
    points: 25,
    category: 'events',
    attributedStudentName: 'Jasmina Xudoyberdiyeva',
    attributedClass: '8-White',
    date: '05.10.2026 · 11:00',
    timestamp: 1791198000000,
    verifiedBy: 'Eko-klub yetakchisi'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_1',
    studentId: 'std_9b_001',
    studentName: 'Muhammad Aliyev',
    className: '9-Blue',
    facultyId: 'Blue',
    title: 'Matematika fan olimpiadasi — Tuman bosqichi 1-o‘rin',
    category: 'olimpiada',
    description: 'Farg‘ona shahar matematika olimpiadasida 9-sinflar o‘rtasida 100 balldan 96 ball to‘plab mutlaq g‘olib bo‘ldi.',
    pointsAwarded: 30,
    date: '11-oktabr, 2026',
    status: 'tasdiqlangan',
    certificateNumber: 'OLIMP-2026-MATH-091',
    attachmentName: 'diplom_matematika_tuman.pdf',
    reviewerNote: 'Maktab ilmiy kengashi tomonidan tasdiqlandi va fakultetga 30 ball kiritildi.'
  },
  {
    id: 'ach_2',
    studentId: 'std_9b_001',
    studentName: 'Muhammad Aliyev',
    className: '9-Blue',
    facultyId: 'Blue',
    title: 'C++ dasturlash va algoritmlash sertifikati',
    category: 'sertifikat',
    description: 'Xalqaro IT akademiyasi algoritmlar kursi (Murakkab ma’lumotlar tuzilmalari) muvaffaqiyatli yakunlandi.',
    pointsAwarded: 25,
    date: '28-sentabr, 2026',
    status: 'tasdiqlangan',
    certificateNumber: 'CERT-IT-99238',
    attachmentName: 'cpp_algorithms_certificate.pdf',
    reviewerNote: 'To‘garak rahbari tasdiqlagan.'
  },
  {
    id: 'ach_3',
    studentId: 'std_9b_001',
    studentName: 'Muhammad Aliyev',
    className: '9-Blue',
    facultyId: 'Blue',
    title: 'Maktab Zakovat intellektual turniri g‘olibi',
    category: 'jamoat',
    description: 'Blue fakulteti jamoasi sardori sifatida 1-o‘rinni qo‘lga kiritdi.',
    pointsAwarded: 35,
    date: '08-oktabr, 2026',
    status: 'tasdiqlangan',
    certificateNumber: 'ZAKOVAT-2026-004',
    reviewerNote: 'Hakamlar hay’ati bayonnomasi asosida rasmiylashtirildi.'
  },
  {
    id: 'ach_4',
    studentId: 'std_9b_001',
    studentName: 'Muhammad Aliyev',
    className: '9-Blue',
    facultyId: 'Blue',
    title: 'Fizika fani bo‘yicha maktab laboratoriya stendi',
    category: 'loyiha',
    description: 'Optika va yorug‘lik dispersiyasini ko‘rsatuvchi interaktiv stend yaratildi.',
    pointsAwarded: 25,
    date: '15-sentabr, 2026',
    status: 'tasdiqlangan',
    attachmentName: 'stend_chizmasi_va_foto.zip',
    reviewerNote: 'Kafedra mudiri tasdig‘i olindi.'
  },
  {
    id: 'ach_5',
    studentId: 'std_9b_001',
    studentName: 'Muhammad Aliyev',
    className: '9-Blue',
    facultyId: 'Blue',
    title: 'Fakultetlararo shaxmat turniri sovrindori',
    category: 'sport',
    description: 'Kuzgi shaxmat birinchiligida 2-o‘rin.',
    pointsAwarded: 0,
    date: '02-oktabr, 2026',
    status: 'kutilmoqda',
    reviewerNote: 'Sport hakamining tasdiqlovchi bayonnomasi kutilmoqda.'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_1',
    title: 'Kuzgi olimpiadalarga ro‘yxat ochildi',
    content: 'Matematika, fizika, biologiya va ingliz tili fanlari bo‘yicha maktab bosqichiga arizalar qabuli boshlandi. Ro‘yxatdan o‘tish 15-oktabr soat 18:00 ga qadar davom etadi. Har bir ishtirokchi o‘z fakultetiga g‘alaba keltirishi mumkin!',
    category: 'muhim',
    author: 'Maktab ma’muriyati',
    date: '11-oktabr, 2026 · 08:30',
    readTime: '2 daqiqa',
    isPinned: true
  },
  {
    id: 'ann_2',
    title: 'Yangi to‘garak: Sun’iy intellekt va Robototexnika',
    content: 'Ixtisoslashgan laboratoriyamizda zamonaviy mikrokontrollerlar va kompyuter ko‘rishi bo‘yicha yangi to‘garak ish boshlamoqda. Mashg‘ulotlar haftaning dushanba va payshanba kunlari soat 15:30 da o‘tkaziladi.',
    category: 'yangilik',
    author: 'To‘garaklar koordinatori',
    date: '10-oktabr, 2026 · 14:00',
    readTime: '1 daqiqa'
  },
  {
    id: 'ann_3',
    title: 'Fakultetlararo voleybol birinchiligi yakunlari',
    content: 'Kecha sport zalida o‘tkazilgan shiddatli bahslarda Red fakulteti jamoasi finalda g‘alaba qozondi va o‘z fakultetiga 25 ball keltirdi. Barcha qatnashchilarga minnatdorchilik bildiramiz!',
    category: 'tadbir',
    author: 'Jismoniy tarbiya kafedrasi',
    date: '10-oktabr, 2026 · 17:30',
    readTime: '1 daqiqa'
  },
  {
    id: 'ann_4',
    title: 'Kutubxonada yangi ilmiy va adabiy kitoblar fondi',
    content: 'Ibn Sino kutubxonasiga 200 dan ortiq yangi badiiy va ommabop ilmiy adabiyotlar keltirildi. Kitobxonlik faolligi har hafta reytingda hisobga olinadi.',
    category: 'yangilik',
    author: 'Maktab kutubxonasi',
    date: '08-oktabr, 2026 · 10:15',
    readTime: '2 daqiqa'
  }
];

export const INITIAL_EVENTS: SchoolEvent[] = [
  {
    id: 'ev_1',
    title: 'Zakovat intellektual o‘yini — 2-tur',
    description: 'To‘rt fakultet terma jamoalari o‘rtasida tabiatshunoslik va mantiq savollari bo‘yicha bellashuv.',
    date: '2026-10-14',
    displayDate: '14-oktabr, 2026',
    time: '14:30',
    location: 'Maktab faollar zali',
    category: 'viktorina',
    pointsReward: '+40 ball g‘olib fakultetga',
    registeredCount: 48,
    isRegistered: true
  },
  {
    id: 'ev_2',
    title: 'Fakultetlararo mini-futbol turniri',
    description: '7–10 sinf o‘quvchilari o‘rtasida an’anaviy kuzgi chempionat yarim final bahslari.',
    date: '2026-10-17',
    displayDate: '17-oktabr, 2026',
    time: '15:30',
    location: 'Maktab sport stadioni',
    category: 'sport',
    pointsReward: '+35 ball g‘olib jamoa fakultetiga',
    registeredCount: 64,
    isRegistered: false
  },
  {
    id: 'ev_3',
    title: 'Yosh olimlar ilmiy-amaliy anjumani',
    description: 'Kimyo va biologiya bo‘yicha mustaqil loyihalar ko‘rgazmasi va taqdimotlari.',
    date: '2026-10-22',
    displayDate: '22-oktabr, 2026',
    time: '10:00',
    location: 'Ilmiy laboratoriya binosi',
    category: 'akademik',
    pointsReward: '+30 ball har bir e’tirof etilgan loyihaga',
    registeredCount: 26,
    isRegistered: false
  },
  {
    id: 'ev_4',
    title: 'Ijodkor yoshlar musiqa va adabiyot festivali',
    description: 'G‘azalxonlik, she’riyat va milliy cholg‘u ijrochiligi bo‘yicha ijodiy kecha.',
    date: '2026-10-28',
    displayDate: '28-oktabr, 2026',
    time: '14:00',
    location: 'Katta madaniyat zali',
    category: 'ijod',
    pointsReward: '+25 ball sovrindorlarga',
    registeredCount: 38,
    isRegistered: false
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'qz_1',
    title: 'Ibn Sino merosi va tibbiyot tarixi',
    subject: 'Tarix va biologiya',
    description: 'Abu Ali ibn Sino hayoti, "Tib qonunlari" asari va o‘rta asrlar fani rivojiga qo‘shgan hissasi haqida 5 ta savol.',
    questionsCount: 5,
    durationMinutes: 10,
    deadlineDate: '15-oktabr, 2026',
    potentialPoints: 20,
    isCompleted: false,
    questions: [
      {
        id: 'q1',
        question: 'Abu Ali ibn Sino qaysi mashhur ensiklopedik tibbiyot asari muallifi hisoblanadi?',
        options: ['Al-Qonun fit-tibb (Tib qonunlari)', 'Ziji Ko‘ragoniy', 'Al-Jabr val-muqobala', 'Qutadg‘u bilig'],
        correctAnswerIndex: 0,
        explanation: 'Ibn Sino 5 jildlik mashhur "Al-Qonun fit-tibb" asari muallifidir.'
      },
      {
        id: 'q2',
        question: 'Ibn Sino tug‘ilgan tarixiy joy qaysi viloyat hududida joylashgan?',
        options: ['Buxoro (Afshona qishlog‘i)', 'Samarqand', 'Farg‘ona', 'Xorazm'],
        correctAnswerIndex: 0,
        explanation: 'Alloma 980-yilda Buxoro yaqinidagi Afshona qishlog‘ida tavallud topgan.'
      },
      {
        id: 'q3',
        question: 'Ibn Sinoning tabiat falsafasi va mantiqqa bag‘ishlangan eng yirik asari nima deb ataladi?',
        options: ['Kitob ash-Shifo', 'Hikmatlar majmuasi', 'Tibbiy risolalar', 'Boburnoma'],
        correctAnswerIndex: 0,
        explanation: '"Kitob ash-Shifo" (Shifo kitobi) uning falsafiy va tabiiy-ilmiy qomusi sanaladi.'
      },
      {
        id: 'q4',
        question: 'Ibn Sino ko‘z kasalliklarini davolashda qaysi usullarni birinchilardan bo‘lib taklif qilgan?',
        options: ['Kataraktani igna bilan olib tashlash va gigiyenik tozalik', 'Faqat o‘simlik qaynatmalari', 'Qon olish', 'Hech qanday amaliyot o‘tkazmagan'],
        correctAnswerIndex: 0,
        explanation: 'U ko‘z anatomiyasi va katarakta jarrohlik usullarini puxta bayon etgan.'
      },
      {
        id: 'q5',
        question: 'Ibn Sino Yevropada qaysi lotinlashtirilgan nom bilan tanilgan?',
        options: ['Avicenna', 'Alfraganus', 'Averroes', 'Alhazen'],
        correctAnswerIndex: 0,
        explanation: 'G‘arb mamlakatlarida alloma Avicenna nomi bilan butun dunyoga tanilgan.'
      }
    ]
  },
  {
    id: 'qz_2',
    title: 'Mantiq va tezkor matematika viktorinasi',
    subject: 'Matematika',
    description: 'Sonlar ketma-ketligi, ehtimollik nazariyasi va mantiqiy jumboqlar bo‘yicha tezkor sinov.',
    questionsCount: 4,
    durationMinutes: 8,
    deadlineDate: '18-oktabr, 2026',
    potentialPoints: 25,
    isCompleted: false,
    questions: [
      {
        id: 'mq1',
        question: 'Fibonachchi sonlar ketma-ketligida 1, 1, 2, 3, 5, 8, ... keyingi son qaysi?',
        options: ['13', '11', '14', '15'],
        correctAnswerIndex: 0,
        explanation: 'Har bir son o‘zidan oldingi ikkitasining yig‘indisi: 5 + 8 = 13.'
      },
      {
        id: 'mq2',
        question: 'Qavariq ko‘pburchakning ichki burchaklari yig‘indisi formulasini toping:',
        options: ['(n - 2) * 180°', 'n * 180°', '(n - 1) * 360°', '360° / n'],
        correctAnswerIndex: 0,
        explanation: 'Ixtiyoriy n burchakli qavariq ko‘pburchak ichki burchaklari yig‘indisi (n - 2) * 180° ga teng.'
      },
      {
        id: 'mq3',
        question: 'Tub sonlar ichida yagona juft son qaysi?',
        options: ['2', '4', '0', 'Bunday son yo‘q'],
        correctAnswerIndex: 0,
        explanation: '2 soni yagona juft tub son hisoblanadi.'
      },
      {
        id: 'mq4',
        question: 'Bir to‘garakda 10 ta o‘quvchi har biri o‘zaro bir martadan qo‘l berib ko‘rishdi. Jami nechta qo‘l berib ko‘rishish bo‘ldi?',
        options: ['45 ta', '50 ta', '90 ta', '10 ta'],
        correctAnswerIndex: 0,
        explanation: 'C(10,2) = (10 * 9) / 2 = 45 ta qo‘l berib ko‘rishish.'
      }
    ]
  }
];

export const INITIAL_CLUBS: Club[] = [
  {
    id: 'cl_1',
    title: 'Robototexnika va Mikrokontrollerlar',
    mentor: 'Rustam Qosimov',
    mentorRole: 'Robototexnika va fizika fani o‘qituvchisi',
    schedule: 'Dushanba, Chorshanba · 15:30 - 17:00',
    room: 'Laboratoriya 204',
    description: 'Arduino, ESP32 va sensorlar yordamida avtonom robotlar yasash, dasturlash va musobaqalarga tayyorgarlik.',
    category: 'it',
    membersCount: 18,
    maxCapacity: 20,
    isEnrolled: true
  },
  {
    id: 'cl_2',
    title: 'Algoritmik dasturlash (C++ va Python)',
    mentor: 'Shahzod Yoqubov',
    mentorRole: 'Olimpiada murabbiyi',
    schedule: 'Seshanba, Juma · 16:00 - 17:30',
    room: 'IT Markazi 301',
    description: 'Codeforces va Respublika informatika olimpiadasiga yo‘naltirilgan intensiv amaliy mashg‘ulotlar.',
    category: 'it',
    membersCount: 22,
    maxCapacity: 25,
    isEnrolled: true
  },
  {
    id: 'cl_3',
    title: 'Zakovat intellektual klubi',
    mentor: 'Nodira To‘rayeva',
    mentorRole: 'Tarix va jamiyatshunoslik o‘qituvchisi',
    schedule: 'Payshanba · 15:00 - 16:30',
    room: 'Maktab majlislar zali',
    description: 'Mantiqiy savollar tahlili, tezkor javob berish texnikasi va fakultetlararo haftalik trenirovkalar.',
    category: 'ilm-fan',
    membersCount: 30,
    maxCapacity: 35,
    isEnrolled: false
  },
  {
    id: 'cl_4',
    title: 'Yosh kimyogarlar va Biotexnologiya',
    mentor: 'Dilrabo Mahmudova',
    mentorRole: 'Kimyo fanlari nomzodi',
    schedule: 'Chorshanba, Shanba · 14:00 - 15:30',
    room: 'Kimyo laboratoriyasi 102',
    description: 'Moddalar sintezi, mikroskopik tahlillar va xalqaro Mendeleyev olimpiadasiga amaliy tayyorgarlik.',
    category: 'ilm-fan',
    membersCount: 14,
    maxCapacity: 16,
    isEnrolled: false
  },
  {
    id: 'cl_5',
    title: 'Notiqlik san’ati va Munozara (Debate)',
    mentor: 'Akmal Karimov',
    mentorRole: 'Ona tili va adabiyot fani o‘qituvchisi',
    schedule: 'Seshanba, Payshanba · 14:30 - 16:00',
    room: 'Kutubxona seminar zali',
    description: 'Fikrlarni isbotlash, jamoatchilik oldida nutq so‘zlash va Karl Popper formati bo‘yicha debat mashqlari.',
    category: 'sanat',
    membersCount: 16,
    maxCapacity: 20,
    isEnrolled: false
  }
];

export const INITIAL_ATTENDANCE_DAYS: AttendanceDay[] = [
  { date: '11.10.2026', dayName: 'Dushanba', status: 'kelgan', lessonCount: 6, attendedLessons: 6 },
  { date: '10.10.2026', dayName: 'Shanba', status: 'kelgan', lessonCount: 5, attendedLessons: 5 },
  { date: '09.10.2026', dayName: 'Juma', status: 'kelgan', lessonCount: 6, attendedLessons: 6 },
  { date: '08.10.2026', dayName: 'Payshanba', status: 'kechikkan', lessonCount: 6, attendedLessons: 6, note: 'Transport nosozligi tufayli 5 daqiqa' },
  { date: '07.10.2026', dayName: 'Chorshanba', status: 'kelgan', lessonCount: 6, attendedLessons: 6 },
  { date: '06.10.2026', dayName: 'Seshanba', status: 'kelgan', lessonCount: 6, attendedLessons: 6 },
  { date: '05.10.2026', dayName: 'Dushanba', status: 'kelgan', lessonCount: 6, attendedLessons: 6 },
  { date: '03.10.2026', dayName: 'Shanba', status: 'sababli', lessonCount: 5, attendedLessons: 0, note: 'Tuman olimpiadasida ishtirok etgani sababli rasmiy ruxsat' },
  { date: '02.10.2026', dayName: 'Juma', status: 'kelgan', lessonCount: 6, attendedLessons: 6 },
  { date: '01.10.2026', dayName: 'Payshanba', status: 'kelgan', lessonCount: 6, attendedLessons: 6 }
];

export const INITIAL_SUGGESTIONS: Suggestion[] = [
  {
    id: 'sug_1',
    studentId: 'std_9b_001',
    studentName: 'Muhammad Aliyev',
    className: '9-Blue',
    facultyId: 'Blue',
    title: 'Kutubxonada mustaqil ishlash uchun kovorking zonasi',
    content: 'Darslardan so‘ng fakultet jamoalari ilmiy loyihalari ustida birgalikda ishlashi uchun kutubxonaning sokin burchagiga qo‘shimcha rozetkalar va o‘rindiqlar o‘rnatilsa yaxshi bo‘lar edi.',
    category: 'kutubxona',
    isAnonymous: false,
    status: 'qabul_qilindi',
    createdAt: '08-oktabr, 2026',
    adminResponse: 'Taklif maktab ma’muriyati tomonidan qabul qilindi. Ta’mirlash guruhi hafta oxirigacha 12 ta yangi rozetka o‘rnatadi.',
    upvotes: 24,
    hasUpvoted: true
  },
  {
    id: 'sug_2',
    studentId: 'std_anon_02',
    studentName: 'Anonim o‘quvchi',
    className: '8-Green',
    facultyId: 'Green',
    title: 'Zakovat o‘yinlarida fanlar bo‘yicha ixtisoslashgan ligalar ochish',
    content: 'Faqat umumiy savollar emas, har oy alohida biologiya, kimyo va IT bo‘yicha tor mutaxassislik ligalari tashkil qilinsa qiziqish yanada ortadi.',
    category: 'oquv_jarayoni',
    isAnonymous: true,
    status: 'korib_chiqilmoqda',
    createdAt: '09-oktabr, 2026',
    adminResponse: 'Ilmiy bo‘lim bu tashabbusni o‘rganmoqda.',
    upvotes: 18,
    hasUpvoted: false
  },
  {
    id: 'sug_3',
    studentId: 'std_9r_05',
    studentName: 'Zilola Rahimova',
    className: '9-Red',
    facultyId: 'Red',
    title: 'Tushlik tanaffusida sport zalida stol tennisi stollarini ochish',
    content: 'Katta tanaffus paytida o‘quvchilar aqliy charchoqni chiqarishi uchun sport zalida 2 ta stol tennisi stoli doimiy tayyor tursa yaxshi bo‘lardi.',
    category: 'sport_va_tadbir',
    isAnonymous: false,
    status: 'korib_chiqilmoqda',
    createdAt: '10-oktabr, 2026',
    upvotes: 31,
    hasUpvoted: false
  }
];

export const FACULTY_WEEKLY_TRENDS = [
  { week: '1-hafta', Blue: 980, Green: 960, White: 920, Red: 900 },
  { week: '2-hafta', Blue: 1040, Green: 1010, White: 980, Red: 950 },
  { week: '3-hafta', Blue: 1110, Green: 1080, White: 1030, Red: 990 },
  { week: '4-hafta', Blue: 1160, Green: 1120, White: 1080, Red: 1030 },
  { week: '5-hafta (Joriy)', Blue: 1250, Green: 1190, White: 1135, Red: 1080 },
];

export const DEFAULT_STAFF_USER: StaffUser = {
  id: 'stf_01',
  name: 'Nodira To‘rayeva',
  role: 'admin',
  roleTitle: 'Katta o‘qituvchi va Hakamlar hay’ati raisi',
  department: 'O‘quv-uslubiy bo‘lim va Ilmiy kengash',
  assignedClasses: ['9-Blue', '8-Green'],
  avatar: 'NT',
  permissions: {
    canAwardPoints: true,
    canDeductPoints: true,
    canReverseTransactions: true,
    canApproveAchievements: true,
    canMarkAttendance: true,
    canManageQuizzes: true,
    canPublishAnnouncements: true,
    canRespondToSuggestions: true,
  }
};

export const MOCK_STAFF_USERS: StaffUser[] = [
  DEFAULT_STAFF_USER,
  {
    id: 'stf_02',
    name: 'Rustam Qosimov',
    role: 'teacher',
    roleTitle: 'Fizika va Robototexnika o‘qituvchisi',
    department: 'Tabiiy va aniq fanlar kafedrasi',
    assignedClasses: ['10-White', '7-Blue'],
    avatar: 'RQ',
    permissions: {
      canAwardPoints: true,
      canDeductPoints: true,
      canReverseTransactions: false,
      canApproveAchievements: true,
      canMarkAttendance: true,
      canManageQuizzes: false,
      canPublishAnnouncements: false,
      canRespondToSuggestions: false,
    }
  },
  {
    id: 'stf_03',
    name: 'Dilnoza Salimova',
    role: 'moderator',
    roleTitle: 'Yoshlar yetakchisi va Tadbirlar koordinatori',
    department: 'Ma’naviy-ma’rifiy ishlar bo‘limi',
    assignedClasses: ['8-Red', '9-Red'],
    avatar: 'DS',
    permissions: {
      canAwardPoints: true,
      canDeductPoints: false,
      canReverseTransactions: false,
      canApproveAchievements: false,
      canMarkAttendance: false,
      canManageQuizzes: true,
      canPublishAnnouncements: true,
      canRespondToSuggestions: true,
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud_1',
    action: 'Ball berildi (+30)',
    performedBy: 'Maktab Ilmiy Kengashi (Nodira To‘rayeva)',
    target: 'Blue fakulteti (TX-2026-0001)',
    timestamp: 1791728400000,
    date: '11.10.2026 · 14:20',
    details: 'Matematika fani tuman olimpiadasida 1-o‘rin uchun Muhammad Aliyev (9-Blue) natijasi asosida.',
    severity: 'info'
  },
  {
    id: 'aud_2',
    action: 'Ball berildi (+25)',
    performedBy: 'Kutubxona mudirasi',
    target: 'Green fakulteti (TX-2026-0002)',
    timestamp: 1791718200000,
    date: '11.10.2026 · 11:30',
    details: 'Kitobxonlik tanlovi 1-bosqichida 1-o‘rin uchun Madina Karimova (8-Green).',
    severity: 'info'
  },
  {
    id: 'aud_3',
    action: 'Intizomiy ball ayirildi (-5)',
    performedBy: 'Navbatchi ma’muriyat (Rustam Qosimov)',
    target: 'Red fakulteti (TX-2026-0006)',
    timestamp: 1791535500000,
    date: '09.10.2026 · 08:45',
    details: '8-Red sinf o‘quvchisi 1-darsga 15 daqiqa sababsiz kechikishi sababli.',
    severity: 'warning'
  },
  {
    id: 'aud_4',
    action: 'Yutuq tasdiqlandi',
    performedBy: 'Nodira To‘rayeva',
    target: 'Muhammad Aliyev (ach_1)',
    timestamp: 1791728500000,
    date: '11.10.2026 · 14:25',
    details: 'Diplom skaneri tekshirildi va tasdiqlandi (OLIMP-2026-MATH-091).',
    severity: 'info'
  }
];

// Complete 14-classes student records covering all 14 classes!
export const MOCK_STUDENTS_LIST: Student[] = [
  // 7-sinflar (7-Blue, 7-Green, 7-White)
  {
    id: 'std_7b_01',
    name: 'Sardor Qodirov',
    email: 'sardor.qodirov@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0711',
    grade: 7,
    className: '7-Blue',
    facultyId: 'Blue',
    avatar: 'SQ',
    personalContributionPoints: 45,
    verifiedAchievementsCount: 2,
    quizParticipationsCount: 4,
    joinedClubsCount: 1,
    attendanceRate: 97.5,
  },
  {
    id: 'std_7g_01',
    name: 'Gulnoza Saidova',
    email: 'gulnoza.saidova@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0722',
    grade: 7,
    className: '7-Green',
    facultyId: 'Green',
    avatar: 'GS',
    personalContributionPoints: 50,
    verifiedAchievementsCount: 2,
    quizParticipationsCount: 5,
    joinedClubsCount: 2,
    attendanceRate: 98.0,
  },
  {
    id: 'std_7w_01',
    name: 'Olimjon Mirzayev',
    email: 'olimjon.mirzayev@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0733',
    grade: 7,
    className: '7-White',
    facultyId: 'White',
    avatar: 'OM',
    personalContributionPoints: 35,
    verifiedAchievementsCount: 1,
    quizParticipationsCount: 3,
    joinedClubsCount: 1,
    attendanceRate: 96.0,
  },

  // 8-sinflar (8-Blue, 8-Green, 8-White, 8-Red)
  {
    id: 'std_8b_01',
    name: 'Farrux Tursunov',
    email: 'farrux.tursunov@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0814',
    grade: 8,
    className: '8-Blue',
    facultyId: 'Blue',
    avatar: 'FT',
    personalContributionPoints: 60,
    verifiedAchievementsCount: 3,
    quizParticipationsCount: 6,
    joinedClubsCount: 2,
    attendanceRate: 99.1,
  },
  {
    id: 'std_8g_01',
    name: 'Madina Karimova',
    email: 'madina.karimova@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0825',
    grade: 8,
    className: '8-Green',
    facultyId: 'Green',
    avatar: 'MK',
    personalContributionPoints: 85,
    verifiedAchievementsCount: 4,
    quizParticipationsCount: 7,
    joinedClubsCount: 2,
    attendanceRate: 98.8,
  },
  {
    id: 'std_8w_01',
    name: 'Jasmina Xudoyberdiyeva',
    email: 'jasmina.xudoyberdiyeva@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0836',
    grade: 8,
    className: '8-White',
    facultyId: 'White',
    avatar: 'JX',
    personalContributionPoints: 55,
    verifiedAchievementsCount: 2,
    quizParticipationsCount: 5,
    joinedClubsCount: 1,
    attendanceRate: 97.0,
  },
  {
    id: 'std_8r_01',
    name: 'Bekzod Ergashev',
    email: 'bekzod.ergashev@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0847',
    grade: 8,
    className: '8-Red',
    facultyId: 'Red',
    avatar: 'BE',
    personalContributionPoints: 40,
    verifiedAchievementsCount: 2,
    quizParticipationsCount: 4,
    joinedClubsCount: 1,
    attendanceRate: 95.5,
  },

  // 9-sinflar (9-Blue, 9-Green, 9-White, 9-Red)
  {
    id: 'std_9b_001',
    name: 'Muhammad Aliyev',
    email: 'muhammad.aliyev@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0941',
    grade: 9,
    className: '9-Blue',
    facultyId: 'Blue',
    avatar: 'MA',
    personalContributionPoints: 115,
    verifiedAchievementsCount: 5,
    quizParticipationsCount: 8,
    joinedClubsCount: 2,
    attendanceRate: 98.2,
  },
  {
    id: 'std_9g_01',
    name: 'Shahnoza Oripova',
    email: 'shahnoza.oripova@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0922',
    grade: 9,
    className: '9-Green',
    facultyId: 'Green',
    avatar: 'SO',
    personalContributionPoints: 70,
    verifiedAchievementsCount: 3,
    quizParticipationsCount: 6,
    joinedClubsCount: 2,
    attendanceRate: 99.0,
  },
  {
    id: 'std_9w_01',
    name: 'Davron Rustamov',
    email: 'davron.rustamov@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0933',
    grade: 9,
    className: '9-White',
    facultyId: 'White',
    avatar: 'DR',
    personalContributionPoints: 65,
    verifiedAchievementsCount: 3,
    quizParticipationsCount: 5,
    joinedClubsCount: 1,
    attendanceRate: 96.8,
  },
  {
    id: 'std_9r_01',
    name: 'Jasur Bekmurodov',
    email: 'jasur.bekmurodov@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0944',
    grade: 9,
    className: '9-Red',
    facultyId: 'Red',
    avatar: 'JB',
    personalContributionPoints: 75,
    verifiedAchievementsCount: 3,
    quizParticipationsCount: 5,
    joinedClubsCount: 2,
    attendanceRate: 97.4,
  },
  {
    id: 'std_9r_05',
    name: 'Zilola Rahimova',
    email: 'zilola.rahimova@sinoedu.uz',
    studentIdNumber: 'SINO-2026-0948',
    grade: 9,
    className: '9-Red',
    facultyId: 'Red',
    avatar: 'ZR',
    personalContributionPoints: 50,
    verifiedAchievementsCount: 2,
    quizParticipationsCount: 4,
    joinedClubsCount: 1,
    attendanceRate: 98.5,
  },

  // 10-sinflar (10-Blue, 10-Green, 10-White)
  {
    id: 'std_10b_01',
    name: 'Temurbek Yo‘ldoshev',
    email: 'temurbek.yoldoshev@sinoedu.uz',
    studentIdNumber: 'SINO-2026-1011',
    grade: 10,
    className: '10-Blue',
    facultyId: 'Blue',
    avatar: 'TY',
    personalContributionPoints: 95,
    verifiedAchievementsCount: 4,
    quizParticipationsCount: 7,
    joinedClubsCount: 2,
    attendanceRate: 98.9,
  },
  {
    id: 'std_10g_01',
    name: 'Nilufar Boboyeva',
    email: 'nilufar.boboyeva@sinoedu.uz',
    studentIdNumber: 'SINO-2026-1022',
    grade: 10,
    className: '10-Green',
    facultyId: 'Green',
    avatar: 'NB',
    personalContributionPoints: 80,
    verifiedAchievementsCount: 3,
    quizParticipationsCount: 6,
    joinedClubsCount: 1,
    attendanceRate: 97.8,
  },
  {
    id: 'std_10w_01',
    name: 'Azizbek Abdullayev',
    email: 'azizbek.abdullayev@sinoedu.uz',
    studentIdNumber: 'SINO-2026-1033',
    grade: 10,
    className: '10-White',
    facultyId: 'White',
    avatar: 'AA',
    personalContributionPoints: 90,
    verifiedAchievementsCount: 4,
    quizParticipationsCount: 8,
    joinedClubsCount: 2,
    attendanceRate: 99.2,
  }
];

