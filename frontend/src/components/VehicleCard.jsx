import React from 'react';
import { Gauge, Zap, ShoppingBag, Edit3, Trash2, PlusCircle, CheckCircle, AlertTriangle, Eye, Flame } from 'lucide-react';

export default function VehicleCard({
  vehicle,
  onViewDetails,
  onPurchase,
  onEdit,
  onRestock,
  onDelete,
  currentRole
}) {
  const isOutOfStock = vehicle.quantity <= 0;

  return (
    <div className="glass-panel rounded-3xl overflow-hidden border border-gold-600/25 glass-panel-hover flex flex-col group relative">
      
      {/* Image Showcase */}
      <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-900 cursor-pointer" onClick={() => onViewDetails(vehicle)}>
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-lg text-[10px] uppercase font-bold tracking-widest bg-obsidian-950/90 backdrop-blur-md border border-gold-600/40 text-gold-400 shadow-md">
            {vehicle.category}
          </span>

          <span
            className={`px-3 py-1 rounded-lg text-[10px] uppercase font-bold tracking-widest backdrop-blur-md border flex items-center space-x-1 shadow-md ${
              isOutOfStock
                ? 'bg-red-950/90 border-red-500/50 text-red-400'
                : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-400'
            }`}
          >
            {isOutOfStock ? (
              <>
                <AlertTriangle className="w-3 h-3" />
                <span>Out of Stock</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>{vehicle.quantity} Available</span>
              </>
            )}
          </span>
        </div>

        {/* Hover Quick Specs Trigger Overlay */}
        <div className="absolute inset-0 bg-obsidian-950/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-gold-gradient text-obsidian-950 font-bold text-xs shadow-gold-glow transform group-hover:scale-105 transition-transform">
            <Eye className="w-4 h-4" />
            <span>View Full Specifications</span>
          </span>
        </div>
      </div>

      {/* Card Content & Specs Matrix */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gold-400 uppercase tracking-widest font-bold">{vehicle.make}</span>
            <span className="text-xs text-slate-400 font-semibold">{vehicle.year}</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold-shimmer transition-colors line-clamp-1 mt-0.5">
            {vehicle.model}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed font-normal">
            {vehicle.description}
          </p>
        </div>

        {/* Detailed Specs Grid Pills */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-gold-600/15">
          <div className="text-center p-2 bg-obsidian-900/70 rounded-xl border border-gold-600/10">
            <div className="text-[9px] text-slate-400 flex items-center justify-center space-x-1 uppercase font-bold tracking-wider">
              <Zap className="w-3 h-3 text-gold-400" />
              <span>Power</span>
            </div>
            <div className="text-xs font-bold text-slate-100 mt-1">{vehicle.specs?.horsepower || 750} HP</div>
          </div>

          <div className="text-center p-2 bg-obsidian-900/70 rounded-xl border border-gold-600/10">
            <div className="text-[9px] text-slate-400 flex items-center justify-center space-x-1 uppercase font-bold tracking-wider">
              <Gauge className="w-3 h-3 text-gold-400" />
              <span>Top Speed</span>
            </div>
            <div className="text-xs font-bold text-slate-100 mt-1">{vehicle.specs?.topSpeed || '200 mph'}</div>
          </div>

          <div className="text-center p-2 bg-obsidian-900/70 rounded-xl border border-gold-600/10">
            <div className="text-[9px] text-slate-400 flex items-center justify-center space-x-1 uppercase font-bold tracking-wider">
              <Flame className="w-3 h-3 text-gold-400" />
              <span>0 - 60</span>
            </div>
            <div className="text-xs font-bold text-slate-100 mt-1">{vehicle.specs?.acceleration || '2.8s'}</div>
          </div>
        </div>

        {/* Pricing & Purchase CTA */}
        <div className="pt-1 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Investment</span>
            <div className="font-serif text-xl font-bold text-gold-shimmer">
              ${vehicle.price.toLocaleString()}
            </div>
          </div>

          <button
            onClick={() => onPurchase(vehicle)}
            disabled={isOutOfStock}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gold-gradient hover:brightness-110 text-obsidian-950 shadow-gold-glow hover:scale-102'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isOutOfStock ? 'Sold Out' : 'Purchase'}</span>
          </button>
        </div>

        {/* Admin Bar */}
        {currentRole === 'admin' && (
          <div className="pt-3 border-t border-gold-600/20 flex items-center justify-between bg-obsidian-900/50 p-2.5 rounded-2xl text-xs">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider">Admin Tools</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onRestock(vehicle, 1)}
                title="Restock +1"
                className="flex items-center space-x-1 px-2.5 py-1 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 rounded-lg border border-amber-500/40 text-xs font-semibold transition-colors"
              >
                <PlusCircle className="w-3 h-3" />
                <span>+1 Stock</span>
              </button>
              <button
                onClick={() => onEdit(vehicle)}
                title="Edit Vehicle"
                className="p-1.5 text-slate-300 hover:text-gold-400 bg-obsidian-800 rounded-lg hover:bg-obsidian-750 border border-slate-700 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(vehicle.id)}
                title="Delete Vehicle"
                className="p-1.5 text-slate-300 hover:text-red-400 bg-obsidian-800 rounded-lg hover:bg-obsidian-750 border border-slate-700 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
