import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/products.js";
import { verifyToken,generateToken } from "../middleware/jwtAuth.js";
import { adminAccess } from "../middleware/product.js";
const router = Router();

router.post("/add",verifyToken, adminAccess, addProduct);
router.get("/show", getAllProducts);
router.get("/get-product-by-id/:id", getProductById);
router.post("/update/:id",verifyToken, adminAccess, updateProduct);
router.post("/delete/:id", verifyToken, adminAccess, deleteProduct);

export default router;

