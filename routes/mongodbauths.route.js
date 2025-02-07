import express from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const authRouter = express.Router();
import bcrypt from "bcrypt";
import { MongoDBAuths } from "../models/mongodbauths.model.js";
import { authenticateToken } from "../authmiddlewares/authenticateToken.js";
import nodemailer from "nodemailer";
// import sgMail from "@sendgrid/mail";
const SECRET_KEY = process.env.SECRET_KEY;

//
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);


authRouter.post("/register", async (req, res) => {

    try {

        const { name, email, password, confirmPassword } = await req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password does not matches !!" });
        }

        const existingUser = await MongoDBAuths.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User Already Exist !!" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const registerUser = new MongoDBAuths({ name, email, password: hashedPassword });

        const data = await registerUser.save();

        res.status(201).json({ message: "Registration successful", success: true })

    } catch (error) {
        res.status(500).json({ message: "Registration failed !!", success: false });
    }

})

authRouter.post("/login", async (req, res) => {

    try {
        const { email, password } = await req.body;

        const user = await MongoDBAuths.findOne({ email });

        console.log("Users", user)

        if (!user) {
            return res.status(401).json({ message: "User does not exist !!" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password", user.password);
        console.log("Password Match", passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password !!" })
        }

        //Token Generate
        const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: "1h" });
        console.log("Token Login", token);

        res.status(200).json({ message: "Login successful", success: true, token });


    } catch (error) {
        res.status(500).json({ message: "Login Failed !!" });
    }
})


authRouter.get("/profile", authenticateToken, (req, res) => {
    console.log("Request", req.userData);
    if (req.userData) {
        res.status(200).json({ userData: req.userData });
    }
    else {
        res.status(404).json({ message: "Unauthorised access", success: false });
    }


});


authRouter.post("/forgot-password", async (req, res) => {

    const { email } = await req.body;
    try {

        const user = await MongoDBAuths.findOne({ email });
        console.log("Forget Password user", user);
        if (!user) {
            res.json({ message: "You are not Register", success: false });
        }

        const resetToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" })

        console.log("ResetToken forget-password", resetToken);

        const resteLink = `http://localhost:3000/reset-password/${resetToken}`

        const transporter = nodemailer.createTransport({
            // service:"gmail",
            // auth:{
            //     user:process.env.USER_EMAIL_ID,
            //     pass:process.env.PASSWORD
            // }
            host: 'localhost',  // Use MailDev
            port: 1025,         // MailDev's default port
            ignoreTLS: true,
        })
        console.log("email", email);
        const mailOption = {
            from: process.env.USER_EMAIL_ID,
            to: email,
            subject: "Reset Password",
            html: `Click here to reset your password:  ${resteLink}`
        }

        //send the email
        // console.log('SendGrid API Key:', process.env.SENDGRID_API_KEY);
        try {
            transporter.sendMail(mailOption)
            res.status(200).json({ message: "Password Reset link send to your email ", success: true });
        } catch (error) {
            res.status(500).json({ message: "Error email does not send !!", success: false });
        }

    } catch (error) {
        console.log("Error in forgotPassword Api catch block ", error);
    }


})
authRouter.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    console.log("Reset Password ",req.body);

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Verification ",decoded);
        const user = await MongoDBAuths.findById(decoded.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        console.log("HashesPassword rest api",hashedPassword);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: "Password reset successful", success: true });

    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token", success: false });
    }
});

 
export default authRouter;






