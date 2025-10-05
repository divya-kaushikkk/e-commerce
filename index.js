import express from "express";
import AuthRouter from "./routes/user.js"
import dotenv from "dotenv";
import { Users } from "./model/user.js";
import { success } from "zod";
import ProductRouter from "./routes/product.js";

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);

app.post("/show-data",  async (req, res) => {
  const showData = await Users.findAll();
  return res.status(200).json({success: true, data: showData});
})

app.delete("/del/:id", async(req, res) => {
  const {id} = req.params;
  await Users.destroy({where : {id}});
  return res.status(200).json({success: true, message: "Data deleted successfully."});
})

app.listen(8080, () => {
    console.log("Server is listening...");
});