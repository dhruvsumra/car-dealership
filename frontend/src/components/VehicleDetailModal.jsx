import React, { useState } from 'react';
import { X, Award, ShoppingBag, PlusCircle, MinusCircle, CheckCircle, Shield, Zap, Gauge, Flame } from 'lucide-react';

export default function VehicleDetailModal({ vehicle, onClose, onPurchase, onRestock, currentRole }) {
  const [purchaseQty, setPurchaseQty] = useState(1);
  const isOutOfStock = vehicle.quantity <= 0;

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

        {/* Left Visual Banner */}
        <div className="md:w-1/2 relative bg-obsidian-900 overflow-hidden">
          <img
            src={vehicle.imageUrl}
            alt={vehicle.model}
            className="w-full h-full object-cover min-h-[280px] md:min-h-[480px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-obsidian-950/90 px-3 py-1 rounded-lg border border-gold-600/40">
              {vehicle.category}
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-white mt-2">{vehicle.make} {vehicle.model}</h2>
            <div className="font-serif text-2xl font-bold text-gold-shimmer mt-1">${vehicle.price.toLocaleString()}</div>
          </div>
        </div>

        {/* Right Details & Specs Panel */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-[620px] space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs text-gold-400 uppercase font-bold tracking-wider">
              <Award className="w-4 h-4 text-gold-400" />
              <span>Certified Sovereign Inventory</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mt-3 font-normal">
              {vehicle.description}
            </p>

            {/* Technical Specifications Matrix */}
            <div className="mt-6 space-y-3">
              <h4 className="text-xs text-gold-400 font-bold uppercase tracking-wider">Technical Specifications</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-obsidian-900/90 p-3.5 rounded-2xl border border-gold-600/15">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Powertrain / Engine</span>
                  <span className="text-xs font-bold text-slate-100 mt-1 block">{vehicle.specs?.engine || '6.5L Quad-Turbo V12'}</span>
                </div>

                <div className="bg-obsidian-900/90 p-3.5 rounded-2xl border border-gold-600/15">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Horsepower Output</span>
                  <span className="text-xs font-bold text-gold-400 mt-1 block">{vehicle.specs?.horsepower || 850} HP</span>
                </div>

                <div className="bg-obsidian-900/90 p-3.5 rounded-2xl border border-gold-600/15">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Top Velocity</span>
                  <span className="text-xs font-bold text-slate-100 mt-1 block">{vehicle.specs?.topSpeed || '215 mph'}</span>
                </div>

                <div className="bg-obsidian-900/90 p-3.5 rounded-2xl border border-gold-600/15">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">0 - 60 MPH</span>
                  <span className="text-xs font-bold text-slate-100 mt-1 block">{vehicle.specs?.acceleration || '2.4s'}</span>
                </div>
              </div>
            </div>

            {/* Inventory Vault Status */}
            <div className="mt-6 p-4 rounded-2xl bg-obsidian-900/90 border border-gold-600/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-semibold">Available Units in Vault:</span>
                <span className={`text-sm font-bold ${vehicle.quantity > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {vehicle.quantity > 0 ? `${vehicle.quantity} Units Reserved in Stock` : '0 Units Available (Sold Out)'}
                </span>
              </div>

              {currentRole === 'admin' && (
                <button
                  onClick={() => onRestock(vehicle, 5)}
                  className="px-3.5 py-2 bg-gold-500/20 text-gold-400 hover:bg-gold-500/30 border border-gold-500/40 rounded-xl text-xs font-bold transition-colors"
                >
                  Restock +5
                </button>
              )}
            </div>
          </div>

          {/* Quantity & Purchase Action */}
          <div className="pt-4 border-t border-gold-600/20">
            {isOutOfStock ? (
              <div className="p-3.5 bg-red-950/50 border border-red-500/40 rounded-2xl text-center text-xs text-red-400 font-bold">
                This vehicle is currently out of stock. Contact concierge for custom order placement.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-200 font-semibold">Select Quantity:</span>
                  <div className="flex items-center space-x-3 bg-obsidian-900 border border-gold-600/40 px-3.5 py-1.5 rounded-xl">
                    <button
                      onClick={() => setPurchaseQty(Math.max(1, purchaseQty - 1))}
                      className="text-slate-400 hover:text-gold-400 transition-colors"
                    >
                      <MinusCircle className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-white w-6 text-center">{purchaseQty}</span>
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
                  className="w-full py-4 bg-gold-gradient text-obsidian-950 font-extrabold rounded-2xl text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center space-x-2"
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
