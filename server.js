import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { SECRETS } from './config/secrets.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

// Routes
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

// Listen
app.listen(SECRETS.PORT, () => {
  console.log(`Server is running on port http://localhost:${SECRETS.PORT}`);
});



