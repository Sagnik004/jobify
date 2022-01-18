import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// Middlewares & Routes
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// DB & App start up
const startDBandApp = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("DB Connected...");

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startDBandApp();
