import { Router } from 'express';
import {getAllUsers,getSingleUser,createSingleUser,updateSingleUser,deleteSingleUser} from '../../controllers/users/usersControllers.js'

const router = Router();

router.route(`/`).get(preventEddy,getAllUsers).post(createSingleUser)

router.route(`/:id`).get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser)

export default router;
