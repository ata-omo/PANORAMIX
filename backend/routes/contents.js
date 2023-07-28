const route = require("express");

const router = route.Router();

const Content = require("../models/Content");

// const CryptoJS = require("crypto-js");

const verify = require("../verifyJWT");






// UPlOAD/CREATE NEW CONTENT

router.post("/", verify, async (req, res) => {
    //req.params returns an object which contains properties mapped to the named route (parameter) which is "id"(/:id wala) in this case.
    if (req.user.isAdmin) {

        const newContent = new Content(req.body);

        try {
            const saveContent = await newContent.save();

            res.status(201).json(saveContent);
        }
        catch (err) {
            res.status(500).json(err);
        }

    }
    else {
        res.status(403).json("Please mind your own business you cannot create any content :)")
    }
})







// UPDATE CONTENT


router.put("/:id", verify, async (req, res) => {
    //req.params returns an object which contains properties mapped to the named route (parameter) which is "id"(/:id wala) in this case.
    if (req.user.isAdmin) {

        try {
            const updatedContent = await Content.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            res.status(200).json(updatedContent);
        }
        catch (err) {
            res.status(500).json(err);
        }

    }
    else {
        res.status(403).json("Please mind your own business you cannot create any content :)")
    }
})







// DELETE CONTENT


router.delete("/:id", verify, async (req, res) => {
    //req.params returns an object which contains properties mapped to the named route (parameter) which is "id"(/:id wala) in this case.
    if (req.user.isAdmin) {

        try {
            await Content.findByIdAndDelete(req.params.id);

            res.status(200).json("content deleted successfully...");
        }
        catch (err) {
            res.status(500).json(err);
        }

    }
    else {
        res.status(403).json("Please mind your own business you cannot delete any content :)")
    }
})







// FETCH/GET CONTENT


router.get("/:id", verify, async (req, res) => {
    //req.params returns an object which contains properties mapped to the named route (parameter) which is "id"(/:id wala) in this case.

    try {
        const ourContent = await Content.findById(req.params.id);

        res.status(200).json(ourContent);
    }
    catch (err) {
        res.status(500).json(err);
    }


})






module.exports = router;