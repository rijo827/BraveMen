const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel')



const islogout = (req, res, next) => {
  const token = req.cookies?.jwttoken
  console.log("token====>>>",token);

    if (!token) {
      console.log("Admin is not loged in!");   
      next();
    } else {
      console.log("Token ====>>>",token);
      const verifytoken=  jwt.verify(token,process.env.SECRATE_KEY)
   if(verifytoken){

    console.log("Admin logged in!");   
    res.redirect('/admin/home');
   }
   else{
    res.redirect('/admin/?err=true&msg=You are not autherized');
  }
    }
  };

  const islogin =  async (req, res, next) => {
    if (req.cookies?.jwttoken) {
      console.log("Admin is logged in!");   
      const adminID=req.cookies.adminID
      const admin= await  adminModel.findById(adminID)
      req.body.admin=admin;
      console.log("User loged in!");   
      next();
    } else {
      console.log("Admin not logged in!");   
      res.redirect('/admin/?err=true&msg=Login first to access it');
    }
  };

  module.exports={

    islogout,
    islogin,
  }