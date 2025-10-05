import { success } from "zod";
import { Product } from "../model/products.js";

export const addProduct = async (req, res) => {
    try{
        const {name,description,category,price,stock, image} = req.body;
        if(!name || !description || !category || !price || !stock){
            return res.status(400).json({success: false, message: "Fields are required."});
        }
        const product = await Product.findOne({where: {name}});
        if(product){
            return res.status(400).json({success: false, message: `${product.name} already exists.`});
        }
        await Product.create({name,description,category,price,stock,image});

        return res.status(200).json({success: true, message: "Product added successfully."});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}

export const getAllProducts = async(req, res) => {
    try{
        const getAll = await Product.findAll();
        return res.status(200).json({success: true, data: getAll})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}

export const getProductById = async (req, res) => {
    try{
        const {id} = req.params;
        const getById = await Product.findByPk(id);
        if(!getById){
            return res.status(400).json({success: false, message: "Id is required."});
        }
        return res.status(200).json({success: true, data: getById});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}

export const updateProduct = async(req, res) => {
    try{
        const {id} = req.params;
        const {name,description,category,price,stock, image} = req.body;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(400).json({success: false, message: "Product not found."});
        }
        await Product.update({name, description,category,price,stock,image}, {where: {id}});
        return res.status(200).json({success: true, message: "Product updated successfully."});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const deleteProduct = async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(400).json({success: false, message: "Product not found"});
        }
        await product.destroy();
        return res.status(200).json({success: true, message: "Prouct has been deleted successfully."});
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}