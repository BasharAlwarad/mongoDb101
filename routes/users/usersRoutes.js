import { Router } from 'express';
import {
  getAllUsers,
  getSingleUser,
  createSingleUser,
  updateSingleUser,
  deleteSingleUser,
} from '../../controllers/users/usersControllers.js';
import { isOwnerOrAdmin, isAuthenticated } from '../../middlewares/logging.js';

const router = Router();

router.get('/', isAuthenticated, getAllUsers);

router.post('/', createSingleUser);

router.get('/:id', isAuthenticated, getSingleUser);

router.put('/:id', isAuthenticated, isOwnerOrAdmin, updateSingleUser);
router.delete('/:id', isAuthenticated, isOwnerOrAdmin, deleteSingleUser);

export default router;
