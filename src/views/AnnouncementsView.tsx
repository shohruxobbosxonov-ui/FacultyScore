import React, { useState } from 'react';
import { 
  Bell, 
  Pin, 
  Calendar, 
  Clock, 
  User, 
  Search, 
  CheckCircle,
  Megaphone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Announcement } from '../types';

export const AnnouncementsView: React.FC = () => {
  const { announcements } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalAnnouncement, setActiveModalAnnouncement] = useState<Announcement | null>(null);

  const filteredAnnouncements = announcements.filter(a => {
    if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q);
    }
    return true;
  });

  const getCategoryBadge = (category: Announcement['category']) => {
    switch (category) {
      case 'muhim':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'yangilik':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'tadbir':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'olimpiada':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Megaphone className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Maktab e’lonlari va yangiliklari</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Maktab ma’muriyati, fan kafedralari va to‘garaklar rasmiy bildirishnomalari
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'muhim', label: 'Muhim' },
            { id: 'yangilik', label: 'Yangiliklar' },
            { id: 'tadbir', label: 'Tadbirlar' },
            { id: 'olimpiada', label: 'Olimpiadalar' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === tab.id 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAnnouncements.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              item.isPinned 
                ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/60 shadow-xs' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border uppercase ${getCategoryBadge(item.category)}`}>
                  {item.category}
                </span>

                {item.isPinned && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                    <Pin size={13} />
                    <span>Qadalgan e’lon</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                {item.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-2">
                <span>{item.author}</span>
                <span>·</span>
                <span>{item.date}</span>
              </div>

              <button
                onClick={() => setActiveModalAnnouncement(item)}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Batafsil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeModalAnnouncement && (
        <div 
          onClick={() => setActiveModalAnnouncement(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md border uppercase ${getCategoryBadge(activeModalAnnouncement.category)}`}>
                {activeModalAnnouncement.category}
              </span>
              <button
                onClick={() => setActiveModalAnnouncement(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {activeModalAnnouncement.title}
            </h3>

            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 border-y border-slate-100 dark:border-slate-800 py-2">
              <span>Muallif: <strong>{activeModalAnnouncement.author}</strong></span>
              <span>·</span>
              <span>Sana: {activeModalAnnouncement.date}</span>
              <span>·</span>
              <span>O‘qish vaqti: {activeModalAnnouncement.readTime}</span>
            </div>

            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 whitespace-pre-line">
              {activeModalAnnouncement.content}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModalAnnouncement(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 transition-colors"
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
