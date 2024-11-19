const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncAwait = require("./CatchAsyncAwait");
const jwt = require("jsonwebtoken");
const User = require('../models/usermodel')


const AuthUser = CatchAsyncAwait(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        next(new ErrorHandler("Please first login", 500))
    }

    const decoded = jwt.verify(token, 'secret');
    req.user = await User.findById(decoded.id);


    next();
})


module.exports = AuthUser;