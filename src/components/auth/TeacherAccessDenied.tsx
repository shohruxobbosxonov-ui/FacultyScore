import React from 'react';
import { ShieldAlert, ArrowLeft, Lock, KeyRound, GraduationCap, School } from 'lucide-react';

interface TeacherAccessDeniedProps {
  onOpenLogin: () => void;
  onReturnStudent: () => void;
}

export const TeacherAccessDenied: React.FC<TeacherAccessDeniedProps> = ({
  onOpenLogin,
  onReturnStudent
}) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-rose-200 dark:border-rose-950/60 shadow-xl text-center space-y-6">
        
        {/* Security Alert Icon */}
        <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert size={32} />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
            Kirish cheklangan · 403 Ruxsat yo‘q
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            O‘qituvchi Paneliga Kirish Taqiqlandi
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
            Ushbu bo‘lim faqat Abu Ali ibn Sino nomidagi ixtisoslashtirilgan maktab o‘qituvchilari, hakamlar hay’ati va ma’muriyatiga tegishli. O‘quvchilar ushbu tizimga kira olmaydi.
          </p>
        </div>

        {/* Informational bullet card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-left text-xs space-y-2.5">
          <div className="flex items-start gap-2.5">
            <Lock size={15} className="text-amber-500 shrink-0 mt-0.5" />
            <span className="text-slate-600 dark:text-slate-300">
              Fakultet ballarini o‘zgartirish va audit faqat o‘qituvchi vakolatida.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <GraduationCap size={15} className="text-blue-500 shrink-0 mt-0.5" />
            <span className="text-slate-600 dark:text-slate-300">
              O‘quvchilar faoliyatini O‘quvchi portali orqali kuzatishi mumkin.
            </span>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={onReturnStudent}
            className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>O‘quvchi paneliga qaytish</span>
          </button>

          <button
            onClick={onOpenLogin}
            className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
          >
            <KeyRound size={16} className="text-slate-500" />
            <span>Men o‘qituvchiman (PIN bilan kirish)</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400">
          FacultyScore Xavfsizlik Tizimi · Farg‘ona filiali
        </p>

      </div>
    </div>
  );
};
