
const UserModel = require("../models/UserModel");

const createUser = (req, res) => {
  const { u_username, u_password, u_email } = req.body;

  UserModel.createUser({ u_username, u_password, u_email }, (err, userId) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ u_id: userId });
  });
};

const getUserById = (req, res) => {
    const { userId } = req.params;
  
    UserModel.getUserById(userId, (err, user) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
    });
  };
  
  const getAllUsers = (req, res) => {
    UserModel.getAllUsers((err, users) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json(users);
    });
  };
  
  const deleteUserById = (req, res) => {
    const { userId } = req.params;
  
    UserModel.deleteUserById(userId, (err, deletedCount) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({ deletedCount });
    });
  };

  
const updateUserPasswordById = (req, res) => {
  const { u_id } = req.params; // Assuming the user ID is passed as a URL parameter
  const { new_password } = req.body; // Assuming the new password is passed in the request body

  UserModel.updateUserPasswordById(u_id, new_password, (err, affectedRows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    if (affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ message: "Password updated successfully" });
  });
};
  
  module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    deleteUserById,
    updateUserPasswordById
  };
  
  
  