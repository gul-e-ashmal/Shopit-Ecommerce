const ErrorHandler = require("../utils/ErrorHandler");

const ErrorMiddleware= (err,req,res,next)=>{

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: `Invalid value for ${err.path}: ${err.value}`
        });
    }

    if (err.name === 'CastError') {
        return res.status(401).json({
        });
    }

    if (err.name === 'JsonWebTokenError') {
       const message=` JSonwebtoken is not found`;

       new ErrorHandler(message,400)
    }

    
    if (err.code === 11000) {
        const message=` Duplicate key error`;
 
        new ErrorHandler(message,400)
     }

     
    if (err.name === 'Token Expired Error') {
        const message=` JSonwebtoken is expired`;
 
        new ErrorHandler(message,400)
     }
    const message=err?.message || "internal server error";
    const statuscode=err?.statuscode || 500

    if (process.env.NODE_ENV== "DEVELOPMENT"){
        res.status(statuscode).json({
            Message:message,
            error:err,
            stack:err?.stack
        })
    }

    if (process.env.NODE_ENV== "PRODUCTION"){
        res.status(statuscode).json({
            Message:message
        })
    }
}

module.exports=ErrorMiddleware;