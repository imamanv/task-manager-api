const { customError } = require("../CustomErrorClass");
const asyncWrapper = require("../customMiddleware/asyncWrapper");
const TaskModel = require("../models/Task");

const getAllTasksLogic = async (req, res) => {
  const tasks = await TaskModel.find({});
  res.status(200).json({ tasks });
};
const getTaskLogic = async (req, res) => {
  const { id } = req.params;
  const task = await TaskModel.findById(id);
  if (!task) {
    return customError("Invalid Id", 404);
  }
  res.status(200).json({ task });
};
const createTaskLogic = async (req, res) => {
  const createdTask = await TaskModel.create(req.body);
  res.status(200).json(createdTask);
};

const updateTaskLogic = async (req, res) => {
  const { id } = req.params;
  const editedTaskData = req.body;
  const task = await TaskModel.findByIdAndUpdate(id, editedTaskData, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    return customError("Invalid Id", 404);
  }
  res.status(200).json({ task });
};

const deleteTaskLogic = async (req, res) => {
  const { id } = req.params;
  const task = await TaskModel.findByIdAndDelete(id);
  if (!task) {
    return customError("Invalid Id", 404);
  }
  res.status(200).json({ task });
};
const getAllTasks = asyncWrapper(getAllTasksLogic);

const createTask = asyncWrapper(createTaskLogic);

const getTasks = asyncWrapper(getTaskLogic);

const updateTask = asyncWrapper(updateTaskLogic);

const deleteTask = asyncWrapper(deleteTaskLogic);

module.exports = {
  getAllTasks,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
