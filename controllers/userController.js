// controllers/userController.js
import { User } from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRETS } from "../config/secrets.js";

// =====================
// Register a new user
// =====================
export const createUser = async (req, res) => {
  const { name, email, password } = req.body; // include password
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ 
      message: "User created successfully", 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// =====================
// Login user
// =====================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, SECRETS.JWT_SECRET, { expiresIn: "1d" });

    res.json({ 
      message: "Login successful", 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// Get all users
// =====================
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =====================
// Update a user by ID
// =====================
export const updateUser = async (req, res) => {
  const { id } = req.params;        
  const { name, email, password } = req.body; 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const updatedData = { name, email };
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =====================
// Delete a user by ID
// =====================
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};