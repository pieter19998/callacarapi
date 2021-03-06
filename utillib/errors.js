//error handler middleware
module.exports = (err, req, res, next) => {
    if (!err) {
        err.statusCode = err.statusCode || 500;
    }
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            success : false,
            error : err,
            errMessage : err.message,
            stack : err.stack
        });
    }

    if (process.env.NODE_ENV === 'production') {
        let error = {...err};
        error.message = err.message;

        res.status(err.statusCode).json({
            success : false,
            message : err.message || 'Internal server error'
        })
    }
};
