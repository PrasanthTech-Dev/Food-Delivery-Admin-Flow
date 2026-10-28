import React, { useState } from 'react';
import Modal from '../../common/Modal';
import Badge from '../../common/Badge';
import {
  CreditCard,
  Building,
  Bike,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  Lock
} from 'lucide-react';

export default function PayoutModal({
  isOpen,
  onClose,
  onAuthorizePayout,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const batchSummary = {
    totalRestaurants: 142,
    restaurantPayout: 184200.00,
    totalRiders: 310,
    riderPayout: 24890.00,
    platformWithholdingTax: 16720.00,
    netDisbursement: 209090.00,
  };

  const handleAuthorize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      onAuthorizePayout();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Authorize Automated Settlement Batch"
      subtitle="Disburse verified earnings to merchant bank accounts & courier digital wallets"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Security Alert */}
        <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-3">
          <Lock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300">
            <p className="font-bold text-white">ACH & Instant Push Gateway Ready</p>
            <p className="mt-0.5 text-slate-400 leading-relaxed">
              Batch TXN-BATCH-2026-W44 contains verified net earnings calculated after deducting platform commission fees and VAT/GST taxes.
            </p>
          </div>
        </div>

        {/* Batch Breakdown */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="flex items-center gap-2 font-medium text-slate-300">
              <Building className="w-4 h-4 text-cyan-400" />
              142 Restaurant Kitchens (ACH Transfer)
            </span>
            <span className="font-mono font-bold text-white">
              ${batchSummary.restaurantPayout.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="flex items-center gap-2 font-medium text-slate-300">
              <Bike className="w-4 h-4 text-emerald-400" />
              310 Active Couriers (Instant Debit)
            </span>
            <span className="font-mono font-bold text-white">
              ${batchSummary.riderPayout.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Statutory Tax Withholding (8% Escrow)</span>
            <span className="font-mono text-slate-300">
              ${batchSummary.platformWithholdingTax.toLocaleString()}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm sm:text-base font-bold text-white">
            <span>Total Net Disbursement</span>
            <span className="font-mono text-emerald-400">
              ${batchSummary.netDisbursement.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Feedback message */}
        {success && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-400 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            Settlement batch authorized and sent to banking gateway!
          </div>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isProcessing || success}
            onClick={handleAuthorize}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <CreditCard className="w-4 h-4" />
            {isProcessing ? 'Processing Disbursement...' : 'Execute Payout Batch'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
