const route = require("express");

const router = route.Router();

const User = require("../models/User");

const CryptoJS = require("crypto-js");

const verify = require("../verifyJWT");



// UPDATE

router.put("/:id", verify, async (req, res) => {
    //req.params returns an object which contains properties mapped to the named route (parameter) which is "id"(/:id wala) in this case.
    if (req.user.id === req.params.id || req.user.isAdmin) {

        // we will not verify by looking at the body rather we will verify the jwt.

        if (req.body.password) { //in case we are changing/updating the password then we need to encrypt the new password.
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        }

        try {
            const updateUser = await User.findByIdAndUpdate(req.user.id,
                { $set: req.body }, { new: true }); // this will update the current user body with the requested body.
            res.status(200).json(updateUser);
        }
        catch (err) {
            res.status(500).json(err);
        }

    }
    else {
        res.status(403).json("Please mind your own business you cannot update anyone :)")
    }
})






// DELETE

router.delete("/:id", verify, async (req, res) => {
    //req.params returns an object which contains properties mapped to the named route (parameter) which is "id"(/:id wala) in this case.
    if (req.user.id === req.params.id || req.user.isAdmin) {

        // we will not verify by looking at the body rather we will verify the jwt.

        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted......");
        }
        catch (err) {
            res.status(500).json(err);
        }

    }
    else {
        res.status(403).json("Please mind your own business you are not allowed to delete anyone:)")
    }
})






// GET 

router.get("/find/:id", async (req, res) => {
    try {
        const ourUser = await User.findById(req.params.id);
        const { password, ...info } = ourUser._doc;
        res.status(200).json(info);
    }
    catch (err) {
        res.status(500).json(err);
    }
})






// GET ALL USERS (ONLY ADMIN HAVE THIS PREVILEGE)


router.get("/", verify, async (req, res) => {

    const query = req.query.new; // if admin is searching with some query.
    //The req.query property is an object containing the property for each query string parameter in the route. 

    if (req.user.isAdmin) {

        // we will not verify by looking at the body rather we will verify the jwt.

        try {
            const allUser = query ? await User.find().limit(5) : await User.find();
            res.status(200).json(allUser);
        }
        catch (err) {
            res.status(500).json(err);
        }

    }
    else {
        res.status(403).json("Hello hacker!! please mind your own business :)")
    }
})





module.exports = router;