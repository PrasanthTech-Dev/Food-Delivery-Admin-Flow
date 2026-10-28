import React, { useState } from 'react';
import Modal from '../../common/Modal';
import { Tag, Plus, CheckCircle2 } from 'lucide-react';

export default function CreateCouponModal({
  isOpen,
  onClose,
  onCreateCoupon,
}) {
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('Percentage');
  const [value, setValue] = useState('25');
  const [minOrderValue, setMinOrderValue] = useState('30.00');
  const [maxDiscount, setMaxDiscount] = useState('15.00');
  const [usageLimit, setUsageLimit] = useState('1500');
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [applicableCategory, setApplicableCategory] = useState('All Categories');
  const [targetTier, setTargetTier] = useState('All Customers');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code) return;

    const newCoupon = {
      id: `CPN-0${Math.floor(Math.random() * 90) + 10}`,
      code: code.toUpperCase().trim(),
      discountType,
      value: Number(value),
      minOrderValue: Number(minOrderValue),
      maxDiscount: Number(maxDiscount),
      usageLimit: Number(usageLimit),
      usedCount: 0,
      startDate: new Date().toISOString().split('T')[0],
      expiryDate,
      status: 'Active',
      applicableCategory,
      targetTier,
    };

    onCreateCoupon(newCoupon);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Discount Voucher / Campaign"
      subtitle="Configure promotion redemption mechanics, cart thresholds, and customer constraints"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Coupon Code</label>
            <input
              type="text"
              required
              placeholder="e.g. TASTY30"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white uppercase focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Discount Type</label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Percentage">Percentage Discount (%)</option>
              <option value="Flat Amount">Flat Dollar Off ($)</option>
              <option value="Free Delivery">Free Delivery Waiver</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Discount Value {discountType === 'Percentage' ? '(%)' : '($)'}
            </label>
            <input
              type="number"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Min Cart Value ($)</label>
            <input
              type="number"
              step="0.01"
              value={minOrderValue}
              onChange={(e) => setMinOrderValue(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Max Cap Discount ($)</label>
            <input
              type="number"
              step="0.01"
              value={maxDiscount}
              onChange={(e) => setMaxDiscount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Total Usage Limit</label>
            <input
              type="number"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Campaign Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Applicable Food Category</label>
            <select
              value={applicableCategory}
              onChange={(e) => setApplicableCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="All Categories">All Categories</option>
              <option value="Burgers & Fast Food">Burgers & Fast Food</option>
              <option value="Italian & Artisan Pizzas">Italian & Artisan Pizzas</option>
              <option value="Asian & Sushi Bowls">Asian & Sushi Bowls</option>
              <option value="Healthy Bowls & Salads">Healthy Bowls & Salads</option>
              <option value="Desserts & Bakeries">Desserts & Bakeries</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Target Customer Tier</label>
            <select
              value={targetTier}
              onChange={(e) => setTargetTier(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="All Customers">All Customers</option>
              <option value="New Users Only">New Users Only</option>
              <option value="Gold & VIP">Gold & VIP Members Only</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
          >
            Publish Campaign
          </button>
        </div>
      </form>
    </Modal>
  );
}
