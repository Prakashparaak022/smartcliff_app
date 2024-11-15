const express = require("express");
const router = express.Router();

const {
  createUser,
  getUserById,
  getAllUsers,
  updateUserPasswordById,
  deleteUserById,
} = require('../controllers/UserController');

router.post("/", createUser);
router.get("/:u_id", getUserById);
router.get("/", getAllUsers);
router.patch("/:u_id/password", updateUserPasswordById);
router.delete("/:u_id", deleteUserById);

module.exports = router;
