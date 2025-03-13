import { Request, Response, NextFunction } from "express";
import {auth} from '../config/firebaseConfig.js';

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const authorization = req.headers.authorization;

    if(!authorization || !authorization.startsWith('Bearer')) {
        res.status(401).json({
            message: "Unauthorized: no token!"
        });
        return;
    }

    const token = authorization.split(' ')[1];

    try {
        const decodedToken = await auth.verifyIdToken(token, true);
        
        (req as any).user = decodedToken;
        next();
    } catch (error:any) {
        res.status(401).json({ 
            message: "Unauthorized: Invalid token woi!", error: error.message
        });
    }
}