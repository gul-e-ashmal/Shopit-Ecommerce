const CatchAsyncAwait = require("../middlerware/CatchAsyncAwait");
const User = require("../models/usermodel");
const ErrorHandler = require("../utils/ErrorHandler");
const jwtToken = require("../utils/JWTToken");
const { default: sendMail } = require("../utils/sendMail");
const crypto=require("crypto")

// api/v1/register
const register = CatchAsyncAwait(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });

    jwtToken(user, 200, res)

})

// api/v1/login
const login = CatchAsyncAwait(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {

        next(new ErrorHandler("enter email and password", 500))

    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        next(new ErrorHandler("user not found", 500))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("incorrect password", 500))
    }

    jwtToken(user, 200, res);
})

const logout = CatchAsyncAwait(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        message: "logout successfully"
    })
})

const getUserDetailInfo = CatchAsyncAwait(async (req, res, next) => {

    const user = await User.findById(req?.user?._id)

    res.status(200).json({
        user,
        message: "get user detail successfully"
    })

})
// ---/api/v1/updatePassword
const updateUserPassword = CatchAsyncAwait(async (req, res, next) => {

    const user = await User.findById(req.user?._id).select("+password");

    const isPassowrd = await user.comparePassword(req.body.oldpassword);

    if (!isPassowrd) {
        return next(new ErrorHandler("old passowrd is not correct"))
    }

    user.password = req.body.password;

    await user.save();

    res.status(200).json({
        success: true
    })

})

//---/api/v1/updateProfile
const updateUserProfile = CatchAsyncAwait(async (req, res, next) => {

    const newData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req?.user?._id, newData, { new: true });

    res.status(200).json({
        user
    })

})


/// api/v1/admin/user/:id
const getSingleUser = CatchAsyncAwait(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return (new ErrorHandler("user not found"))
    }


    res.status(200).json({
        message: "success true",
        user
    })


})

// api/v1/admin/user
const getAllUsers = CatchAsyncAwait(async (req, res, next) => {
    const user = await User.find();

    res.status(200).json({
        message: "success true",
        user
    })

})

// api/v1/admin/user/:id
const updateuser = CatchAsyncAwait(async (req, res, next) => {

    const newData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newData, { new: true });

    res.status(200).json({
        message: "success true",
        user
    })

})


// api/v1/admin/user/:id
const deleteuser = CatchAsyncAwait(async (req, res, next) => {

    // let user = await User.findById(req.params.id);

    // if (!user) {
    //     return (new ErrorHandler("user not found"))
    // }

    // remove cloudaniary

    // await user.remove();

    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        user,
        message: "successfully deleted"
    })

})


// api/v1/password/forget
const forgetPassword = CatchAsyncAwait(async (req, res, next) => {

    let user = await User.findById(req.body.email);

    if (!user) {
        return (new ErrorHandler("user not found"))
    }

    const resetToken = user.getResetPasswordToken();


    await user.save();

    const resetUrl = `http://127.0.0.1:3000/api/v1/password/forget/${resetToken}`;
    const message = `your reset password url is this ${resetUrl} if you have not said please ignore this message`;


    try {
        await sendMail({
            to: user.email,
            subject: `Shopit password reset email`,
            message
        })

        res.status(200).json({
            success: true,
            message: `Message sent to mail ${user.email}`
        })
    } catch (error) {

        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save()
    }
})

// /password/reset/:token
const resetPassword = CatchAsyncAwait(async (req, res, next) => {

    const resetPasswordToken = await crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user=await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}});


    if(!user){
        return next(new ErrorHandler("Password reset token is invalid or has been expired",500))
    }

    if (req.body.password !== req.body.confirmPassword){
        return (new ErrorHandler("Password not match",500))
    }

    user.password=req.body.password;
    this.resetPasswordExpire=undefined;
    this.resetPasswordToken=undefined;

    await user.save();

    sendToken(user,200,res);
})



module.exports = { register, login, logout, getUserDetailInfo, updateUserProfile, updateUserPassword, deleteuser, updateuser, getAllUsers, getSingleUser, forgetPassword ,resetPassword}