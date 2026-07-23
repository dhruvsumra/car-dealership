import React from 'react';
import { Shield, Crown, User as UserIcon, LogOut, Key, Sparkles, PlusCircle, Calculator } from 'lucide-react';

export default function Navbar({
  user,
  onOpenAuth,
  onLogout,
  onOpenAdminAdd,
  onOpenEMI,
  currentRole,
  onToggleRoleDemo
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gold-600/30 bg-obsidian-950/90 backdrop-blur-2xl shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-11 h-11 rounded-xl bg-gold-gradient p-[1px] shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-obsidian-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-gold-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="font-serif text-2xl tracking-widest text-gold-shimmer font-bold uppercase block leading-none">AURA</span>
            <span className="text-[10px] tracking-[0.35em] text-gold-400/80 uppercase font-semibold block mt-1">MOTORS • LUXURY</span>
          </div>
        </div>

        {/* Center Demo Role Switcher */}
        <div className="hidden md:flex items-center space-x-3 bg-obsidian-900/90 border border-gold-600/30 rounded-full px-4 py-1.5 shadow-gold-glow/10">
          <span className="text-xs text-slate-400 font-medium">Demo Role Mode:</span>
          <button
            onClick={onToggleRoleDemo}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
              currentRole === 'admin'
                ? 'bg-gold-gradient text-obsidian-950 shadow-gold-glow'
                : 'bg-obsidian-800 text-slate-300 hover:text-gold-400 border border-slate-700'
            }`}
          >
            {currentRole === 'admin' ? <Shield className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
            <span className="capitalize">{currentRole === 'admin' ? 'Admin Mode' : 'VIP User'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* EMI Calculator Trigger */}
          <button
            onClick={onOpenEMI}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-obsidian-900 hover:bg-obsidian-850 text-gold-400 border border-gold-600/40 hover:shadow-gold-glow transition-all duration-300"
          >
            <Calculator className="w-4 h-4 text-gold-400" />
            <span className="hidden sm:inline">EMI Calculator</span>
          </button>

          {currentRole === 'admin' && (
            <button
              onClick={onOpenAdminAdd}
              className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600 text-obsidian-950 px-4 py-2 rounded-xl font-bold text-xs hover:brightness-110 shadow-gold-glow transition-all duration-300"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          )}

          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-obsidian-900/90 border border-gold-600/40 px-3.5 py-1.5 rounded-xl shadow-inner">
                {user.role === 'admin' ? (
                  <Crown className="w-4 h-4 text-gold-400" />
                ) : (
                  <UserIcon className="w-4 h-4 text-gold-400" />
                )}
                <span className="text-xs text-slate-100 font-semibold">{user.name}</span>
                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${user.role === 'admin' ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'bg-slate-800 text-slate-300'}`}>
                  {user.role}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Logout"
                className="p-2 text-slate-400 hover:text-red-400 bg-obsidian-900 hover:bg-obsidian-850 border border-slate-800 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-2 bg-obsidian-900 hover:bg-obsidian-850 border border-gold-600/40 text-gold-400 px-4 py-2 rounded-xl font-bold text-xs hover:border-gold-500 hover:shadow-gold-glow transition-all duration-300"
            >
              <Key className="w-4 h-4 text-gold-400" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
