import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Trophy, 
  Users, 
  CheckCircle2, 
  List, 
  Grid
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SchoolEvent } from '../types';

export const EventsCalendarView: React.FC = () => {
  const { events, toggleEventRegistration } = useApp();
  const [viewMode, setViewMode] = useState<'cards' | 'calendar'>('cards');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredEvents = events.filter(e => {
    if (filterCategory !== 'all' && e.category !== filterCategory) return false;
    return true;
  });

  const getCategoryLabel = (category: SchoolEvent['category']) => {
    switch (category) {
      case 'viktorina': return 'Intellektual / Zakovat';
      case 'sport': return 'Sport musobaqasi';
      case 'ijod': return 'Ijodiy festival';
      case 'akademik': return 'Ilmiy konferensiya';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Maktab tadbirlari taqvimi</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Fakultetlararo sport, zakovat, ijodiy va ilmiy tadbirlarda qatnashing
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              viewMode === 'cards' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Grid size={14} />
            <span>Kartalar</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              viewMode === 'calendar' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <List size={14} />
            <span>Ro‘yxat</span>
          </button>
        </div>
      </div>

      {/* Events Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {getCategoryLabel(event.category)}
                </span>

                <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-900/50">
                  <Trophy size={13} />
                  <span>{event.pointsReward}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Event details strip */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-blue-500 shrink-0" />
                  <span>{event.displayDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-blue-500 shrink-0" />
                  <span>Soat {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-blue-500 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-blue-500 shrink-0" />
                  <span>{event.registeredCount} nafar ro‘yxatda</span>
                </div>
              </div>
            </div>

            {/* Registration action */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {event.isRegistered ? "Siz ushbu tadbirga yozilgansiz" : "Ishtirok etish uchun ro‘yxatdan o‘ting"}
              </span>

              <button
                onClick={() => toggleEventRegistration(event.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  event.isRegistered 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                }`}
              >
                {event.isRegistered ? (
                  <>
                    <CheckCircle2 size={14} />
                    <span>Ro‘yxatdasiz (Bekor qilish)</span>
                  </>
                ) : (
                  <span>Qatnashish</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
