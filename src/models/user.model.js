import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["user", "admin", "owner"],
    default: "user",
  },
  password: { type: String, required: true },
  refreshToken: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const saltRounds = 10;

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.generateAuthToken = function (next) {
  jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
    (err, token) => {
      if (err) return next(err);
      this.refreshToken = token;
      next();
    }
  );
};
userSchema.methods.generateRefreshToken = function (next) {
  jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
    (err, token) => {
      if (err) return next(err);
      this.refreshToken = token;
      next();
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
