import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false,
        default: function(){
            return getGravatarUrl(this.email);
        },
    },
});

function getGravatarUrl(email){
    const hash = crypto
    .createHash('md5')
    .update(email.trim().toLowerCase())
    .digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}

const User = mongoose.model("User", userSchema);

export default User;
