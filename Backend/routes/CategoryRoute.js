const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/CategoryControllers');

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:category_id", getSingleCategory);
router.patch("/:category_id", updateCategory);
router.delete("/:category_id", deleteCategory);

module.exports = router;
``