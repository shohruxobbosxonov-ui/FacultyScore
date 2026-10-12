import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  ThumbsUp, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Send,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Suggestion } from '../types';

export const SuggestionsView: React.FC = () => {
  const { suggestions, submitSuggestion, upvoteSuggestion, currentStudent } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Suggestion['category']>('oquv_jarayoni');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    submitSuggestion({
      title,
      content,
      category,
      isAnonymous
    });

    setTitle('');
    setContent('');
    setIsAnonymous(false);
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: Suggestion['status']) => {
    switch (status) {
      case 'qabul_qilindi':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={13} /> Qabul qilindi
          </span>
        );
      case 'korib_chiqilmoqda':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Clock size={13} /> Ko‘rib chiqilmoqda
          </span>
        );
      case 'rad_etildi':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Rad etildi
          </span>
        );
    }
  };

  const getCategoryLabel = (cat: Suggestion['category']) => {
    switch (cat) {
      case 'oquv_jarayoni': return 'O‘quv jarayoni';
      case 'maktab_oshxonasi': return 'Maktab oshxonasi';
      case 'sport_va_tadbir': return 'Sport va tadbirlar';
      case 'kutubxona': return 'Kutubxona';
      case 'boshqa': return 'Boshqa';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="text-blue-600 dark:text-blue-400" size={22} />
            <span>O‘quvchilar takliflar qutisi</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Maktab hayotini yaxshilash, qulayliklar yaratish va yangi tashabbuslar bildirish maydoni
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors self-start md:self-auto"
        >
          <Plus size={15} />
          <span>Yangi taklif yuborish</span>
        </button>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {suggestions.map((sug) => (
          <div
            key={sug.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {getCategoryLabel(sug.category)}
                </span>
                {getStatusBadge(sug.status)}
              </div>

              {/* Upvote button */}
              <button
                onClick={() => upvoteSuggestion(sug.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  sug.hasUpvoted
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp size={13} className={sug.hasUpvoted ? "fill-current" : ""} />
                <span>{sug.upvotes} qo‘llab-quvvatlash</span>
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {sug.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {sug.content}
              </p>
            </div>

            {/* Admin Response if available */}
            {sug.adminResponse && (
              <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs space-y-1">
                <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                  <MessageCircle size={14} />
                  <span>Maktab ma’muriyati javobi:</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                  {sug.adminResponse}
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-2">
                {sug.isAnonymous ? (
                  <span className="flex items-center gap-1">
                    <Lock size={12} /> Anonim o‘quvchi
                  </span>
                ) : (
                  <span>Muallif: {sug.studentName} ({sug.className})</span>
                )}
                <span>·</span>
                <span>{sug.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestion Submission Modal */}
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
                Maktabga taklif yoki tashabbus yuborish
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Taklif sarlavhasi *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Masalan: Sport zalida shaxmat to‘plamlari sonini oshirish"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Yo‘nalish *
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as Suggestion['category'])}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="oquv_jarayoni">O‘quv jarayoni va darslar</option>
                  <option value="maktab_oshxonasi">Maktab oshxonasi</option>
                  <option value="sport_va_tadbir">Sport va tadbirlar</option>
                  <option value="kutubxona">Kutubxona va kovorking</option>
                  <option value="boshqa">Boshqa masalalar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Taklif mazmuni va asoslantirish *
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="G‘oyangiz qanday foyda keltiradi va uni qanday amalga oshirish mumkin?"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Anonymous Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={e => setIsAnonymous(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Ushbu taklifni anonim (ism-familiyam ko‘rsatilmagan holda) yuborish</span>
              </label>

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
                  Taklifni jo‘natish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
