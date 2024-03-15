
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');



const islogout = (req, res, next) => {
 
  const token = req.cookies?.jwtusertoken
console.log("token====>>>",token);
    if (!token) {
      console.log("User not loged in!");   
      next();
    } else {
      console.log("Token ====>>>",token);
      const verifytoken=  jwt.verify(token,process.env.SECRATE_KEY)
      if(verifytoken){
        console.log("User loged in!");   
        res.redirect('/');
      }
        else{
          res.redirect('/login?err=true&msg=You are not autherized');
        }
    }
  };



  const islogin = async (req, res, next) => {
 
    if (req.cookies?.jwtusertoken) {
      console.log("User loged in!");   
      const userID=req.cookies.userID
      const user= await  userModel.findById(userID)
      req.body.user=user;
      console.log("req.body.user====>>>",req.body.user);
      next();
    } else {
      console.log("User not loged in!");   
      res.redirect('/login?err=true&msg=Login first to access it');
    }
  };

  const isBlocked = async (req,res,next)=>{
    const userID=req.cookies.userID
    console.log("userID=====>>>>",userID);
    try {
      const User= await userModel.findById(userID)
      if(User && User.Blocked===true){
        console.log("User Is Blocked");
        res.redirect("/blocked")
      }
    } catch (error) {
      console.log(error);
    }
  }


  module.exports={

    islogout,
    islogin,
  }