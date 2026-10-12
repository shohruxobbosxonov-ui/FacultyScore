import React from 'react';
import { 
  CheckSquare, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Info,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AttendanceDay } from '../types';

export const AttendanceView: React.FC = () => {
  const { currentStudent, attendanceDays } = useApp();

  const totalDays = attendanceDays.length;
  const presentDays = attendanceDays.filter(d => d.status === 'kelgan').length;
  const lateDays = attendanceDays.filter(d => d.status === 'kechikkan').length;
  const excusedDays = attendanceDays.filter(d => d.status === 'sababli').length;

  const getStatusBadge = (status: AttendanceDay['status']) => {
    switch (status) {
      case 'kelgan':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={13} /> Kelgan
          </span>
        );
      case 'kechikkan':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Clock size={13} /> Kechikkan
          </span>
        );
      case 'sababli':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Info size={13} /> Sababli (Ruxsatli)
          </span>
        );
      case 'sababsiz':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <AlertTriangle size={13} /> Sababsiz
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Shaxsiy davomat monitoringi</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {currentStudent.name} · {currentStudent.className} sinfi · {currentStudent.facultyId} fakulteti
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>Elektron jurnal bilan sinxronlangan</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500">Umumiy ko‘rsatkich</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
            {currentStudent.attendanceRate}%
          </div>
          <span className="text-[11px] text-slate-400">Namunali qatnashuv</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500">To‘liq qatnashilgan</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
            {presentDays} kun
          </div>
          <span className="text-[11px] text-slate-400">Barcha darslarda ishtirok</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500">Sababli / Ruxsatli</span>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 tabular-nums">
            {excusedDays} kun
          </div>
          <span className="text-[11px] text-slate-400">Olimpiada va tanlovlar</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500">Kechikishlar</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
            {lateDays} marta
          </div>
          <span className="text-[11px] text-slate-400">Qayd etilgan va tushuntirilgan</span>
        </div>
      </div>

      {/* Attendance Ledger Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar size={18} className="text-blue-500" />
            <span>Oxirgi kunlar davomati</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sinf rahbari va dars nazorati tomonidan kiritilgan rasmiy yozuvlar
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-semibold">
                <th className="py-3 px-3">Sana</th>
                <th className="py-3 px-3">Hafta kuni</th>
                <th className="py-3 px-3">Holat</th>
                <th className="py-3 px-3">Darslar soni</th>
                <th className="py-3 px-3">Izoh va asos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {attendanceDays.map((day, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white tabular-nums">
                    {day.date}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                    {day.dayName}
                  </td>
                  <td className="py-3.5 px-3">
                    {getStatusBadge(day.status)}
                  </td>
                  <td className="py-3.5 px-3 tabular-nums text-slate-700 dark:text-slate-300">
                    {day.attendedLessons} / {day.lessonCount} ta dars
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400">
                    {day.note ? day.note : "To‘liq qatnashildi"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
          <Info size={15} className="text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Eslatma:</strong> O‘quvchilar sababli qoldirgan darslari uchun ota-ona arizasi yoki maktab buyrug‘ini sinf rahbariga taqdim etishi shart. Sababsiz qoldirilgan darslar fakultet intizomiy ballariga ta’sir qilishi mumkin.
          </span>
        </div>
      </div>

    </div>
  );
};
