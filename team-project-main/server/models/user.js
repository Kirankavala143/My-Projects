import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type : String ,
        default : ""
    },
    gender:{
        type : String ,
        default : ""
    },
    address: {
        type : String ,
        default : ""
    },
    department: {
        type : String ,
        default : ""
    },
    domain: {
        type : String ,
        default : ""
    },
    profileImage: {
        type : String ,
        default : "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
    } 
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
