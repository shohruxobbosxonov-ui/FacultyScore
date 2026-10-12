import React, { useState } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  AlertCircle, 
  Sparkles,
  HelpCircle,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FACULTY_WEEKLY_TRENDS } from '../data/mockData';
import { FacultyId } from '../types';

export const DashboardView: React.FC = () => {
  const { 
    currentStudent, 
    faculties, 
    pointRecords, 
    events, 
    quizzes, 
    clubs,
    setCurrentSection 
  } = useApp();

  const [trendView, setTrendView] = useState<'weekly' | 'monthly'>('weekly');

  const myFaculty = faculties.find(f => f.id === currentStudent.facultyId) || faculties[0];
  
  // Calculate difference with neighbor
  const sortedFaculties = [...faculties].sort((a, b) => b.totalPoints - a.totalPoints);
  const myRankIndex = sortedFaculties.findIndex(f => f.id === myFaculty.id);
  let neighborDiffText = "Peshqadam";
  if (myRankIndex === 0) {
    const second = sortedFaculties[1];
    neighborDiffText = `2-o‘rindan +${myFaculty.totalPoints - second.totalPoints} ball oldinda`;
  } else {
    const ahead = sortedFaculties[myRankIndex - 1];
    neighborDiffText = `Yetakchigacha ${ahead.totalPoints - myFaculty.totalPoints} ball`;
  }

  // Active quiz available
  const upcomingQuiz = quizzes.find(q => !q.isCompleted);
  // Next event
  const nextEvent = events[0];
  // My clubs
  const myClubs = clubs.filter(c => c.isEnrolled);

  const getFacultyBadgeStyle = (id: FacultyId) => {
    switch (id) {
      case 'Blue': return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Green': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'White': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      case 'Red': return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Welcome Area */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-blue-200">
            <span>2026–2027 O‘quv yili</span>
            <span>·</span>
            <span>Kuzgi mavsum</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Salom, {currentStudent.name.split(' ')[0]}!
          </h2>
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
            Bugungi kichik yutuq — fakultetingizning katta g‘alabasi. Siz <strong className="text-white font-semibold">{currentStudent.className}</strong> sinfi va <strong className="text-white font-semibold">{myFaculty.uzName}</strong> jamoasi a’zosisiz.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentSection('my-achievements')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-blue-900 hover:bg-blue-50 transition-colors shadow-xs"
            >
              <Award size={15} />
              <span>Mening portfolioyim</span>
            </button>
            <button
              onClick={() => setCurrentSection('faculties')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600/60 hover:bg-blue-600/90 border border-blue-400/30 text-white transition-colors"
            >
              <Trophy size={15} />
              <span>To‘liq reyting</span>
            </button>
          </div>
        </div>

        {/* Decorative corner insignia */}
        <div className="absolute -right-6 -bottom-6 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
      </div>

      {/* 2. Faculty Performance Overview (4 Faculties Standings) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Fakultetlar ko‘rsatkichi va mavqei
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Joriy tasdiqlangan holat · Barcha 4 fakultet
            </p>
          </div>
          <button
            onClick={() => setCurrentSection('faculties')}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Batafsil tahlil</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedFaculties.map((fac, idx) => {
            const isMyFac = fac.id === currentStudent.facultyId;
            return (
              <div
                key={fac.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isMyFac 
                    ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-xs ring-1 ring-blue-400/30' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      {fac.name}
                    </span>
                  </div>

                  {isMyFac && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-600 text-white">
                      Sizning jamoa
                    </span>
                  )}
                </div>

                <div className="space-y-1 mb-3">
                  <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums">
                    {fac.totalPoints.toLocaleString()} <span className="text-xs font-semibold text-slate-500">ball</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <TrendingUp size={13} />
                    <span>+{fac.weeklyChange} ball shu hafta</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>{fac.classesCount} ta sinf</span>
                  <span>{fac.studentsCount} o‘quvchi</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Middle Grid: Performance Chart & Personal Contribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Faculty Performance Over Time */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Fakultetlar ballari dinamikasi
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Haftalar kesimidagi umumiy ball o‘zgarishlari
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs self-start">
              <button
                onClick={() => setTrendView('weekly')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  trendView === 'weekly' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Haftalik
              </button>
              <button
                onClick={() => setTrendView('monthly')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  trendView === 'monthly' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Oylik
              </button>
            </div>
          </div>

          {/* Clean Horizontal/Segmented Bars Representation */}
          <div className="space-y-4 pt-2">
            {faculties.map((fac) => {
              const maxPoints = 1400;
              const percentage = Math.min(100, Math.round((fac.totalPoints / maxPoints) * 100));
              const isMyFac = fac.id === currentStudent.facultyId;

              return (
                <div key={fac.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: fac.color.primary }} />
                      {fac.name} fakulteti ({fac.uzName})
                      {isMyFac && <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">(Sizning fakultetingiz)</span>}
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                      {fac.totalPoints} ball
                    </span>
                  </div>

                  {/* Bar progress */}
                  <div className="h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: fac.color.primary
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 px-1">
                    <span>Haftalik o‘sish: +{fac.weeklyChange} ball</span>
                    <span>Ulush: {percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800">
            * Barcha ballar rasmiy tasdiqlangan bayonnomalar asosida hisoblanadi.
          </div>
        </div>

        {/* Right 1 Col: Personal Contribution (Private Student Portfolio Summary) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Shaxsiy hissam
              </h4>
              <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                Maxfiy qayd
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fakultetingiz g‘alabasiga qo‘shgan shaxsiy ulushingiz
            </p>
          </div>

          {/* Privacy & Anti-competition policy notice */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-2">
            <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <span>
              Maktab qoidasiga ko‘ra o‘quvchilar o‘zaro yakka tartibda reytingga qo‘yilmaydi. Sizning barcha yutuqlaringiz faqat fakultet umumiy jamg‘armasiga yo‘naltiriladi.
            </span>
          </div>

          {/* Metrics summary */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Fakultetga kiritilgan ball:</span>
              <span className="text-sm font-black text-blue-600 dark:text-blue-400 tabular-nums">
                +{currentStudent.personalContributionPoints} ball
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Tasdiqlangan yutuqlar:</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                {currentStudent.verifiedAchievementsCount} ta
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Davomat ko‘rsatkichi:</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {currentStudent.attendanceRate}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">A’zo to‘garaklar:</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                {currentStudent.joinedClubsCount} ta to‘garak
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentSection('my-achievements')}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Yutuqlar portfolioyiga o‘tish</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* 4. Bottom Grid: Recent Activity & Upcoming Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Points and Activity */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                So‘nggi ball o‘zgarishlari
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Fakultetlarga qo‘shilgan yoki ayirilgan rasmiy ballar
              </p>
            </div>
            <button
              onClick={() => setCurrentSection('point-history')}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
            >
              <span>Barchasi ({pointRecords.length})</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-2.5">
            {pointRecords.slice(0, 4).map((rec) => {
              const isPositive = rec.points > 0;
              return (
                <div 
                  key={rec.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getFacultyBadgeStyle(rec.facultyId)}`}>
                        {rec.facultyId}
                      </span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {rec.title}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {rec.reason}
                    </p>

                    <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                      <span>{rec.attributedClass}</span>
                      <span>·</span>
                      <span>{rec.date}</span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className={`text-sm font-black tabular-nums ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {isPositive ? `+${rec.points}` : rec.points}
                    </span>
                    <div className="text-[10px] text-slate-400">ball</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Activities (Events, Quizzes & Clubs) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Yaqinlashayotgan tadbirlar va imkoniyatlar
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ishtirok eting va fakultetingizga g‘alaba keltiring
              </p>
            </div>
            <button
              onClick={() => setCurrentSection('events')}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
            >
              <span>Taqvim</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            
            {/* Active Quiz Card */}
            {upcomingQuiz && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 uppercase">
                      Faol viktorina
                    </span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      {upcomingQuiz.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Muddati: {upcomingQuiz.deadlineDate} · G‘olibga +{upcomingQuiz.potentialPoints} ball
                  </p>
                </div>
                <button
                  onClick={() => setCurrentSection('quizzes')}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                >
                  Boshlash
                </button>
              </div>
            )}

            {/* Next School Event */}
            {nextEvent && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      {nextEvent.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {nextEvent.displayDate} · {nextEvent.time} · {nextEvent.location}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentSection('events')}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Ko‘rish
                </button>
              </div>
            )}

            {/* My Clubs overview */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  Mening to‘garaklarim ({myClubs.length})
                </span>
                <button
                  onClick={() => setCurrentSection('clubs')}
                  className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Katalog
                </button>
              </div>

              {myClubs.length > 0 ? (
                <div className="space-y-1">
                  {myClubs.map(c => (
                    <div key={c.id} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between py-0.5">
                      <span className="font-medium">• {c.title}</span>
                      <span className="text-slate-400">{c.schedule.split('·')[0]}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400">Hozircha to‘garaklarga a’zo emassiz.</p>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
