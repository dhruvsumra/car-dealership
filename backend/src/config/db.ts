import fs from 'fs';
import path from 'path';
import { User, Vehicle } from '../types/index.js';
import bcrypt from 'bcryptjs';

const DB_PATH = process.env.NODE_ENV === 'test'
  ? path.join(process.cwd(), 'data', 'test-db.json')
  : path.join(process.cwd(), 'data', 'db.json');

interface Schema {
  users: User[];
  vehicles: Vehicle[];
}

// Initial seed data for luxury vehicles
const SEED_VEHICLES: Vehicle[] = [
  {
    id: "veh-001",
    make: "Aura",
    model: "Monarch Gold Edition",
    category: "Hypercar",
    price: 3200000,
    quantity: 3,
    year: 2026,
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    description: "Handcrafted hybrid V12 hypercar finished in bespoke Liquid Gold with carbon-fiber chassis.",
    specs: {
      horsepower: 1150,
      topSpeed: "235 mph",
      acceleration: "0-60 in 2.1s",
      engine: "6.5L Quad-Turbo V12 + Dual Electric Motors"
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
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    description: "Pinnacle electric luxury sedan delivering sub-2 second acceleration and opulent gold-accented cabin.",
    specs: {
      horsepower: 1234,
      topSpeed: "205 mph",
      acceleration: "0-60 in 1.89s",
      engine: "Tri-Motor Electric All-Wheel Drive"
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
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description: "The ultimate expression of whisper-quiet executive luxury with gold starlight headliner.",
    specs: {
      horsepower: 600,
      topSpeed: "155 mph",
      acceleration: "0-60 in 4.4s",
      engine: "6.75L Twin-Turbo V12"
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
    description: "Track-focused aerodynamic masterpiece boasting active aero and gold forged magnesium wheels.",
    specs: {
      horsepower: 850,
      topSpeed: "218 mph",
      acceleration: "0-60 in 2.6s",
      engine: "4.0L Flat-Plane Crank Twin-Turbo V8"
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
    description: "All-terrain luxury SUV featuring bespoke gold trim, champagne cooler, and executive seating.",
    specs: {
      horsepower: 591,
      topSpeed: "155 mph",
      acceleration: "0-60 in 4.9s",
      engine: "6.75L Twin-Turbocharged V12"
    }
  }
];

class Database {
  private data: Schema = { users: [], vehicles: [] };

  constructor() {
    this.init();
  }

  private init() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(DB_PATH)) {
      try {
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (err) {
        this.seedDefaultData();
      }
    } else {
        this.seedDefaultData();
    }
  }

  private seedDefaultData() {
    const adminPasswordHash = bcrypt.hashSync('admin123', 10);
    const userPasswordHash = bcrypt.hashSync('user123', 10);

    this.data = {
      users: [
        {
          id: 'usr-admin',
          name: 'Gold Admin',
          email: 'admin@auramotors.com',
          passwordHash: adminPasswordHash,
          role: 'admin',
          createdAt: new Date().toISOString()
        },
        {
          id: 'usr-buyer',
          name: 'VIP Collector',
          email: 'user@auramotors.com',
          passwordHash: userPasswordHash,
          role: 'user',
          createdAt: new Date().toISOString()
        }
      ],
      vehicles: SEED_VEHICLES
    };
    this.save();
  }

  public save() {
    fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
  }

  public resetTestDb() {
    if (process.env.NODE_ENV === 'test') {
      this.seedDefaultData();
    }
  }

  // Users
  public getUsers(): User[] {
    return this.data.users;
  }

  public findUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public addUser(user: User): User {
    this.data.users.push(user);
    this.save();
    return user;
  }

  // Vehicles
  public getVehicles(): Vehicle[] {
    return this.data.vehicles;
  }

  public findVehicleById(id: string): Vehicle | undefined {
    return this.data.vehicles.find(v => v.id === id);
  }

  public addVehicle(vehicle: Vehicle): Vehicle {
    this.data.vehicles.push(vehicle);
    this.save();
    return vehicle;
  }

  public updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | undefined {
    const index = this.data.vehicles.findIndex(v => v.id === id);
    if (index === -1) return undefined;

    this.data.vehicles[index] = {
      ...this.data.vehicles[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.vehicles[index];
  }

  public deleteVehicle(id: string): boolean {
    const initialLen = this.data.vehicles.length;
    this.data.vehicles = this.data.vehicles.filter(v => v.id !== id);
    const deleted = this.data.vehicles.length < initialLen;
    if (deleted) this.save();
    return deleted;
  }

  public searchVehicles(query: {
    make?: string;
    model?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    q?: string;
  }): Vehicle[] {
    return this.data.vehicles.filter(v => {
      if (query.make && v.make.toLowerCase() !== query.make.toLowerCase()) return false;
      if (query.model && !v.model.toLowerCase().includes(query.model.toLowerCase())) return false;
      if (query.category && v.category.toLowerCase() !== query.category.toLowerCase()) return false;
      if (query.minPrice !== undefined && v.price < query.minPrice) return false;
      if (query.maxPrice !== undefined && v.price > query.maxPrice) return false;
      if (query.q) {
        const term = query.q.toLowerCase();
        const matches =
          v.make.toLowerCase().includes(term) ||
          v.model.toLowerCase().includes(term) ||
          v.category.toLowerCase().includes(term) ||
          v.description.toLowerCase().includes(term);
        if (!matches) return false;
      }
      return true;
    });
  }
}

export const db = new Database();
