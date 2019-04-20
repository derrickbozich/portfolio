const express = require('express');
const router = express.Router();
const users = require('../../controllers/userController');

//Get Users
router.get('/', users.getUsers);

//Create User
router.post('/', users.postUser);

//Get User
router.get('/:id', users.getUser )

//Delete
router.delete('/:id', users.deleteUser);

//Update
router.put('/:id', users.updateUser);

module.exports = router;
