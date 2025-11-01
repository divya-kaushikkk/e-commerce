import { includes, success } from "zod";
import { Cart } from "../model/cart.js";
import { Product } from "../model/products.js";
import { where } from "sequelize";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const quantity = req.body.quantity || 1;
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ success: false, message: "No product found." });
    }
    const checkCart = await Cart.findOne({ where: { userId, productId } });
    if (checkCart) {
      const newQuantity = checkCart.quantity + quantity;
      const newTotal = newQuantity * checkCart.unitPrice;
      await checkCart.update({ quantity: newQuantity, totalPrice: newTotal });
      return res.status(200).json({ success: true, message: "Quantity updated in cart." });
    }
    const unitPrice = product.price;
    const totalPrice = unitPrice * quantity;

    await Cart.create({ userId, productId, unitPrice, quantity, totalPrice });
    return res.status(200).json({ success: true, message: "Add to cart successfully." });
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

export const showCart = async (req, res) =>{
    try{
        const showData = await Cart.findAll();
        if (showData.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty." });
        }
        return res.status(200).json({success: true, data: showData});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}

export const showCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findAll({ where: {userId }});
    if (cart.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty." });
    }
    return res.status(200).json({success: true, data: cart});
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const {cartItemId} = req.params;
    const { newQuantity } = req.body;
    if(!newQuantity || newQuantity <= 0){
        return res.status(400).json({success: false, message: "Quantity must be greater than zero."});
    }
    const cartItem = await Cart.findOne({where: {id: cartItemId}});
    if (!cartItem) {
      return res.status(404).json({success: false, message: "Cart item not found."});
    }
    const total = cartItem.unitPrice * newQuantity;
    await cartItem.update({quantity: newQuantity, totalPrice: total});
    return res.status(200).json({success: true, message: "Cart quantity updated successfully.", data: cartItem});
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const {cartItemId} = req.params;
    const cart = await Cart.findAll({ where: { id: cartItemId } });
    if (cart.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is already empty." });
    }
    await Cart.destroy({ where: {id: cartItemId} });
    return res.status(200).json({ success: true, message: "Cart cleared successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
}
export const clearCart = async (req, res) => {
  try {
    await Cart.destroy({where: {}, truncate: true});
    return res.status(200).json({ success: true, message: "Cart cleared successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
 
};
