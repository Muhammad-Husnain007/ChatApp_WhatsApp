import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from '../models/user.model.js';
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong");
    }
};

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) {
            throw new ApiError(401, "Unauthorized Token");
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(401, "Invalid Token");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const options = {
            httpOnly: true,
            secure: true,
        };

        res.cookie("accessToken", accessToken, options);
        res.cookie("refreshToken", refreshToken, options);

        return res.status(200).json(
            new ApiResponse(
                200,
                { accessToken, refreshToken },
                "Token Refresh Successful"
            )
        );
    } catch (error) {
        throw new ApiError(401, error.message || "Server Error");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        let user = await User.findOne({ phoneNumber });
        if (user) {
            throw new ApiError(400, "User with this phone number already exists");
        }

        user = new User({ phoneNumber });
        await user.save();

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const createdUser = await User.findById(user._id).select("-refreshToken");

        const options = {
            httpOnly: true,
            secure: true
        };

        return res.status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(
                201,
                {
                    user: createdUser,
                    accessToken,
                    refreshToken,
                },
                "User created and logged in successfully",
            ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong");
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find(req.user).populate('contacts.contact');

        for (const user of users) {
            for (const contactObj of user.contacts) {
                if (contactObj.contact && !contactObj.exists) {
                    const contactUser = await User.findOne({ 
                        phoneNumber: contactObj.contact.phoneNumber 
                    });

                    if (contactUser) {
                        contactObj.exists = true;
                        contactObj.contact = contactUser._id; 
                    }
                } 
                else if (contactObj.exists && contactObj.contact.user == null) {
                    const contactUser = await User.findOne({ 
                        phoneNumber: contactObj.contact.phoneNumber 
                    });

                    if (contactUser) {
                        contactObj.contact.user = contactUser._id;
                    }
                }
            }
            await user.save();
        }

        return res.status(200).json(new ApiResponse(
            200,
            users,
            "Users retrieved successfully"
        ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong");
    }
});

const getByIdUser = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('contacts.contact');

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        for (const contactObj of user.contacts) {
            if (!contactObj.exists) {
                const contactUser = await User.findOne({ phoneNumber: contactObj.contact.phoneNumber });
                if (contactUser) {
                    contactObj.exists = true;
                    contactObj.contact.user = contactUser._id; // Correct this line
                }
            } 

            if (contactObj.exists && contactObj.contact.user === null) {
                const contactUser = await User.findOne({ phoneNumber: contactObj.contact.phoneNumber });
                if (contactUser) {
                    contactObj.contact.user = contactUser._id;
                }
            }
        }
        await user.save();

        return res.status(200).json(new ApiResponse(
            200,
            user,
            "User retrieved successfully"
        ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            throw new ApiError(400, "Please enter phone Number");
        }
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            throw new ApiError(404, "Phone Number didn't match");
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select("-refreshToken");
        const options = {
            httpOnly: true,
            secure: true
        };
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully",
            ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User logged out successfully")
        );
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const deleteUser = await User.findByIdAndDelete(userId);

        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    deleteUser,
                    "User deleted successfully"
                )
            );
    } catch (error) {
        throw new ApiError(500, error?.message || "Server error while deleting user data");
    }
});

export {
    registerUser,
    getAllUsers,
    getByIdUser,
    loginUser,
    logoutUser,
    deleteUser,
    refreshAccessToken,
    generateAccessAndRefreshTokens
};
