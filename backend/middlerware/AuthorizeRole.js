const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncAwait = require("./CatchAsyncAwait");
const User = require('../models/usermodel')


const AuthorizeRole = (...roles)=>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}


module.exports = AuthorizeRole;