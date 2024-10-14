const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Category = require('../models/category');
const authenticate = require('../middleware/auth');

router.use(authenticate);

router.post('/', async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).send({ message: 'Category not found' });
    }
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      category: category._id
    });
    await task.save();
    res.status(201).send({ message: 'Task created successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error creating task' });
  }
});