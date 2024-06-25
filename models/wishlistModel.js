const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const wishlistSchema= new mongoose.Schema({

    User : {
        type:ObjectId,
        ref:"UserDetails",
    },
  
    Product:{
        type:ObjectId,
        ref:"ProductDetails",
    },    
    createdOn:{
        type:Date,
      },
      isDeleted:{
        type:Boolean,
        default:false,
      }

})




module.exports = mongoose.model("wishlistDetails", wishlistSchema,"wishlistDetails");
