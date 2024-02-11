import cors from 'cors';
import express from 'express';


const app = express();

// configure cors
const corsOptions = {
    origin : process.env.ALLOWED_ORIGIN,
    optionSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));

// configure for JSON data
app.use(express.json({
    limit: "16kb",
}));

// configure for URL data
app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}));



import { userRouter } from './routers/User.route.js';

app.use("/api/v1/user", userRouter);

export {app};