import React from 'react';
import { Search, Gauge, Zap, Flame, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ searchQuery, setSearchQuery, totalVehicles, onExploreClick }) {
  return (
    <div className="relative overflow-hidden pt-10 pb-16 border-b border-gold-600/20">
      
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-500/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[300px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Copy & Interactive Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider gold-glow-pulse">
              <Flame className="w-4 h-4 text-gold-400" />
              <span>2026 Sovereign Hypercar Collection</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              PURE AUTOMOTIVE <br />
              <span className="text-gold-shimmer">OPULENCE & POWER</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Experience handcrafted engineering perfection. From quad-turbo V12 hypercars to whisper-quiet electric luxury sedans, discover our bespoke inventory reserved for distinguished connoisseurs.
            </p>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="glass-panel p-4 rounded-2xl border border-gold-600/30 hover:border-gold-500/50 transition-all duration-300">
                <div className="flex items-center space-x-2 text-gold-400 mb-1">
                  <Gauge className="w-4 h-4 text-gold-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Peak Power</span>
                </div>
                <div className="text-2xl font-bold text-white font-serif tracking-tight">1,234 HP</div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-gold-600/30 hover:border-gold-500/50 transition-all duration-300">
                <div className="flex items-center space-x-2 text-gold-400 mb-1">
                  <Zap className="w-4 h-4 text-gold-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">0 - 60 MPH</span>
                </div>
                <div className="text-2xl font-bold text-white font-serif tracking-tight">1.89s</div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-gold-600/30 hover:border-gold-500/50 transition-all duration-300">
                <div className="flex items-center space-x-2 text-gold-400 mb-1">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Active Stock</span>
                </div>
                <div className="text-2xl font-bold text-gold-shimmer font-serif tracking-tight">{totalVehicles} Available</div>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="pt-2">
              <div className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gold-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Make, Model, V12, Electric, Supercar..."
                  className="w-full pl-12 pr-32 py-4 bg-obsidian-900/90 border border-gold-600/40 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-xs font-medium shadow-2xl"
                />
                <button
                  onClick={onExploreClick}
                  className="absolute right-2 top-2 bottom-2 px-5 bg-gold-gradient text-obsidian-950 rounded-xl text-xs font-bold hover:brightness-110 transition-all flex items-center space-x-1.5 shadow-gold-glow"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Vehicle Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-panel-gold p-2.5 group">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
                  alt="Aura Monarch Gold Edition"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
                
                {/* Hero Overlay Badges */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="inline-flex items-center space-x-1 text-[10px] uppercase font-bold tracking-widest text-gold-400 bg-obsidian-950/90 px-3 py-1 rounded-lg border border-gold-600/40 backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-gold-400" />
                      <span>FLAGSHIP VEHICLE</span>
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-1">Aura Monarch Gold Edition</h3>
                    <p className="text-xs text-slate-300 font-medium">Handcrafted Hybrid V12 • 1,150 HP</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Starting At</span>
                    <div className="font-serif text-xl font-bold text-gold-shimmer">$3,200,000</div>
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
