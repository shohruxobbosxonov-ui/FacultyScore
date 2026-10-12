import React, { useState } from 'react';
import { 
  TrendingUp, 
  Layers, 
  Calendar, 
  Users, 
  FileCheck, 
  AlertCircle, 
  Download, 
  CheckCircle2,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ALL_SCHOOL_CLASSES, FACULTY_WEEKLY_TRENDS } from '../../data/mockData';

export const TeacherAnalyticsView: React.FC = () => {
  const { faculties, pointRecords, achievements, studentsList } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<'kuz' | 'hafta' | 'oy'>('kuz');

  // Breakdown aggregations
  const totalAwarded = pointRecords.filter(r => !r.isReversed && r.points > 0).reduce((acc, r) => acc + r.points, 0);
  const totalDeducted = Math.abs(pointRecords.filter(r => !r.isReversed && r.points < 0).reduce((acc, r) => acc + r.points, 0));
  const activeTransactionsCount = pointRecords.filter(r => !r.isReversed).length;

  // Class analytics (without competitive ranking)
  const classStats = ALL_SCHOOL_CLASSES.map(cls => {
    const classStudents = studentsList.filter(s => s.className === cls);
    const classRecords = pointRecords.filter(r => !r.isReversed && r.attributedClass === cls);
    const avgAttendance = classStudents.length > 0
      ? (classStudents.reduce((acc, s) => acc + s.attendanceRate, 0) / classStudents.length).toFixed(1)
      : '97.5';
    
    return {
      className: cls,
      studentCount: classStudents.length || 10,
      recordsCount: classRecords.length,
      avgAttendance: parseFloat(avgAttendance),
      faculty: cls.split('-')[1]
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Ma’muriy Analitika va Tahliliy Hisobotlar</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            2026–2027 O‘quv yili · To‘rt fakultet va 14 ta sinf bo‘yicha operatsion ko‘rsatkichlar
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setSelectedPeriod('kuz')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedPeriod === 'kuz' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Kuzgi mavsum
            </button>
            <button
              onClick={() => setSelectedPeriod('oy')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedPeriod === 'oy' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Oktabr oyi
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Hisobotni chop etish yoki PDF sifatida saqlash"
          >
            <Download size={15} />
          </button>
        </div>
      </div>

      {/* Aggregate KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500">Jami berilgan ballar</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
            +{totalAwarded} ball
          </div>
          <span className="text-[11px] text-slate-400">Yutuqlar va g‘alabalar uchun</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500">Intizomiy ayirilgan</span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 tabular-nums">
            -{totalDeducted} ball
          </div>
          <span className="text-[11px] text-slate-400">Namunaviy intizom choralari</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500">Faol tranzaksiyalar</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
            {activeTransactionsCount} ta
          </div>
          <span className="text-[11px] text-slate-400">O‘quv yili davomida</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500">Tasdiqlangan yutuqlar</span>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 tabular-nums">
            {achievements.filter(a => a.status === 'tasdiqlangan').length} ta
          </div>
          <span className="text-[11px] text-slate-400">Ilmiy kengash tasdig‘i</span>
        </div>
      </div>

      {/* Faculty Comparison Over Time (Weekly Trends Matrix) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers size={18} className="text-blue-500" />
            <span>Fakultetlar ballari haftalar kesimidagi o‘sish sur’ati</span>
          </h3>
          <p className="text-xs text-slate-500">
            Haftalik jamg‘arma dinamikasi (1–5 haftalar)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold">
                <th className="py-2.5 px-3">Hafta</th>
                <th className="py-2.5 px-3 text-right">Blue (Ko‘k)</th>
                <th className="py-2.5 px-3 text-right">Green (Yashil)</th>
                <th className="py-2.5 px-3 text-right">White (Oq)</th>
                <th className="py-2.5 px-3 text-right">Red (Qizil)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono font-medium">
              {FACULTY_WEEKLY_TRENDS.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-sans font-bold text-slate-800 dark:text-slate-200">{t.week}</td>
                  <td className="py-3 px-3 text-right text-blue-600 dark:text-blue-400 font-bold">{t.Blue}</td>
                  <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">{t.Green}</td>
                  <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300 font-bold">{t.White}</td>
                  <td className="py-3 px-3 text-right text-rose-600 dark:text-rose-400 font-bold">{t.Red}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Operational 14-Classes Overview (Non-competitive compliance reporting) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users size={18} className="text-blue-500" />
            <span>14 ta sinf bo‘yicha operatsion hisobot (Reytingsiz tahlil)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Sinflar o‘zaro musobaqalashmaydi. Quyidagi ma’lumotlar faqat ma’muriy monitoring va davomat nazorati uchundir.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {classStats.map(cs => (
            <div 
              key={cs.className}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs space-y-2"
            >
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-900 dark:text-white">{cs.className}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {cs.faculty}
                </span>
              </div>

              <div className="space-y-1 text-slate-500 text-[11px]">
                <div className="flex justify-between">
                  <span>O‘rtacha davomat:</span>
                  <strong className="text-emerald-600 font-mono">{cs.avgAttendance}%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Tranzaksiyalar soni:</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-mono">{cs.recordsCount} ta</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
          <Info size={14} className="shrink-0 mt-0.5" />
          <span>
            Barcha sinflar to‘liq 14 ta maktab sinfi bilan cheklangan. 7-Red va 10-Red sinflari mavjud emas.
          </span>
        </div>
      </div>

    </div>
  );
};
