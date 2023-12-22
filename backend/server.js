import express from "express";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json()); //instead of using const bodyParser = require('body-parser)
//then you would have to use app.use(bodyParser.json()) --> its a third-party middle to handlhttp to parse request bodies 
app.use(express.urlencoded({extended: true})); //used to handle encoded data in HTML forms 

dotenv.config(); //to read the .env files 

const port = process.env.PORT || 3000;

connectDB();

app.use(cookieParser());
app.use('/api/users', userRoutes);
app.get('/', (req, res)=>res.send('Server is Running'));

app.use(notFound);//this is catch all, 
app.use(errorHandler);

app.listen( port, ()=>(console.log(`Listening on port: ${port}...`)))

// POST /api/users -Register a user
// POST /api/users/auth
// POST /api/users/logout
// GET /api/users/profiles
// PUT /api/users/profiles  