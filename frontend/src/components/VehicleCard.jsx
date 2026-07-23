import React from 'react';
import { Gauge, Zap, ShoppingBag, Edit3, Trash2, PlusCircle, CheckCircle, AlertTriangle, Eye } from 'lucide-react';

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
    <div className="glass-panel rounded-2xl overflow-hidden border border-gold-600/20 hover:border-gold-500/50 hover:shadow-gold-glow transition-all duration-500 flex flex-col group relative">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-900 cursor-pointer" onClick={() => onViewDetails(vehicle)}>
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-obsidian-950/80 backdrop-blur-md border border-gold-600/30 text-gold-400">
            {vehicle.category}
          </span>

          <span
            className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider backdrop-blur-md border flex items-center space-x-1 ${
              isOutOfStock
                ? 'bg-red-950/80 border-red-500/40 text-red-400'
                : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
            }`}
          >
            {isOutOfStock ? (
              <>
                <AlertTriangle className="w-3 h-3" />
                <span>Out of Stock</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3" />
                <span>{vehicle.quantity} Available</span>
              </>
            )}
          </span>
        </div>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-obsidian-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs shadow-gold-glow">
            <Eye className="w-4 h-4" />
            <span>View Specifications</span>
          </span>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gold-400 uppercase tracking-widest font-semibold">{vehicle.make}</span>
            <span className="text-xs text-slate-400">{vehicle.year}</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-gradient transition-colors line-clamp-1">
            {vehicle.model}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {vehicle.description}
          </p>
        </div>

        {/* Specs Pill Grid */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-gold-600/10">
          <div className="text-center p-1.5 bg-obsidian-900/60 rounded-lg">
            <div className="text-[10px] text-slate-400 flex items-center justify-center space-x-1">
              <Zap className="w-3 h-3 text-gold-400" />
              <span>Power</span>
            </div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">{vehicle.specs?.horsepower || 750} HP</div>
          </div>

          <div className="text-center p-1.5 bg-obsidian-900/60 rounded-lg">
            <div className="text-[10px] text-slate-400 flex items-center justify-center space-x-1">
              <Gauge className="w-3 h-3 text-gold-400" />
              <span>Top Speed</span>
            </div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">{vehicle.specs?.topSpeed || '200 mph'}</div>
          </div>

          <div className="text-center p-1.5 bg-obsidian-900/60 rounded-lg">
            <div className="text-[10px] text-slate-400 flex items-center justify-center space-x-1">
              <span className="text-gold-400 text-[10px] font-bold">0-60</span>
            </div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">{vehicle.specs?.acceleration || '2.8s'}</div>
          </div>
        </div>

        {/* Price & Purchase Action */}
        <div className="pt-1 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Investment</span>
            <div className="font-serif text-lg font-bold text-gold-gradient">
              ${vehicle.price.toLocaleString()}
            </div>
          </div>

          <button
            onClick={() => onPurchase(vehicle)}
            disabled={isOutOfStock}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gold-gradient hover:brightness-110 text-obsidian-950 shadow-gold-glow hover:scale-102'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Purchase'}</span>
          </button>
        </div>

        {/* Admin Control Bar */}
        {currentRole === 'admin' && (
          <div className="pt-2 border-t border-gold-600/20 flex items-center justify-between bg-obsidian-900/40 p-2 rounded-xl text-xs">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider">Admin Controls</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onRestock(vehicle, 1)}
                title="Restock +1"
                className="flex items-center space-x-1 px-2 py-1 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 rounded border border-amber-500/40 transition-colors"
              >
                <PlusCircle className="w-3 h-3" />
                <span>+1 Stock</span>
              </button>
              <button
                onClick={() => onEdit(vehicle)}
                title="Edit Vehicle"
                className="p-1.5 text-slate-300 hover:text-gold-400 bg-obsidian-800 rounded hover:bg-obsidian-750 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(vehicle.id)}
                title="Delete Vehicle"
                className="p-1.5 text-slate-300 hover:text-red-400 bg-obsidian-800 rounded hover:bg-obsidian-750 transition-colors"
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
