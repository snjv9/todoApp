const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router();

router.route('/').post(userController.createUser)
router.route('/').get(userController.getAllUser)
router.route('/:userId').get(userController.getUserById)
router.route('/:userId').patch(userController.updateUser)
router.route('/:userId').delete(userController.deleteUser)

module.exports = router