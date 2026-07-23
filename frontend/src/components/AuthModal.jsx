import React, { useState } from 'react';
import { X, Key, Shield, User as UserIcon, Lock, Mail, Sparkles } from 'lucide-react';

export default function AuthModal({ onClose, onLogin, onRegister }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 'login') {
        await onLogin(email, password);
      } else {
        await onRegister(name, email, password, role);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (roleType) => {
    if (roleType === 'admin') {
      setEmail('admin@auramotors.com');
      setPassword('admin123');
    } else {
      setEmail('user@auramotors.com');
      setPassword('user123');
    }
    setTab('login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-600/30 shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-obsidian-900 text-slate-300 hover:text-gold-400 border border-gold-600/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-gold-gradient text-obsidian-950 shadow-gold-glow mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white uppercase tracking-wider">AURA MOTORS</h2>
          <p className="text-xs text-gold-400 font-medium">Bespoke Client Authentication Portal</p>
        </div>

        {/* 1-Click Demo Buttons */}
        <div className="p-3 bg-obsidian-900/90 rounded-2xl border border-gold-600/20 mb-5 space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block text-center">
            Quick 1-Click Demo Credentials:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemo('user')}
              className="py-1.5 px-2 bg-obsidian-800 hover:bg-gold-500/20 text-slate-200 hover:text-gold-400 rounded-xl text-xs font-semibold border border-slate-700 flex items-center justify-center space-x-1 transition-colors"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>VIP User Demo</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className="py-1.5 px-2 bg-obsidian-800 hover:bg-gold-500/20 text-slate-200 hover:text-gold-400 rounded-xl text-xs font-semibold border border-slate-700 flex items-center justify-center space-x-1 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gold-600/20 mb-5">
          <button
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all ${
              tab === 'login'
                ? 'border-gold-500 text-gold-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all ${
              tab === 'register'
                ? 'border-gold-500 text-gold-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Create VIP Account
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-400 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {tab === 'register' && (
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lord Sterling"
                  className="w-full pl-9 pr-3 py-2.5 bg-obsidian-900 border border-gold-600/30 rounded-xl text-slate-100 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@auramotors.com"
                className="w-full pl-9 pr-3 py-2.5 bg-obsidian-900 border border-gold-600/30 rounded-xl text-slate-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-obsidian-900 border border-gold-600/30 rounded-xl text-slate-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          {tab === 'register' && (
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Account Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2.5 bg-obsidian-900 border border-gold-600/30 rounded-xl text-slate-100 text-xs focus:border-gold-500 focus:outline-none"
              >
                <option value="user">VIP Buyer / Collector</option>
                <option value="admin">Dealership Admin</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-gradient text-obsidian-950 font-bold rounded-xl text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center space-x-2"
          >
            <Key className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : tab === 'login' ? 'Sign In to Portal' : 'Register Account'}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
