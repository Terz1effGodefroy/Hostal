import { Router } from 'express';
import { listRooms, listAvailable } from '../controllers/roomsController.js';

const router = Router();
router.get('/', listRooms);
router.get('/available', listAvailable);

export default router;
