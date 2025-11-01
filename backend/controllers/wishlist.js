import { Wishlist } from "../model/wishlist.js";
import {Product} from "../model/products.js";
export const addToWishlist = async (req, res) => {
    try{
        const { userId, productId } = req.body;
        const product = await Product.findOne({ where: { id: productId } });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        const existing = await Wishlist.findOne({ where: { userId, productId } });
        if (existing) {
            return res.status(400).json({ success: false, message: "Product is already in wishlist." });
        }

        await Wishlist.create({ userId, productId });

        return res.status(200).json({ success: true, message: "Product added to wishlist." });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const showWishlist = async (req, res) => {
    try{
        const {userId} = req.params;
        const wishlist = await Wishlist.findAll({where: {userId}});
        if(wishlist.length === 0){
            return res.status(400).json({success: false, message: "Wislist is empty."});
        }
        return res.status(200).json({success: true, data: wishlist});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const removeWishlistItem = async (req, res) => {
    try{
        const {userId} = req.params;
        const removeItem = await Wishlist.destroy({where: {userId}});
        if(removeItem === 0){
            return res.status(400).json({success: false, message: "Wishlist is empty."});
        }
        return res.status(200).json({success: true, message: "Item removed successfully."});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const clearWishlist = async (req, res) => {
    try{
        const clearWish = await Wishlist.destroy({where: {}, truncate: true});
        if(clearWish.length === 0){
            return res.status(400).json({success: false, message: "Wishlist is already empty."});
        }
        return res.status(200).json({success: true, message: "Wishlist cleared successfully."});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}