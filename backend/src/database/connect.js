import mongoose, { Error } from "mongoose";
import { DB_NAME } from "../utils/constants.js";

export const connectDB = async ()=>{
    try{
        const connectionInfo = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`\n Database connected : ${connectionInfo.connection.host}`);
    }
    catch(err){
        console.error('database connection failed:', err);
        throw new Error(err);
    }
}