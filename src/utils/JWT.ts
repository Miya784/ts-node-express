import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { jwtPayload } from '../interfaces/jwt.interface';

const secretKey: string = "yourSecretKeyHere";
const appName: string = "yourAppNameHere";

export function generateToken(user: jwtPayload): string | null {
    try{
        const payload = {
            userId: user.id,
            username: user.username
    };

    const options:SignOptions = {
        expiresIn: '1d',
        algorithm: 'HS256',
        issuer: 'your-website.com',
        jwtid: String(user.id),
        subject: user.username,
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
    } catch (error: any) {
    console.error("Error generating token:", error.message);
    return null;
    }
}

export function decodeJWT(token: string): any {
    try {
      const decodedToken = jwt.decode(token, { complete: true });
      return decodedToken ? decodedToken.payload : null;
    } catch (err: any) {
      console.error("Error decoding JWT:", err.message);
      return null;
    }
  }


export function validateJWT(token: string, user: any): jwtPayload | null {
    try {
      const options: VerifyOptions = {
        algorithms: ["HS256"],
        issuer: appName,
        jwtid: String(user.userId),
        subject: user.username,
      };
      const decodedToken = jwt.verify(token, secretKey, options) as jwtPayload;
  
      return decodedToken;
    } catch (err: any) {
      console.error("Error validating JWT:", err.message);
      return null;
    }
  }
  