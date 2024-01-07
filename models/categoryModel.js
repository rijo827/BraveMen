const mongoose = require("mongoose");




const categorySchema  = new mongoose.Schema({

 
    CategoryName:{
        type:String,
        required:true
    },
    isActvie:{

        type:Boolean,
        default:true
    },
    Description:{
        type: String,
    }

})

module.exports = mongoose.model("CategoryDetails",categorySchema,"CategoryDetails");
