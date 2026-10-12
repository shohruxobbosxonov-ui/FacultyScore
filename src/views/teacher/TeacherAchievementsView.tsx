import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Search, 
  Filter, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Achievement, VerificationStatus } from '../../types';

export const TeacherAchievementsView: React.FC = () => {
  const { achievements, reviewAchievement, currentStaffUser } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | VerificationStatus>('kutilmoqda');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReviewModal, setActiveReviewModal] = useState<Achievement | null>(null);
  const [decision, setDecision] = useState<'tasdiqlangan' | 'rad_etilgan'>('tasdiqlangan');
  const [reviewerNote, setReviewerNote] = useState('');
  const [pointsToAward, setPointsToAward] = useState<number>(25);

  const filteredAchievements = achievements.filter(ach => {
    if (statusFilter !== 'all' && ach.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ach.title.toLowerCase().includes(q);
      const matchStudent = ach.studentName.toLowerCase().includes(q);
      const matchClass = ach.className.toLowerCase().includes(q);
      if (!matchTitle && !matchStudent && !matchClass) return false;
    }
    return true;
  });

  const openReviewModal = (ach: Achievement) => {
    setActiveReviewModal(ach);
    setDecision('tasdiqlangan');
    setReviewerNote(ach.reviewerNote || 'Hujjat va diplom tekshirildi, talablarga to‘liq javob beradi.');
    setPointsToAward(25);
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReviewModal || !reviewerNote.trim()) return;

    reviewAchievement(
      activeReviewModal.id,
      decision,
      reviewerNote.trim(),
      decision === 'tasdiqlangan' ? pointsToAward : 0
    );

    setActiveReviewModal(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="text-blue-600 dark:text-blue-400" size={22} />
            <span>O‘quvchilar yutuqlarini moderatsiya qilish</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Yuklangan diplom va sertifikatlarni tekshirish, tasdiqlash hamda fakultetga rasmiy ball berish
          </p>
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setStatusFilter('kutilmoqda')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              statusFilter === 'kutilmoqda' 
                ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Kutilmoqda ({achievements.filter(a => a.status === 'kutilmoqda').length})
          </button>
          <button
            onClick={() => setStatusFilter('tasdiqlangan')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              statusFilter === 'tasdiqlangan' 
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Tasdiqlangan ({achievements.filter(a => a.status === 'tasdiqlangan').length})
          </button>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              statusFilter === 'all' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Barchasi ({achievements.length})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="O‘quvchi ismi, sinfi yoki musobaqa nomi bo‘yicha qidirish..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Moderation List */}
      <div className="space-y-4">
        {filteredAchievements.map((item) => {
          const isPending = item.status === 'kutilmoqda';

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                isPending 
                  ? 'bg-amber-50/30 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60 shadow-xs' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200">
                    {item.facultyId} fakulteti
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {item.className}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.studentName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.status === 'tasdiqlangan' && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={14} /> Tasdiqlangan (+{item.pointsAwarded} ball)
                    </span>
                  )}
                  {item.status === 'kutilmoqda' && (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Clock size={14} /> Moderatsiya kutilmoqda
                    </span>
                  )}
                  {item.status === 'rad_etilgan' && (
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <XCircle size={14} /> Rad etilgan
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Attachments & Certificate details */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-slate-500">
                  {item.certificateNumber && (
                    <span>Hujjat raqami: <strong>{item.certificateNumber}</strong></span>
                  )}
                  {item.attachmentName && (
                    <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
                      <FileText size={13} /> {item.attachmentName}
                    </span>
                  )}
                  <span>Yuklangan sana: {item.date}</span>
                </div>

                {/* Action button */}
                {isPending && currentStaffUser.permissions.canApproveAchievements && (
                  <button
                    onClick={() => openReviewModal(item)}
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
                  >
                    Tekshirish va xulosa berish
                  </button>
                )}
              </div>

              {item.reviewerNote && (
                <div className="text-[11px] text-slate-500 italic pt-1">
                  Ekspert qaydi: "{item.reviewerNote}"
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Review Modal */}
      {activeReviewModal && (
        <div 
          onClick={() => setActiveReviewModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Yutuq bo‘yicha rasmiy qaror qabul qilish
              </h3>
              <button
                onClick={() => setActiveReviewModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <p><strong>O‘quvchi:</strong> {activeReviewModal.studentName} ({activeReviewModal.className} · {activeReviewModal.facultyId})</p>
              <p><strong>Yutuq:</strong> {activeReviewModal.title}</p>
            </div>

            <form onSubmit={submitReview} className="space-y-4 text-xs">
              
              {/* Decision radio */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Qaror: *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDecision('tasdiqlangan')}
                    className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 ${
                      decision === 'tasdiqlangan'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 border-slate-200'
                    }`}
                  >
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Tasdiqlash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDecision('rad_etilgan')}
                    className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 ${
                      decision === 'rad_etilgan'
                        ? 'bg-rose-50 text-rose-800 border-rose-500 ring-2 ring-rose-500/20'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 border-slate-200'
                    }`}
                  >
                    <XCircle size={16} className="text-rose-600" />
                    <span>Rad etish</span>
                  </button>
                </div>
              </div>

              {/* Points to award (if approved) */}
              {decision === 'tasdiqlangan' && (
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Fakultetga beriladigan ball: *
                  </label>
                  <div className="flex gap-2">
                    {[15, 20, 25, 30, 35].map(pt => (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => setPointsToAward(pt)}
                        className={`px-3 py-1.5 rounded-xl font-bold border ${
                          pointsToAward === pt
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 border-slate-200'
                        }`}
                      >
                        +{pt} ball
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviewer Note */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ekspert xulosasi va izoh: *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewerNote}
                  onChange={e => setReviewerNote(e.target.value)}
                  placeholder="Xulosa va tasdiqlash/rad etish sababini yozing..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveReviewModal(null)}
                  className="px-4 py-2 font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  Qarorni saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
