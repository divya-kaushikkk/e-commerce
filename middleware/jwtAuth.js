import jwt from "jsonwebtoken";
import { success } from "zod";

export const generateToken = async (user) => {
    try{ 
        const payload = {id: user.id, email: user.email}
        return jwt.sign(payload, process.env.JWT_TOKEN, {expiresIn: "5min"});
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
        const verifyingToken = jwt.verify(token, process.env.JWT_TOKEN);
        req.user(verifyingToken)
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}