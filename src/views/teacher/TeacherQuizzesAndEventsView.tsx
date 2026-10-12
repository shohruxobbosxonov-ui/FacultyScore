import React, { useState } from 'react';
import { 
  HelpCircle, 
  Calendar, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Lock, 
  MessageCircle, 
  Trash2,
  Trophy
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Quiz, QuizQuestion, SchoolEvent, Suggestion } from '../../types';

export const TeacherQuizzesAndEventsView: React.FC = () => {
  const { 
    quizzes, 
    events, 
    suggestions, 
    createQuiz, 
    createEvent, 
    respondToSuggestion,
    currentStaffUser 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'quizzes' | 'events' | 'suggestions'>('quizzes');

  // Quiz Modal State
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizSubject, setQuizSubject] = useState('Matematika');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizPoints, setQuizPoints] = useState(25);
  const [quizDeadline, setQuizDeadline] = useState('20-oktabr, 2026');
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: 'q_custom_1',
      question: 'Masalan: 100 ning 25 foizi nechaga teng?',
      options: ['25', '20', '30', '50'],
      correctAnswerIndex: 0,
      explanation: '100 * 0.25 = 25 ga teng.'
    }
  ]);

  // Event Modal State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('2026-10-25');
  const [eventTime, setEventTime] = useState('14:30');
  const [eventLocation, setEventLocation] = useState('Maktab faollar zali');
  const [eventCategory, setEventCategory] = useState<SchoolEvent['category']>('viktorina');
  const [eventPoints, setEventPoints] = useState('+35 ball g‘olib fakultetga');

  // Suggestion Response Modal State
  const [activeSuggestion, setActiveSuggestion] = useState<Suggestion | null>(null);
  const [suggestionResponseText, setSuggestionResponseText] = useState('');
  const [suggestionStatus, setSuggestionStatus] = useState<'qabul_qilindi' | 'rad_etildi'>('qabul_qilindi');

  const handleCreateQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTitle.trim()) return;

    createQuiz({
      title: quizTitle,
      subject: quizSubject,
      description: quizDescription || 'Maktab o‘quvchilari uchun maxsus test.',
      questionsCount: questions.length,
      durationMinutes: 10,
      deadlineDate: quizDeadline,
      potentialPoints: quizPoints,
      questions
    });

    setIsQuizModalOpen(false);
    setQuizTitle('');
    setQuizDescription('');
  };

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    createEvent({
      title: eventTitle,
      description: eventDesc,
      date: eventDate,
      displayDate: `${eventDate.split('-')[2]}-oktabr, 2026`,
      time: eventTime,
      location: eventLocation,
      category: eventCategory,
      pointsReward: eventPoints
    });

    setIsEventModalOpen(false);
    setEventTitle('');
    setEventDesc('');
  };

  const handleSuggestionResponseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSuggestion || !suggestionResponseText.trim()) return;

    respondToSuggestion(activeSuggestion.id, suggestionStatus, suggestionResponseText.trim());
    setActiveSuggestion(null);
    setSuggestionResponseText('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Viktorinalar, Tadbirlar va Takliflar Boshqaruvi</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            O‘quvchilar uchun intellektual bellashuvlar e’lon qilish va tashabbuslarga rasmiy javob berish
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'quizzes' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Viktorinalar ({quizzes.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'events' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Tadbirlar ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'suggestions' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Takliflar ({suggestions.length})
          </button>
        </div>
      </div>

      {/* 1. QUIZZES TAB */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Faol va yakunlangan viktorinalar ro‘yxati
            </span>
            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-xs"
            >
              <Plus size={14} />
              <span>Yangi viktorina qo‘shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizzes.map(quiz => (
              <div
                key={quiz.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {quiz.subject}
                  </span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Trophy size={13} />
                    <span>+{quiz.potentialPoints} ball</span>
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{quiz.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{quiz.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{quiz.questionsCount} ta savol · {quiz.durationMinutes} daqiqa</span>
                  <span>Muddati: {quiz.deadlineDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. EVENTS TAB */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Maktab tadbirlari va musobaqalari
            </span>
            <button
              onClick={() => setIsEventModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-xs"
            >
              <Plus size={14} />
              <span>Yangi tadbir e’lon qilish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(ev => (
              <div
                key={ev.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {ev.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {ev.pointsReward}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{ev.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ev.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{ev.displayDate} · Soat {ev.time}</span>
                  <span>{ev.registeredCount} nafar ro‘yxatda</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SUGGESTIONS TAB */}
      {activeTab === 'suggestions' && (
        <div className="space-y-4">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            O‘quvchilar takliflari va rasmiy moderatsiya
          </span>

          <div className="space-y-3">
            {suggestions.map(sug => (
              <div
                key={sug.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {sug.category}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      sug.status === 'qabul_qilindi' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' :
                      sug.status === 'rad_etildi' ? 'bg-slate-100 text-slate-700' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
                    }`}>
                      {sug.status === 'qabul_qilindi' ? 'Qabul qilingan' : sug.status === 'rad_etildi' ? 'Rad etilgan' : 'Ko‘rib chiqilmoqda'}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 font-medium">
                    {sug.upvotes} ta ovoz
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{sug.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{sug.content}</p>
                </div>

                {sug.adminResponse && (
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-xs">
                    <span className="font-bold text-blue-900 dark:text-blue-300 block mb-0.5">Rasmiy ma’muriyat javobi:</span>
                    <p className="text-slate-700 dark:text-slate-300">{sug.adminResponse}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div>
                    {sug.isAnonymous ? (
                      <span className="flex items-center gap-1"><Lock size={12} /> Anonim o‘quvchi</span>
                    ) : (
                      <span>Muallif: {sug.studentName} ({sug.className})</span>
                    )}
                    <span> · {sug.createdAt}</span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveSuggestion(sug);
                      setSuggestionResponseText(sug.adminResponse || '');
                    }}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Javob berish / Tahrirlash
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestion Response Modal */}
      {activeSuggestion && (
        <div 
          onClick={() => setActiveSuggestion(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                O‘quvchi taklifiga rasmiy javob yozish
              </h3>
              <button onClick={() => setActiveSuggestion(null)} className="text-slate-400">✕</button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">{activeSuggestion.title}</span>
              <p className="text-slate-500">{activeSuggestion.content}</p>
            </div>

            <form onSubmit={handleSuggestionResponseSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Qaror:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSuggestionStatus('qabul_qilindi')}
                    className={`p-2 rounded-xl border font-bold ${
                      suggestionStatus === 'qabul_qilindi' ? 'bg-emerald-50 text-emerald-800 border-emerald-500' : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    Qabul qilindi
                  </button>
                  <button
                    type="button"
                    onClick={() => setSuggestionStatus('rad_etildi')}
                    className={`p-2 rounded-xl border font-bold ${
                      suggestionStatus === 'rad_etildi' ? 'bg-slate-200 text-slate-800 border-slate-400' : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    Rad etildi
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Rasmiy ma’muriy javob *
                </label>
                <textarea
                  required
                  rows={3}
                  value={suggestionResponseText}
                  onChange={e => setSuggestionResponseText(e.target.value)}
                  placeholder="Taklif bo‘yicha ko‘rilgan choralar va rejalarni tushuntiring..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSuggestion(null)}
                  className="px-4 py-2 font-semibold rounded-xl border border-slate-200 text-slate-600"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  Javobni saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quiz Creator Modal */}
      {isQuizModalOpen && (
        <div 
          onClick={() => setIsQuizModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Yangi bilim viktorinasi yaratish
              </h3>
              <button onClick={() => setIsQuizModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleCreateQuizSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Viktorina nomi *</label>
                <input
                  type="text"
                  required
                  value={quizTitle}
                  onChange={e => setQuizTitle(e.target.value)}
                  placeholder="Masalan: Farg‘oniy merosi va astronomiya asoslari"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Fan yo‘nalishi *</label>
                  <input
                    type="text"
                    required
                    value={quizSubject}
                    onChange={e => setQuizSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">G‘olib fakultetga ball *</label>
                  <input
                    type="number"
                    min={5}
                    max={50}
                    value={quizPoints}
                    onChange={e => setQuizPoints(parseInt(e.target.value) || 20)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Qisqacha tavsif</label>
                <textarea
                  rows={2}
                  value={quizDescription}
                  onChange={e => setQuizDescription(e.target.value)}
                  placeholder="Viktorina haqida ma’lumot..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsQuizModalOpen(false)}
                  className="px-4 py-2 font-semibold rounded-xl border border-slate-200 text-slate-600"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  Viktorinani e’lon qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Creator Modal */}
      {isEventModalOpen && (
        <div 
          onClick={() => setIsEventModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Yangi maktab tadbiri e’lon qilish
              </h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleCreateEventSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tadbir nomi *</label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={e => setEventTitle(e.target.value)}
                  placeholder="Masalan: Fakultetlararo stol tennisi kubogi"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Sana *</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Vaqt *</label>
                  <input
                    type="time"
                    required
                    value={eventTime}
                    onChange={e => setEventTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Manzil / Xona *</label>
                  <input
                    type="text"
                    required
                    value={eventLocation}
                    onChange={e => setEventLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Toifa *</label>
                  <select
                    value={eventCategory}
                    onChange={e => setEventCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="viktorina">Zakovat / Viktorina</option>
                    <option value="sport">Sport musobaqasi</option>
                    <option value="ijod">Ijodiy kecha</option>
                    <option value="akademik">Ilmiy anjuman</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">G‘olib fakultet mukofoti</label>
                <input
                  type="text"
                  value={eventPoints}
                  onChange={e => setEventPoints(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 font-semibold rounded-xl border border-slate-200 text-slate-600"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  Tadbirni e’lon qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
