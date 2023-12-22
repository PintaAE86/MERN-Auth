//check the cookie
//parse the cookie use cookie parser

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt; //we can do this becasue the cookie parser will translate json to object
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password');
            console.log('hittin it', req.user)
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token')
        }
    }else{
        res.status(401);
        throw new Error('Not authrized, no token')
    }
});

export { protect };