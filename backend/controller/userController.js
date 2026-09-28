const userService = require('../services/userService');

exports.addUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = await userService.createUser({ name, email, phone });
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phone } = req.body;
    const user = await userService.updateUser(userId, { name, email, phone });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
