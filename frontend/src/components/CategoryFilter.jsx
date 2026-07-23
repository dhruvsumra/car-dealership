import React from 'react';
import { SlidersHorizontal, CheckCircle2, DollarSign } from 'lucide-react';

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
    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-gold-600/20 mb-8 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold-600/10 pb-4">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <span className="text-xs text-gold-400 font-bold uppercase tracking-wider flex items-center space-x-1 mr-2 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-gold-gradient text-obsidian-950 shadow-gold-glow font-bold'
                    : 'bg-obsidian-900 text-slate-300 hover:text-gold-400 hover:bg-obsidian-850 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* In-Stock Toggle & Sort By */}
        <div className="flex items-center space-x-4 shrink-0">
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded bg-obsidian-900 border-gold-600/40 text-gold-500 focus:ring-gold-500/30"
            />
            <span className="text-xs text-slate-300 font-medium">In Stock Only</span>
          </label>

          <div className="flex items-center space-x-1 text-xs text-slate-400">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-obsidian-900 border border-gold-600/30 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-gold-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="power">Highest Power</option>
              <option value="quantity">Stock Quantity</option>
            </select>
          </div>
        </div>

      </div>

      {/* Price Slider Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center space-x-3 w-full sm:w-80">
          <DollarSign className="w-4 h-4 text-gold-400 shrink-0" />
          <span>Max Price:</span>
          <input
            type="range"
            min="200000"
            max="5000000"
            step="100000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-gold-500 bg-obsidian-900 cursor-pointer"
          />
          <span className="font-serif text-gold-400 font-bold shrink-0">
            ${(maxPrice / 1000000).toFixed(2)}M
          </span>
        </div>

        <button
          onClick={resetFilters}
          className="text-xs text-slate-400 hover:text-gold-400 underline underline-offset-4 transition-colors"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
}
