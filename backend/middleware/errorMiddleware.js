//first we will create catch all error handler to catch all, for any routes that
//do not exist

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

//when you have error as you first args, express knows its your custom error handler 

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export {
    notFound,
    errorHandler
}

/*
How It Works:

    If a request hits the /api/users route and an error occurs within the route handling,
    the error will be passed to the errorHandler middleware.
    If a request hits an undefined route (not handled by any specific route),
    the notFound middleware will be triggered, setting the response status
    to 404 and passing an error to the next middleware (errorHandler).
     In both cases, the errorHandler middleware processes the error,
     sets the appropriate status code and message, and sends a JSON response.
     The application listens on the specified port.
*/