import React, { useState } from 'react';
import Badge from '../../common/Badge';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Building,
  Bike,
  ShieldCheck
} from 'lucide-react';

export default function FinanceOverview({
  transactions,
  onOpenPayoutModal,
  searchQuery = '',
}) {
  const [filterType, setFilterType] = useState('all');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = (localSearch || searchQuery).toLowerCase();

  const filteredTransactions = transactions.filter(t => {
    if (filterType === 'Settlement' && !t.type.includes('Settlement')) return false;
    if (filterType === 'Payout' && !t.type.includes('Payout')) return false;
    if (filterType === 'Customer' && !t.type.includes('Customer')) return false;
    if (filterType === 'Failed' && t.status !== 'Failed') return false;

    if (effectiveSearch) {
      const matchId = t.id.toLowerCase().includes(effectiveSearch);
      const matchParty = t.party.toLowerCase().includes(effectiveSearch);
      const matchGateway = t.gateway.toLowerCase().includes(effectiveSearch);
      return matchId || matchParty || matchGateway;
    }
    return true;
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "TransactionID,Party,Type,Gateway,GrossAmount,PlatformFee,Commission,NetPayable,Status,Timestamp\n"
      + transactions.map(t => `${t.id},"${t.party}","${t.type}","${t.gateway}",${t.grossAmount},${t.platformFee},${t.commissionAmount},${t.netPayable},${t.status},"${t.timestamp}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BiteFlow_Financial_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 6 Financial Metric KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-3.5 border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total GMV</span>
          <p className="text-lg sm:text-xl font-extrabold text-white mt-1 font-mono">$284,590</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+14.8% growth</span>
        </div>
        <div className="glass-card rounded-xl p-3.5 border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Net Platform Take</span>
          <p className="text-lg sm:text-xl font-extrabold text-blue-400 mt-1 font-mono">$51,226</p>
          <span className="text-[10px] text-blue-300 font-semibold">18% avg take-rate</span>
        </div>
        <div className="glass-card rounded-xl p-3.5 border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Restaurant Payouts</span>
          <p className="text-lg sm:text-xl font-extrabold text-cyan-400 mt-1 font-mono">$198,420</p>
          <span className="text-[10px] text-cyan-300 font-semibold">Batch release ready</span>
        </div>
        <div className="glass-card rounded-xl p-3.5 border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Courier Earnings</span>
          <p className="text-lg sm:text-xl font-extrabold text-emerald-400 mt-1 font-mono">$28,450</p>
          <span className="text-[10px] text-emerald-300 font-semibold">Instant debit push</span>
        </div>
        <div className="glass-card rounded-xl p-3.5 border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">GST / Tax Reserve</span>
          <p className="text-lg sm:text-xl font-extrabold text-purple-400 mt-1 font-mono">$22,767</p>
          <span className="text-[10px] text-purple-300 font-semibold">8% statutory escrow</span>
        </div>
        <div className="glass-card rounded-xl p-3.5 border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Refunds Rate</span>
          <p className="text-lg sm:text-xl font-extrabold text-rose-400 mt-1 font-mono">$1,420</p>
          <span className="text-[10px] text-rose-300 font-semibold">0.50% of GMV</span>
        </div>
      </div>

      {/* Action Header & Export Tools */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['all', 'Customer', 'Settlement', 'Payout', 'Failed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterType === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab === 'all' ? 'All Transactions' : tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV Report
            </button>
            <button
              onClick={onOpenPayoutModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              Batch Payouts Engine
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3">Party / Beneficiary</th>
                <th className="py-3 px-3">Transaction Type</th>
                <th className="py-3 px-3">Gateway</th>
                <th className="py-3 px-3">Gross Amount</th>
                <th className="py-3 px-3">Platform Cut</th>
                <th className="py-3 px-3">Net Disbursed</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-blue-400">{tx.id}</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">{tx.timestamp}</span>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-semibold text-white">{tx.party}</p>
                    <span className="text-[10px] text-slate-500 font-mono">{tx.orderId}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-slate-300">{tx.type}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    {tx.gateway}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-white">
                    ${tx.grossAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 font-mono text-blue-400">
                    +${(tx.platformFee + tx.commissionAmount).toFixed(2)}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                    ${tx.netPayable.toFixed(2)}
                  </td>
                  <td className="py-3 px-3">
                    {tx.status === 'Settled' || tx.status === 'Processed' ? (
                      <Badge variant="success">{tx.status}</Badge>
                    ) : tx.status === 'Pending' ? (
                      <Badge variant="warning">{tx.status}</Badge>
                    ) : (
                      <Badge variant="danger">{tx.status}</Badge>
                    )}
                    {tx.failureReason && (
                      <span className="block text-[10px] text-rose-400 mt-0.5 max-w-xs truncate">
                        {tx.failureReason}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
