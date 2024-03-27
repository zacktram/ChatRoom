import express from 'express';

import protectRoutes from '../middleware/protectRoutes.js';
import { getUsersForSiderbar } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', protectRoutes, getUsersForSiderbar);

export default router;