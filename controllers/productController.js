const ProductModel = require('../models/ProductModel');
const categoryModel = require('../models/categoryModel');






const getAllProduct = async (req,res) =>{

  try{
    let products = await ProductModel.find({}).populate("category");
    let category = await categoryModel.find();
    console.log("products.....",products);
    console.log("category.....",category);
    if(products){
    console.log("category in admin.....",category);

      res.render("showProduct",{isAuthenticted: true,products:products, categories: category})
    }else{
      res.render("showProduct",{isAuthenticted: false})

    }
  }catch(e){
 console.log(e);
  }
}

 const loadProduct = async (req,res)=>{


    try {
        const categoryDetails = await categoryModel.find({isActvie:true});


  
        if(categoryDetails){
          res.render("addProduct",{isAuthenticted: true,category:categoryDetails})
        }else{
          res.render("addProduct",{isAuthenticted: false})

        }
      } 
      catch (error) {
        console.error('Category not found');
      return res.status(404).send('Category not found');
      }
 }




 const addProduct = async (req,res)=>{


     console.log("Addproduct is working ");

   
     const {
        productName,
        Description,
        category,
        regularPrice,
        salePrice,
        brand,
        stock,
        size,
        color,
        Material,
        type,
        shippingFees,
        taxRate
    } = req.body;
 
    const images = req.files.map(file => file.filename);
    console.log("images===>>>",images);
 
try {
  
  const newProduct= new ProductModel({

    productName:productName,
    description:Description,
    regularPrice:regularPrice,
    salePrice:salePrice,
    brand:brand,
    stock:stock,
    size:size,
    color:color,
    Material:Material,
    type:type,
    shippingFees:shippingFees,
    taxRate:taxRate,
    category:category,
    Image:images,
    
}) 


if(newProduct){
  await newProduct.save()
  console.log('Product created successfully');
    res.redirect("/admin/addproduct")
}
else{
console.log('Internal Server Error');
}
} catch (error) {
  
  console.log(error);
}

    
 }








 module.exports= {

    loadProduct,
    addProduct,
    getAllProduct
 }