const User = require('../models/user');

exports.createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    console.error('Error in createUser service:', error);
    throw error;
  }
};

exports.getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    console.error('Error in getAllUsers service:', error);
    throw error;
  }
};

exports.updateUser = async (userId, updatedData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return await user.update(updatedData);
  } catch (error) {
    console.error('Error in updateUser service:', error);
    throw error;
  }
};

exports.deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return await user.destroy();
  } catch (error) {
    console.error('Error in deleteUser service:', error);
    throw error;
  }
};
