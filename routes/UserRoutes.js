const express= require('express')
const userroute=express()
const userControler = require("../controllers/userController")
const userMiddleware = require("../middleware/UserMiddleware")

const bodyParser = require("body-parser")

userroute.set('views','./views/Userview')
 userroute.use(bodyParser.json())
userroute.use(bodyParser.urlencoded({extended: false}))

userroute.get('/',userControler.loadhome)
userroute.get('/account',userControler.userAccountGet)

userroute.get('/login',userMiddleware.islogout, userControler.loadLogin)
userroute.post('/login',userMiddleware.islogout, userControler.loggingUser)

userroute.get('/forgotPassword',userMiddleware.islogout, userControler.forgotPassword)
userroute.post('/reset',userMiddleware.islogout, userControler.updatePassword)


userroute.get('/signup',userMiddleware.islogout, userControler.loadRegister)
userroute.post('/signup',userMiddleware.islogout, userControler.insertUser)
userroute.post('/send-otp',userControler.SendOtp)
// userroute.post('/verify-otp',userControler.verifiOtp)


userroute.get('/shop',(req,res)=>{res.render("shop-grid-left")})
userroute.get('/about',(req,res)=>{res.render("page-about")})
userroute.get('/contact',(req,res)=>{res.render("page-contact")})


module.exports=userroute;