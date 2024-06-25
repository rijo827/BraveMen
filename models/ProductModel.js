const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;



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
        type:ObjectId,
        required:true,
        ref:"CategoryDetails",
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
      type:{
        type:String,
        required:true
      },
      shippingFees:{
        type:Number,
        required:true
      },
      taxRate:{
        type:Number,
        required:true
      },
      isDeleted :{
        type:Boolean,
        default:false
      },
      isActive:{

        type:Boolean,
        default:false
      },
      inStock:{
        type:Boolean,
        default:true  
      },

})
module.exports = mongoose.model("ProductDetails", productSchema,"ProductDetails");
