import { Request, Response } from 'express';
import { decodeJWT, refreshTokens } from '../utils/JWT';

const refreshTokenController = async (req: Request, res: Response) => {
    const refreshToken = req.headers["authorization"];
    if (!refreshToken) {
        return res.status(403).json({ error: "Refresh token is required" });
    }
    const token = refreshToken.split(" ")[1];
    const newTokens = refreshTokens(token);
    if (!newTokens.accessToken || !newTokens.refreshToken) {
        return res.status(500).json({ error: "Failed to generate new tokens" });
    }
    return res.status(200).json({
        message: "Tokens refreshed successfully",
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken
    });
}

const checkToken = async (req: Request, res: Response) => {
    const accessToken = req.headers["authorization"];
    if (!accessToken) {
        return res.status(403).json({ error: "Refresh token is required" });
    }
    const token = accessToken.split(" ")[1];
    const decodedToken = decodeJWT(token);
    if (decodedToken.exp > Date.now() / 1000) {
        return res.status(200).json({ message: "Token is valid", decodedToken });
    }
    return res.status(403).json({ error: "Token is invalid" });
}

export default {refreshTokenController,checkToken};