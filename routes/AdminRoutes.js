const express=require('express')
const adminroute=express()
adminroute.set('views','./views/AdminView')
const bodyParser = require("body-parser")
const adminController= require("../controllers/adminController")
const adminMiddleware= require("../middleware/adminMiddleware")


adminroute.use(bodyParser.json())
adminroute.use(bodyParser.urlencoded({extended: false}))


adminroute.get('/', adminMiddleware.islogout,adminController.adminLogged);
adminroute.post('/',adminMiddleware.islogout, adminController.adminLogin);


adminroute.get('/home',adminMiddleware.islogin,adminController.Admindashboad)

adminroute.get('/users',adminController.Userlist)
adminroute.post('/statusUpdate',adminController.statusUpdate)




















module.exports= adminroute;