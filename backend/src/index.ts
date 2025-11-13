import express, { raw } from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import router from "./routes/articleRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.use(router);

// connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // app.listen(PORT, () => {
    //   console.log(`Server listening on port ${PORT}`);
    // });
  })
  .catch((error) => {
    console.error(error);
  });

// Export the Express app as a Vercel serverless function
export default app;
