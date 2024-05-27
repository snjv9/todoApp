const User = require('../models/userModel')

exports.createUser = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber
        });

        res.status(201).json({
            status: 'success',
            data: newUser
        });
    } catch (err) {
        res.status(500).json({
            status: "Error",
            message: err.message
        })
    }
};

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            data: users
        })
    } catch (err) {
        res.status(500).json({
            status: 'Error',
            message: "Error Reading Users"
        })
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId);

        res.status(200).json({
            status: "success",
            data: user || "user not found"
        })
    } catch (err) {
        res.status(500).json({
            status: 'Error',
            message: "Error Reading user"
        })
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.userId);
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

        await user.save();
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (err) {
        res.status(500).json({
            status: 'Error',
            message: "Error Updating user"
        })
    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        let user = await User.deleteOne({ _id: req.params.userId });
        res.status(204).json({
            status: "success",
            data: user
        })
    } catch (err) {
        res.status(500).json({
            status: 'Error',
            message: "Error Deleting user"
        })
    }
}