import ApiResponse from "../helpers/ApiResponse.js";
import User from "../models/user.model.js";

const generateAccessTokenAndRefreshToken = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  const accessToken = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  return {
    accessToken,
    refreshToken,
  };
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return ApiResponse.error(
        res,
        " Please check the fields. All fields are required",
        400
      );
    }
    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });
    return ApiResponse.success(res, "User registered successfully", user, 201);
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, "Error registering user", 500);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return ApiResponse.error(res, "No users found", 404);
    }
    return ApiResponse.success(res, "Users fetched successfully", users, 200);
  } catch (error) {
    return ApiResponse.error(res, "Error fetching users", 500);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return ApiResponse.error(
        res,
        " Please check the fields. All fields are required",
        400
      );
    }
    const user = await User.findOne({ email });

    if (!user) {
      return ApiResponse.error(res, "No user found with this email", 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return ApiResponse.error(res, "Invalid email or password", 401);
    }

    const tokens = await generateAccessTokenAndRefreshToken(user._id);
    user.refreshToken = tokens.refreshToken;
    await user.save();
    return ApiResponse.success(
      res,
      "User logged in successfully",
      { user, tokens },
      200
    );
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, "Error logging in user", 500);
  }
};
