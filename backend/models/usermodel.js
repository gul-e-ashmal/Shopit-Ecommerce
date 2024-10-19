
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }

    const hashedpassword = await bcrypt.hash(this.password, 10);

    this.password = hashedpassword;

})

userSchema.methods.getjsonwebtoken = async function () {

    const token = await jwt.sign({ id: this._id }, 'secret', {
        expiresIn: '7d'
    });

    return token

}

userSchema.methods.comparePassword = async function (checkpassword) {
    return await bcrypt.compare(checkpassword, this.password);
}

// reset password token function
userSchema.methods.getResetPasswordToken = async function () {

    const resetToken = await crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = await crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;


    return resetToken;
}

const userModel = mongoose.model("user", userSchema)
module.exports = userModel
