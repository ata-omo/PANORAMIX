const route = require("express");

const router = route.Router();

const Row = require("../models/Row");

const verify = require("../verifyJWT");






// UPlOAD/CREATE NEW CONTENT

router.post("/", verify, async (req, res) => {
    //req.params returns an object which contains properties mapped to the named route (parameter) which is "id"(/:id wala) in this case.
    if (req.user.isAdmin) {

        const newRow = new Row(req.body);

        try {
            const saveRow = await newRow.save();

            res.status(201).json(saveContent);
        }
        catch (err) {
            res.status(500).json(err);
        }

    }
    else {
        res.status(403).json("Sorry you are not allowed :("); 
    }
})







// DELETE THE ROW


router.delete("/:id", verify, async (req, res) => {
    //req.params returns an object which contains properties mapped to the named route (parameter) which is "id"(/:id wala) in this case.
    if (req.user.isAdmin) {

        try {
            await Row.findByIdAndDelete(req.params.id);

            res.status(200).json("row deleted successfully");
        }
        catch (err) {
            res.status(500).json(err);
        }

    }
    else {
        res.status(403).json("Sorry you are not allowed :("); 
    }
})






// UPDATE THE LIST



router.put("/:id", verify, async (req, res) => {
    

    if (req.user.isAdmin) {

        try {
            const updatedRow = await Row.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            res.status(201).json();
        }
        catch (err) {
            res.status(500).json(err);
        }

    }
    else {
        res.status(403).json("Sorry you are not allowed :("); 
    }
})







module.exports = router;