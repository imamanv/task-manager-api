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
    return res.status(401).send({ error: "Invalid Id" });
  }
  res.status(200).json({ task });
};
const createTaskLogic = async (req, res) => {
  const createdTask = await TaskModel.create(req.body);
  res.status(200).json(createdTask);
};
const getAllTasks = asyncWrapper(getAllTasksLogic);

const createTask = asyncWrapper(createTaskLogic);

const getTasks = asyncWrapper(getTaskLogic);

const updateTask = async (req, res) => {
  const { id } = req.params;
  const editedTaskData = req.body;
  try {
    const task = await TaskModel.findByIdAndUpdate(id, editedTaskData, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
