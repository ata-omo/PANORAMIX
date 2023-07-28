const router = require("express").Router();

// const router= route.Router();

const User = require("../models/User");

const CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken");

//SIGNUP

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // password: req.body.password
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),

    });

    // console.log(newUser);

    try {
        const user = await newUser.save();

        res.status(201).json(user);
        // console.log(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
})



//LOGIN

router.post("/login", async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email }); // find the user in the database with the given email.
        !user && res.status(401).json("oops wrong credentials!!");// if the user is not found then set the status code as 401 and display the message.

        const pass = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const passText = pass.toString(CryptoJS.enc.Utf8);

        passText !== req.body.password && res.status(401).json("oops wrong credentials");

        const jwtKey = process.env.SECRET_KEY;

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, jwtKey, { expiresIn: "7d" });// this will create the token and hide the provided info, secret key can be any thing our choice and this token is valid for the given time duration.we can also apply the auto refresh token feature to make the application more secure.

        console.log('jwt token: ', accessToken);

        const { password, ...info } = user._doc;//destructuring the whole info into two catagories i.e. password and the other so that we can avoid sending the password to the api request.

        res.status(200).json({ ...info, accessToken });

        // res.status(200).json(user);
    }
    catch (err) {
        res.status(502).json(err);
    }
})



module.exports = router;