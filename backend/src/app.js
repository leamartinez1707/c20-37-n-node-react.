import express from 'express';
import router from './routes/index.routes.js';
import __dirname from './utils.js';
import envs from './config/envs.config.js';
import session from "express-session"
import { connectMongoDB } from './config/mongoDB.config.js';
import { initializePassport } from "./config/passport.config.js";
import passport from 'passport';
import cookieParser from 'cookie-parser';

const app = express();  

connectMongoDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session(
    {
        secret: envs.SECRET_CODE,
        resave: false,
        saveUninitialized: false
    }
));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);

app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
})