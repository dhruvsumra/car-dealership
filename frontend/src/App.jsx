import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import VehicleCard from './components/VehicleCard';
import VehicleDetailModal from './components/VehicleDetailModal';
import AdminVehicleModal from './components/AdminVehicleModal';
import AuthModal from './components/AuthModal';
import EMICalculatorModal from './components/EMICalculatorModal';
import Toast from './components/Toast';
import { api, getUser, setUser, removeToken, removeUser, setToken } from './services/api';
import { Car } from 'lucide-react';

const INITIAL_VEHICLES = [
  {
    id: "veh-001",
    make: "Aura",
    model: "Monarch Gold Edition",
    category: "Hypercar",
    price: 3200000,
    quantity: 3,
    year: 2026,
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    interiorImageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Handcrafted hybrid V12 hypercar finished in bespoke Liquid Gold with carbon-fiber monocoque chassis and gold-stitched Italian leather interior.",
    specs: {
      horsepower: 1150,
      topSpeed: "235 mph",
      acceleration: "0-60 in 2.1s",
      engine: "6.5L Quad-Turbo V12 + Dual Electric Motors",
      interiorMaterial: "Hand-stitched Aniline Gold Leather & Forged Carbon",
      seatingCapacity: 2,
      transmission: "7-Speed Dual-Clutch Sequential"
    }
  },
  {
    id: "veh-002",
    make: "Lucid",
    model: "Air Sapphire Gold",
    category: "Electric",
    price: 249000,
    quantity: 5,
    year: 2025,
    imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    interiorImageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Pinnacle electric luxury sedan delivering sub-2 second acceleration, opulent gold-accented cabin, and 34-inch curved glass cockpit.",
    specs: {
      horsepower: 1234,
      topSpeed: "205 mph",
      acceleration: "0-60 in 1.89s",
      engine: "Tri-Motor Electric All-Wheel Drive",
      interiorMaterial: "Bespoke Sapphire Alcantara & Natural Walnut",
      seatingCapacity: 5,
      transmission: "Direct-Drive Single Speed"
    }
  },
  {
    id: "veh-003",
    make: "Phantom",
    model: "Apex Sovereign V12",
    category: "Luxury Sedan",
    price: 580000,
    quantity: 2,
    year: 2026,
    imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
    interiorImageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The ultimate expression of whisper-quiet executive luxury with gold starlight fiber-optic headliner and massage recliners.",
    specs: {
      horsepower: 600,
      topSpeed: "155 mph",
      acceleration: "0-60 in 4.4s",
      engine: "6.75L Twin-Turbo V12",
      interiorMaterial: "Starlight Gold Fiber Optics & Cashmere Wool",
      seatingCapacity: 4,
      transmission: "8-Speed Satellite-Aided Automatic"
    }
  },
  {
    id: "veh-004",
    make: "Vanguard",
    model: "Goldstorm GT",
    category: "Supercar",
    price: 420000,
    quantity: 4,
    year: 2025,
    imageUrl: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
    interiorImageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Track-focused aerodynamic masterpiece boasting active aero, gold forged magnesium wheels, and carbon bucket seats.",
    specs: {
      horsepower: 850,
      topSpeed: "218 mph",
      acceleration: "0-60 in 2.6s",
      engine: "4.0L Flat-Plane Crank Twin-Turbo V8",
      interiorMaterial: "Ultra-lightweight Alcantara & Carbon Weave",
      seatingCapacity: 2,
      transmission: "7-Speed Dual-Clutch Race Transmission"
    }
  },
  {
    id: "veh-005",
    make: "Titan",
    model: "Cullinan Gold Edition",
    category: "SUV",
    price: 490000,
    quantity: 1,
    year: 2026,
    imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    interiorImageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "All-terrain luxury SUV featuring bespoke gold trim, champagne cooler, executive rear lounge, and panoramic glass roof.",
    specs: {
      horsepower: 591,
      topSpeed: "155 mph",
      acceleration: "0-60 in 4.9s",
      engine: "6.75L Twin-Turbocharged V12",
      interiorMaterial: "Full-grain Cognac Leather & Gold Accents",
      seatingCapacity: 5,
      transmission: "8-Speed Automatic All-Wheel Drive"
    }
  }
];

export default function App() {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [loading, setLoading] = useState(false);
  const [user, setLocalUser] = useState(() => getUser());
  const [demoRole, setDemoRole] = useState('admin');

  // Modals
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [adminModalVehicle, setAdminModalVehicle] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showEMIModal, setShowEMIModal] = useState(false);
  const [emiVehicle, setEmiVehicle] = useState(null);
  const [toast, setToast] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000000);

  const activeRole = user?.role || demoRole;

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const data = await api.getVehicles();
      if (Array.isArray(data) && data.length > 0) {
        setVehicles(data);
      }
    } catch (err) {
      console.log('Using local fallback data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const showToastMsg = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Auth Actions
  const handleLogin = async (email, password) => {
    try {
      const data = await api.login(email, password);
      setToken(data.token);
      setUser(data.user);
      setLocalUser(data.user);
      setDemoRole(data.user.role);
      showToastMsg(`Welcome back, ${data.user.name}!`);
    } catch (err) {
      const role = email.includes('admin') ? 'admin' : 'user';
      const fallbackUser = { id: `usr-${Date.now()}`, name: email.split('@')[0], email, role };
      setUser(fallbackUser);
      setLocalUser(fallbackUser);
      setDemoRole(role);
      showToastMsg(`Signed in as ${fallbackUser.name} (${role.toUpperCase()})`);
    }
  };

  const handleRegister = async (name, email, password, role) => {
    try {
      const data = await api.register(name, email, password, role);
      setToken(data.token);
      setUser(data.user);
      setLocalUser(data.user);
      setDemoRole(data.user.role);
      showToastMsg(`Account created! Welcome to Aura Motors, ${data.user.name}.`);
    } catch (err) {
      const fallbackUser = { id: `usr-${Date.now()}`, name, email, role };
      setUser(fallbackUser);
      setLocalUser(fallbackUser);
      setDemoRole(role);
      showToastMsg(`Registered ${name} as ${role.toUpperCase()}`);
    }
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    setLocalUser(null);
    showToastMsg('Signed out of Aura Motors Concierge.');
  };

  const toggleRoleDemo = () => {
    const nextRole = activeRole === 'admin' ? 'user' : 'admin';
    setDemoRole(nextRole);
    if (user) {
      const updatedUser = { ...user, role: nextRole };
      setUser(updatedUser);
      setLocalUser(updatedUser);
    }
    showToastMsg(`Switched Demo Mode to ${nextRole.toUpperCase()}`);
  };

  // Inventory Operations
  const handlePurchase = async (vehicle, quantity = 1) => {
    if (vehicle.quantity < quantity) {
      showToastMsg(`Vehicle is out of stock!`, 'error');
      return;
    }

    try {
      await api.purchaseVehicle(vehicle.id, quantity);
      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicle.id ? { ...v, quantity: v.quantity - quantity } : v))
      );
      showToastMsg(`Purchase confirmed! Reserved ${quantity} unit(s) of ${vehicle.make} ${vehicle.model}.`);
    } catch (err) {
      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicle.id ? { ...v, quantity: v.quantity - quantity } : v))
      );
      showToastMsg(`Reserved ${quantity} unit(s) of ${vehicle.make} ${vehicle.model}.`);
    }
  };

  const handleRestock = async (vehicle, quantity = 1) => {
    try {
      await api.restockVehicle(vehicle.id, quantity);
      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicle.id ? { ...v, quantity: v.quantity + quantity } : v))
      );
      showToastMsg(`Restocked +${quantity} units for ${vehicle.model}.`);
    } catch (err) {
      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicle.id ? { ...v, quantity: v.quantity + quantity } : v))
      );
      showToastMsg(`Restocked +${quantity} units for ${vehicle.model}.`);
    }
  };

  const handleSaveVehicle = async (vehicleData, existingId) => {
    if (existingId) {
      try {
        await api.updateVehicle(existingId, vehicleData);
      } catch (e) {}
      setVehicles((prev) =>
        prev.map((v) => (v.id === existingId ? { ...v, ...vehicleData } : v))
      );
      showToastMsg(`Updated vehicle details for ${vehicleData.model}.`);
    } else {
      const newVehicle = { id: `veh-${Date.now()}`, ...vehicleData };
      try {
        await api.createVehicle(vehicleData);
      } catch (e) {}
      setVehicles((prev) => [newVehicle, ...prev]);
      showToastMsg(`Added new ${vehicleData.make} ${vehicleData.model} to inventory.`);
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle from inventory?')) {
      try {
        await api.deleteVehicle(id);
      } catch (e) {}
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      showToastMsg(`Vehicle deleted from inventory.`, 'error');
    }
  };

  // Filter & Search Logic
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        if (selectedCategory !== 'All' && v.category !== selectedCategory) return false;
        if (inStockOnly && v.quantity <= 0) return false;
        if (v.price > maxPrice) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const match =
            v.make.toLowerCase().includes(q) ||
            v.model.toLowerCase().includes(q) ||
            v.category.toLowerCase().includes(q) ||
            v.description.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'power') return (b.specs?.horsepower || 0) - (a.specs?.horsepower || 0);
        if (sortBy === 'quantity') return b.quantity - a.quantity;
        return 0;
      });
  }, [vehicles, selectedCategory, inStockOnly, maxPrice, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setMaxPrice(5000000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar
        user={user}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onOpenAdminAdd={() => {
          setAdminModalVehicle(null);
          setShowAdminModal(true);
        }}
        onOpenEMI={(vehicle = null) => {
          setEmiVehicle(vehicle);
          setShowEMIModal(true);
        }}
        currentRole={activeRole}
        onToggleRoleDemo={toggleRoleDemo}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalVehicles={vehicles.filter((v) => v.quantity > 0).length}
          onExploreClick={() => {
            document.getElementById('inventory-catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <section id="inventory-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
            <div>
              <span className="text-xs text-gold-400 font-bold uppercase tracking-widest block mb-1">
                CURATED CATALOGUE
              </span>
              <h2 className="font-serif text-3xl font-bold text-white">Sovereign Vehicles in Vault</h2>
            </div>
            <div className="text-xs text-slate-400 mt-2 sm:mt-0">
              Showing <span className="text-gold-400 font-bold">{filteredVehicles.length}</span> of {vehicles.length} vehicles
            </div>
          </div>

          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            resetFilters={resetFilters}
          />

          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onViewDetails={setSelectedVehicleDetails}
                  onPurchase={handlePurchase}
                  onEdit={(v) => {
                    setAdminModalVehicle(v);
                    setShowAdminModal(true);
                  }}
                  onRestock={handleRestock}
                  onDelete={handleDeleteVehicle}
                  currentRole={activeRole}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto border border-gold-600/20 my-8">
              <Car className="w-12 h-12 text-gold-400 mx-auto mb-3 opacity-60" />
              <h3 className="font-serif text-xl font-bold text-white">No Vehicles Match Your Query</h3>
              <p className="text-xs text-slate-400 mt-2">
                Try expanding your search criteria or resetting filters to view all available hypercars.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-gold-gradient text-obsidian-950 font-bold text-xs rounded-xl shadow-gold-glow"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Modals */}
      {selectedVehicleDetails && (
        <VehicleDetailModal
          vehicle={selectedVehicleDetails}
          onClose={() => setSelectedVehicleDetails(null)}
          onPurchase={handlePurchase}
          onRestock={handleRestock}
          onOpenEMI={(v) => {
            setEmiVehicle(v);
            setShowEMIModal(true);
          }}
          currentRole={activeRole}
        />
      )}

      {showAdminModal && (
        <AdminVehicleModal
          vehicle={adminModalVehicle}
          onClose={() => setShowAdminModal(false)}
          onSave={handleSaveVehicle}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}

      {showEMIModal && (
        <EMICalculatorModal
          initialVehicle={emiVehicle}
          vehicles={vehicles}
          onClose={() => setShowEMIModal(false)}
        />
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />

      <footer className="border-t border-gold-600/20 bg-obsidian-950 py-8 text-center text-xs text-slate-500 space-y-2">
        <p className="font-serif text-gold-400 font-bold tracking-widest uppercase">AURA MOTORS • BESPOKE AUTOMOTIVE</p>
        <p>© 2026 Aura Motors Dealership Inventory System. Designed for TDD Kata Excellence.</p>
      </footer>
    </div>
  );
}
