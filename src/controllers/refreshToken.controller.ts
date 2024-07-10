import { Request, Response } from 'express';
import { refreshTokens } from '../utils/JWT';

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

export default refreshTokenController;