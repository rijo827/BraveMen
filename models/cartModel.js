const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const cartSchema= new mongoose.Schema({
  

    User : {
        type:ObjectId,
        ref:"UserDetails",
    },
    Product:{
        type:ObjectId,
        ref:"ProductDetails",
    },    
    Quantity:{
        type:Number,
        default:1,
    },
    

})




module.exports = mongoose.model("cartDetails", cartSchema,"cartDetails");
