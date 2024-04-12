const express = require("express");
const tasks = require("./routes/tasks");
const connectDb = require("./db/connect");
const showError = require("./customMiddleware/errorHandler");
const customError = require("./customMiddleware/customError");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/tasks", tasks);
app.use(showError);
app.use(customError);

const port = 3000;

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
