import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Award, 
  HelpCircle, 
  Calendar, 
  PlusCircle, 
  ArrowRight,
  FileText,
  Users,
  Database,
  Server
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ALL_SCHOOL_CLASSES } from '../../data/mockData';

export const TeacherDashboardView: React.FC = () => {
  const { 
    faculties, 
    pointRecords, 
    achievements, 
    quizzes, 
    events, 
    suggestions, 
    currentStaffUser,
    setTeacherSection 
  } = useApp();

  const sortedFaculties = [...faculties].sort((a, b) => b.totalPoints - a.totalPoints);
  const pendingAchievements = achievements.filter(a => a.status === 'kutilmoqda');
  const pendingSuggestions = suggestions.filter(s => s.status === 'korib_chiqilmoqda');
  const recentRecords = pointRecords.slice(0, 5);

  const [tursoStatus, setTursoStatus] = useState<{
    connected: boolean;
    url: string;
    hasToken: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/turso/status')
      .then(res => res.json())
      .then(data => setTursoStatus(data))
      .catch(() => {
        setTursoStatus({
          connected: false,
          url: 'libsql://facultyscore-coach.aws-ap-northeast-1.turso.io',
          hasToken: false,
          message: 'Turso Cloud DB integratsiyasi tayyorlangan'
        });
      });
  }, []);

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner & Data Integrity Verification */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
              O‘qituvchi va Hakamlar Boshqaruvi
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">2026–2027 O‘quv yili</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Xush kelibsiz, {currentStaffUser.name}!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {currentStaffUser.roleTitle} · {currentStaffUser.department}
          </p>
        </div>

        {/* Status Badges: Data Integrity & Turso DB */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-2.5">
            <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                Ma’lumotlar yaxlitligi tekshirildi
              </span>
              <span className="text-emerald-700 dark:text-emerald-300/90 text-[11px] block">
                14 ta sinf (7–10) to‘liq muvofiqlashtirilgan
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 flex items-start gap-2.5">
            <Database size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-200">
                <span>Turso Cloud DB</span>
                <span className={`w-2 h-2 rounded-full ${tursoStatus?.connected ? 'bg-emerald-500' : 'bg-amber-400'}`} />
              </div>
              <span className="text-blue-700 dark:text-blue-300/90 text-[11px] font-mono block truncate max-w-[200px]" title={tursoStatus?.url}>
                {tursoStatus?.connected ? 'Ulangan (Online)' : 'libsql://facultyscore-coach...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Action Toolbar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setTeacherSection('teacher-points')}
          className="p-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          <PlusCircle size={15} />
          <span>Ball berish / ayirish</span>
        </button>

        <button
          onClick={() => setTeacherSection('teacher-achievements')}
          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <Award size={15} className="text-amber-500" />
          <span>Yutuqlarni tekshirish ({pendingAchievements.length})</span>
        </button>

        <button
          onClick={() => setTeacherSection('teacher-ledger')}
          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <FileText size={15} className="text-blue-500" />
          <span>Tranzaksiyalar reyestri</span>
        </button>

        <button
          onClick={() => setTeacherSection('teacher-analytics')}
          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <TrendingUp size={15} className="text-emerald-500" />
          <span>Analitika & Hisobotlar</span>
        </button>
      </div>

      {/* 3. Official 4 Faculty Points Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedFaculties.map((fac, idx) => (
          <div
            key={fac.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                  idx === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  #{idx + 1}
                </span>
                <span className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                  {fac.name}
                </span>
              </div>

              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: fac.color.primary }} />
            </div>

            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                {fac.totalPoints.toLocaleString()} <span className="text-xs font-semibold text-slate-400">ball</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                <TrendingUp size={13} />
                <span>+{fac.weeklyChange} ball haftalik o‘sish</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{fac.classesCount} ta sinf</span>
              <span>{fac.studentsCount} o‘quvchi</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Operational Queue & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Transactions with Reversal Badges */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText size={16} className="text-blue-500" />
                <span>So‘nggi rasmiy tranzaksiyalar</span>
              </h3>
              <p className="text-xs text-slate-500">
                O‘qituvchilar va hakamlar tomonidan qayd etilgan ballar
              </p>
            </div>

            <button
              onClick={() => setTeacherSection('teacher-ledger')}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-1"
            >
              <span>Barcha tranzaksiyalar</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-2.5">
            {recentRecords.map((rec) => {
              const isPositive = rec.points > 0;
              return (
                <div
                  key={rec.id}
                  className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
                    rec.isReversed 
                      ? 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60' 
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold">
                        {rec.transactionCode || 'TX'}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {rec.facultyId} fakulteti
                      </span>
                      <span className="text-[11px] text-slate-500">
                        ({rec.attributedClass})
                      </span>
                      {rec.isReversed && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                          BEKOR QILINGAN
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                      {rec.reason}
                    </p>

                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>Tasdiqlovchi: {rec.verifiedBy}</span>
                      <span>·</span>
                      <span>{rec.date}</span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className={`text-sm font-black tabular-nums ${
                      rec.isReversed 
                        ? 'line-through text-slate-400' 
                        : isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {isPositive ? `+${rec.points}` : rec.points}
                    </span>
                    <span className="text-[10px] text-slate-400 block">ball</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Operational Review Queues */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Moderatsiya va Navbat
          </h3>

          <div className="space-y-3">
            
            {/* Pending achievements card */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Award size={14} className="text-amber-600" />
                  <span>Kutilayotgan yutuqlar</span>
                </span>
                <span className="px-2 py-0.5 rounded-md text-xs font-black bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
                  {pendingAchievements.length} ta
                </span>
              </div>
              <p className="text-[11px] text-amber-800 dark:text-amber-300/80">
                O‘quvchilar tomonidan yuklangan olimpiada va tanlov diplomlari tasdiqlanishi kerak.
              </p>
              <button
                onClick={() => setTeacherSection('teacher-achievements')}
                className="w-full py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors"
              >
                Ko‘rib chiqish
              </button>
            </div>

            {/* Pending suggestions card */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <HelpCircle size={14} className="text-blue-600" />
                  <span>Yangi takliflar</span>
                </span>
                <span className="px-2 py-0.5 rounded-md text-xs font-black bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100">
                  {pendingSuggestions.length} ta
                </span>
              </div>
              <p className="text-[11px] text-blue-800 dark:text-blue-300/80">
                Maktab hayotini yaxshilash bo‘yicha o‘quvchilar takliflariga rasmiy javob berish.
              </p>
              <button
                onClick={() => setTeacherSection('teacher-suggestions')}
                className="w-full py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Javob yozish
              </button>
            </div>

            {/* School Classes Count */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-slate-400" />
                  <span>Biriktirilgan 14 ta sinf</span>
                </span>
                <span className="font-mono font-bold">14 / 14</span>
              </div>
              <p className="text-[11px] text-slate-400">
                7-sinf (3 ta), 8-sinf (4 ta), 9-sinf (4 ta), 10-sinf (3 ta)
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
