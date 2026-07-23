import React from 'react';
import { Search, Gauge, Zap, Flame, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero({ searchQuery, setSearchQuery, totalVehicles, onExploreClick }) {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 border-b border-gold-600/10">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gold-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-gold-400" />
              <span>2026 Sovereign Hypercar Collection</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              PURE AUTOMOTIVE <br />
              <span className="text-gold-gradient">OPULENCE & POWER</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Experience handcrafted engineering perfection. From quad-turbo hypercars to whisper-quiet electric luxury sedans, discover our bespoke inventory reserved for distinguished connoisseurs.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="glass-panel p-3.5 rounded-xl border border-gold-600/20">
                <div className="flex items-center space-x-2 text-gold-400 mb-1">
                  <Gauge className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Peak Performance</span>
                </div>
                <div className="text-xl font-bold text-white font-serif">1,234 HP</div>
              </div>

              <div className="glass-panel p-3.5 rounded-xl border border-gold-600/20">
                <div className="flex items-center space-x-2 text-gold-400 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Acceleration</span>
                </div>
                <div className="text-xl font-bold text-white font-serif">0-60 in 1.89s</div>
              </div>

              <div className="glass-panel p-3.5 rounded-xl border border-gold-600/20">
                <div className="flex items-center space-x-2 text-gold-400 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Stock</span>
                </div>
                <div className="text-xl font-bold text-gold-400 font-serif">{totalVehicles} Available</div>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="pt-4">
              <div className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gold-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Make, Model, V12, Electric, Supercar..."
                  className="w-full pl-12 pr-28 py-3.5 bg-obsidian-900/90 border border-gold-600/30 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm"
                />
                <button
                  onClick={onExploreClick}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-gold-gradient text-obsidian-950 rounded-lg text-xs font-bold hover:brightness-110 transition-all flex items-center space-x-1"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Vehicle Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden glass-panel-gold p-2 group">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
                  alt="Aura Monarch Gold Edition"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
                
                {/* Hero Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 bg-obsidian-950/80 px-2 py-1 rounded border border-gold-600/30">
                      FLAGSHIP VEHICLE
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mt-1">Aura Monarch Gold Edition</h3>
                    <p className="text-xs text-slate-300">Handcrafted Hybrid V12 • 1,150 HP</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Starting At</span>
                    <div className="font-serif text-lg font-bold text-gold-gradient">$3,200,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
