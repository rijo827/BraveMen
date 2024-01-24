const express= require('express')
const userroute=express()
const userControler = require("../controllers/userController")
const userMiddleware = require("../middleware/UserMiddleware")
const bodyParser = require("body-parser")

userroute.set('views','./views/Userview')
 userroute.use(bodyParser.json())
userroute.use(bodyParser.urlencoded({extended: false}))

userroute.get('/',userControler.loadhome)
userroute.get('/account', userMiddleware.islogin,userControler.userAccountGet)

userroute.get('/login', userMiddleware.islogout, userControler.loadLogin)
userroute.post('/login',userMiddleware.islogout, userControler.loggingUser)
userroute.get('/logout', userControler.loggoutUser)



userroute.get('/forgotPassword',userMiddleware.islogout, userControler.forgotPassword)
userroute.post('/reset',userMiddleware.islogout, userControler.updatePassword)


userroute.get('/signup',userMiddleware.islogout, userControler.loadRegister)
userroute.post('/signup',userMiddleware.islogout, userControler.insertUser)
userroute.post('/send-otp',userControler.SendOtp)
// userroute.post('/verify-otp',userControler.verifiOtp)


userroute.get('/shop',userMiddleware.islogin,userControler.showShop)
userroute.get('/special',userMiddleware.islogin,userControler.showSpecial)
userroute.get('/party',userMiddleware.islogin,userControler.showParty)
userroute.get('/productdetails/:product_id',userMiddleware.islogin,userControler.showProductDetails)
userroute.get('/about',userMiddleware.islogin,userControler.showAbout)
userroute.get('/contact',(req,res)=>{res.render("page-contact")})


module.exports=userroute;