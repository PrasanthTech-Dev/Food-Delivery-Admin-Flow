import React, { useState } from 'react';
import Modal from '../../common/Modal';
import Badge from '../../common/Badge';
import {
  Plus,
  Utensils,
  CheckCircle2,
  XCircle,
  DollarSign,
  Tag,
  Star,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function MenuManagerModal({
  restaurant,
  menuItems = [],
  isOpen,
  onClose,
  onToggleItemAvailability,
  onAddMenuItem,
}) {
  if (!restaurant) return null;

  const [activeCategory, setActiveCategory] = useState('All');
  const [showAddDish, setShowAddDish] = useState(false);

  // New Dish Form State
  const [newDishName, setNewDishName] = useState('');
  const [newDishCategory, setNewDishCategory] = useState(restaurant.categories[0] || 'Mains');
  const [newDishPrice, setNewDishPrice] = useState('');
  const [newDishIsVeg, setNewDishIsVeg] = useState(false);

  const restaurantItems = menuItems.filter(m => m.restaurantId === restaurant.id);
  const categories = ['All', ...new Set(restaurant.categories || [])];

  const filteredItems = restaurantItems.filter(item => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    return true;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newDishName || !newDishPrice) return;

    onAddMenuItem({
      restaurantId: restaurant.id,
      name: newDishName,
      category: newDishCategory,
      price: parseFloat(newDishPrice),
      discountPrice: null,
      isAvailable: true,
      veg: newDishIsVeg,
      rating: 5.0,
      ordersCount: 0
    });

    setNewDishName('');
    setNewDishPrice('');
    setShowAddDish(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Menu Catalog — ${restaurant.name}`}
      subtitle={`Manage dishes, pricing, dietary indicators, and real-time kitchen availability.`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-5">
        {restaurant.image && (
          <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-800">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white text-sm">{restaurant.name}</span>
                <span className="text-[11px] text-slate-300 ml-2">({restaurant.cuisine})</span>
              </div>
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                {restaurantItems.length} Dishes Listed
              </span>
            </div>
          </div>
        )}

        {/* Category Pill Filters & Add Dish Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddDish(!showAddDish)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {showAddDish ? 'Cancel' : 'Add Dish'}
          </button>
        </div>

        {/* Add Dish Accordion Form */}
        {showAddDish && (
          <form
            onSubmit={handleAddSubmit}
            className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-3 animate-in fade-in duration-200"
          >
            <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Create New Menu Item
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Avocado Toast Deluxe"
                  value={newDishName}
                  onChange={(e) => setNewDishName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Food Category</label>
                <select
                  value={newDishCategory}
                  onChange={(e) => setNewDishCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  {(restaurant.categories || ['Mains', 'Sides', 'Beverages']).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Price ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="14.50"
                  value={newDishPrice}
                  onChange={(e) => setNewDishPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newDishIsVeg}
                  onChange={(e) => setNewDishIsVeg(e.target.checked)}
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span>Vegetarian / Plant-Based Dish</span>
              </label>

              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
              >
                Save to Catalog
              </button>
            </div>
          </form>
        )}

        {/* Dish Items List */}
        <div className="divide-y divide-slate-800/80">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No items listed under this category.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  {/* Veg indicator square */}
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                      item.veg ? 'border-emerald-500' : 'border-rose-500'
                    }`}
                    title={item.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.veg ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white group-hover:text-blue-400 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400 font-mono">
                      <span className="font-bold text-blue-400">${item.price.toFixed(2)}</span>
                      {item.discountPrice && (
                        <span className="line-through text-slate-500 font-normal">
                          ${item.discountPrice.toFixed(2)}
                        </span>
                      )}
                      <span>• ★ {item.rating} ({item.ordersCount} sold)</span>
                    </div>
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-semibold ${
                      item.isAvailable ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {item.isAvailable ? 'In Stock' : 'Sold Out'}
                  </span>
                  <button
                    onClick={() => onToggleItemAvailability(item.id)}
                    className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={item.isAvailable ? 'Mark as Out of Stock' : 'Mark as In Stock'}
                  >
                    {item.isAvailable ? (
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-slate-600" />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}
