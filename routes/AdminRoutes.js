const express=require('express')
const adminroute=express()
adminroute.set('views','./views/AdminView')
const bodyParser = require("body-parser")
const adminController= require("../controllers/adminController")
const adminMiddleware= require("../middleware/adminMiddleware")
const categoryController=require("../controllers/categoryController")

adminroute.use(bodyParser.json())
adminroute.use(bodyParser.urlencoded({extended: false}))


adminroute.get('/', adminMiddleware.islogout,adminController.adminLogged);
adminroute.post('/',adminMiddleware.islogout, adminController.adminLogin);


adminroute.get('/home',adminMiddleware.islogin,adminController.Admindashboad)

adminroute.get('/users',adminController.Userlist)
adminroute.post('/statusUpdate',adminController.statusUpdate)



adminroute.get('/category',adminMiddleware.islogin,categoryController.AccessCatogery)
adminroute.post('/category_posted',adminMiddleware.islogin,categoryController.postCategory)
adminroute.post('/deleteCategory',categoryController.deleteCategory)
adminroute.post("/updateCategory",categoryController.updateCategory)
adminroute.get('/getCategoryDetails', categoryController.getCategoryDetails);


















module.exports= adminroute;