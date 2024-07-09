import { userSingUpInterface ,userSingInInterface } from "../interfaces/user.inrterface";
import { hashPassword,comparePassword } from "../services/bcrypt";
import { Request, Response } from 'express';


const Signup = async (req: Request, res: Response) => {
    const password: string = await hashPassword(req.body.password);

    const userSignupFromReq: userSingUpInterface = {
        name: String(req.body.name),
        email: String(req.body.email),
        password: password,
    };

    console.log(userSignupFromReq);
    return res.status(201).json({ 
        message: "User created successfully" ,
        user: userSignupFromReq});
}

const Signin = async (req: Request, res: Response) => {    
    const userSingInFromReq: userSingInInterface = {
        email: String(req.body.email),
        password: String(req.body.password)
    };
    // const validatePassword = await comparePassword(userSingInFromReq.password, "hash");

    console.log(userSingInFromReq);
    return res.status(200).json({
        message: "User logged in successfully",
        user: userSingInFromReq}
        );
}

export default { Signup, Signin };