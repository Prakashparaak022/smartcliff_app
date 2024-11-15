const CategoryModel = require("../models/CategoryModel");

const createCategory = (req, res) => {
  const { category } = req.body;

  CategoryModel.createCategory({ category }, (err, categoryId) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ category_id: categoryId });
  });
};

const getCategories = (req, res) => {
  CategoryModel.getCategories((err, categories) => {
    if (err) {  
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(categories);
  });
};

const getSingleCategory = (req, res) => {
  const { category_id } = req.params;

  CategoryModel.getCategoryById(category_id, (err, category) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.status(200).json(category);
  });
};

const updateCategory = (req, res) => {
  const { category_id } = req.params;

  CategoryModel.updateCategory(category_id, req.body, (err, updatedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ updatedCount });
  });
};

const deleteCategory = (req, res) => {
  const { category_id } = req.params;

  CategoryModel.deleteCategory(category_id, (err, deletedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ deletedCount });
  });
};

module.exports = {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
