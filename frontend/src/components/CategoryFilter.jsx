import React from 'react';
import { SlidersHorizontal, DollarSign } from 'lucide-react';

const CATEGORIES = ['All', 'Hypercar', 'Supercar', 'Luxury Sedan', 'Electric', 'SUV'];

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  inStockOnly,
  setInStockOnly,
  maxPrice,
  setMaxPrice,
  resetFilters
}) {
  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-gold-600/30 mb-10 space-y-5 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-gold-600/20 pb-5">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <span className="text-xs text-gold-400 font-bold uppercase tracking-wider flex items-center space-x-1.5 mr-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-gold-400" />
            <span>Category:</span>
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-gold-gradient text-obsidian-950 shadow-gold-glow scale-102 font-extrabold'
                    : 'bg-obsidian-900/90 text-slate-300 hover:text-gold-400 hover:bg-obsidian-850 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* In-Stock Toggle & Sort By */}
        <div className="flex items-center space-x-5 shrink-0">
          <label className="flex items-center space-x-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded bg-obsidian-900 border-gold-600/40 text-gold-500 focus:ring-gold-500/30 w-4 h-4"
            />
            <span className="text-xs text-slate-200 font-semibold">In Stock Only</span>
          </label>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-obsidian-900 border border-gold-600/40 text-slate-100 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-gold-500"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="power">Highest Performance (HP)</option>
              <option value="quantity">Available Stock</option>
            </select>
          </div>
        </div>

      </div>

      {/* Price Range Slider */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-xs text-slate-300">
        <div className="flex items-center space-x-4 w-full sm:w-96 bg-obsidian-900/80 p-3 rounded-2xl border border-gold-600/20">
          <DollarSign className="w-4 h-4 text-gold-400 shrink-0" />
          <span className="font-semibold text-slate-300">Max Investment:</span>
          <input
            type="range"
            min="200000"
            max="5000000"
            step="100000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-gold-500 bg-obsidian-950 cursor-pointer"
          />
          <span className="font-serif text-gold-shimmer font-bold text-sm shrink-0">
            ${(maxPrice / 1000000).toFixed(2)}M
          </span>
        </div>

        <button
          onClick={resetFilters}
          className="text-xs text-slate-400 hover:text-gold-400 font-semibold underline underline-offset-4 transition-colors"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
}
