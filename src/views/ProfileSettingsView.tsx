import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Lock, 
  Sun, 
  Moon, 
  CheckCircle2, 
  Award, 
  Calendar, 
  BookOpen, 
  School,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileSettingsView: React.FC = () => {
  const { currentStudent, faculties, isDarkMode, toggleDarkMode, achievements } = useApp();

  const studentFaculty = faculties.find(f => f.id === currentStudent.facultyId);

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="text-blue-600 dark:text-blue-400" size={22} />
            <span>O‘quvchi profili va sozlamalar</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Rasmiy identifikatsiya, sinf va xavfsizlik parametrlari
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck size={14} />
          <span>Faol o‘quvchi</span>
        </div>
      </div>

      {/* Official Student Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center ring-4 ring-white/10 shrink-0">
              {currentStudent.avatar}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  ID: {currentStudent.studentIdNumber}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/10 text-white">
                  {currentStudent.className}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                {currentStudent.name}
              </h3>
              <p className="text-xs text-slate-300">
                {currentStudent.email}
              </p>
            </div>
          </div>

          {/* Official Faculty Identifier */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs text-left sm:text-right shrink-0">
            <span className="text-[11px] text-blue-200 font-medium block">
              Rasmiy a’zo fakultet:
            </span>
            <span className="text-lg font-black text-white tracking-wide uppercase">
              {currentStudent.facultyId} ({studentFaculty?.uzName})
            </span>
            <span className="text-[11px] text-slate-300 block">
              Maktab buyrug‘i bilan biriktirilgan
            </span>
          </div>

        </div>

        {/* Decorative background logo */}
        <GraduationCap className="absolute -right-6 -bottom-6 w-44 h-44 text-white/5 pointer-events-none" />
      </div>

      {/* Security Rule Notice regarding Faculty and Class Assignment & Teacher Panel restriction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <Lock size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold mb-0.5">Xavfsizlik va adolatli musobaqa:</strong>
            O‘quvchilar o‘z fakulteti yoki sinfini o‘zboshimchalik bilan o‘zgartira olmaydi. Barcha a’zolik rasmiy 14 ta sinf tuzilishi bo‘yicha qat’iy belgilangan.
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <ShieldCheck size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold mb-0.5 text-slate-900 dark:text-white">O‘qituvchi paneli cheklovi:</strong>
            O‘quvchilar o‘qituvchi boshqaruv paneliga kira olmaydi. Ball berish, qaytarish va yutuqlarni tasdiqlash vakolati faqat o‘qituvchilar va hakamlar hay’atiga berilgan.
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Tizim va interfeys sozlamalari
        </h3>

        {/* Theme mode toggle row */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
              <span>Tashqi ko‘rinish mavzusi (Mavzu rejimi)</span>
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isDarkMode ? "Qorong‘i (Dark mode) rejim faol" : "Yorug‘ (Light mode) rejim faol"}
            </p>
          </div>

          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            {isDarkMode ? "Yorug‘ rejimga o‘tish" : "Qorong‘i rejimga o‘tish"}
          </button>
        </div>

        {/* Academic details summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1">
            <span className="text-slate-400">Maktab:</span>
            <p className="font-semibold text-slate-900 dark:text-white">Abu Ali ibn Sino nomidagi ixtisoslashtirilgan maktab</p>
            <span className="text-[11px] text-slate-500">Farg‘ona filiali</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1">
            <span className="text-slate-400">Tizim versiyasi:</span>
            <p className="font-semibold text-slate-900 dark:text-white">FacultyScore Student Portal v2.6.4</p>
            <span className="text-[11px] text-slate-500">2026–2027 Kuzgi mavsum</span>
          </div>
        </div>

      </div>

    </div>
  );
};
