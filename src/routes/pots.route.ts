import express from 'express';
import { potsController } from '../controllers';

const router = express.Router();

router.get('/pots/:userId', potsController.getPotsByUserId);
router.get('/pots/:potId', potsController.getPotById);

router.post('/pots', potsController.createNewPot);

export default router;