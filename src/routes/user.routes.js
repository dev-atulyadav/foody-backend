import { getAllUsers, loginUser, registerUser } from "../controllers/user.controller.js"
import express from "express";

const userRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/v1/users/: 
 *  get:
 *   summary: Retrieve a list of all users
 */
 
userRoutes.get("/", getAllUsers);

/**
 * @swagger
 * /api/v1/users/register:
 *  post:
 *  summary: Register a new user
 * tags: [Authentication]
 */

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

export default userRoutes;
