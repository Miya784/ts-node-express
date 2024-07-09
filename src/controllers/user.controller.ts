import { userSingUpInterface ,userSingInInterface } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { hashPassword,validatePassword } from "../utils/bcrypt";
import { Request, Response } from 'express';
import { generateToken } from "../utils/JWT";


const Signup = async (req: Request, res: Response) => {
    const password: string = await hashPassword(req.body.password);

    const userSignupFromReq: userSingUpInterface = {
        username: String(req.body.username),
        password: password,
    };

    const user = await User.findOne({
        where: {
            username: userSignupFromReq.username
        }
    });

    if(user){
        return res.status(409).json({
            message: "User already exists"
        });
    }

    const newUser = await User.create({
        username: userSignupFromReq.username,
        password: userSignupFromReq.password
    });

    return res.status(201).json({ 
        message: "User created successfully" ,
        user: newUser});
}

const Signin = async (req: Request, res: Response) => { 
    try {
        const userSingInFromReq: userSingInInterface = {
            username: String(req.body.username),
            password: String(req.body.password)
        };
    
        const user: any = await User.findOne({
            where: {
                username: userSingInFromReq.username
            }
        });
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        const validate = await validatePassword(userSingInFromReq.password, user.password);
        if (!validate) {
          return res.status(500).json({ error: "user or password invalid" });
        }

        const token = generateToken({ id: user.id, username: user.username });
        if (!token) {
            return res.status(500).json({ error: "Failed to generate token" });
        }
                
        return res.status(200).json({
            message: "User logged in successfully",
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default { Signup, Signin };