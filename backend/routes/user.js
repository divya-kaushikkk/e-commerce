import { Router } from "express";
import {signup, login, logout, forgotPass, verifyPass} from "../controllers/user.js" 
import { verifyToken } from "../middleware/jwtAuth.js";


const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify-token", verifyToken, async (req, res) => {
    return res.status(200).json({success: true, message: "Valid token."});
});
<<<<<<< HEAD
=======
router.get("/dashboard-data", verifyToken, (req, res) => {
  res.json({ success: true, message: "Protected route accessed!" });
});
>>>>>>> 9b5cf8f (Initial commit)
router.post("/forgot-password", forgotPass);
router.post("/verify-password", verifyPass);


export default router;