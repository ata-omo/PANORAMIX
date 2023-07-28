const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/authenticate");
const userRoute = require("./routes/users");
const contentRoute = require("./routes/contents");
const rowRoute = require("./routes/rows");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


dotenv.config();

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex : true,
  }
)
  .then(() => console.log("database connected successfully.."))
  .catch(err => console.log(err));


//database connected



app.use("/backend/authenticate", authRoute);
app.use("/backend/users", userRoute);
app.use("/backend/contents", contentRoute);
app.use("/backend/rows", rowRoute);



//thank you "npx kill-port 5500"
app.listen(5500, () => {
  console.log("hello server");
});