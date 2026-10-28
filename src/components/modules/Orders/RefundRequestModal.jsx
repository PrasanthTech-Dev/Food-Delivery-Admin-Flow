import React, { useState } from 'react';
import Modal from '../../common/Modal';
import { RotateCcw, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export default function RefundRequestModal({
  order,
  isOpen,
  onClose,
  onApproveRefund,
  onRejectRefund,
}) {
  if (!order) return null;

  const [refundAmount, setRefundAmount] = useState(order.refundAmount || order.total);
  const [refundMethod, setRefundMethod] = useState('original');
  const [adminNote, setAdminNote] = useState('Claim verified with merchant. Refund approved as platform goodwill.');

  const handleApprove = () => {
    onApproveRefund(order.id, Number(refundAmount), refundMethod, adminNote);
    onClose();
  };

  const handleReject = () => {
    onRejectRefund(order.id, adminNote);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Process Refund Dispute"
      subtitle={`Order ${order.id} • Customer: ${order.customer.name}`}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        {/* Customer Statement */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Customer's Reported Issue
          </span>
          <p className="text-xs text-slate-200 mt-1 leading-relaxed">
            {order.refundReason || 'Customer reported incorrect item received.'}
          </p>
          <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-xs">
            <span className="text-slate-400">Total Order Paid:</span>
            <span className="font-bold text-white font-mono">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Refund Amount Configuration */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Refund Amount ($ USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">$</span>
            <input
              type="number"
              step="0.01"
              max={order.total}
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-4 py-2 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => setRefundAmount(order.total)}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white"
            >
              100% Full Refund (${order.total.toFixed(2)})
            </button>
            <button
              type="button"
              onClick={() => setRefundAmount((order.total * 0.5).toFixed(2))}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white"
            >
              50% Partial (${(order.total * 0.5).toFixed(2)})
            </button>
          </div>
        </div>

        {/* Refund Destination */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Refund Destination Method
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRefundMethod('original')}
              className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                refundMethod === 'original'
                  ? 'bg-blue-600/20 border-blue-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-bold">Original Gateway</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{order.paymentMethod} (3-5 days)</div>
            </button>
            <button
              type="button"
              onClick={() => setRefundMethod('wallet')}
              className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                refundMethod === 'wallet'
                  ? 'bg-blue-600/20 border-blue-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-bold">BiteFlow Wallet</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Instant credit + $5 bonus</div>
            </button>
          </div>
        </div>

        {/* Admin Notes */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Resolution Notes / Audit Trail
          </label>
          <textarea
            rows="2"
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={handleReject}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <XCircle className="w-4 h-4" />
            Reject Claim
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            Approve & Release ${Number(refundAmount).toFixed(2)}
          </button>
        </div>
      </div>
    </Modal>
  );
}
