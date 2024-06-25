import { Router } from 'express';
import {body,param} from 'express-validator'
import {getAllUsers,getSingleUser,createSingleUser,updateSingleUser,deleteSingleUser} from '../../controllers/users/usersControllers.js'

const router = Router();

router.route(`/`).get(getAllUsers)
router.post(`/`,
    [
        body('name').isString().withMessage('Name must be a string'),
        body('age').isInt({min:18}).withMessage('Age must be over 18'),
        body("email").isEmail().withMessage("this is not a valid email")
    ],createSingleUser)

    router.get(`/:id`,[
        param("id").isInt({min:1}).withMessage("id is not valid")
    ],getSingleUser)
// router.route(`/:id`,
//     [
//         param("id").isInt({min:1}).withMessage("id is not valid")
//     ]
// ).get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser)

export default router;
