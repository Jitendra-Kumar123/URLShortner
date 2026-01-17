import mongoose from "mongoose"

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
        require: true
    },
    avatar: {
        type: String,
        require: false,
        default: function(){
            return getGravatarUrl(this.email);
        },
    },
});

function getGravatarUrl(email){
    const hash = require('crypto')
    .createHash('md5')
    .update(email.trim().toLowerCase())
    .digest('hex');
}

const User = mongoose.model("User", userSchema);

export default User;