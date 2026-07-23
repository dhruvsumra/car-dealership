import React from 'react';
import { Shield, Crown, User as UserIcon, LogOut, Key, Car, Sparkles, PlusCircle } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onLogout, onOpenAdminAdd, currentRole, onToggleRoleDemo }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gold-600/20 bg-obsidian-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-gold-gradient p-[1px] shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-obsidian-950 rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="font-serif text-2xl tracking-widest text-gold-gradient font-bold uppercase">AURA</span>
            <span className="text-xs tracking-[0.3em] block text-slate-400 uppercase font-semibold">MOTORS • LUXURY</span>
          </div>
        </div>

        {/* Center Banner / Quick Role Switcher */}
        <div className="hidden md:flex items-center space-x-3 bg-obsidian-900/80 border border-gold-600/20 rounded-full px-4 py-1.5 shadow-inner">
          <span className="text-xs text-slate-400 font-medium">Demo Role Mode:</span>
          <button
            onClick={onToggleRoleDemo}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
              currentRole === 'admin'
                ? 'bg-gold-gradient text-obsidian-950 shadow-gold-glow'
                : 'bg-obsidian-700 text-slate-300 hover:text-gold-400'
            }`}
          >
            {currentRole === 'admin' ? <Shield className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
            <span className="capitalize">{currentRole === 'admin' ? 'Admin Mode' : 'VIP User'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {currentRole === 'admin' && (
            <button
              onClick={onOpenAdminAdd}
              className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-gold-600 text-obsidian-950 px-4 py-2 rounded-lg font-semibold text-sm hover:brightness-110 shadow-gold-glow transition-all duration-300"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          )}

          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-obsidian-900 border border-gold-600/30 px-3 py-1.5 rounded-lg">
                {user.role === 'admin' ? (
                  <Crown className="w-4 h-4 text-gold-400" />
                ) : (
                  <UserIcon className="w-4 h-4 text-gold-400" />
                )}
                <span className="text-sm text-slate-200 font-medium">{user.name}</span>
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${user.role === 'admin' ? 'bg-gold-500/20 text-gold-400' : 'bg-slate-700 text-slate-300'}`}>
                  {user.role}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Logout"
                className="p-2 text-slate-400 hover:text-red-400 bg-obsidian-900 hover:bg-obsidian-800 border border-slate-800 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-2 bg-obsidian-900 hover:bg-obsidian-850 border border-gold-600/40 text-gold-400 px-4 py-2 rounded-lg font-medium text-sm hover:border-gold-500 hover:shadow-gold-glow transition-all duration-300"
            >
              <Key className="w-4 h-4" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
