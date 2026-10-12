import React, { useState, useEffect } from 'react';
import { Search, X, ChevronRight, Home, Trophy, History, Bell, Calendar, HelpCircle, Sparkles, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationSection } from '../../types';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    setCurrentSection,
    announcements,
    events,
    quizzes,
    clubs
  } = useApp();

  const [query, setQuery] = useState('');

  // Handle keyboard shortcut ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const navigateTo = (section: NavigationSection) => {
    setCurrentSection(section);
    setIsSearchOpen(false);
    setQuery('');
  };

  const cleanQuery = query.toLowerCase().trim();

  // Quick navigation items
  const quickNav = [
    { label: 'Bosh sahifa', section: 'dashboard' as NavigationSection, icon: Home },
    { label: 'Fakultetlar reytingi', section: 'faculties' as NavigationSection, icon: Trophy },
    { label: 'Ballar tarixi', section: 'point-history' as NavigationSection, icon: History },
    { label: 'E’lonlar', section: 'announcements' as NavigationSection, icon: Bell },
    { label: 'Tadbirlar taqvimi', section: 'events' as NavigationSection, icon: Calendar },
    { label: 'Bilim viktorinalari', section: 'quizzes' as NavigationSection, icon: HelpCircle },
    { label: 'To‘garaklar', section: 'clubs' as NavigationSection, icon: Sparkles },
    { label: 'Mening yutuqlarim', section: 'my-achievements' as NavigationSection, icon: Award },
  ].filter(item => cleanQuery === '' || item.label.toLowerCase().includes(cleanQuery));

  // Search announcements
  const matchedAnnouncements = announcements.filter(a => 
    cleanQuery && (a.title.toLowerCase().includes(cleanQuery) || a.content.toLowerCase().includes(cleanQuery))
  );

  // Search events
  const matchedEvents = events.filter(e => 
    cleanQuery && (e.title.toLowerCase().includes(cleanQuery) || e.description.toLowerCase().includes(cleanQuery))
  );

  // Search quizzes
  const matchedQuizzes = quizzes.filter(q => 
    cleanQuery && (q.title.toLowerCase().includes(cleanQuery) || q.subject.toLowerCase().includes(cleanQuery))
  );

  // Search clubs
  const matchedClubs = clubs.filter(c => 
    cleanQuery && (c.title.toLowerCase().includes(cleanQuery) || c.description.toLowerCase().includes(cleanQuery) || c.mentor.toLowerCase().includes(cleanQuery))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Bo‘limlar, tadbirlar, to‘garaklar yoki e’lonlarni qidiring..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={16} />
            </button>
          )}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-md bg-slate-100 dark:bg-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          
          {/* Quick sections */}
          {quickNav.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Sahifalar
              </div>
              <div className="mt-1 space-y-0.5">
                {quickNav.slice(0, 5).map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.section}
                      onClick={() => navigateTo(item.section)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} className="text-slate-400" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matched Quizzes */}
          {matchedQuizzes.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Viktorinalar
              </div>
              <div className="mt-1 space-y-1">
                {matchedQuizzes.map(q => (
                  <button
                    key={q.id}
                    onClick={() => navigateTo('quizzes')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">{q.title}</p>
                    <p className="text-[11px] text-slate-500">{q.subject} · {q.questionsCount} ta savol</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Events */}
          {matchedEvents.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Tadbirlar
              </div>
              <div className="mt-1 space-y-1">
                {matchedEvents.map(e => (
                  <button
                    key={e.id}
                    onClick={() => navigateTo('events')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">{e.title}</p>
                    <p className="text-[11px] text-slate-500">{e.displayDate} · {e.location}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Clubs */}
          {matchedClubs.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                To‘garaklar
              </div>
              <div className="mt-1 space-y-1">
                {matchedClubs.map(c => (
                  <button
                    key={c.id}
                    onClick={() => navigateTo('clubs')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">{c.title}</p>
                    <p className="text-[11px] text-slate-500">{c.mentor} · {c.schedule}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Announcements */}
          {matchedAnnouncements.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                E’lonlar
              </div>
              <div className="mt-1 space-y-1">
                {matchedAnnouncements.map(a => (
                  <button
                    key={a.id}
                    onClick={() => navigateTo('announcements')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">{a.title}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{a.content}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {cleanQuery && quickNav.length === 0 && matchedAnnouncements.length === 0 && matchedEvents.length === 0 && matchedQuizzes.length === 0 && matchedClubs.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
              "{query}" bo‘yicha hech qanday ma’lumot topilmadi.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
