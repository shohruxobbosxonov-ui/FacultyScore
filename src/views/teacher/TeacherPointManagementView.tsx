import React, { useState } from 'react';
import { 
  PlusCircle, 
  MinusCircle, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Info,
  Trophy,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FacultyId, PointCategory, SchoolClassName } from '../../types';
import { ALL_SCHOOL_CLASSES } from '../../data/mockData';

const PREDEFINED_REASONS = [
  { label: 'Fan olimpiadasida 1-o‘rin (Tuman bosqichi)', points: 30, category: 'academics' as PointCategory },
  { label: 'Fan olimpiadasida 2-o‘rin (Tuman bosqichi)', points: 25, category: 'academics' as PointCategory },
  { label: 'Fan olimpiadasida 3-o‘rin (Tuman bosqichi)', points: 20, category: 'academics' as PointCategory },
  { label: 'Zakovat intellektual turnirida jamoaviy g‘alaba', points: 35, category: 'events' as PointCategory },
  { label: 'Kitobxonlik tanlovida yuqori natija', points: 25, category: 'academics' as PointCategory },
  { label: 'Fakultetlararo sport birinchiligida 1-o‘rin', points: 25, category: 'sports' as PointCategory },
  { label: 'Robototexnika va IT loyihalar namoyishi', points: 20, category: 'clubs' as PointCategory },
  { label: 'Kutubxona yoki maktabga faol ko‘ngillilar ko‘magi', points: 15, category: 'events' as PointCategory },
  { label: 'Darsga asossiz 15 daqiqa kechikish (Namunaviy intizom)', points: -5, category: 'discipline' as PointCategory },
  { label: 'Maktab formasi va ichki tartib qoidalarini buzish', points: -5, category: 'discipline' as PointCategory },
  { label: 'Dars jarayoniga halaqit berish va intizomiy ogohlantirish', points: -10, category: 'discipline' as PointCategory },
];

export const TeacherPointManagementView: React.FC = () => {
  const { faculties, awardFacultyPoints, studentsList, currentStaffUser } = useApp();

  // Form State
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyId>('Blue');
  const [mode, setMode] = useState<'award' | 'deduct'>('award');
  const [points, setPoints] = useState<number>(25);
  const [category, setCategory] = useState<PointCategory>('academics');
  const [selectedClass, setSelectedClass] = useState<SchoolClassName>('9-Blue');
  const [studentName, setStudentName] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [lastTxCode, setLastTxCode] = useState<string | null>(null);

  // Available students in selected class
  const classStudents = studentsList.filter(s => s.className === selectedClass);

  const targetFaculty = faculties.find(f => f.id === selectedFaculty)!;
  const calculatedPoints = mode === 'award' ? Math.abs(points) : -Math.abs(points);
  const projectedTotal = targetFaculty.totalPoints + calculatedPoints;

  const handlePredefinedSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) return;
    const item = PREDEFINED_REASONS.find(r => r.label === val);
    if (item) {
      setReason(item.label);
      setCategory(item.category);
      if (item.points > 0) {
        setMode('award');
        setPoints(item.points);
      } else {
        setMode('deduct');
        setPoints(Math.abs(item.points));
      }
    }
  };

  const handleClassChange = (newClass: SchoolClassName) => {
    setSelectedClass(newClass);
    // Auto-detect faculty from class name (e.g. 9-Blue -> Blue, 8-Red -> Red)
    if (newClass.endsWith('Blue')) setSelectedFaculty('Blue');
    else if (newClass.endsWith('Green')) setSelectedFaculty('Green');
    else if (newClass.endsWith('White')) setSelectedFaculty('White');
    else if (newClass.endsWith('Red')) setSelectedFaculty('Red');
    setStudentName('');
  };

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim() || points === 0) return;
    setIsConfirmModalOpen(true);
  };

  const executeSubmission = () => {
    const res = awardFacultyPoints({
      facultyId: selectedFaculty,
      points: calculatedPoints,
      category,
      reason,
      attributedStudentName: studentName.trim() || undefined,
      attributedClass: selectedClass
    });

    if (res.success) {
      setLastTxCode(res.transactionCode || null);
      setIsConfirmModalOpen(false);
      setReason('');
      setStudentName('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PlusCircle className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Fakultet ballari boshqaruvi va hisoboti</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Rasmiy qoidalar bo‘yicha fakultetlarga ball qo‘shish yoki intizomiy ball ayirish
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          <ShieldCheck size={14} />
          <span>Mas’ul: {currentStaffUser.name}</span>
        </div>
      </div>

      {/* Success Notification Bar if just executed */}
      {lastTxCode && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-200">
            <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Tranzaksiya muvaffaqiyatli saqlandi! Tranzaksiya kodi: <strong>{lastTxCode}</strong></span>
          </div>
          <button
            onClick={() => setLastTxCode(null)}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline"
          >
            Yopish
          </button>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleOpenConfirm} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Step 1: Operation Mode (Award vs Deduct) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            1. Operatsiya turi *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => { setMode('award'); if (category === 'discipline') setCategory('academics'); }}
              className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                mode === 'award'
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <PlusCircle size={16} className="text-emerald-600" />
              <span>Ball qo‘shish (Rag‘batlantirish)</span>
            </button>

            <button
              type="button"
              onClick={() => { setMode('deduct'); setCategory('discipline'); }}
              className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                mode === 'deduct'
                  ? 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-200 border-rose-500 ring-2 ring-rose-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <MinusCircle size={16} className="text-rose-600" />
              <span>Ball ayirish (Intizomiy chora)</span>
            </button>
          </div>
        </div>

        {/* Step 2: Target Class & Faculty (From exact 14 classes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              2. Tegishli sinf (14 ta sinfdan biri) *
            </label>
            <select
              value={selectedClass}
              onChange={e => handleClassChange(e.target.value as SchoolClassName)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {ALL_SCHOOL_CLASSES.map(cls => (
                <option key={cls} value={cls}>
                  {cls} sinfi
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Sinf tanlanganda unga biriktirilgan fakultet avtomatik aniqlanadi.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Biriktirilgan Fakultet *
            </label>
            <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/60 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: targetFaculty.color.primary }} />
                {targetFaculty.name} ({targetFaculty.uzName})
              </span>
              <span className="text-xs font-semibold tabular-nums text-slate-500">
                Joriy: {targetFaculty.totalPoints} ball
              </span>
            </div>
          </div>
        </div>

        {/* Step 3: Attributed Student & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              3. O‘quvchi (Ixtiyoriy yoki ro‘yxatdan)
            </label>
            <div className="space-y-1.5">
              <select
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">{selectedClass} o‘quvchilaridan tanlash...</option>
                {classStudents.map(st => (
                  <option key={st.id} value={st.name}>
                    {st.name} ({st.studentIdNumber})
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                placeholder="Yoki ism-familiyani qo‘lda kiriting..."
                className="w-full px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Faoliyat toifasi *
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as PointCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="academics">Fan olimpiadalari va tanlovlar</option>
              <option value="events">Maktab tadbirlari va Zakovat</option>
              <option value="sports">Sport musobaqalari</option>
              <option value="clubs">To‘garaklar va IT loyihalar</option>
              <option value="discipline">Intizom va namunali xulq</option>
            </select>
          </div>
        </div>

        {/* Step 4: Points Amount */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            4. Ball miqdori *
          </label>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {[5, 10, 15, 20, 25, 30, 35, 40].map(pt => (
              <button
                key={pt}
                type="button"
                onClick={() => setPoints(pt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  points === pt
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {mode === 'award' ? `+${pt}` : `-${pt}`} ball
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 max-w-xs">
            <span className="text-xs text-slate-500">Boshqa miqdor:</span>
            <input
              type="number"
              min={1}
              max={100}
              value={points}
              onChange={e => setPoints(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-24 px-3 py-1 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Step 5: Reason / Predefined template */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            5. Asoslash va sabab *
          </label>

          <select
            onChange={handlePredefinedSelect}
            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none mb-1"
          >
            <option value="">Tayyor namunaviy sababni tanlash...</option>
            {PREDEFINED_REASONS.map((r, i) => (
              <option key={i} value={r.label}>
                {r.label} ({r.points > 0 ? `+${r.points}` : r.points} ball)
              </option>
            ))}
          </select>

          <textarea
            required
            rows={2}
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Rasmiy buyruq, hakamlar bayonnomasi yoki holat tafsilotlarini yozing..."
            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Live Effect Preview Banner */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-semibold text-slate-500 block">Kutilayotgan ta’sir:</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
              <span>{targetFaculty.name} joriy ball: {targetFaculty.totalPoints}</span>
              <ArrowRight size={14} className="text-slate-400" />
              <span className={`font-black ${mode === 'award' ? 'text-emerald-600' : 'text-rose-600'}`}>
                Yangi umumiy ball: {projectedTotal}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={`px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all ${
              mode === 'award' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
            }`}
          >
            Tekshirish va tasdiqlash
          </button>
        </div>

      </form>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div 
          onClick={() => setIsConfirmModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400">
              <AlertTriangle size={20} />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Tranzaksiyani tasdiqlang
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ushbu amal rasmiy reyestrga yoziladi va fakultet reytingiga darhol ta’sir qiladi:
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Fakultet:</span>
                <strong className="text-slate-900 dark:text-white">{selectedFaculty} ({targetFaculty.uzName})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sinf / O‘quvchi:</span>
                <strong className="text-slate-900 dark:text-white">{selectedClass} {studentName ? `· ${studentName}` : ''}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ball o‘zgarishi:</span>
                <strong className={`font-mono text-sm ${mode === 'award' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {calculatedPoints > 0 ? `+${calculatedPoints}` : calculatedPoints} ball
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sabab:</span>
                <span className="text-slate-700 dark:text-slate-300 text-right max-w-[200px] truncate">{reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mas’ul xodim:</span>
                <span className="text-slate-700 dark:text-slate-300">{currentStaffUser.name}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={executeSubmission}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              >
                Rasmiylashtirish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
