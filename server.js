import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.routes.js";
import connectDB from "./src/config/db.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/config/swagger.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  explorer: true
}));


const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Foody Backend is running");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

// Import routes
app.use("/api/v1/users", userRoutes);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
