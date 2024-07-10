import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { jwtPayload } from '../interfaces/jwt.interface';

const secretKey: string = "yourSecretKeyHere";
const appName: string = "yourAppNameHere";
const refreshSecretKey: string = "yourRefreshSecretKeyHere";


export function generateToken(user: jwtPayload): { accessToken: string | null, refreshToken: string | null } {
    try{
        const payload = {
            userId: user.id,
            username: user.username
    };

    const accessTokenOptions:SignOptions = {
        expiresIn: '1d',
        algorithm: 'HS256',
        issuer: 'your-website.com',
        jwtid: String(user.id),
        subject: user.username,
    };

    const refreshTokenOptions:SignOptions = {
        expiresIn: '7d',
        algorithm: 'HS256',
        issuer: 'your-website.com',
        jwtid: String(user.id),
        subject: user.username,
    };

    const accessToken = jwt.sign(payload, secretKey, accessTokenOptions);
    const refreshToken = jwt.sign(payload, refreshSecretKey, refreshTokenOptions);
    return { accessToken , refreshToken };
    } catch (error: any) {
    console.error("Error generating token:", error.message);
    return { accessToken: null, refreshToken: null };
}
}

export function refreshTokens(token: string): { accessToken: string | null, refreshToken: string | null } {
    try {
      const decodedToken = jwt.verify(token, refreshSecretKey, { algorithms: ["HS256"] }) as jwtPayload;
      return generateToken(decodedToken);
    } catch (err: any) {
      console.error("Error refreshing tokens:", err.message);
      return { accessToken: null, refreshToken: null };
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
  