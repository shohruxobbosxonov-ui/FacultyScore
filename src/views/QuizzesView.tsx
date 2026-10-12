import React, { useState } from 'react';
import { 
  HelpCircle, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Play, 
  RotateCcw, 
  AlertCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Quiz, QuizQuestion } from '../types';

export const QuizzesView: React.FC = () => {
  const { quizzes, completeQuiz, currentStudent } = useApp();
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
  };

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    setIsQuizSubmitted(true);

    // Calculate score
    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    const pointsEarned = Math.round((correctCount / activeQuiz.questions.length) * activeQuiz.potentialPoints);
    completeQuiz(activeQuiz.id, pointsEarned);
  };

  const closeQuizModal = () => {
    setActiveQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Bilim viktorinalari (Zakovat maydoni)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Testlarni yeching, o‘z bilimingizni mustahkamlang va {currentStudent.facultyId} fakultetiga ballar qo‘shing!
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 px-3 py-1.5 rounded-xl text-blue-700 dark:text-blue-300">
          <Sparkles size={14} />
          <span>Fakultet hisobiga to‘g‘ridan-to‘g‘ri qo‘shiladi</span>
        </div>
      </div>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => {
          const isDone = quiz.isCompleted;

          return (
            <div
              key={quiz.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isDone 
                  ? 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-90' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {quiz.subject}
                  </span>

                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Award size={14} />
                    <span>+{quiz.potentialPoints} ball</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {quiz.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle size={14} />
                    <span>{quiz.questionsCount} ta savol</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{quiz.durationMinutes} daqiqa</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Oxirgi muddat: {quiz.deadlineDate}
                </span>

                {isDone ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      <span>Yakunlangan (+{quiz.userScore} ball)</span>
                    </span>
                    <button
                      onClick={() => startQuiz(quiz)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    >
                      Natijani ko‘rish
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Play size={13} />
                    <span>Viktorinani boshlash</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Quiz Taking Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {activeQuiz.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeQuiz.subject} · {activeQuiz.questions.length} ta savol
                </p>
              </div>

              <button
                onClick={closeQuizModal}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Questions View */}
            {!isQuizSubmitted && !activeQuiz.isCompleted ? (
              <div className="space-y-4">
                
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Savol {currentQuestionIndex + 1} / {activeQuiz.questions.length}</span>
                  <span>Tanlandi: {Object.keys(selectedAnswers).length} / {activeQuiz.questions.length}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%` }}
                  />
                </div>

                {/* Question Text */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {activeQuiz.questions[currentQuestionIndex].question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {activeQuiz.questions[currentQuestionIndex].options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500'
                            : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{option}</span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                          isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {isSelected ? '✓' : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation controls */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Oldingisi
                  </button>

                  {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Keyingisi
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(selectedAnswers).length < activeQuiz.questions.length}
                      className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-xs transition-colors"
                    >
                      Viktorinani yakunlash
                    </button>
                  )}
                </div>

              </div>
            ) : (
              /* Quiz Results and Explanations View */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
                  <CheckCircle2 size={32} className="mx-auto text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Viktorina natijalari
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Siz {activeQuiz.questions.filter((q, i) => selectedAnswers[i] === q.correctAnswerIndex).length} / {activeQuiz.questions.length} ta savolga to‘g‘ri javob berdingiz.
                  </p>
                </div>

                {/* Explanations List */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Savollar tahlili va tushuntirishlar:
                  </h5>
                  {activeQuiz.questions.map((q, idx) => {
                    const userAns = selectedAnswers[idx];
                    const isCorrect = userAns === q.correctAnswerIndex;

                    return (
                      <div key={q.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {idx + 1}. {q.question}
                          </p>
                          {isCorrect ? (
                            <span className="shrink-0 text-emerald-600 font-bold flex items-center gap-1">
                              <CheckCircle2 size={13} /> To‘g‘ri
                            </span>
                          ) : (
                            <span className="shrink-0 text-rose-600 font-bold flex items-center gap-1">
                              <XCircle size={13} /> Xato
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-[11px]">
                          <strong>To‘g‘ri javob:</strong> {q.options[q.correctAnswerIndex]}
                        </p>
                        <p className="text-slate-400 text-[11px] italic bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                          Izoh: {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={closeQuizModal}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  >
                    Yopish
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
