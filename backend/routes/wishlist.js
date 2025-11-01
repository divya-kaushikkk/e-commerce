import {Router} from "express";
import { addToWishlist, showWishlist, clearWishlist, removeWishlistItem } from "../controllers/wishlist.js";
const router = Router();

router.post("/add-to-wishlist", addToWishlist);
router.get("/show-wishlist/:userId", showWishlist);
router.post("/clear-wishlist", clearWishlist);
router.post("/remove-item/:userId", removeWishlistItem);

export default router;