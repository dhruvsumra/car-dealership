import { Request, Response } from 'express';
import { db } from '../config/db.js';

export const purchaseVehicle = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const count = req.body.quantity ? Number(req.body.quantity) : 1;

    const vehicle = db.findVehicleById(id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    if (vehicle.quantity < count) {
      return res.status(400).json({ error: 'Vehicle is out of stock or insufficient quantity available' });
    }

    const updated = db.updateVehicle(id, {
      quantity: vehicle.quantity - count
    });

    return res.status(200).json({
      message: 'Vehicle purchased successfully!',
      vehicle: updated
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Purchase failed' });
  }
};

export const restockVehicle = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const amount = req.body.quantity ? Number(req.body.quantity) : 1;

    if (amount <= 0) {
      return res.status(400).json({ error: 'Restock quantity must be greater than 0' });
    }

    const vehicle = db.findVehicleById(id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const updated = db.updateVehicle(id, {
      quantity: vehicle.quantity + amount
    });

    return res.status(200).json({
      message: 'Vehicle restocked successfully!',
      vehicle: updated
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Restock failed' });
  }
};
