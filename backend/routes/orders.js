import { Router } from "express";
import { placeOrder, getUserOders, getAllOrders, updateOrderStatus ,deleteOrder } from "../controllers/orders.js";
const router = Router();

router.post("/place-order", placeOrder);
router.post("/get-user-order/:userId", getUserOders);
router.post("/get-all-order", getAllOrders);
router.post("/cancel-order/:id", deleteOrder);
router.post("/update-order/:id", updateOrderStatus)

export default router;