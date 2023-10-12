const mongoose = require('mongoose');

const UserCollection = new mongoose.Schema({
    username: {
        type: String,
        
        required: true,
        unique: true, 
        maxlength: 100,
        lowercase: true
      },
    password: {
        type: String,
        required: true,
        maxlength: 50
      },
    email: {
        type: String,
        unique: true, 
        maxlength: 50,
        lowercase: true
      },

});


const User = mongoose.model("User", UserCollection);
module.exports = User;