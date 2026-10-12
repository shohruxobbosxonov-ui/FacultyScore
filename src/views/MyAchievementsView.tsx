import React, { useState } from 'react';
import { 
  Award, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText, 
  Download, 
  Sparkles,
  Info,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Achievement, AchievementCategory, VerificationStatus } from '../types';

export const MyAchievementsView: React.FC = () => {
  const { achievements, submitAchievement, currentStudent } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | VerificationStatus>('all');
  
  // New achievement form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AchievementCategory>('olimpiada');
  const [description, setDescription] = useState('');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [attachmentName, setAttachmentName] = useState('');

  const filteredAchievements = achievements.filter(ach => {
    if (statusFilter !== 'all' && ach.status !== statusFilter) return false;
    return true;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    submitAchievement({
      title,
      category,
      description,
      certificateNumber: certificateNumber.trim() || undefined,
      attachmentName: attachmentName.trim() || 'diplom_ilova.pdf'
    });

    setTitle('');
    setDescription('');
    setCertificateNumber('');
    setAttachmentName('');
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'tasdiqlangan':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={13} /> Rasmiy tasdiqlangan
          </span>
        );
      case 'kutilmoqda':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Clock size={13} /> Ko‘rib chiqilmoqda
          </span>
        );
      case 'rad_etilgan':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <XCircle size={13} /> Rad etilgan
          </span>
        );
    }
  };

  const getCategoryLabel = (cat: AchievementCategory) => {
    switch (cat) {
      case 'olimpiada': return 'Fan olimpiadasi';
      case 'sertifikat': return 'Sertifikat & Kurs';
      case 'loyiha': return 'Ilmiy loyiha';
      case 'sport': return 'Sport yutug‘i';
      case 'ijod': return 'Ijodiy tanlov';
      case 'jamoat': return 'Jamoatchilik ishlari';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Mening shaxsiy yutuqlarim va portfolio</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {currentStudent.name} ({currentStudent.className}) · Barcha rasmiy diplom va sertifikatlar jamg‘armasi
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors self-start md:self-auto"
        >
          <Plus size={15} />
          <span>Yangi yutuq kiritish</span>
        </button>
      </div>

      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500">Fakultetga keltirilgan ball</span>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 tabular-nums">
            +{currentStudent.personalContributionPoints} ball
          </div>
          <span className="text-[11px] text-slate-400">Tasdiqlangan yutuqlar orqali</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500">Tasdiqlangan hujjatlar</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
            {achievements.filter(a => a.status === 'tasdiqlangan').length} ta
          </div>
          <span className="text-[11px] text-slate-400">Rasmiy ro‘yxatga kiritilgan</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500">Moderatsiyadagi arizalar</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
            {achievements.filter(a => a.status === 'kutilmoqda').length} ta
          </div>
          <span className="text-[11px] text-slate-400">Ma’muriyat ko‘rib chiqmoqda</span>
        </div>
      </div>

      {/* Status filter bar */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs w-fit">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            statusFilter === 'all' 
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Barcha yutuqlar ({achievements.length})
        </button>
        <button
          onClick={() => setStatusFilter('tasdiqlangan')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            statusFilter === 'tasdiqlangan' 
              ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs' 
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Tasdiqlangan
        </button>
        <button
          onClick={() => setStatusFilter('kutilmoqda')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            statusFilter === 'kutilmoqda' 
              ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-400 shadow-xs' 
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Kutilmoqda
        </button>
      </div>

      {/* Achievements List */}
      <div className="space-y-4">
        {filteredAchievements.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {getCategoryLabel(item.category)}
                </span>
                {getStatusBadge(item.status)}
              </div>

              {item.pointsAwarded > 0 && (
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                  +{item.pointsAwarded} ball fakultetga
                </span>
              )}
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Details and Reviewer note */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-3 flex-wrap">
                <span>Sana: {item.date}</span>
                {item.certificateNumber && (
                  <span>№ {item.certificateNumber}</span>
                )}
                {item.attachmentName && (
                  <span className="flex items-center gap-1 text-blue-500">
                    <FileText size={12} /> {item.attachmentName}
                  </span>
                )}
              </div>

              {item.reviewerNote && (
                <div className="text-slate-500 italic">
                  Ekspert xulosasi: "{item.reviewerNote}"
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Yangi yutuqni tasdiqlash uchun kiritish
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Yutuq yoki musobaqa nomi *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Masalan: Fizika fani shahar olimpiadasi 2-o‘rin"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Yo‘nalish / Kategoriya *
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as AchievementCategory)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="olimpiada">Fan olimpiadasi</option>
                    <option value="sertifikat">Sertifikat / Xalqaro imtihon</option>
                    <option value="loyiha">Ilmiy loyiha yoki ixtiro</option>
                    <option value="sport">Sport musobaqasi</option>
                    <option value="ijod">Ijodiy tanlov</option>
                    <option value="jamoat">Jamoatchilik faolligi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Sertifikat / Diplom raqami
                  </label>
                  <input
                    type="text"
                    value={certificateNumber}
                    onChange={e => setCertificateNumber(e.target.value)}
                    placeholder="Masalan: CERT-2026-991"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Batafsil ma’lumot va tavsif *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Musobaqa qachon, qayerda bo‘ldi va qanday natijaga erishdingiz?"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tasdiqlovchi fayl yoki diplom fotosi
                </label>
                <input
                  type="text"
                  value={attachmentName}
                  onChange={e => setAttachmentName(e.target.value)}
                  placeholder="diplom_nusxasi.pdf yoki skaner rasmi"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5" />
                <span>
                  Hujjat maktab ilmiy kengashi tomonidan tekshirilib, tasdiqlanganidan so‘ng tegishli ballar {currentStudent.facultyId} fakulteti hisobiga kiritiladi.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  Ko‘rib chiqishga yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
