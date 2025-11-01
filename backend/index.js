import express from "express";
<<<<<<< HEAD
import AuthRouter from "./routes/user.js"
import dotenv from "dotenv";
import ProductRouter from "./routes/product.js";

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);

app.listen(8080, () => {
    console.log("Server is listening...");
=======
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/user.js";
import ProductRouter from "./routes/product.js";
import OrderRouter from "./routes/orders.js";
import CartRouter from "./routes/cart.js";
import WishlistRouter from "./routes/wishlist.js";
// import PaymentRouter from "./routes/payment.js";

dotenv.config();
const app = express();

app.use(cors({
  origin : ["http://127.0.0.1:5500", "http://localhost:5500"],
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/cart", CartRouter);
app.use("/api/wishlist", WishlistRouter);
// app.use("/api/payment", PaymentRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on ${process.env.PORT}...`);
>>>>>>> 9b5cf8f (Initial commit)
});