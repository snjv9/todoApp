const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

const AppError = require('../utils/appError')
exports.createTodo = async (req, res, next) => {
    try {
        const newTodo = await Todo.create({
            user: req.user._id,
            text: req.body.text,
            completed: req.body.completed,
            userId: req.user._id
        });

        res.status(201).json({
            status: 'success',
            data: newTodo
        });
    } catch (err) {
        res.status(500).json({
            status: "Error",
            message: err.message
        })
    }
};

exports.getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            status: "success",
            results: todos.length,
            data: todos
        })
    } catch (err) {
        res.status(500).json({
            status: 'Error',
            message: err.message || "Error Reading All Todos"
        })
    }
}

exports.getAllTodoForUser = async (req, res, next) => {
    try {

        const userId = req.user._id
        if (!userId || !mongoose.isValidObjectId(userId)) {
            throw new AppError('Please User Id not found, Please Login again', 404)
        }
        const todos = await Todo.find({ userId: userId });
        res.status(200).json({
            status: "success",
            results: todos.length,
            data: todos
        })
    } catch (err) {
        res.status(500).json({
            status: 'Error',
            message: err.message || "Error Reading Todos for the User"
        })
    }
}

exports.getTodo = async (req, res, next) => {
    try {
        const todoId = req.params.todoId

        if (!todoId || !mongoose.isValidObjectId(todoId)) {
            throw new AppError('Please provide Todo Id in request parameters', 301)
        }
        const todo = await Todo.findById(todoId)
        if (todo.user._id.toString() !== req.user._id.toString()) {
            console.log(todo.userId, req.user._id)
            throw new AppError('This Todo does not belong to you', 403)
        }

        res.status(200).json({
            status: "success",
            data: todo || "todos not found"
        })
    } catch (err) {
        res.status(500).json({
            status: 'Error',
            message: err.message || "Error Reading Todo"
        })
    }
}


exports.updateTodo = async (req, res, next) => {
    try {
        const todoId = req.params.todoId

        if (!todoId || !mongoose.isValidObjectId(todoId)) {
            throw new AppError('Please provide Todo Id in request parameters', 400)
        }
        let todo = await Todo.findById(todoId);

        if (todo.user._id.toString() !== req.user._id.toString()) {
            throw new AppError('This Todo does not belong to you', 403)
        }
        todo.text = req.body.text ?? todo.text;
        todo.completed = req.body.completed ?? todo.completed;
        todo.userId = req.user._id.toString();
        await todo.save();

        res.status(200).json({
            status: "success",
            data: todo
        })
    } catch (err) {
        res.status(500).json({
            status: 'Error',
            message: err.message || "Error Updating Todo"
        })
    }
}
exports.deleteTodo = async (req, res, next) => {
    try {
        const todoId = req.params.todoId
        if (!todoId || !mongoose.isValidObjectId(todoId)) {
            throw new AppError('Please provide Todo Id in request parameters', 400)
        }
        let todo = await Todo.findById(todoId);

        if (todo.user._id.toString() !== req.user._id.toString()) {
            throw new AppError('This Todo does not belong to you', 403)
        }
        let deletedTodo = await Todo.deleteOne({ _id: todoId });
        res.status(204).json({
            status: "success",
            data: deletedTodo
        })
    } catch (err) {
        res.status(500).json({
            status: 'Error',
            message: err.message || "Error Deleting Todo"
        })
    }
}