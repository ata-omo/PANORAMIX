import dotenv from "dotenv";
import { connectDB } from "./database/connect.js";
import { app } from "./app.js";


dotenv.config({ // environment variables avaliable for use
    path: './env'
})


connectDB().then(
    ()=>{
        app.on("error",(err)=>{  
            console.log("connected with db but failed to start the app",err);
            throw err;
        });
        app.listen(process.env.PORT || 5500, ()=>
        {
            console.log(`server running successfully on ${process.env.PORT}`);
        })
    }
)
.catch((err)=>{
    console.log('database connection failed!!',err);
})