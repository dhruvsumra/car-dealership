import React, { useState } from 'react';
import { X, Calculator, DollarSign, Calendar, Percent, Sparkles, ArrowRight, PieChart } from 'lucide-react';

export default function EMICalculatorModal({ initialVehicle, vehicles = [], onClose }) {
  const [selectedVehicleId, setSelectedVehicleId] = useState(initialVehicle?.id || vehicles[0]?.id || '');
  
  const currentVehicle = vehicles.find((v) => v.id === selectedVehicleId) || initialVehicle || {
    make: 'Luxury Vehicle',
    model: 'Sovereign Edition',
    price: 500000
  };

  const [price, setPrice] = useState(currentVehicle?.price || 500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20% down
  const [tenureMonths, setTenureMonths] = useState(36); // 36 months default
  const [interestRate, setInterestRate] = useState(6.5); // 6.5% annual rate

  // Calculations
  const downPaymentAmount = Math.round((price * downPaymentPercent) / 100);
  const principalLoan = Math.max(0, price - downPaymentAmount);
  const monthlyRate = interestRate / 12 / 100;
  
  // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateEMI = () => {
    if (principalLoan <= 0) return 0;
    if (monthlyRate === 0) return Math.round(principalLoan / tenureMonths);
    const emi = (principalLoan * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return Math.round(emi);
  };

  const monthlyEMI = calculateEMI();
  const totalPayment = monthlyEMI * tenureMonths;
  const totalInterest = Math.max(0, totalPayment - principalLoan);
  const principalPercentage = price > 0 ? Math.round((principalLoan / (principalLoan + totalInterest)) * 100) : 50;

  const handleVehicleSelect = (id) => {
    setSelectedVehicleId(id);
    const veh = vehicles.find((v) => v.id === id);
    if (veh) {
      setPrice(veh.price);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-600/40 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-obsidian-900 text-slate-300 hover:text-gold-400 border border-gold-600/40 transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2 text-xs text-gold-400 uppercase font-bold tracking-widest mb-1">
          <Calculator className="w-4 h-4 text-gold-400" />
          <span>Aura Concierge Financial Suite</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-6">
          Luxury Vehicle EMI & Financing Calculator
        </h2>

        {/* Vehicle Quick Selector */}
        {vehicles.length > 0 && (
          <div className="mb-6 p-4 bg-obsidian-900/80 rounded-2xl border border-gold-600/20">
            <label className="text-xs text-slate-300 font-semibold block mb-2">Select Vehicle from Vault:</label>
            <select
              value={selectedVehicleId}
              onChange={(e) => handleVehicleSelect(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-obsidian-950 border border-gold-600/40 rounded-xl text-slate-100 text-xs font-bold focus:border-gold-500 focus:outline-none"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.make} {v.model} — ${v.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Controls Column */}
          <div className="space-y-5">
            
            {/* Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Vehicle Price:</span>
                <span className="font-serif text-gold-shimmer font-bold">${price.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="5000000"
                step="25000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-gold-500 bg-obsidian-900 cursor-pointer"
              />
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Down Payment ({downPaymentPercent}%):</span>
                <span className="text-emerald-400 font-bold">${downPaymentAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-gold-500 bg-obsidian-900 cursor-pointer"
              />
            </div>

            {/* Loan Tenure Selector */}
            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-semibold block">Loan Tenure (Months):</label>
              <div className="grid grid-cols-6 gap-1.5">
                {[12, 24, 36, 48, 60, 72].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenureMonths(m)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      tenureMonths === m
                        ? 'bg-gold-gradient text-obsidian-950 border-gold-400 shadow-gold-glow'
                        : 'bg-obsidian-900 text-slate-300 border-slate-800 hover:border-gold-600/40'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Annual Interest Rate:</span>
                <span className="text-gold-400 font-bold">{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="3.5"
                max="14.0"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-gold-500 bg-obsidian-900 cursor-pointer"
              />
            </div>

          </div>

          {/* EMI Results Card */}
          <div className="glass-panel p-6 rounded-3xl border border-gold-600/30 flex flex-col justify-between space-y-6">
            
            <div className="text-center space-y-2">
              <span className="text-[10px] text-gold-400 font-bold uppercase tracking-widest block">
                ESTIMATED MONTHLY FINANCING
              </span>
              <div className="font-serif text-4xl sm:text-5xl font-extrabold text-gold-shimmer">
                ${monthlyEMI.toLocaleString()}
                <span className="text-xs font-sans text-slate-400 font-normal"> / month</span>
              </div>
              <p className="text-[11px] text-slate-400">Based on {tenureMonths} monthly payments at {interestRate}% APR</p>
            </div>

            {/* Breakdown Stats */}
            <div className="space-y-3 pt-2 border-t border-gold-600/20 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Principal Loan Amount:</span>
                <span className="font-bold text-white">${principalLoan.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Down Payment ({downPaymentPercent}%):</span>
                <span className="font-bold text-emerald-400">${downPaymentAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Payable Interest:</span>
                <span className="font-bold text-amber-400">${totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-100 font-bold pt-2 border-t border-slate-800">
                <span>Total Amount Payable:</span>
                <span className="text-gold-400 font-serif text-sm">${(downPaymentAmount + totalPayment).toLocaleString()}</span>
              </div>
            </div>

            {/* Distribution Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Principal ({principalPercentage}%)</span>
                <span>Interest ({100 - principalPercentage}%)</span>
              </div>
              <div className="w-full h-2.5 bg-obsidian-950 rounded-full overflow-hidden flex border border-slate-800">
                <div style={{ width: `${principalPercentage}%` }} className="bg-gold-500 h-full" />
                <div style={{ width: `${100 - principalPercentage}%` }} className="bg-amber-600 h-full" />
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-gold-gradient text-obsidian-950 font-bold rounded-2xl text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Apply Financing Configuration</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
