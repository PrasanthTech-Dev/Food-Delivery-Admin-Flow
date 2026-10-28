import React, { useState } from 'react';
import Modal from '../../common/Modal';
import { UtensilsCrossed, Plus, CheckCircle2 } from 'lucide-react';

export default function AddRestaurantModal({
  isOpen,
  onClose,
  onAddRestaurant,
}) {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    owner: '',
    email: '',
    phone: '',
    address: '',
    operatingHours: '10:00 AM - 11:00 PM',
    commissionRate: 18,
    deliveryRadiusKm: 8,
    categories: 'Burgers, Mains, Drinks',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.owner) return;

    const newRest = {
      id: `REST-00${Math.floor(Math.random() * 900) + 100}`,
      name: formData.name,
      cuisine: formData.cuisine,
      image: formData.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      owner: formData.owner,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      rating: 5.0,
      reviewsCount: 1,
      totalRevenue: '$0.00',
      commissionRate: Number(formData.commissionRate),
      status: 'Approved',
      isOpen: true,
      operatingHours: formData.operatingHours,
      documents: { fssai: 'VERIFIED', taxCertificate: 'VERIFIED', hygieneScore: 'A' },
      deliveryRadiusKm: Number(formData.deliveryRadiusKm),
      menuCount: 4,
      categories: formData.categories.split(',').map(c => c.trim()),
    };

    onAddRestaurant(newRest);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Onboard New Restaurant Partner"
      subtitle="Register restaurant profile, food categories, and contract commission"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Establishment Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Kyoto Artisan Sushi"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Cuisine / Food Concept</label>
            <input
              type="text"
              required
              placeholder="e.g. Japanese & Nigiri"
              value={formData.cuisine}
              onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Owner / Head Chef</label>
            <input
              type="text"
              required
              placeholder="e.g. Chef Hitoshi"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Owner Email</label>
            <input
              type="email"
              required
              placeholder="chef@kyoto.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number</label>
            <input
              type="text"
              required
              placeholder="+1 (555) 000-1111"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Store Physical Address</label>
          <input
            type="text"
            required
            placeholder="e.g. 505 Pacific Coast Highway, Suite 10"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Commission Rate (%)</label>
            <input
              type="number"
              min="5"
              max="35"
              value={formData.commissionRate}
              onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Delivery Radius (km)</label>
            <input
              type="number"
              step="0.5"
              value={formData.deliveryRadiusKm}
              onChange={(e) => setFormData({ ...formData, deliveryRadiusKm: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Operating Hours</label>
            <input
              type="text"
              value={formData.operatingHours}
              onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Menu Categories (Comma separated)</label>
          <input
            type="text"
            placeholder="Sushi Rolls, Sashimi, Bento, Beverages"
            value={formData.categories}
            onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          />
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
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            Register Partner
          </button>
        </div>
      </form>
    </Modal>
  );
}
