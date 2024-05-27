const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({

    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
        select: false
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now(),
        select: false
    }
}, {   //when we have virtual property set up and we want to show them
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

todoSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: '_id name email '
    })
    next();
})
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;