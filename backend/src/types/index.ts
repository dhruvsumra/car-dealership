export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface VehicleSpecs {
  horsepower: number;
  topSpeed: string;
  acceleration: string;
  engine: string;
  interiorMaterial?: string;
  seatingCapacity?: number;
  transmission?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  category: 'Supercar' | 'Hypercar' | 'Luxury Sedan' | 'Electric' | 'SUV';
  price: number;
  quantity: number;
  year: number;
  imageUrl: string;
  interiorImageUrl?: string;
  gallery?: string[];
  description: string;
  specs: VehicleSpecs;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  };
}
