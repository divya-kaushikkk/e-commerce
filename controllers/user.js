import { Op, where} from "sequelize";
import express from "express";
import { Users } from "../model/user.js";
import { userSchema } from "../validations/zod.js";
import bcrypt from "bcrypt";
import { transporter } from "../config/nodemailer.js";
import { welcomeEmailTemplate } from "../validations/nodemailer.js";
import { generateToken } from "../middleware/jwtAuth.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cookieParser());
export const signup = async (req, res) => {
    try{
        const result = userSchema.safeParse(req.body);
        if(!result.success){
          console.log(result.error.issues[0])
            return res.status(400).json({success: false, error: result.error.issues[0].message});
        }
        const validateData = result.data;
        const existingUser = await Users.findOne({
            where: {
                [Op.or]: [
                { email: validateData.email },
                { phone: validateData.phone }
            ]
            }
        });
        if(existingUser){
            return res.status(400).json({success: false, message: "Email or number already exists."});
        }        
        const hashedPass = await bcrypt.hash(validateData.password, 10);
        validateData.password = hashedPass;
        // console.log(hashedPass); // have to comment out this shit.
        await Users.create(validateData);
        return res.status(200).json({success: true, message: "User added successfully."});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}


export const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const user = await Users.findOne({where: {email}});
        if(!user){
            return res.status(400).json({success: false, message: "Email not found."});
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if(!checkPass){
            return res.status(400).json({success: false, message: "Wrong password."});
        }

        // await transporter.sendMail({
        // from: `<${process.env.NODEMAILER_USER}>`,
        // to: user.email,
        // subject: `Hey ${user.firstName} ${user.lastName}`,
        // html: welcomeEmailTemplate(user.firstName, user.lastName)
        // });
        
        const token = await generateToken(user);
        console.log(token);
        res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 60 * 1000 
});

        return res.status(200).json({success: true, token: token, message: "User logged in successfully."});
        
        
    }
    
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }

}

export const logout = (req, res) => {
  try{
    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict"
    });

    return res.status(200).json({success: true, message: "Logged out successfully." });

  }

  catch(error){
    console.log(error);
    return res.status(500).json({success: false, message: "Internal Server Error."});
  }
};

export const forgotPass = async (req, res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({success: false, message: "Email is required."});
        }

        const user = await Users.findOne({where: {email}});
        if(!user){
            return res.status(400).json({success: false, message: "Email not found."});
        }
        const resetToken = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "15min"});
        // console.log(resetToken); // have to comment out ts.
        return res.status(200).json({success: true, message: "Password reset token generated.", resetToken: resetToken});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}

export const verifyPass = async(req, res) => {
    try{
        const {token,newPass, confirmPass} = req.body;
        if(!newPass || !confirmPass){
            return res.status(400).json({success: false, message: "Password is required."});
        }

        if(newPass !== confirmPass){
            return res.status(400).json({success: false, message: "Password do not match."});
        }

        const checkToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!checkToken){
            return res.status(400).json({success: false, message: "Invalid or expired token."});
        }

        const user = await Users.findByPk(checkToken.userId);
        if(!user){
            return res.status(400).json({success: false, message: "User not found."});
        }

        const hashedPass = await bcrypt.hash(newPass, 10);
        user.password = hashedPass;
        await user.save(); 

        return res.status(200).json({success: true, message: "Password updated successfully."});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}