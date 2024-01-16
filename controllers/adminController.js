const adminModel = require("../models/adminModel")
const userModel= require('../models/userModel')
const jwt = require('jsonwebtoken');




const adminLogin= async (req,res) =>{
console.log("its logging ....");
  try {
    const Username= req.body.Username
  const Password= req.body.Password
        const admin = await adminModel.findOne({UserName: Username})

        if(admin){

            if(admin.Password===Password){
          
              let payload = { adminID: admin._id };
              console.log("payload ====>>>", payload);
          const token = jwt.sign(payload, process.env.SECRATE_KEY, { expiresIn: '1d' });
          if (token) {
            admin.jwt_token = token;
            admin.save()
              .then(() => {
                console.log("token======>>>>", token);
                res.cookie('jwttoken', token, { httpOnly: true });
                res.cookie('adminID', payload.adminID, { httpOnly: true });
                console.log("Yes Its U");
                req.session.adminID= admin._id
                console.log("logged succesully ");
                  
                res.redirect("/admin/home")
              })
              .catch((err) => {
                res.redirect("/admin/?err=true&msg=Something went wrong!");
              });
          } else {
            res.redirect("/admin/?err=true&msg=You are not Authenticated!");
          }
             
            }
            else{
              res.redirect("/admin/?err=true&msg=Incorrect Password!");
            }
        }
        else{
          res.redirect("/admin/?err=true&msg=Unautherised Access!");
        }
    
  } catch (error) {
    
  }
}







const adminLogged  = async (req,res)=>{
console.log("adminLogged....");
  try {
    const err = req.query.err;
    const msg = req.query.msg;
    if (err) {
      res.render("AdminLogin", { errmsg: msg, succmsg:'' ,isAuthenticted:false});
    } else {
      res.render("AdminLogin", { succmsg: msg, errmsg:'',isAuthenticted:false });
    }
  } catch (error) {
    console.log(error);
  }
}

const adminLogout = async (req,res)=>{

  let admin = req.cookies?.jwttoken
  if(admin){
    res.clearCookie('jwttoken');
    console.log("its cleared");
    res.redirect('/admin')
  }
}

const Admindashboad= async (req,res)=>{

  try {
    let admin = req.cookies.jwttoken;
    if(admin){
      res.render("home",{isAuthenticted: true})
    }else{
      res.render("home",{isAuthenticted: false})
    }
  } 
  catch (error) {
    
  }
}

const Userlist= async (req,res)=>{
  console.log("Userlist ====>>>");
  
  const User= await userModel.find()
  console.log("User>>>>>",User);
  console.log("User>>>>>",User.length);
    try {
      res.render("Userslist",{isAuthenticted: true,user:User})
    } catch (error) {
      
    }
  }

  const statusUpdate= async (req,res)=>{
    console.log("statusUpdate ====>>>");
    const userId = req.body.userId;
    console.log(userId);
    const User= await userModel.findOne({_id:userId})
    console.log("User>>>>>",User);
    console.log("User>>>>>",User.Email);
    User.Blocked = !User.Blocked;
    await User.save();
      try {
        return res.json({ success: true, isAuthenticted: true,user:User });

      } catch (error) {
        console.log(error);
      }
    }


module.exports = {
  adminLogin,
  adminLogged,
  Admindashboad,
  Userlist,
  statusUpdate,
  adminLogout
}