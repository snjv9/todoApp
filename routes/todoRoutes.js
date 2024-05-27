const express = require('express')
const todoController = require('../controllers/todoController')
const authController = require('../controllers/authController')
const router = express.Router();

router.route('/').post(authController.protect, todoController.createTodo)
//router.route('/all').get(todoController.getAllTodos)
router.route('/').get(authController.protect, todoController.getAllTodoForUser)
router.route('/:todoId').get(authController.protect, todoController.getTodo)
router.route('/:todoId').patch(authController.protect, todoController.updateTodo)
router.route('/:todoId').delete(authController.protect, todoController.deleteTodo)

module.exports = router