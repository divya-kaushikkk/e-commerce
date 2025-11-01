import { Orders } from "../model/orders.js";
import { Product } from "../model/products.js";

export const placeOrder = async(req, res) => {
    try{
        const {userId, userEmail, productId, productName, quantity, shippingAddress, paymentMethod} = req.body;
        if(!userId || !userEmail || !productId || !productName || !quantity || !shippingAddress || !paymentMethod){
            return res.status(400).json({success: false, message: "Credentials are required."});
        }
        const checkProduct = await Product.findOne({where: {id:  productId}});
        if(!checkProduct){
            return res.status(400).json({success: false, message: "No product found."});
        }
        const totalPrice = checkProduct.price * quantity;
        console.log(totalPrice);

        await Orders.create({userId, userEmail, productId, productName, quantity, totalPrice,shippingAddress, paymentMethod});

        return res.status(200).json({success: true, message: "Product is ordered successfully."});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}

export const getUserOders = async(req, res) => {
    try{
        const {userId} = req.params;
        const showOrder = await Orders.findAll({where: userId});
        if(!showOrder){
            return res.status(400).json({success: false, message: "Not found."});
        }
        return res.status(200).json({success: true, data: showOrder});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}

export const getAllOrders = async (req, res) => {
    try{
        const showAllOrders = await Orders.findAll();
        if(!showAllOrders){
            return res.status(400).json({success: false, message: "Not found."});
        }
        return res.status(200).json({success: true, data: showAllOrders});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}

export const updateOrderStatus = async (req, res) => {
    try{
        const {id} = req.params;
        const {orderId, status} = req.body;
        const order = await Orders.findByPk(id);
        if(!order){
            return res.status(400).json({success: false, message: "Order not found."});
        }
        if(order.status === "shipped"){
            await order.update({status: "delivered"});
        }
        return res.status(200).json({success: true, message: "Order's status updated successfully."})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}

export const deleteOrder = async(req, res) => {
    try{
        const {id} = req.params;
        const order = await Orders.findByPk(id);
        if(!order){
            return res.status(400).json({success: false, message: "Order not found."});
        }
        if (order.status === "delivered") {
            return res.status(400).json({ success: false, message: "Delivered orders cannot be cancelled." });
        }
        if (order.status === "cancelled") {
            return res.status(400).json({ success: false, message: "Order already cancelled." });
        }
        await order.update({status: "cancelled"});
        return res.status(200).json({success: true, message: "Order cancelled."});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}