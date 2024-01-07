  const mongoose = require("mongoose");
  const bcrypt = require('bcrypt');

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

UserSchema.pre('save', async function (next) {
  try {
      const saltRounds = 10;
      console.log("this.Password>>>>>>>>>",this.Password);
      if (this.isModified('Password')) {
          const hashedPassword = await bcrypt.hash(this.Password, saltRounds);
          this.Password = hashedPassword;
          console.log("hashedPassword=====>>>>",hashedPassword);
          console.log("Hashing is working ");
      }else{
        console.log("hashing not working");
        next();

      }
  } catch (error) {
      next(error);
  }
});




module.exports = mongoose.model("UserDetails", UserSchema,"UserDetails");
