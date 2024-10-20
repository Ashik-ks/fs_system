const express = require('express');
const controller = require('../controller/usercontroller');

const router = express.Router();

// Route to upload video
router.post('/adduser', controller.addUser); // Endpoint to add a user
router.get('/users', controller.getAllUsers);
router.get('/user/:id', controller.getSingleUsers);
router.put('/user/:id', controller.editUser);
router.delete('/user/:id', controller.deleteUser);

module.exports = router;