import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const authenticateToken = async (req, res, next) => {

    try {

        // console.log("request Header ", req.headers);
        // Extract token from Authorization header (Bearer <token>)
        // const authHeader = req.header('authorization');
        // if (!authHeader) {
        //     return res.status(401).json({ error: "Access denied. No authHeader provided!", status: false });
        // }

        const token = req.headers['authorization']?.split(' ')[1];


        console.log("Middleware token from Authorization header: ", token);

        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided!", status: false });
        }

        // Decode token
        const decodedToken = jwt.verify(token, SECRET_KEY);
        console.log("Decoded Token:", decodedToken);

        // Attach the decoded data to req.userData
        req.userData = { userId: decodedToken.userId, email: decodedToken.email,name:decodedToken.name };
        console.log("Middleware request user data",req.userData);
        next();

    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(403).json({ error: "Authentication failed!", status: false });
    }

};
