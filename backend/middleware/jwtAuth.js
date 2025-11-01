import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
    try{ 
        const payload = {id: user.id, email: user.email}
<<<<<<< HEAD
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
=======
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"});
>>>>>>> 9b5cf8f (Initial commit)
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const verifyToken = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
<<<<<<< HEAD
        if(!authHeader){
            return res.status(400).json({success: false, message: "No token provided."});
        }
=======
        if (!authHeader) return res.status(401).json({ success: false, message: "No token provided." });

>>>>>>> 9b5cf8f (Initial commit)
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