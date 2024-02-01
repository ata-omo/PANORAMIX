import mongoose,{Schema, mongo} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    favourites: Array,
})

export const User = mongoose.model("User",userSchema);