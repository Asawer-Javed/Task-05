const Task = require('../models/task');

const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, categoryId } = req.body;
  const task = new Task({ title, description, userId: req.user.userId, categoryId });
  await task.save();
  res.json(task);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, categoryId } = req.body;
  const task = await Task.findByIdAndUpdate(id, { title, description, categoryId }, { new: true });
  res.json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndRemove(id);
  res.json({ message: 'Task deleted successfully' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };