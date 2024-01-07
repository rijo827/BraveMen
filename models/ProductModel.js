const mongoose = require("mongoose");




const productSchema = new mongoose.Schema({


    productName: {

        type:String,
        required:true
    },
    description: {
         type:String,
         required:true
    },
    category:{
        type:String,
        required:true
    },
    regularPrice :{
            type:Number,
            required:true
    },
    salePrice:{
           type:Number,
           required:true           
    },
    createdOn:{
      type:Date,
    },
    brand:{

      type:String,
      required:true
    },
    stock:{
        type:Number,
        required:true
    },
    size:{
        type:Array,
        required:true
    },
    color: {
        type:Array,
        required:true
    },
    Material:{
        type:Array,
        required:true
    },
    blocked :{
      type:Boolean
    },
    Image:{
        type:Array,
        required:true
    },

})
module.exports = mongoose.model("ProductDetails", productSchema,"ProductDetails");
