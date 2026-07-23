import { Router } from 'express';
import {
  getVehicles,
  searchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from '../controllers/vehicleController.js';
import { purchaseVehicle, restockVehicle } from '../controllers/inventoryController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Apply auth to all vehicle routes
router.use(authenticateToken);

// Vehicle Endpoints
router.get('/', getVehicles);
router.get('/search', searchVehicles);
router.post('/', requireAdmin, createVehicle);
router.put('/:id', requireAdmin, updateVehicle);
router.delete('/:id', requireAdmin, deleteVehicle);

// Inventory Endpoints
router.post('/:id/purchase', purchaseVehicle);
router.post('/:id/restock', requireAdmin, restockVehicle);

export default router;
