import React, { useState } from 'react';
import { X, Award, ShoppingBag, PlusCircle, MinusCircle, CheckCircle, Shield, Zap, Gauge, Flame, Calculator, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function VehicleDetailModal({ vehicle, onClose, onPurchase, onRestock, onOpenEMI, currentRole }) {
  const [purchaseQty, setPurchaseQty] = useState(1);
  const [activeTab, setActiveTab] = useState('exterior'); // 'exterior' | 'interior' | 'gallery'
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isOutOfStock = vehicle.quantity <= 0;

  // Build images array
  const galleryImages = [
    vehicle.imageUrl,
    vehicle.interiorImageUrl || 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    ...(vehicle.gallery || [])
  ].filter(Boolean);

  const activeImageSrc = activeTab === 'interior'
    ? (vehicle.interiorImageUrl || galleryImages[1] || vehicle.imageUrl)
    : galleryImages[activeImageIndex] || vehicle.imageUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-panel-gold rounded-3xl overflow-hidden border border-gold-600/40 shadow-2xl max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-obsidian-950/80 text-slate-300 hover:text-gold-400 border border-gold-600/40 transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Visual Gallery Banner */}
        <div className="md:w-1/2 relative bg-obsidian-900 flex flex-col justify-between overflow-hidden">
          
          <div className="relative flex-1 overflow-hidden min-h-[300px] md:min-h-[420px]">
            <img
              src={activeImageSrc}
              alt={vehicle.model}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
            
            {/* View Switcher Tabs */}
            <div className="absolute top-4 left-4 z-10 flex space-x-2">
              <button
                onClick={() => { setActiveTab('exterior'); setActiveImageIndex(0); }}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border transition-all ${
                  activeTab === 'exterior'
                    ? 'bg-gold-gradient text-obsidian-950 border-gold-400 shadow-gold-glow'
                    : 'bg-obsidian-950/80 text-slate-300 border-gold-600/30'
                }`}
              >
                Exterior View
              </button>
              <button
                onClick={() => { setActiveTab('interior'); }}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border transition-all ${
                  activeTab === 'interior'
                    ? 'bg-gold-gradient text-obsidian-950 border-gold-400 shadow-gold-glow'
                    : 'bg-obsidian-950/80 text-slate-300 border-gold-600/30'
                }`}
              >
                Interior Cabin
              </button>
            </div>

            {/* Title Badge Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 bg-obsidian-950/90 px-3 py-1 rounded-lg border border-gold-600/40">
                {vehicle.category} • {activeTab === 'interior' ? 'Bespoke Cabin' : 'Exterior Design'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-2">{vehicle.make} {vehicle.model}</h2>
              <div className="font-serif text-xl font-bold text-gold-shimmer mt-1">${vehicle.price.toLocaleString()}</div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="p-3 bg-obsidian-950 border-t border-gold-600/20 flex space-x-2 overflow-x-auto no-scrollbar">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setActiveTab(idx === 1 ? 'interior' : 'exterior');
                  }}
                  className={`w-16 h-12 rounded-lg overflow-hidden border transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-gold-400 ring-2 ring-gold-400/40 opacity-100 scale-105'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Details & Specs Panel */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-[620px] space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-gold-400 uppercase font-bold tracking-wider">
                <Award className="w-4 h-4 text-gold-400" />
                <span>Certified Sovereign Inventory</span>
              </div>

              {/* EMI Calculator Shortcut Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenEMI(vehicle);
                }}
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-obsidian-900 border border-gold-600/40 text-gold-400 text-xs font-bold hover:bg-gold-500/20 transition-all"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>EMI Calc</span>
              </button>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed mt-3 font-normal">
              {vehicle.description}
            </p>

            {/* Technical Specifications Matrix */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs text-gold-400 font-bold uppercase tracking-wider">Performance Specs</h4>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-obsidian-900/90 p-3 rounded-xl border border-gold-600/15">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Powertrain / Engine</span>
                  <span className="text-xs font-bold text-slate-100 mt-0.5 block">{vehicle.specs?.engine || '6.5L Quad-Turbo V12'}</span>
                </div>

                <div className="bg-obsidian-900/90 p-3 rounded-xl border border-gold-600/15">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Horsepower Output</span>
                  <span className="text-xs font-bold text-gold-400 mt-0.5 block">{vehicle.specs?.horsepower || 850} HP</span>
                </div>

                <div className="bg-obsidian-900/90 p-3 rounded-xl border border-gold-600/15">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Top Velocity</span>
                  <span className="text-xs font-bold text-slate-100 mt-0.5 block">{vehicle.specs?.topSpeed || '215 mph'}</span>
                </div>

                <div className="bg-obsidian-900/90 p-3 rounded-xl border border-gold-600/15">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">0 - 60 MPH</span>
                  <span className="text-xs font-bold text-slate-100 mt-0.5 block">{vehicle.specs?.acceleration || '2.4s'}</span>
                </div>
              </div>
            </div>

            {/* Interior & Cabin Specs */}
            <div className="mt-4 p-3 bg-obsidian-900/70 rounded-xl border border-gold-600/15 space-y-1">
              <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider block">Cabin & Interior Finish</span>
              <p className="text-xs text-slate-200 font-medium">{vehicle.specs?.interiorMaterial || 'Italian Aniline Leather & Forged Carbon'}</p>
              <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                <span>Capacity: {vehicle.specs?.seatingCapacity || 2} Seats</span>
                <span>Transmission: {vehicle.specs?.transmission || '7-Speed Dual-Clutch'}</span>
              </div>
            </div>

            {/* Inventory Vault Status */}
            <div className="mt-4 p-3 rounded-xl bg-obsidian-900/90 border border-gold-600/30 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block font-semibold text-[10px]">Available Units:</span>
                <span className={`font-bold ${vehicle.quantity > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {vehicle.quantity > 0 ? `${vehicle.quantity} Units Reserved in Vault` : '0 Units Available (Sold Out)'}
                </span>
              </div>

              {currentRole === 'admin' && (
                <button
                  onClick={() => onRestock(vehicle, 5)}
                  className="px-3 py-1 bg-gold-500/20 text-gold-400 hover:bg-gold-500/30 border border-gold-500/40 rounded-lg text-xs font-bold transition-colors"
                >
                  Restock +5
                </button>
              )}
            </div>
          </div>

          {/* Quantity & Purchase Action */}
          <div className="pt-3 border-t border-gold-600/20">
            {isOutOfStock ? (
              <div className="p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-center text-xs text-red-400 font-bold">
                This vehicle is currently out of stock. Contact concierge for custom order placement.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-semibold">Select Quantity:</span>
                  <div className="flex items-center space-x-3 bg-obsidian-900 border border-gold-600/40 px-3 py-1 rounded-xl">
                    <button
                      onClick={() => setPurchaseQty(Math.max(1, purchaseQty - 1))}
                      className="text-slate-400 hover:text-gold-400 transition-colors"
                    >
                      <MinusCircle className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-white w-5 text-center">{purchaseQty}</span>
                    <button
                      onClick={() => setPurchaseQty(Math.min(vehicle.quantity, purchaseQty + 1))}
                      className="text-slate-400 hover:text-gold-400 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onPurchase(vehicle, purchaseQty);
                    onClose();
                  }}
                  className="w-full py-3.5 bg-gold-gradient text-obsidian-950 font-extrabold rounded-xl text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Confirm Reserve & Purchase (${(vehicle.price * purchaseQty).toLocaleString()})</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
