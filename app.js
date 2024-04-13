const express = require("express");
require("dotenv").config();
const tasks = require("./routes/tasks");
const connectDb = require("./db/connect");
const showError = require("./customMiddleware/errorHandler");
const customError = require("./customMiddleware/customError");

const app = express();

app.use(express.json());
app.use(express.static("./public"));

// express takes care of errors in synchronous code itself, that means we dont need to send response explicitly
app.get("/error", (req, res) => {
  throw new Error("Error Check");
});
app.use("/api/v1/tasks", tasks);
app.use(showError);
app.use(customError);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
