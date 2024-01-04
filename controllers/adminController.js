const adminModel = require("../models/adminModel")
const userModel= require('../models/userModel')



const adminLogin= async (req,res) =>{
console.log("its logging ....");
  try {
    const Username= req.body.Username
  const Password= req.body.Password
        const admin = await adminModel.findOne({UserName: Username})

        if(admin){
          console.log("Inside 1st if");

            if(admin.Password===Password){
          console.log("Inside 2nd if");

              req.session.adminID= admin._id
              console.log("logged succesully ");
                res.redirect("/admin/home")
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

const Admindashboad= async (req,res)=>{

  try {
    let admin = req.session.adminID;
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
  statusUpdate
}