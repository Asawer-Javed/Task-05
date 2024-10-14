const Category = require('../models/category');

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name });
  await category.save();
  res.json(category);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
  res.json(category);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndRemove(id);
  res.json({ message: 'Category deleted successfully' });
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };