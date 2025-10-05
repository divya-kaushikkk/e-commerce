import jwt from "jsonwebtoken";
import { success } from "zod";

export const generateToken = async (user) => {
    try{ 
        const payload = {id: user.id, email: user.email}
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7min"});
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const verifyToken = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(400).json({success: false, message: "No token provided."});
        }
        const token = authHeader.split(" ")[1];
        const verifyingToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifyingToken;
        next();
    }
    catch(error){
        console.log(error);
        if(error.name === "TokenExpiredError"){
            return res.status(400).json({success: false, message: "Token expired. Please login again."});
        }
        if(error.name === "JsonWebTokenError"){
            return res.status(400).json({success: false, message: "Enter valid token."});
        }
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}