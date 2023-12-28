require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// error handler

app.use(express.json());
// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

app.get("/", (req, res) => {
  res.send("Jobs API");
});
// routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 60 * 1000,
    max: 60,
    message: "Too many requests",
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
