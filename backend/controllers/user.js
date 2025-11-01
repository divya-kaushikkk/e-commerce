import { Op} from "sequelize";
import { Users } from "../model/user.js";
import { userSchema } from "../validations/zod.js";
<<<<<<< HEAD
=======
import { loginSchema } from "../validations/zod.js";
>>>>>>> 9b5cf8f (Initial commit)
import bcrypt from "bcrypt";
import { transporter } from "../config/nodemailer.js";
import { welcomeEmailTemplate } from "../validations/nodemailer.js";
import { generateToken } from "../middleware/jwtAuth.js";
import jwt from "jsonwebtoken";
<<<<<<< HEAD
=======
import { forgotPassEmail } from "../validations/nodemailer.js";
>>>>>>> 9b5cf8f (Initial commit)

export const signup = async (req, res) => {
    try{
        const result = userSchema.safeParse(req.body);
        if(!result.success){
<<<<<<< HEAD
          console.log(result.error.issues[0])
            return res.status(400).json({success: false, error: result.error.issues[0].message});
        }
        const validateData = result.data;
        const existingUser = await Users.findOne({
            where: {
                [Op.or]: [
                { email: validateData.email },
                { phone: validateData.phone }
=======
            console.log(result.error.issues[0])
            return res.status(400).json({success: false, error: result.error.issues[0].message});
        }
        const { firstName, lastName, email, password, phone, address } = result.data;
        const existingUser = await Users.findOne({
            where: {
                [Op.or]: [
                { email },
                { phone }
>>>>>>> 9b5cf8f (Initial commit)
            ]
            }
        });
        if(existingUser){
<<<<<<< HEAD
            return res.status(400).json({success: false, message: "Email or number already exists."});
        }        
        const hashedPass = await bcrypt.hash(validateData.password, 10);
        validateData.password = hashedPass;
        // console.log(hashedPass); // have to comment out this shit.
        await Users.create(validateData);
=======
            return res.status(400).json({success: false, message: "Email or phone already exists."});
        }        
        const hashedPass = await bcrypt.hash(password, 10);
        // console.log(hashedPass); // have to comment out this shit.
        await Users.create({firstName, lastName, email, password: hashedPass, phone, address});
>>>>>>> 9b5cf8f (Initial commit)
        return res.status(200).json({success: true, message: "User added successfully."});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}


export const login = async (req, res) => {
    try{
<<<<<<< HEAD
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

=======
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            console.log(result.error.issues[0])
            return res.status(400).json({success: false, error: result.error.issues[0].message});      
        }
        const {email, password} = result.data;
>>>>>>> 9b5cf8f (Initial commit)
        const user = await Users.findOne({where: {email}});
        if(!user){
            return res.status(400).json({success: false, message: "Invalid credentials."});
        }

<<<<<<< HEAD
=======
        console.log("workingggg...")

>>>>>>> 9b5cf8f (Initial commit)
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
<<<<<<< HEAD
        console.log(token);
        res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 60 * 1000 
        });

=======
        // console.log(token);
        res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: false, // will set true in production 
        maxAge: 7 * 24 * 60 * 60 * 1000
        });

        console.log("workinggg...");

>>>>>>> 9b5cf8f (Initial commit)
        return res.status(200).json({success: true, message: "User logged in successfully."});
    }
    
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }

}

export const logout = (req, res) => {
    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
<<<<<<< HEAD
    maxAge: 24 * 60 * 60 * 1000
=======
    secure: true
>>>>>>> 9b5cf8f (Initial commit)
    });

    return res.status(200).json({success: true, message: "Logged out successfully." });

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
        const resetToken = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        // console.log(resetToken); // have to comment out ts.
<<<<<<< HEAD
=======
        const resetURL = `http://localhost:5500/frontend/reset.html?token=${resetToken}`;

        await transporter.sendMail({
         from: `<${process.env.NODEMAILER_USER}>`,
         to: user.email,
         subject: `Hey ${user.firstName} ${user.lastName}`,
         html: forgotPassEmail(resetURL)
         });
>>>>>>> 9b5cf8f (Initial commit)
        return res.status(200).json({success: true, message: "Password reset token generated."});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error."});
    }
}

export const verifyPass = async(req, res) => {
    try{
<<<<<<< HEAD
        const {token,newPass, confirmPass} = req.body;
=======
        const {token} = req.query;
        const {newPass, confirmPass} = req.body;
>>>>>>> 9b5cf8f (Initial commit)
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