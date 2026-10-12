import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  KeyRound, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight, 
  Sun, 
  Moon, 
  Trophy, 
  Sparkles,
  School,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginView: React.FC = () => {
  const { 
    loginUser, 
    isDarkMode, 
    toggleDarkMode, 
    faculties 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [loginInput, setLoginInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanLogin = loginInput.toLowerCase().trim();
    const cleanPassword = passwordInput.trim();

    if (!cleanLogin) {
      setError('Iltimos, ism va familiyangizni kichik harflarda kiriting');
      return;
    }

    if (!cleanPassword) {
      setError('Iltimos, 8 xonali raqamli parolni kiriting');
      return;
    }

    if (!/^\d{8}$/.test(cleanPassword)) {
      setError('Parol aynan 8 xonali raqam bo‘lishi shart (masalan: 12345678)');
      return;
    }

    const res = loginUser(cleanLogin, cleanPassword, activeTab);
    if (!res.success) {
      setError(res.message);
    }
  };

  // Quick fill demo helper
  const handleQuickFill = (role: 'student' | 'teacher', name: string) => {
    setActiveTab(role);
    setLoginInput(name.toLowerCase());
    setPasswordInput('12345678');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
      
      {/* Top Bar with School Brand & Theme Toggle */}
      <header className="w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
              FS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  Faculty<span className="text-blue-600 dark:text-blue-400">Score</span>.uz
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  Rasmiy portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Abu Ali ibn Sino nomidagi ixtisoslashtirilgan maktab (Farg‘ona filiali)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? "Yorug‘ rejim" : "Qorong‘i rejim"}
            >
              {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Login Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
        
        {/* Left Side: Brand Story & School Faculties */}
        <div className="flex-1 max-w-xl text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <Sparkles size={14} />
            <span>2026–2027 O‘quv yili fakultetlar musobaqasi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Bir maktab. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-rose-600">
              To‘rt fakultet.
            </span> <br />
            Bir yagona maqsad.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            FacultyScore — Abu Ali ibn Sino ixtisoslashtirilgan maktabi o‘quvchilari va o‘qituvchilari uchun yagona reyting, ballar monitoringi va intellektual musobaqa platformasi.
          </p>

          {/* 4 Faculties Preview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {faculties.map((f) => (
              <div 
                key={f.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs text-left space-y-1 hover:scale-102 transition-transform"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: f.color.primary }}>
                    {f.name}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {f.rank}-o‘rin
                  </span>
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white">
                  {f.totalPoints}
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  {f.classesCount} ta sinf
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2.5">
            <School size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <span>
              Maktabda qat’iy 14 ta sinf mavjud (7-Blue, 7-Green, 7-White, 8-sinflar, 9-sinflar va 10-sinflar). Har bir o‘quvchi o‘z fakulteti uchun ball to‘playdi.
            </span>
          </div>
        </div>

        {/* Right Side: Professional Login Card */}
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            
            {/* Form Title & Subtitle */}
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <Lock className="text-blue-600 dark:text-blue-400" size={20} />
                <span>Tizimga kirish</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                O‘quvchi yoki o‘qituvchi hisobingiz bilan tizimga ulaning
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl grid grid-cols-2 gap-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('student');
                  setError(null);
                }}
                className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'student'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap size={16} />
                <span>O‘quvchi</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('teacher');
                  setError(null);
                }}
                className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'teacher'
                    ? 'bg-slate-900 text-white dark:bg-blue-600 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShieldCheck size={16} className={activeTab === 'teacher' ? 'text-emerald-400' : ''} />
                <span>O‘qituvchi</span>
              </button>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Login Name (lowercase) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Login <span className="font-normal text-slate-400">(ism va familiya kichik harflarda)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    value={loginInput}
                    onChange={(e) => {
                      setLoginInput(e.target.value.toLowerCase());
                      setError(null);
                    }}
                    placeholder={activeTab === 'student' ? 'masalan: muhammad aliyev' : 'masalan: nodira torayeva'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 lowercase font-medium transition-colors"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Harflar avtomatik kichik formatda yoziladi
                </p>
              </div>

              {/* Password (8 digits) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Parol <span className="font-normal text-slate-400">(8 xonali raqamlar)</span>
                  </label>
                  <span className="text-[11px] font-mono font-semibold text-blue-600 dark:text-blue-400">
                    {passwordInput.length}/8 raqam
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    maxLength={8}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={passwordInput}
                    onChange={(e) => {
                      // Only allow digits
                      const val = e.target.value.replace(/\D/g, '');
                      setPasswordInput(val);
                      setError(null);
                    }}
                    placeholder="8 xonali raqam (masalan: 12345678)"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono tracking-widest text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Standart namunaviy parol: <span className="font-mono font-bold text-slate-600 dark:text-slate-300">12345678</span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group mt-2"
              >
                <span>Tizimga kirish</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {/* Quick Demo Credentials for Easy Testing */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Tezkor sinov uchun namunalar:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleQuickFill('student', 'muhammad aliyev')}
                  className="p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/40 text-left hover:bg-blue-100/60 transition-colors"
                >
                  <div className="flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-300">
                    <GraduationCap size={13} />
                    <span>O‘quvchi: muhammad aliyev</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Parol: 12345678 (9-Blue)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('teacher', 'nodira torayeva')}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800 text-left hover:bg-slate-200/70 transition-colors"
                >
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                    <ShieldCheck size={13} className="text-emerald-500" />
                    <span>O‘qituvchi: nodira torayeva</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Parol: 12345678 (Hakam)</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <button
                  type="button"
                  onClick={() => handleQuickFill('student', 'madina karimova')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline"
                >
                  8-Green: madina karimova
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('teacher', 'rustam qosimov')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline"
                >
                  Fan o‘qituvchisi: rustam qosimov
                </button>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800 py-4 px-4 text-center text-xs text-slate-400">
        <p>© 2026 FacultyScore. Abu Ali ibn Sino nomidagi ixtisoslashtirilgan maktab (Farg‘ona filiali).</p>
        <p className="text-[11px] text-slate-400/80 mt-0.5">
          Fakultetlar ballari va musobaqa monitoringi avtomatlashtirilgan platformasi.
        </p>
      </footer>

    </div>
  );
};
