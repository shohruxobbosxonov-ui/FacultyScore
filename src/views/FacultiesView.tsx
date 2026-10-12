import React, { useState } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  Medal, 
  Sparkles, 
  AlertTriangle, 
  Info,
  Clock,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FacultyId } from '../types';

export const FacultiesView: React.FC = () => {
  const { faculties, currentStudent } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const sortedFaculties = [...faculties].sort((a, b) => b.totalPoints - a.totalPoints);
  const highestPoints = sortedFaculties[0]?.totalPoints || 1;

  const categories = [
    { id: 'all', label: 'Barcha toifalar' },
    { id: 'academics', label: 'Olimpiadalar va fanlar' },
    { id: 'events', label: 'Maktab tadbirlari va Zakovat' },
    { id: 'sports', label: 'Sport musobaqalari' },
    { id: 'clubs', label: 'To‘garaklar va IT loyihalar' },
    { id: 'discipline', label: 'Intizomiy ko‘rsatkich' },
  ];

  const getFacultyClassList = (id: FacultyId) => {
    switch (id) {
      case 'Blue': return ['7-Blue', '8-Blue', '9-Blue', '10-Blue'];
      case 'Green': return ['7-Green', '8-Green', '9-Green', '10-Green'];
      case 'White': return ['7-White', '8-White', '9-White', '10-White'];
      case 'Red': return ['8-Red', '9-Red'];
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header and Verification Notice */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="text-amber-500" size={22} />
            <span>Fakultetlar rasmiy reytingi</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            2026–2027 o‘quv yili · To‘rt fakultet o‘rtasidagi sog‘lom intellektual va amaliy raqobat
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-100 dark:border-slate-700/60 self-start md:self-auto">
          <Clock size={14} className="text-blue-500" />
          <span>Oxirgi rasmiy yangilanish: <strong>Bugun, 14:20</strong></span>
        </div>
      </div>

      {/* 4 Official Faculty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedFaculties.map((fac, index) => {
          const isCurrentStudentFac = fac.id === currentStudent.facultyId;
          const diffFromLeader = sortedFaculties[0].totalPoints - fac.totalPoints;
          const classList = getFacultyClassList(fac.id);

          return (
            <div
              key={fac.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isCurrentStudentFac 
                  ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 ring-2 ring-blue-500/20' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center ${
                      index === 0 ? 'bg-amber-400 text-slate-950' : 
                      index === 1 ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200' :
                      index === 2 ? 'bg-amber-700/30 text-amber-800 dark:text-amber-300' :
                      'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      #{index + 1}
                    </span>
                    <span className="font-extrabold text-base tracking-wide uppercase text-slate-900 dark:text-white">
                      {fac.name}
                    </span>
                  </div>

                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: fac.color.primary }} 
                    title={fac.uzName}
                  />
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-4">
                  {fac.uzName}
                </p>

                {/* Score */}
                <div className="mb-4">
                  <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums">
                    {fac.totalPoints.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <TrendingUp size={13} />
                    <span>+{fac.weeklyChange} ball shu hafta</span>
                  </div>
                </div>

                {/* Standings gap */}
                <div className="text-xs text-slate-500 dark:text-slate-400 py-2 border-t border-slate-100 dark:border-slate-800">
                  {index === 0 ? (
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">
                      ★ Chempionat peshqadami
                    </span>
                  ) : (
                    <span>
                      1-o‘ringacha farq: <strong className="text-slate-700 dark:text-slate-300">-{diffFromLeader} ball</strong>
                    </span>
                  )}
                </div>

                {/* Exact Classes in Faculty */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  <span className="text-slate-400 block mb-1.5 font-medium">Fakultet sinflari ({classList.length} ta):</span>
                  <div className="flex flex-wrap gap-1">
                    {classList.map(cls => (
                      <span 
                        key={cls}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                          cls === currentStudent.className 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Motto at footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 italic">
                "{fac.motto}"
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Breakdown Table (Strictly verified data without pie charts) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers size={18} className="text-blue-500" />
            <span>Toifalar bo‘yicha ballar taqsimoti</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Har bir sohada fakultetlarning to‘plagan aniq natijalari
          </p>
        </div>

        {/* Breakdown table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-semibold">
                <th className="py-3 px-3">Fakultet</th>
                <th className="py-3 px-3 text-right">Olimpiadalar</th>
                <th className="py-3 px-3 text-right">Tadbirlar & Zakovat</th>
                <th className="py-3 px-3 text-right">Sport</th>
                <th className="py-3 px-3 text-right">To‘garaklar & IT</th>
                <th className="py-3 px-3 text-right">Intizom / Davomat</th>
                <th className="py-3 px-3 text-right">Jami to‘plangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {sortedFaculties.map((fac) => (
                <tr key={fac.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: fac.color.primary }} />
                    <span>{fac.name}</span>
                    <span className="text-[11px] text-slate-400 font-normal">({fac.uzName})</span>
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-700 dark:text-slate-300">
                    +{fac.breakdown.academics}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-700 dark:text-slate-300">
                    +{fac.breakdown.events}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-700 dark:text-slate-300">
                    +{fac.breakdown.sports}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-700 dark:text-slate-300">
                    +{fac.breakdown.clubs}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-rose-600 dark:text-rose-400">
                    {fac.breakdown.discipline}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums font-bold text-slate-900 dark:text-white text-sm">
                    {fac.totalPoints} ball
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Methodology explanation note */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
          <Info size={15} className="text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Hisoblash qoidasi:</strong> Barcha ijobiy ballar olimpiada diplomlari, maktab tadbirlaridagi g‘alabalar va to‘garak yutuqlari uchun qo‘shiladi. Intizomiy kechikishlar va xulq-atvor qoidabuzarliklari esa har bir holat uchun belgilangan mezon bo‘yicha fakultet jamg‘armasidan ayirib boriladi.
          </span>
        </div>
      </div>

    </div>
  );
};
