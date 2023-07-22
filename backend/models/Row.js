const mongoose = require("mongoose");

const RowSchema = new mongoose.Schema({

    title: {type: String, required: true, unique:true},
    type: {type: String},
    gener: {type: String},
    content: {type: Array}
},
{timestamps: true}
);


module.export = mongoose.model("Row", RowSchema);