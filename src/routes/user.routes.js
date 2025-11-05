import { getAllUsers, loginUser, registerUser } from "../controllers/user.controller.js"
import express from "express";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

export default userRoutes;
