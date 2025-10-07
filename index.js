import express from "express";
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
});