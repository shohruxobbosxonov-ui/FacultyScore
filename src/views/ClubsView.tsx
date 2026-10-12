import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  User, 
  Users, 
  CheckCircle2, 
  Plus,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Club } from '../types';

export const ClubsView: React.FC = () => {
  const { clubs, toggleClubEnrollment } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredClubs = clubs.filter(c => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    return true;
  });

  const getCategoryLabel = (category: Club['category']) => {
    switch (category) {
      case 'it': return 'IT va Texnologiya';
      case 'ilm-fan': return 'Tabiiy fanlar & Lab';
      case 'sanat': return 'San’at & Notiqlik';
      case 'til': return 'Xorijiy tillar';
      case 'sport': return 'Sport to‘garagi';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Maktab to‘garaklari va laboratoriyalari</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Qiziqishlaringiz bo‘yicha to‘garaklarga yoziling va amaliy loyihalarda qatnashing
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'it', label: 'IT & Robototexnika' },
            { id: 'ilm-fan', label: 'Ilm-fan' },
            { id: 'sanat', label: 'San’at & Notiqlik' },
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

      {/* Clubs Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClubs.map((club) => {
          const isEnrolled = club.isEnrolled;

          return (
            <div
              key={club.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isEnrolled 
                  ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800/80 shadow-xs ring-1 ring-blue-500/20' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {getCategoryLabel(club.category)}
                  </span>

                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Users size={14} className="text-slate-400" />
                    <span>{club.membersCount} / {club.maxCapacity} o‘quvchi</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {club.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {club.description}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-blue-500 shrink-0" />
                    <span>Murabbiy: <strong>{club.mentor}</strong> ({club.mentorRole})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-blue-500 shrink-0" />
                    <span>Jadval: {club.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-blue-500 shrink-0" />
                    <span>Xona: {club.room}</span>
                  </div>
                </div>
              </div>

              {/* Enrollment action */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {isEnrolled ? "Siz to‘garak a’zosisiz" : "Qatnashish mutlaqo bepul"}
                </span>

                <button
                  onClick={() => toggleClubEnrollment(club.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isEnrolled
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span>A’zosiz (Chiqish)</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      <span>A’zo bo‘lish</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
