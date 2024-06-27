import { Router } from 'express';
import {
    getAllProducts,
    getSingleProduct,
    createSingleProduct,
    updateSingleProduct,
    deleteSingleProduct
} from '../../controllers/products/productsControllers.js';

const router = Router();

router.route(`/`).get(getAllProducts).post(createSingleProduct);

router.route(`/:id`).get(getSingleProduct).put(updateSingleProduct).delete(deleteSingleProduct);

export default router;
