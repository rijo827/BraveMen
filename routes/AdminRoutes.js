const express=require('express')
const adminroute=express()
adminroute.set('views','./views/AdminView')
const bodyParser = require("body-parser")
const adminController= require("../controllers/adminController")
const adminMiddleware= require("../middleware/adminMiddleware")
const categoryController=require("../controllers/categoryController")
const productController= require('../controllers/productController')
const {upload}= require('../middleware/multer')

adminroute.use(bodyParser.json())
adminroute.use(bodyParser.urlencoded({extended: false}))


adminroute.get('/', adminMiddleware.islogout,adminController.adminLogged);
adminroute.post('/',adminMiddleware.islogout, adminController.adminLogin);
adminroute.get('/logout',adminController.adminLogout)


adminroute.get('/home',adminMiddleware.islogin,adminController.Admindashboad)

adminroute.get('/users',adminMiddleware.islogin,adminController.Userlist)
adminroute.post('/statusUpdate',adminMiddleware.islogin,adminController.statusUpdate)



adminroute.get('/category',adminMiddleware.islogin,categoryController.AccessCatogery)
adminroute.post('/category_posted',adminMiddleware.islogin,categoryController.postCategory)
adminroute.post('/deleteCategory',categoryController.deleteCategory)
adminroute.post("/updateCategory",categoryController.updateCategory)
adminroute.get('/getCategoryDetails',adminMiddleware.islogin, categoryController.getCategoryDetails);




adminroute.get('/addproduct',adminMiddleware.islogin,productController.loadAddProduct);
adminroute.post('/addproduct',upload.array('images',5),productController.addProduct);
adminroute.post('/deleteproduct',productController.deleteOneProduct);
adminroute.post('/updateproduct/:product_id',adminMiddleware.islogin,upload.array('newimages',5),productController.updateProduct);
adminroute.get('/updateproduct/:product_id',adminMiddleware.islogin,productController.showUpdatedProduct)


adminroute.post('/productstatusUpdate',productController.productStatusUpdate)





adminroute.get("/all_products",adminMiddleware.islogin, productController.getAllProduct)





module.exports= adminroute;