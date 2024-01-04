const userModel = require("../models/userModel");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const jwt = require('jsonwebtoken');
const UserModel = require("moongose/models/user_model");
const bcrypt = require('bcrypt');

// let generatedOtp = "";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rijojoy827@gmail.com",
    pass: "wdoa xixp vrlq mdol",
  },
});

const otpStorage = {};

// Route to send OTP
const SendOtp = async (req, res) => {
  console.log(" SendOtp ");
  const Email = req.body.Email;
  console.log("Email   ===>>>  ", Email);

  // Generate OTP
  const otp = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  console.log("otp  >>>>>>>", otp);

  // Save OTP to storage`
  otpStorage[Email] = otp;
  setTimeout(() => {
    console.log("otpStorage   ===>>>  ",otpStorage);
    console.log("Otp expired");
    console.log("expired is otpStorage[Email]  ===>>>   ",otpStorage[Email]);
    delete otpStorage[Email];
    console.log("otpStorage   ===>>>  ",otpStorage);
  }, 20 * 1000);
// 5 * 60 * 1000
  console.log("otpStorage[Email]  >>>>>>>", otpStorage[Email]);
  console.log("otpStorage  >>>>>>>", otpStorage);

  // Email configuration
  const mailOptions = {
    from: "rijojoy827@gmail.com",
    to: Email,
    subject: "Your OTP",
    text: `Your OTP is: ${otp}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Failed to send OTP");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("OTP sent successfully");
    }
  });
};

// Route to verify OTP
const verifiOtp = async (Email, otp, req, res) => {
  console.log(" verifiOtp ");

  console.log("Email  >>>>>>>", Email);
  console.log("otp  >>>>>>>", otp);

  // Retrieve saved OTP from storage
  const storedOtp = otpStorage[Email];
  console.log("storedOtp  >>>>>>>", storedOtp);

  if (otp === storedOtp) {
    console.log("OTP verified successfully");
    return true;
  } else {
    return false;
  }
};


const updatePassword= async (req,res)=>{


  try {
    console.log("Updated Password");
    const Email = req.body.Email;
    const newPassword = req.body.Password;

    // Find the user by email
    const user = await userModel.findOne({ Email: Email });

    if (user) {
      // Update the password
      if(user.Password===newPassword){
        console.log("You Cant give same Password");
        res.redirect("/forgotPassword?err=true&msg=You Cant give same Password")
      }
      else{
      user.Password = newPassword;
      await user.save();
   console.log("Password updated successfully");  
       res.redirect("/login")   

      }
    } else {
      // User not found
     console.log("User not found ");
     res.redirect("/forgotPassword?err=true&msg=User not found")

    }
  } catch (error) {
    console.error(error);
    
  }

}

const forgotPassword =async (req,res)=>{
  

  const err=req.query.err
  const msg=req.query.msg

  if(err){
    res.render("forgotPassword",  { succmsg: '', errmsg: msg ,isAuthenticted:false })


  }else{
    res.render("forgotPassword",  { succmsg: msg, errmsg:'',isAuthenticted:false })

  }


}




const insertUser = async (req, res) => {
  try {
    
    const {Firstname,Lastname,Phone,Password,Email}=req.body
    const checkdata = await userModel.findOne({ Email: Email });
    if (checkdata) {
      console.log("checkdata   ===>>>  ", checkdata);
      res.redirect("/signup?err=true&msg=Email Already Exists");
    } else {

      let newPassword = await bcrypt.hash(Password,10);

      console.log("newPassword======>>>>>",newPassword);
      const User = new userModel({
        Firstname: Firstname,
        Lastname: Lastname,
        Email: Email,
        Password: newPassword,
        Phone: Phone,
      });
    
      const isVerifiedPromise = verifiOtp(Email, req.body.otp);
      
      isVerifiedPromise.then((isVerified) => {
        if (isVerified) {
            saveUser()
    
        } else {
          res.redirect("/signup?err=true&msg=Invalid Otp");
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Invalid OTP',
        //     text: 'Please enter a valid OTP.',
        //   });
        }
      
        console.log("USer====>",User);
        console.log(isVerified);
      });


      const saveUser =  ( async ()=>{
       await User.save();
        // req.session.userID = User._id;
        let payload={UserID: User._id}
        const token = jwt.sign(payload, process.env.SECRATE_KEY, { expiresIn: '1d' });
        console.log(" payload=====>>>",payload);
       
          console.log("token======>>>>",token);
     
          res.cookie('jwttoken', token, { httpOnly: true });
          res.cookie('userID', payload.UserID, { httpOnly: true });
      // localStorage.setItem("access_token",payload)
        console.log(" req.session.userID  ===>>", req.session.userID);
        console.log("Account created successfully");
        res.redirect("/");
        User.jwt_token=token;

      })
    
    }
  } catch (error) {}
};

const loadRegister = async (req, res) => {
  try {
    const err = req.query.err;
    const msg = req.query.msg;
    if (err) {
      res.render("register", { errmsg: msg, succmsg:'' ,isAuthenticted:false});
    } else {
      res.render("register", { succmsg: msg, errmsg:'',isAuthenticted:false });
    }
  } catch (error) {
    console.log(error);
  }
};


const loadLogin = async (req,res)=>{
  
  try {
    const err = req.query.err;
    const msg = req.query.msg;
    if (err) {
      res.render("login", { errmsg: msg, succmsg:'' ,isAuthenticted:false});
    } else {
      res.render("login", { succmsg: msg, errmsg:'',isAuthenticted:false });
    }
  } catch (error) {
    console.log(error);
  }
}


const loggingUser= async (req,res)=>{

  try {
    const Email= req.body.Email
    const password=req.body.Password

    const User = await userModel.findOne({ Email: Email });

    if(User){
          if(User.Password === password){
            // req.session.userID=User._id

            let payload={UserID: User._id}
            console.log(" payload=====>>>",payload);
            const token = jwt.sign(payload, process.env.SECRATE_KEY, { expiresIn: '1d' });
            if(token){
              User.jwt_token= token;
              User.save().then(()=>{
                console.log("token======>>>>",token);
                res.cookie('jwttoken', token, { httpOnly: true });
                res.cookie('userID', payload.UserID, { httpOnly: true })
                console.log(" Yes Its  U");
                res.redirect('/')
              }).catch((err)=>{
                res.redirect("/login?err=true&msg= Something went wrong!");
              })
         
            }else{
              res.redirect("/login?err=true&msg= You are  not Autherized!");
            }
              
          }
          else{
            res.redirect("/login?err=true&msg=Incorrect Password!");
          }
      
    }else{
      res.redirect("/login?err=true&msg=User not Found!");
  
    }
  } catch (error) {
    console.log(error);
  }
}

const loadhome = async(req,res)=>{
  // let user = req.session.userID;
  let user = req.cookies?.jwttoken
  let userID=req.cookies?.userID
  console.log("userId >>>>>>",userID);
  if(user && userID){

   let thisUser = await userModel.findById(userID);
   console.log("User name>>>>", thisUser.Firstname)
    res.render("home",{isAuthenticted: true})
  }else{
    res.render("home",{isAuthenticted: false})
  }
}

const userAccountGet = async(req,res)=>{

  try {
    let token = req.cookies.jwttoken;
    let userID=req.cookies.userID
  if(token){
    res.render("userAccount",{isAuthenticted:true})
    // res.render("home",{isAuthenticted: true})
  }else{
    res.redirect("/login?err=true&msg=Login first to access it");
  }
    
  } catch (error) {
    
  }
}
 const loggoutUser = async (req,res)=>{

  let user = req.cookies?.jwttoken

  if(user){
    res.clearCookie('jwttoken');
    console.log("its cleared");
    res.redirect('/')
  }

 }

module.exports = {
  insertUser,
  loadRegister,
  SendOtp,
  verifiOtp,
  updatePassword,
  forgotPassword,
  loadLogin,
  loggingUser,
  loadhome,
  userAccountGet,
  loggoutUser,
};
