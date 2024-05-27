const mongoose = require('mongoose')
const { phone } = require('phone')
const validator = require('validator')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validator: [validator.isEmail, 'invalid Email'],
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    phoneNumber: {
        type: String,
        minLength: 10,
        maxlength: 10,
        validator: {
            validate: function (num) {
                const temp = phone(num, { country: 'IN' })
                return temp.isValid
            },
            message: "Please Check Phone Number"
        },
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

// Hash the password with cost of 12
userSchema.pre('save', async function (next) {

    if (this.password) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    ;
    next();
});

//Compare Passwords(checking if provided password is correct)
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema)

module.exports = User;

