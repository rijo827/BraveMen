const adminModel = require("../models/adminModel")




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

const loadUser= async (req,res)=>{
console.log("loadUser ====>>>");
  try {
    res.render("Userslist",{isAuthenticted: true})
  } catch (error) {
    
  }
}


module.exports = {
  adminLogin,
  adminLogged,
  Admindashboad,
  loadUser
}