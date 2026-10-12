import React, { useState } from 'react';
import { 
  CheckSquare, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Info, 
  Save, 
  Users,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SchoolClassName } from '../../types';
import { ALL_SCHOOL_CLASSES } from '../../data/mockData';

export const TeacherAttendanceView: React.FC = () => {
  const { studentsList, showToast, currentStaffUser } = useApp();

  const [selectedClass, setSelectedClass] = useState<SchoolClassName>('9-Blue');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const classStudents = studentsList.filter(s => s.className === selectedClass);

  // Local state for daily student attendance statuses
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'kelgan' | 'kechikkan' | 'sababli' | 'sababsiz'>>(() => {
    const init: Record<string, any> = {};
    classStudents.forEach(s => { init[s.id] = 'kelgan'; });
    return init;
  });

  const [notesMap, setNotesMap] = useState<Record<string, string>>({});

  const handleStatusChange = (studentId: string, status: 'kelgan' | 'kechikkan' | 'sababli' | 'sababsiz') => {
    setAttendanceMap(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`${selectedClass} sinfi uchun ${selectedDate} sanasidagi davomat muvaffaqiyatli saqlandi!`);
  };

  // Calculations
  const total = classStudents.length;
  const presentCount = Object.values(attendanceMap).filter(st => st === 'kelgan').length;
  const lateCount = Object.values(attendanceMap).filter(st => st === 'kechikkan').length;
  const excusedCount = Object.values(attendanceMap).filter(st => st === 'sababli').length;
  const absentCount = Object.values(attendanceMap).filter(st => st === 'sababsiz').length;
  const rate = total > 0 ? Math.round(((presentCount + lateCount) / total) * 100) : 100;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Sinflar bo‘yicha davomat boshqaruvi</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Darsga qatnashish intizomini belgilash, kechikish va uzrli sabablarni qayd qilish
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>Mas’ul: {currentStaffUser.name}</span>
        </div>
      </div>

      {/* Class and Date Picker Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
            Sinfni tanlang:
          </span>
          <select
            value={selectedClass}
            onChange={e => {
              const nextClass = e.target.value as SchoolClassName;
              setSelectedClass(nextClass);
              const nextStudents = studentsList.filter(s => s.className === nextClass);
              const nextMap: Record<string, any> = {};
              nextStudents.forEach(s => { nextMap[s.id] = 'kelgan'; });
              setAttendanceMap(nextMap);
            }}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
          >
            {ALL_SCHOOL_CLASSES.map(cls => (
              <option key={cls} value={cls}>{cls} sinfi</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
            Sana:
          </span>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        {/* Quick Rate Pill */}
        <div className="sm:ml-auto flex items-center gap-3 text-xs">
          <span className="text-slate-500">Bugungi qatnashuv:</span>
          <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
            {rate}% ({presentCount}/{total})
          </span>
        </div>
      </div>

      {/* Attendance Form */}
      <form onSubmit={handleSaveAttendance} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {selectedClass} o‘quvchilari ro‘yxati ({classStudents.length} nafar)
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const nextMap: Record<string, any> = {};
                classStudents.forEach(s => { nextMap[s.id] = 'kelgan'; });
                setAttendanceMap(nextMap);
              }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Barchasini "Kelgan" qilish
            </button>
          </div>
        </div>

        {classStudents.length > 0 ? (
          <div className="space-y-2">
            {classStudents.map((st, i) => {
              const currentStatus = attendanceMap[st.id] || 'kelgan';

              return (
                <div
                  key={st.id}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-slate-400 font-mono text-[11px]">{i + 1}.</span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{st.name}</p>
                      <p className="text-[11px] text-slate-400">{st.studentIdNumber} · {st.facultyId} fakulteti</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-center">
                    {(['kelgan', 'kechikkan', 'sababli', 'sababsiz'] as const).map(status => {
                      const isSelected = currentStatus === status;

                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleStatusChange(st.id, status)}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-all border ${
                            isSelected
                              ? status === 'kelgan' ? 'bg-emerald-600 text-white border-emerald-600' :
                                status === 'kechikkan' ? 'bg-amber-600 text-white border-amber-600' :
                                status === 'sababli' ? 'bg-blue-600 text-white border-blue-600' :
                                'bg-rose-600 text-white border-rose-600'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {status === 'kelgan' ? 'Kelgan' :
                           status === 'kechikkan' ? 'Kechikkan' :
                           status === 'sababli' ? 'Sababli' : 'Sababsiz'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-400">
            Ushbu sinf uchun o‘quvchilar ro‘yxati mavjud emas.
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Kechikkan: <strong>{lateCount}</strong> · Sababli: <strong>{excusedCount}</strong> · Sababsiz: <strong>{absentCount}</strong>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
          >
            <Save size={15} />
            <span>Davomatni saqlash</span>
          </button>
        </div>
      </form>

    </div>
  );
};
