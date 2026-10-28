import React, { useState } from 'react';
import Modal from '../../common/Modal';
import Badge from '../../common/Badge';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileCheck2,
  ExternalLink
} from 'lucide-react';

export default function VerificationModal({
  rider,
  isOpen,
  onClose,
  onApproveVerification,
  onRejectVerification,
}) {
  if (!rider) return null;

  const [notes, setNotes] = useState('All government issued IDs and background check cleared.');

  const handleApprove = () => {
    onApproveVerification(rider.id, notes);
    onClose();
  };

  const handleReject = () => {
    onRejectVerification(rider.id, notes);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Courier Compliance & Verification"
      subtitle={`Reviewing submitted credentials for ${rider.name} (${rider.id})`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Verification Status Overview */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="font-semibold text-slate-300">Driving License (Class A/B)</span>
            <Badge
              variant={rider.documents?.license === 'VERIFIED' ? 'success' : 'warning'}
              size="xs"
            >
              {rider.documents?.license || 'PENDING'}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="font-semibold text-slate-300">Vehicle Commercial Insurance</span>
            <Badge
              variant={rider.documents?.insurance === 'VERIFIED' ? 'success' : 'warning'}
              size="xs"
            >
              {rider.documents?.insurance || 'PENDING'}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Criminal Background Check (Clearance)</span>
            <Badge
              variant={rider.documents?.bgCheck === 'PASSED' ? 'success' : 'warning'}
              size="xs"
            >
              {rider.documents?.bgCheck || 'PENDING'}
            </Badge>
          </div>
        </div>

        {/* Reviewer Note */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Verification Auditor Notes
          </label>
          <textarea
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={handleReject}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <XCircle className="w-4 h-4" />
            Request Resubmission
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            Approve & Activate Courier
          </button>
        </div>
      </div>
    </Modal>
  );
}
