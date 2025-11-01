import {Router} from "express";
import { addToCart, showCart, showCartItem, updateQuantity, deleteCartItem, clearCart } from "../controllers/cart.js";
const router = Router();

router.post("/add-to-cart", addToCart);
router.get("/show-cart", showCart);
router.get("/show-cart-item/:userId", showCartItem);
router.post("/update-quantity/:cartItemId", updateQuantity);
router.post("/delete-cart-item/:cartItemId", deleteCartItem);
router.post("/clear-cart", clearCart);

export default router;