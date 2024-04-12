const express = require("express");
const {
  getAllTasks,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTasks).patch(updateTask).delete(deleteTask);

//differece between patch and put method is that, put replaces the entire document with whatever we pass but patch partialy updates i.e it updates only the property we pass and keep rest of the properies as is.

module.exports = router;
