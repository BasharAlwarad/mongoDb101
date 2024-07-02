import { Router } from 'express';
import {
  getAllUsers,
  getSingleUser,
  createSingleUser,
  updateSingleUser,
  deleteSingleUser,
} from '../../controllers/users/usersControllers.js';
import {
  isAdmin,
  isAuthenticated,
  isOwner,
} from '../../middlewares/logging.js';

const router = Router();

router.get(`/`, isAuthenticated, isAdmin, getAllUsers);

router.post(`/`, createSingleUser);

router.get(`/:id`, isAuthenticated, getSingleUser);

router.use(isAuthenticated, isOwner);
router.route(`/:id`).put(updateSingleUser).delete(deleteSingleUser);

export default router;
