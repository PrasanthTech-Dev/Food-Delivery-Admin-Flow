import React from 'react';
import Modal from '../common/Modal';
import {
  UtensilsCrossed,
  Tag,
  Bike,
  Radio,
  CreditCard,
  FileText,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export default function QuickActionModal({
  isOpen,
  onClose,
  onSelectAction,
}) {
  const actions = [
    {
      id: 'create_coupon',
      title: 'Create Promo Coupon',
      desc: 'Launch a discount campaign with custom usage limit and code.',
      icon: Tag,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      module: 'promotions'
    },
    {
      id: 'add_restaurant',
      title: 'Onboard Restaurant Partner',
      desc: 'Register a new food establishment, set commission and operating hours.',
      icon: UtensilsCrossed,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      module: 'restaurants'
    },
    {
      id: 'verify_driver',
      title: 'Review Driver Documents',
      desc: 'Verify license and approve pending delivery partners for live fleet.',
      icon: Bike,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      module: 'delivery'
    },
    {
      id: 'batch_payout',
      title: 'Authorize Payout Batch',
      desc: 'Release weekly earnings to restaurants and rider digital wallets.',
      icon: CreditCard,
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      module: 'finance'
    },
    {
      id: 'adjust_surge',
      title: 'Configure Zone Surge Pricing',
      desc: 'Increase rate multipliers in peak rain or high demand zones.',
      icon: Radio,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      module: 'settings'
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Admin Quick Actions"
      subtitle="Execute high-priority operational workflows across the platform"
      maxWidth="max-w-xl"
    >
      <div className="grid grid-cols-1 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => {
                onSelectAction(act.module, act.id);
                onClose();
              }}
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 transition-all text-left group cursor-pointer"
            >
              <div className={`p-3 rounded-xl border ${act.color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {act.title}
                  </h4>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-400 mt-1">{act.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
