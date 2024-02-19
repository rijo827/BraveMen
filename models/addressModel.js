const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({


    Name: {
        type:String,
        required:true
    },

    Address: {
        type : String,
        required:true
    },
    Pincode:{
        type:Number,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State: {
        type:String,
        required:true
    },
    Landmark:{
        type:String,
        required:true
    },
    MobileNumber:{
        type:Number,
        required: true
    },
    AlternativeNumber:{
        type:Number,
        required:true
    },
    AddressType:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Address", addressSchema,"Address");
