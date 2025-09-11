import jwt from "jsonwebtoken";
import { SECRETS } from "../config/secrets.js";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, SECRETS.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Not authorized, user not found" });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};