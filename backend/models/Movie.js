const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({

    title: {type: String, required: true, unique:true},
    description: {type: String, required: true, default: ""},
    gener: {type: String},
    duration: {type: Number},
    year: {type: Number},
    // catagory: {type: String},
    isSeries: {type: Boolean, default: false},
    img: {type: String, default:""},
    thumbnail: {type: String, default:""},
    titleimg: {type: String, default:""},
    trailer: {type: String},
    video: {type: String},
},
{timestamps: true}
);


module.export = mongoose.model("Movie", MovieSchema);