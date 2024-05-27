const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const router = express.Router();

router.route('/').post(userController.createUser)
router.route('/').get(userController.getAllUser)
router.route('/:userId').get(userController.getUserById)
router.route('/').patch(authController.protect, userController.updateUser)
router.route('/').delete(authController.protect, userController.deleteUser)

module.exports = router