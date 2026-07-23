import { Request, Response } from 'express';
import { db } from '../config/db.js';
import { Vehicle } from '../types/index.js';

export const getVehicles = (req: Request, res: Response) => {
  try {
    const vehicles = db.getVehicles();
    return res.status(200).json(vehicles);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const searchVehicles = (req: Request, res: Response) => {
  try {
    const { make, model, category, minPrice, maxPrice, q } = req.query;

    const results = db.searchVehicles({
      make: make as string,
      model: model as string,
      category: category as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      q: q as string
    });

    return res.status(200).json(results);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Search error' });
  }
};

export const createVehicle = (req: Request, res: Response) => {
  try {
    const { make, model, category, price, quantity, year, imageUrl, description, specs } = req.body;

    if (!make || !model || !category || price === undefined || quantity === undefined) {
      return res.status(400).json({ error: 'Make, model, category, price, and quantity are required' });
    }

    const newVehicle: Vehicle = {
      id: `veh-${Date.now()}`,
      make,
      model,
      category,
      price: Number(price),
      quantity: Number(quantity),
      year: year ? Number(year) : 2026,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      description: description || 'Luxury high-performance motor vehicle.',
      specs: specs || {
        horsepower: 750,
        topSpeed: '200 mph',
        acceleration: '0-60 in 2.9s',
        engine: 'Twin-Turbo V8 Engine'
      },
      createdAt: new Date().toISOString()
    };

    const saved = db.addVehicle(newVehicle);
    return res.status(201).json(saved);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Creation error' });
  }
};

export const updateVehicle = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existing = db.findVehicleById(id);

    if (!existing) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const updated = db.updateVehicle(id, req.body);
    return res.status(200).json(updated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Update error' });
  }
};

export const deleteVehicle = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existing = db.findVehicleById(id);

    if (!existing) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    db.deleteVehicle(id);
    return res.status(200).json({ message: 'Vehicle deleted successfully', id });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Delete error' });
  }
};
