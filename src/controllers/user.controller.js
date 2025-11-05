import ApiResponse from "../helpers/ApiResponse.js";
import User from "../models/user.model.js";

const generateAccessTokenAndRefreshToken = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  await user.generateAuthToken();
  await user.generateRefreshToken();

  return {
    accessToken: user.refreshToken,
    refreshToken: user.refreshToken,
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
    const user = await User.create({ name, email, password, role });
    return ApiResponse.success(res, "User registered successfully", user, 201);
  } catch (error) {
    console.log(error);
    return ApiResponse.error(res, "Error registering user", 500);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "admin",
        createdAt: new Date(),
      },
    ];
    return ApiResponse.success(res, "Users fetched successfully", users, 200);
  } catch (error) {
    return ApiResponse.error(res, "Error fetching users", 500);
  }
};
