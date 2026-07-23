import React, { useState } from 'react';
import { X, Save, PlusCircle, ShieldAlert } from 'lucide-react';

export default function AdminVehicleModal({ vehicle, onClose, onSave }) {
  const isEditing = Boolean(vehicle);

  const [formData, setFormData] = useState({
    make: vehicle?.make || '',
    model: vehicle?.model || '',
    category: vehicle?.category || 'Hypercar',
    price: vehicle?.price || 500000,
    quantity: vehicle?.quantity || 3,
    year: vehicle?.year || 2026,
    imageUrl: vehicle?.imageUrl || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    description: vehicle?.description || '',
    horsepower: vehicle?.specs?.horsepower || 800,
    topSpeed: vehicle?.specs?.topSpeed || '210 mph',
    acceleration: vehicle?.specs?.acceleration || '2.5s',
    engine: vehicle?.specs?.engine || '4.0L Quad-Turbo V8'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      make: formData.make,
      model: formData.model,
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      year: Number(formData.year),
      imageUrl: formData.imageUrl,
      description: formData.description,
      specs: {
        horsepower: Number(formData.horsepower),
        topSpeed: formData.topSpeed,
        acceleration: formData.acceleration,
        engine: formData.engine
      }
    };

    onSave(payload, vehicle?.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-600/30 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-obsidian-900 text-slate-300 hover:text-gold-400 border border-gold-600/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-xs text-gold-400 uppercase font-bold tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4 text-gold-400" />
          <span>Admin Inventory Portal</span>
        </div>

        <h2 className="font-serif text-2xl font-bold text-white mb-6">
          {isEditing ? `Edit Vehicle: ${vehicle.make} ${vehicle.model}` : 'Add New Luxury Vehicle'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Make / Brand *</label>
              <input
                type="text"
                required
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                placeholder="e.g. Aura, Bugatti, Rolls-Royce"
                className="w-full px-3 py-2 bg-obsidian-900 border border-gold-600/30 rounded-xl text-slate-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Model Name *</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="e.g. Sovereign V12 Edition"
                className="w-full px-3 py-2 bg-obsidian-900 border border-gold-600/30 rounded-xl text-slate-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-obsidian-900 border border-gold-600/30 rounded-xl text-slate-100 text-xs focus:border-gold-500 focus:outline-none"
              >
                <option value="Hypercar">Hypercar</option>
                <option value="Supercar">Supercar</option>
                <option value="Luxury Sedan">Luxury Sedan</option>
                <option value="Electric">Electric</option>
                <option value="SUV">SUV</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Price ($ USD) *</label>
              <input
                type="number"
                required
                min="10000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 bg-obsidian-900 border border-gold-600/30 rounded-xl text-slate-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Initial Stock Quantity *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 bg-obsidian-900 border border-gold-600/30 rounded-xl text-slate-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 bg-obsidian-900 border border-gold-600/30 rounded-xl text-slate-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">Vehicle Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Bespoke luxury features, chassis design, interior finishes..."
              className="w-full px-3 py-2 bg-obsidian-900 border border-gold-600/30 rounded-xl text-slate-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          {/* Specs Sub-Form */}
          <div className="p-4 bg-obsidian-900/60 rounded-2xl border border-gold-600/20 space-y-3">
            <span className="text-xs text-gold-400 font-bold uppercase tracking-wider block">Performance Specifications</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block">Horsepower (HP)</label>
                <input
                  type="number"
                  value={formData.horsepower}
                  onChange={(e) => setFormData({ ...formData, horsepower: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-obsidian-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">Top Speed</label>
                <input
                  type="text"
                  value={formData.topSpeed}
                  onChange={(e) => setFormData({ ...formData, topSpeed: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-obsidian-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">Acceleration (0-60)</label>
                <input
                  type="text"
                  value={formData.acceleration}
                  onChange={(e) => setFormData({ ...formData, acceleration: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-obsidian-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">Engine Type</label>
                <input
                  type="text"
                  value={formData.engine}
                  onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-obsidian-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-obsidian-900 hover:bg-obsidian-800 text-slate-300 text-xs font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gold-gradient text-obsidian-950 font-bold text-xs rounded-xl shadow-gold-glow hover:brightness-110 flex items-center space-x-1.5"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
              <span>{isEditing ? 'Save Changes' : 'Add Vehicle to Inventory'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
