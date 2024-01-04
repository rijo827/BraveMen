  const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
    Password: {
      type: String,
      required: true,
    },
  Email: {
    type: String,
    required: true,
  },
  Blocked:{ 
    type:Boolean,
    default:false
  },
  jwt_token: {
    type: String
  }
});


module.exports = mongoose.model("UserDetails", UserSchema,"UserDetails");
