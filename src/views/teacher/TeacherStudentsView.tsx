import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Award, 
  CheckCircle2, 
  Calendar, 
  FileText,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FacultyId, SchoolClassName, Student } from '../../types';
import { ALL_SCHOOL_CLASSES } from '../../data/mockData';

export const TeacherStudentsView: React.FC = () => {
  const { studentsList, achievements } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState<'all' | SchoolClassName>('all');
  const [facultyFilter, setFacultyFilter] = useState<'all' | FacultyId>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = studentsList.filter(s => {
    if (classFilter !== 'all' && s.className !== classFilter) return false;
    if (facultyFilter !== 'all' && s.facultyId !== facultyFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchId = s.studentIdNumber.toLowerCase().includes(q);
      if (!matchName && !matchId) return false;
    }
    return true;
  });

  const studentAchievements = selectedStudent 
    ? achievements.filter(a => a.studentId === selectedStudent.id) 
    : [];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="text-blue-600 dark:text-blue-400" size={22} />
            <span>14 ta sinf o‘quvchilari ma’lumotnomasi</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Barcha sinflar bo‘yicha o‘quvchilar ro‘yxati, biriktirilgan fakultet va shaxsiy portfolio
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>Jami namunaviy baza: {studentsList.length} o‘quvchi</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="O‘quvchi ismi yoki ID raqami (SINO-2026-...) bo‘yicha qidirish..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <select
          value={classFilter}
          onChange={e => setClassFilter(e.target.value as any)}
          className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none"
        >
          <option value="all">Barcha 14 ta sinf</option>
          {ALL_SCHOOL_CLASSES.map(cls => (
            <option key={cls} value={cls}>{cls} sinfi</option>
          ))}
        </select>

        <select
          value={facultyFilter}
          onChange={e => setFacultyFilter(e.target.value as any)}
          className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none"
        >
          <option value="all">Barcha fakultetlar</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="White">White</option>
          <option value="Red">Red</option>
        </select>
      </div>

      {/* Students Directory Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-3 px-3">O‘quvchi</th>
                <th className="py-3 px-3">ID raqami</th>
                <th className="py-3 px-3">Sinfi</th>
                <th className="py-3 px-3">Fakulteti</th>
                <th className="py-3 px-3 text-right">Fakultetga hissasi</th>
                <th className="py-3 px-3 text-right">Davomat</th>
                <th className="py-3 px-3 text-center">Portfolio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {st.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{st.name}</p>
                        <p className="text-[10px] text-slate-400">{st.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-semibold text-slate-600 dark:text-slate-300">
                    {st.studentIdNumber}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {st.className}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {st.facultyId}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-blue-600 dark:text-blue-400">
                    +{st.personalContributionPoints} ball
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    {st.attendanceRate}%
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => setSelectedStudent(st)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
                    >
                      Ko‘rish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Portfolio Modal */}
      {selectedStudent && (
        <div 
          onClick={() => setSelectedStudent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-500">{selectedStudent.className} sinfi · {selectedStudent.facultyId} fakulteti</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-slate-400">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400 block">ID raqami:</span>
                <strong className="text-slate-900 dark:text-white">{selectedStudent.studentIdNumber}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400 block">Davomat ko‘rsatkichi:</span>
                <strong className="text-emerald-600 font-mono">{selectedStudent.attendanceRate}%</strong>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                Tasdiqlangan yutuqlari ({studentAchievements.length} ta):
              </h4>
              {studentAchievements.length > 0 ? (
                <div className="space-y-2">
                  {studentAchievements.map(ach => (
                    <div key={ach.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs space-y-1">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-900 dark:text-white">{ach.title}</span>
                        <span className="text-blue-600">+{ach.pointsAwarded} ball</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{ach.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 border border-dashed rounded-xl">
                  Tasdiqlangan yutuqlar topilmadi.
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 font-semibold text-xs rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
