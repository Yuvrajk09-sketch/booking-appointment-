const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/add-user', userController.addUser);
router.get('/get-users', userController.getUsers);
router.put('/edit-user/:id', userController.editUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;
