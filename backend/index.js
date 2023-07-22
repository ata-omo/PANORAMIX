const express = require("express");
const mongoose= require("mongoose");
const dotenv = require("dotenv");
const authRoute= require("./routes/authenticate")


dotenv.config();

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex : true,
  }
)
.then(()=>console.log("database connected successfully.."))
.catch(err=>console.log(err));


//database connected



const app = express();


app.use(express.json());
app.use("/backend/authenticate", authRoute);

//thank you "npx kill-port 5500"
app.listen(5500,()=>{
    console.log("hello server");
});