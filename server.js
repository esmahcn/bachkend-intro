import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { SECRETS } from './config/secrets.js';
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import cors from 'cors';

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

// Listen
app.listen(SECRETS.PORT, () => {
  console.log(`Server is running on port http://localhost:${SECRETS.PORT}`);
});



