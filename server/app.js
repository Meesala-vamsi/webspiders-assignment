const express = require("express");
const cors = require("cors");
const globalErrorController = require("./controllers/globalErrorController");
const CustomError = require("./utils/customError");
const taskRoute = require("./routes/taskRoutes");
const authRoute = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/tasks",taskRoute);
app.use("/auth",authRoute);

app.all("*", (req, res, next) => {
  const error = new CustomError(`Invalid Endpoint ${req.originalUrl}`, 404);
  return next(error);
});
app.use(globalErrorController);

module.exports = app;