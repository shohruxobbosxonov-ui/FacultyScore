import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  AlertTriangle, 
  KeyRound, 
  CheckCircle2, 
  UserX, 
  Eye, 
  EyeOff,
  Sparkles,
  School,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherAuthModal: React.FC = () => {
  const { 
    isTeacherAuthModalOpen, 
    setIsTeacherAuthModalOpen, 
    loginTeacher, 
    mockStaffUsers,
    currentStaffUser
  } = useApp();

  const [selectedStaffId, setSelectedStaffId] = useState<string>(currentStaffUser.id || 'stf_01');
  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isStudentAttempt, setIsStudentAttempt] = useState<boolean>(false);

  if (!isTeacherAuthModalOpen) return null;

  const handleClose = () => {
    setIsTeacherAuthModalOpen(false);
    setPin('');
    setErrorMessage(null);
    setIsStudentAttempt(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsStudentAttempt(false);

    if (!pin.trim()) {
      setErrorMessage('Iltimos, o‘qituvchi maxfiy PIN-kodini kiriting');
      return;
    }

    const result = loginTeacher(selectedStaffId, pin.trim());
    if (result.success) {
      handleClose();
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleStudentBlockedNotice = () => {
    setIsStudentAttempt(true);
    setErrorMessage('Kirish taqiqlangan! O‘quvchilar ushbu ma’muriy tizimga kiritilmaydi. Iltimos, o‘quvchi portalidan foydalaning.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        {/* Security Banner Header */}
        <div className="relative p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Yopish"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 text-blue-300 flex items-center justify-center shadow-inner">
              <Lock size={22} className="text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Xavfsiz zona
                </span>
                <span className="text-[11px] text-slate-300">
                  Faqat xodimlar
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
                O‘qituvchi Kabinetiga Kirish
              </h2>
            </div>
          </div>

          <p className="text-xs text-slate-300/90 leading-relaxed mt-2">
            Fakultet ballarini boshqarish, tranzaksiyalar auditi va davomat faqat tasdiqlangan maktab o‘qituvchilari uchun ruxsat etilgan.
          </p>
        </div>

        {/* Security Rule Warning: No Students Allowed */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200/80 dark:border-amber-900/60 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 dark:text-amber-200 leading-normal">
            <span className="font-bold block">Qat’iy xavfsizlik cheklovi:</span>
            O‘quvchilar ushbu bo‘limga kira olmaydi. Ball berish va ma’muriy o‘zgarishlar faqat o‘qituvchi ruxsati bilan amalga oshiriladi.
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-5">
          {/* Error / Block Notification */}
          {errorMessage && (
            <div className={`p-3.5 rounded-2xl flex items-start gap-3 text-xs leading-relaxed animate-in fade-in duration-200 ${
              isStudentAttempt 
                ? 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200'
                : 'bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200'
            }`}>
              <UserX size={18} className="shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              <div>
                <span className="font-bold block">{isStudentAttempt ? "Kirish rad etildi:" : "Xatolik:"}</span>
                {errorMessage}
              </div>
            </div>
          )}

          {/* Select Staff Account */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              O‘qituvchi / Hakam hisobi:
            </label>
            <div className="space-y-2">
              {mockStaffUsers.map(staff => (
                <label 
                  key={staff.id}
                  className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedStaffId === staff.id
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 dark:border-blue-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="staff"
                    value={staff.id}
                    checked={selectedStaffId === staff.id}
                    onChange={() => {
                      setSelectedStaffId(staff.id);
                      setErrorMessage(null);
                    }}
                    className="sr-only"
                  />
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    selectedStaffId === staff.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {staff.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {staff.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {staff.roleTitle}
                    </p>
                  </div>
                  {selectedStaffId === staff.id && (
                    <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* PIN / Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                O‘qituvchi maxfiy PIN-kodi:
              </label>
              <span className="text-[11px] text-slate-400">
                4 xonali kod
              </span>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <KeyRound size={16} />
              </div>
              <input
                type={showPin ? "text" : "password"}
                maxLength={10}
                value={pin}
                onChange={e => {
                  setPin(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="PIN-kodni kiriting..."
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono tracking-widest text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* School Administration Demo Key Hint */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span>Standart xodim kodi:</span>
                <button
                  type="button"
                  onClick={() => {
                    setPin('2026');
                    setErrorMessage(null);
                  }}
                  className="px-1.5 py-0.5 rounded font-mono font-bold bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  2026
                </button>
              </span>
              
              <button
                type="button"
                onClick={handleStudentBlockedNotice}
                className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors underline"
              >
                Men o‘quvchiman
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Bekor qilish
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 text-white dark:bg-blue-600 dark:hover:bg-blue-500 hover:bg-slate-800 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Kirishni tasdiqlash</span>
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400">
          Abu Ali ibn Sino nomidagi ixtisoslashtirilgan maktab axborot xavfsizligi standarti
        </div>
      </div>
    </div>
  );
};
