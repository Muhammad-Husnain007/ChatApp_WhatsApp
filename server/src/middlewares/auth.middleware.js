import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        console.log('Token:', token);
        console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);

        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        console.log('Decoded Token:', decodedToken);

        // Find user by decoded token's user ID
        const user = await User.findById(decodedToken._id).select("-phoneNumber -refreshToken");

        if (!user) {
            throw new ApiError(401, "Unauthorized request: Invalid user");
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);

        if (error.name === 'JsonWebTokenError') {
            throw new ApiError(401, "Unauthorized request: Invalid access token");
        } else if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Unauthorized request: Expired access token");
        }

        throw new ApiError(401, error.message || "Unauthorized request: Authentication failed");
    }
});
