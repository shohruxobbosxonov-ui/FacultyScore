import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldAlert,
  Info,
  Layers,
  History
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FacultyId, PointCategory, PointRecord, SchoolClassName } from '../../types';
import { ALL_SCHOOL_CLASSES } from '../../data/mockData';

export const TeacherLedgerView: React.FC = () => {
  const { pointRecords, reversePointTransaction, auditLogs, currentStaffUser } = useApp();

  const [activeTab, setActiveTab] = useState<'ledger' | 'audit'>('ledger');
  const [facultyFilter, setFacultyFilter] = useState<'all' | FacultyId>('all');
  const [classFilter, setClassFilter] = useState<'all' | SchoolClassName>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'reversed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Reversal Modal State
  const [selectedRecordForReversal, setSelectedRecordForReversal] = useState<PointRecord | null>(null);
  const [reversalReason, setReversalReason] = useState('');

  // Detail Modal State
  const [detailRecord, setDetailRecord] = useState<PointRecord | null>(null);

  const filteredRecords = pointRecords.filter(rec => {
    if (facultyFilter !== 'all' && rec.facultyId !== facultyFilter) return false;
    if (classFilter !== 'all' && rec.attributedClass !== classFilter) return false;
    if (statusFilter === 'active' && rec.isReversed) return false;
    if (statusFilter === 'reversed' && !rec.isReversed) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCode = rec.transactionCode?.toLowerCase().includes(q);
      const matchReason = rec.reason.toLowerCase().includes(q);
      const matchStudent = rec.attributedStudentName?.toLowerCase().includes(q);
      if (!matchCode && !matchReason && !matchStudent) return false;
    }
    return true;
  });

  const handleExecuteReversal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecordForReversal || !reversalReason.trim()) return;

    reversePointTransaction(selectedRecordForReversal.id, reversalReason.trim());
    setSelectedRecordForReversal(null);
    setReversalReason('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="text-blue-600 dark:text-blue-400" size={22} />
            <span>Tranzaksiyalar reyestri va Audit jurnali</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Barcha ball o‘zgarishlarining to‘liq, o‘zgarmas (immutable) va bekor qilinishi mumkin bo‘lgan yozuvlari
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'ledger' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Tranzaksiyalar ({pointRecords.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'audit' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Audit qaydlari ({auditLogs.length})
          </button>
        </div>
      </div>

      {activeTab === 'ledger' ? (
        <>
          {/* Filters Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Tranzaksiya kodi (TX-2026-...), sabab yoki o‘quvchi..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="all">Barcha holatlar</option>
                <option value="active">Faqat faol yozuvlar</option>
                <option value="reversed">Faqat bekor qilinganlar</option>
              </select>

              <select
                value={classFilter}
                onChange={e => setClassFilter(e.target.value as any)}
                className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="all">Barcha 14 ta sinf</option>
                {ALL_SCHOOL_CLASSES.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Faculty filter tabs */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold mr-1">Fakultet:</span>
              {(['all', 'Blue', 'Green', 'White', 'Red'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFacultyFilter(f)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors border ${
                    facultyFilter === f
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {f === 'all' ? 'Barchasi' : f}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-semibold bg-slate-50/50 dark:bg-slate-800/40">
                    <th className="py-3 px-3">Kod</th>
                    <th className="py-3 px-3">Fakultet & Sinf</th>
                    <th className="py-3 px-3">Sabab va tafsilot</th>
                    <th className="py-3 px-3">O‘quvchi</th>
                    <th className="py-3 px-3">Mas’ul xodim</th>
                    <th className="py-3 px-3">Sana</th>
                    <th className="py-3 px-3 text-right">Ball</th>
                    <th className="py-3 px-3 text-center">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {filteredRecords.map((record) => {
                    const isPositive = record.points > 0;

                    return (
                      <tr 
                        key={record.id}
                        className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                          record.isReversed ? 'bg-rose-50/30 dark:bg-rose-950/10' : ''
                        }`}
                      >
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                          {record.transactionCode || 'TX-2026'}
                        </td>
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 dark:text-white">{record.facultyId}</span>
                            <span className="text-[11px] text-slate-400">({record.attributedClass})</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 max-w-xs">
                          <p className="text-slate-800 dark:text-slate-200 truncate">{record.reason}</p>
                          {record.isReversed && (
                            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold block">
                              Bekor qilingan: "{record.reversalReason}"
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
                          {record.attributedStudentName || '—'}
                        </td>
                        <td className="py-3.5 px-3 whitespace-nowrap text-slate-500">
                          {record.verifiedBy}
                        </td>
                        <td className="py-3.5 px-3 whitespace-nowrap text-slate-400 text-[11px]">
                          {record.date}
                        </td>
                        <td className="py-3.5 px-3 text-right whitespace-nowrap font-mono">
                          <span className={`text-xs font-black ${
                            record.isReversed 
                              ? 'line-through text-slate-400' 
                              : isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                          }`}>
                            {isPositive ? `+${record.points}` : record.points} ball
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setDetailRecord(record)}
                              className="px-2 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-md"
                            >
                              Ko‘rish
                            </button>

                            {!record.isReversed && currentStaffUser.permissions.canReverseTransactions && (
                              <button
                                onClick={() => setSelectedRecordForReversal(record)}
                                className="px-2 py-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-md flex items-center gap-1"
                                title="Tranzaksiyani bekor qilish"
                              >
                                <RotateCcw size={12} />
                                <span>Bekor qilish</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Audit Logs Tab */
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History size={16} className="text-blue-500" />
              <span>Xavfsizlik va Ma’muriy Harakatlar Audit Jurnali</span>
            </h3>
            <span className="text-xs text-slate-400">{auditLogs.length} ta qayd</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {auditLogs.map(log => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.severity === 'critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200' :
                      log.severity === 'warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
                    }`}>
                      {log.action}
                    </span>
                    <strong className="text-slate-900 dark:text-white">{log.target}</strong>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">{log.details}</p>
                  <span className="text-[11px] text-slate-400 font-medium">Bajaruvchi: {log.performedBy}</span>
                </div>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">{log.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reversal Confirmation Modal */}
      {selectedRecordForReversal && (
        <div 
          onClick={() => setSelectedRecordForReversal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400">
              <RotateCcw size={20} />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Tranzaksiyani bekor qilish (Reversal)
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>{selectedRecordForReversal.transactionCode}</strong> tranzaksiyasi bekor qilinadi. Bu amal asl yozuvni o‘chirmaydi, balki audit jurnaliga qaytarish operatsiyasini yozadi va fakultet ballini qayta hisoblaydi.
            </p>

            <form onSubmit={handleExecuteReversal} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Bekor qilish sababi (Majburiy asoslantirish) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reversalReason}
                  onChange={e => setReversalReason(e.target.value)}
                  placeholder="Masalan: Hakamlar bayonnomasidagi hisob xatosi tufayli bekor qilindi"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRecordForReversal(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
                >
                  Reversalni tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction Detail Modal */}
      {detailRecord && (
        <div 
          onClick={() => setDetailRecord(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                {detailRecord.transactionCode}
              </span>
              <button
                onClick={() => setDetailRecord(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <div>
                  <span className="text-slate-400 block">Fakultet:</span>
                  <strong className="text-slate-900 dark:text-white">{detailRecord.facultyId}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Ball miqdori:</span>
                  <strong className={`font-mono ${detailRecord.points > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {detailRecord.points > 0 ? `+${detailRecord.points}` : detailRecord.points} ball
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Tegishli sinf:</span>
                  <strong>{detailRecord.attributedClass}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Bog‘liq o‘quvchi:</span>
                  <strong>{detailRecord.attributedStudentName || 'Jamoaviy'}</strong>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">To‘liq asoslantirish:</span>
                <p className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 leading-relaxed">
                  {detailRecord.reason}
                </p>
              </div>

              {detailRecord.isReversed && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200">
                  <span className="font-bold block">Bekor qilinganligi to‘g‘risida ma’lumot:</span>
                  <span>Sabab: {detailRecord.reversalReason}</span>
                  <span className="block text-[11px] text-rose-500 mt-1">
                    Bekor qildi: {detailRecord.reversedBy} ({detailRecord.reversedAt})
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setDetailRecord(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900"
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
