import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;