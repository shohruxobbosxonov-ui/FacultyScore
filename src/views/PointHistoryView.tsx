import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FacultyId, PointCategory } from '../types';

export const PointHistoryView: React.FC = () => {
  const { pointRecords } = useApp();
  
  const [facultyFilter, setFacultyFilter] = useState<'all' | FacultyId>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | PointCategory>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'positive' | 'negative'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = pointRecords.filter(rec => {
    // Faculty filter
    if (facultyFilter !== 'all' && rec.facultyId !== facultyFilter) return false;
    // Category filter
    if (categoryFilter !== 'all' && rec.category !== categoryFilter) return false;
    // Type filter
    if (typeFilter === 'positive' && rec.points <= 0) return false;
    if (typeFilter === 'negative' && rec.points >= 0) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = rec.title.toLowerCase().includes(q);
      const matchReason = rec.reason.toLowerCase().includes(q);
      const matchClass = rec.attributedClass.toLowerCase().includes(q);
      const matchStudent = rec.attributedStudentName?.toLowerCase().includes(q);
      if (!matchTitle && !matchReason && !matchClass && !matchStudent) return false;
    }
    return true;
  });

  const getFacultyBadgeStyle = (id: FacultyId) => {
    switch (id) {
      case 'Blue': return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Green': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'White': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      case 'Red': return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    }
  };

  const getCategoryLabel = (cat: PointCategory) => {
    switch (cat) {
      case 'academics': return 'Olimpiada & Fan';
      case 'events': return 'Tadbir & Zakovat';
      case 'sports': return 'Sport musobaqasi';
      case 'clubs': return 'To‘garak & Loyiha';
      case 'discipline': return 'Intizomiy qayd';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Ballar tarixi va operatsiyalar jurnali</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Har bir fakultetga berilgan va ayirilgan ballarning to‘liq shaffof hisobi
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <FileText size={15} className="text-slate-400" />
          <span>Jami yozuvlar: <strong>{pointRecords.length} ta</strong></span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Sabab, tadbir yoki sinf bo‘yicha qidirish..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs shrink-0">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                typeFilter === 'all' 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setTypeFilter('positive')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                typeFilter === 'positive' 
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              + Qo‘shilgan
            </button>
            <button
              onClick={() => setTypeFilter('negative')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                typeFilter === 'negative' 
                  ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-400 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              - Ayirilgan
            </button>
          </div>
        </div>

        {/* Second Row: Faculty Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/60 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold mr-1">Fakultet:</span>
          {(['all', 'Blue', 'Green', 'White', 'Red'] as const).map(fac => (
            <button
              key={fac}
              onClick={() => setFacultyFilter(fac)}
              className={`px-3 py-1 rounded-lg font-medium transition-colors border ${
                facultyFilter === fac 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white' 
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {fac === 'all' ? 'Barcha fakultetlar' : fac}
            </button>
          ))}
        </div>
      </div>

      {/* Records List / Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        {filteredRecords.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/70">
            {filteredRecords.map((record) => {
              const isPositive = record.points > 0;
              return (
                <div 
                  key={record.id}
                  className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isPositive 
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' 
                        : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                    }`}>
                      {isPositive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 text-[11px] font-bold rounded-md border ${getFacultyBadgeStyle(record.facultyId)}`}>
                          {record.facultyId}
                        </span>

                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {getCategoryLabel(record.category)}
                        </span>

                        <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {record.title}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {record.reason}
                      </p>

                      <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-2 flex-wrap">
                        {record.attributedStudentName && (
                          <span>O‘quvchi: <strong className="text-slate-600 dark:text-slate-300 font-medium">{record.attributedStudentName}</strong></span>
                        )}
                        <span>·</span>
                        <span>Sinf: <strong className="text-slate-600 dark:text-slate-300 font-medium">{record.attributedClass}</strong></span>
                        <span>·</span>
                        <span>Tasdiqlovchi: {record.verifiedBy}</span>
                        <span>·</span>
                        <span>{record.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Points amount badge */}
                  <div className="sm:text-right shrink-0 self-end sm:self-center pl-12 sm:pl-0">
                    <div className={`text-base font-black tabular-nums ${
                      isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {isPositive ? `+${record.points}` : record.points} ball
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isPositive ? 'Fakultetga qo‘shildi' : 'Fakultetdan ayirildi'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-400 dark:text-slate-500 space-y-2">
            <AlertCircle size={32} className="mx-auto text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-medium">Tanlangan parametrlar bo‘yicha ballar tarixi topilmadi.</p>
            <button
              onClick={() => {
                setFacultyFilter('all');
                setCategoryFilter('all');
                setTypeFilter('all');
                setSearchQuery('');
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
