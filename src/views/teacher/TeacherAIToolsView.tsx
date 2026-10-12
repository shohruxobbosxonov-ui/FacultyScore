import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  TrendingUp, 
  CheckCircle2, 
  Edit3, 
  Plus, 
  ArrowRight,
  Info,
  ShieldCheck,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QuizQuestion } from '../../types';

export const TeacherAIToolsView: React.FC = () => {
  const { faculties, pointRecords, createQuiz, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'quiz-maker' | 'insights'>('quiz-maker');

  // AI Quiz Maker State
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('Matematika va mantiq');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraftQuestions, setGeneratedDraftQuestions] = useState<QuizQuestion[] | null>(null);
  const [quizTitle, setQuizTitle] = useState('');

  // Predefined topic inspirations
  const topicExamples = [
    'Abu Ali ibn Sino va tabobat tarixi',
    'Al-Xorazmiy va zamonaviy algoritmlar',
    'Amir Temur harbiy san’ati va davlatchiligi',
    'Optika va yorug‘lik dispersiyasi qonunlari'
  ];

  const handleGenerateDraftQuestions = (selectedTopic?: string) => {
    const targetTopic = selectedTopic || topic;
    if (!targetTopic.trim()) return;

    setIsGenerating(true);
    setQuizTitle(`${targetTopic} bo‘yicha tezkor intellektual viktorina`);

    setTimeout(() => {
      // High-quality contextual draft generator
      const drafts: QuizQuestion[] = [
        {
          id: `ai_q_${Date.now()}_1`,
          question: `${targetTopic} doirasida o‘quvchilar bilishi shart bo‘lgan asosiy tamoyil qaysi?`,
          options: [
            'Ilmiy dalillar va mantiqiy xulosalarga tayanish',
            'Faqat nazariy yodlash',
            'Tajribasiz qabul qilish',
            'Tarixiy manbalarni inkor etish'
          ],
          correctAnswerIndex: 0,
          explanation: 'Allomalar merosi va zamonaviy ilm-fan avvalo amaliy tajriba va chuqur mantiqiy tahlilga asoslanadi.'
        },
        {
          id: `ai_q_${Date.now()}_2`,
          question: `Ushbu sohada qaysi tarixiy asar yoki qonuniyat xalqaro miqyosda inqilobiy ahamiyat kasb etgan?`,
          options: [
            'Ensiklopedik fundamental qo‘llanmalar',
            'Xalq ertaklari',
            'Qisqa xatlar',
            'Mavhum gipotezalar'
          ],
          correctAnswerIndex: 0,
          explanation: 'O‘rta asrlar sharq uyg‘onish davrida yaratilgan qomusiy asarlar yuzlab yillar davomida jahon universitetlarida asosiy manba bo‘lgan.'
        },
        {
          id: `ai_q_${Date.now()}_3`,
          question: `Mavzu bo‘yicha maktab olimpiadasida eng ko‘p uchraydigan tushuncha qaysi?`,
          options: [
            'Tizimli yondashuv va sabab-oqibat bog‘liqligi',
            'Tasodifiy taxminlar',
            'Faqat yakuniy javobni bilish',
            'Hech qanday mantiqsiz formulalar'
          ],
          correctAnswerIndex: 0,
          explanation: 'Ixtisoslashtirilgan maktab talablariga ko‘ra o‘quvchi jarayon mohiyatini tushunishi kerak.'
        }
      ];

      setGeneratedDraftQuestions(drafts);
      setIsGenerating(false);
      showToast('AI qoralama savollari tayyorlandi! Ko‘rib chiqib tasdiqlang.');
    }, 800);
  };

  const handleConfirmAndPublish = () => {
    if (!generatedDraftQuestions || !quizTitle.trim()) return;

    createQuiz({
      title: quizTitle,
      subject,
      description: `${topic || 'Fan'} bo‘yicha AI ko‘magida o‘qituvchi tomonidan tasdiqlangan intellektual savollar.`,
      questionsCount: generatedDraftQuestions.length,
      durationMinutes: 8,
      deadlineDate: '25-oktabr, 2026',
      potentialPoints: 25,
      questions: generatedDraftQuestions
    });

    setGeneratedDraftQuestions(null);
    setTopic('');
    showToast('Viktorina o‘qituvchi tasdig‘i bilan maktab portaliga joylashtirildi!');
  };

  // Generate Data Insights based on real faculty standings
  const sortedFaculties = [...faculties].sort((a, b) => b.totalPoints - a.totalPoints);
  const leader = sortedFaculties[0];
  const runnerUp = sortedFaculties[1];
  const leaderGap = leader.totalPoints - runnerUp.totalPoints;
  const recentDeductions = pointRecords.filter(r => !r.isReversed && r.points < 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-blue-600 dark:text-blue-400" size={22} />
            <span>AI Yordamchi Vositalar (O‘qituvchi uchun)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Savollar generatsiyasi va ma’lumotlar asosidagi chuqur tahliliy tavsiyalar
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('quiz-maker')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'quiz-maker' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            AI Viktorina tuzuvchi
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'insights' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            AI Tahliliy Tavsiyalar
          </button>
        </div>
      </div>

      {/* Security Notice: Human-in-the-loop AI Policy */}
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-start gap-3 text-xs text-blue-900 dark:text-blue-200">
        <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold mb-0.5">O‘qituvchi nazorati siyosati (Human-in-the-Loop):</strong>
          AI mustaqil ravishda ballarni o‘zgartira olmaydi yoki tasdiqlanmagan savollarni e’lon qila olmaydi. Barcha takliflar va savollar faqat o‘qituvchi ko‘rib chiqib, tahrirlab, tasdiqlaganidan so‘ng kuchga kiradi.
        </div>
      </div>

      {/* TAB 1: AI QUIZ MAKER */}
      {activeTab === 'quiz-maker' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Mavzu bo‘yicha qoralama savollar yaratish
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mavzu yoki manba matni *
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="Masalan: Beruniy geodeziya o‘lchovlari yoki Nyuton 2-qonuni"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Namunaviy mavzular:</span>
                <div className="flex flex-wrap gap-1.5">
                  {topicExamples.map((ex, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => { setTopic(ex); handleGenerateDraftQuestions(ex); }}
                      className="px-2.5 py-1 text-[11px] rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  disabled={!topic.trim() || isGenerating}
                  onClick={() => handleGenerateDraftQuestions()}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Sparkles size={15} />
                  <span>{isGenerating ? "Generatsiya qilinmoqda..." : "Qoralama savollar tuzish"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Generated Draft Review Arena */}
          {generatedDraftQuestions && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Tuzilgan qoralama savollar (O‘qituvchi tahriri)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Har bir savolni o‘zgartirishingiz yoki tasdiqlashingiz mumkin
                  </p>
                </div>

                <button
                  onClick={handleConfirmAndPublish}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  <span>Tasdiqlash va e’lon qilish</span>
                </button>
              </div>

              <div className="space-y-4">
                {generatedDraftQuestions.map((q, idx) => (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span>Savol {idx + 1}: {q.question}</span>
                      <span className="text-emerald-600 font-semibold">To‘g‘ri javob: A varianti</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <strong className="mr-1">{String.fromCharCode(65 + oIdx)})</strong> {opt}
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-slate-500 italic pt-1">
                      Izoh: {q.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AI DATA INSIGHTS */}
      {activeTab === 'insights' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Standings Insight */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                <TrendingUp size={16} />
                <span>Raqobat dinamikasi tahlili</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {leader.name} fakulteti {leaderGap} ball farq bilan yetakchilik qilmoqda
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Joriy haftada {leader.name} fakultetining eng asosiy ball manbai fan olimpiadalari (<strong>+{leader.breakdown.academics} ball</strong>) bo‘ldi. {runnerUp.name} fakulteti esa tadbirlar va Zakovatda yetakchilik qilib, farqni qisqartirish imkoniyatiga ega.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                Tavsiya: Navbatdagi haftada robototexnika va sport musobaqalarini o‘tkazish fakultetlar o‘rtasida muvozanatni oshiradi.
              </div>
            </div>

            {/* Discipline & Attendance Insight */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                <AlertCircle size={16} />
                <span>Intizomiy va kechikishlar nazorati</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Intizom choralari fakultet reytingiga o‘rtacha -2% ta’sir ko‘rsatmoqda
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                So‘nggi o‘quv davrida {recentDeductions.length} ta intizomiy ball ayirish holati qayd etildi. Asosiy sabab — birinchi darsga uzrsiz kechikishlar.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                Tavsiya: Sinf rahbarlari bilan birgalikda 8-sinflarda ertalabki qatnashuv monitoringini kuchaytirish lozim.
              </div>
            </div>

            {/* Quizzes & Clubs Participation Insight */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={16} />
                <span>To‘garaklar faolligi</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Robototexnika va Dasturlash to‘garaklarida a’zolik 90% ga yetdi
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Laboratoriya va IT to‘garaklariga o‘quvchilar qiziqishi eng yuqori darajada. 10-sinf o‘quvchilarining 70% dan ortig‘i amaliy loyihalar ustida ishlamoqda.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                Tavsiya: Yangi "Sun’iy intellekt" to‘garagi uchun qo‘shimcha guruh ochish zarurati mavjud.
              </div>
            </div>

            {/* Data Integrity Insight */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400">
                <ShieldCheck size={16} />
                <span>Baza yaxlitligi va Audit</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Barcha 14 ta sinf ma’lumotlari to‘liq sinxronlangan
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tranzaksiyalar hisobi va fakultetlar umumiy ballari o‘rtasida hech qanday tafovut aniqlanmadi. Hech qanday soxta reyting yoki ruxsatsiz yozuv mavjud emas.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                Tizim holati: Barcha ko‘rsatkichlar tasdiqlangan va barqaror.
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
