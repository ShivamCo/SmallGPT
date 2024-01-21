import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true 
    },

    password: {
        type: String, 
        required: true, 
    },

    history: Array
})

export const userModel = mongoose.model('userModel', userSchema );
