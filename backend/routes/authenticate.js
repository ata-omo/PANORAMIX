const route = require("express");

const router= route.Router();

const User = require("../models/User");

const CryptoJS = require("crypto-js");

//SIGNUP

router.post("/register",async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // password: req.body.password
        password: CryptoJS.AES.encrypt(req.body.password , process.env.SECRET_KEY).toString(),
    });

    console.log(newUser);

    try{
        const user = newUser.save();

        res.status(201).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})



//LOGIN

router.post("/login",async(req,res) =>{
    try{

        const user = await User.findOne({email: req.body.email}); // find the user in the database with the given email.
        !user && res.status(401).json("oops wrong credentials!!");// if the user is not found then set the status code as 401 and display the message.

        const pass= CryptoJS.AES.decrypt(user.password, 'secret key 123');
        const passText = pass.toString(CryptoJS.enc.Utf8);

        passText !== req.body.password && res.status(401).json("oops wrong credentials");

        const {password, ...info} = user._doc;//destructuring the whole info into two catagories i.e. password and the other so that we can avoid sending the password to the api request.

        res.status(201).json(info);;
    }
    catch(err){
        res.status(502).json(err);
    }
})

module.exports = router;