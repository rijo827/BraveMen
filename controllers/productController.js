const ProductModel = require("../models/ProductModel");
const categoryModel = require("../models/categoryModel");

const getAllProduct = async (req, res) => {
  try {
    let products = await ProductModel.find({ isDeleted: false }).populate(
      "category"
    );
    let category = await categoryModel.find({ isActvie: true });
    console.log("products.....", products);
    console.log("category.....", category);
    if (products) {
      console.log("category in admin.....", category);

      res.render("showProduct", {
        isAuthenticted: true,
        products: products,
        categories: category,
      });
    } else {
      res.render("showProduct", { isAuthenticted: false });
    }
  } catch (e) {
    console.log(e);
  }
};


const productStatusUpdate = async (req, res) => {
  console.log("statusUpdate ====>>>");
  const productID = req.body.productID;
  console.log(productID);
  const product = await ProductModel.findOne({ _id: productID });
  console.log("product>>>>>", product);
  product.isActive = !product.isActive;
  await product.save();
  try {
    return res.json({ success: true, isAuthenticted: true, product: product });
  } catch (error) {
    console.log(error);
  }
};






const updateProduct = async (req, res) => {
  const {
    newProductName,
    newDescription,
    newregularPrice,
    newsalePrice,
    newbrand,
    newsize,
    newstock,
    newcolor,
    newMaterial,
    newtype,
    newshippingFees,
    newtaxRate,
    newcategory,
    deletedImages
  } = req.body;

  // Check if new images are provided
  const newImages = req.files.map((file) => file.filename);
  console.log("newImages=====>>.", newImages);
  console.log("deletedImages=====>>.", deletedImages);


  try {
    const productID = req.params.product_id;
    console.log("productID====>>>", productID);

    // Find the existing product by ID
    const existingProduct = await ProductModel.findById(productID);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Update the product properties
    existingProduct.productName = newProductName;
    existingProduct.description = newDescription;
    existingProduct.regularPrice = newregularPrice;
    existingProduct.salePrice = newsalePrice;
    existingProduct.brand = newbrand;
    existingProduct.size = newsize;
    existingProduct.stock = newstock;
    existingProduct.color = newcolor;
    existingProduct.Material = newMaterial;
    existingProduct.type = newtype;
    existingProduct.shippingFees = newshippingFees;
    existingProduct.taxRate = newtaxRate;
    existingProduct.category = newcategory;

    // Check if new images are provided before updating
    if (deletedImages.length > 0) {
      existingProduct.Image = existingProduct.Image.filter(image => !deletedImages.includes(image));
  }
  
    if (newImages.length > 0) {
      existingProduct.Image = existingProduct.Image.concat(newImages) 
    }

    await existingProduct.save();
    console.log("Updated successfully");
    res.redirect("/admin/all_products");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const showUpdatedProduct = async (req, res) => {
  const productID = req.params.product_id;
  console.log("productID====>>>", productID);
  try {
    const product = await ProductModel.findOne({ _id: productID });
    console.log("product=====>>>", product);

    if (product) {
      const categoryDetails = await categoryModel.find({ isActvie: true });
      console.log("Category", categoryDetails);
      const length = product.Image.length
      console.log("product.Image.length", length);
      res.render("updateProduct", {
        isAuthenticted: true,
        product: product,
        category: categoryDetails,
        len:length
      });
    } else {
      console.log("Not logged");
      res.render("updateProduct", { isAuthenticted: false });
    }
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
};



const loadAddProduct = async (req, res) => {
  try {
    const categoryDetails = await categoryModel.find({ isActvie: true });

    if (categoryDetails) {
      res.render("addProduct", {
        isAuthenticted: true,
        category: categoryDetails,
      });
    } else {
      res.render("addProduct", { isAuthenticted: false });
    }
  } catch (error) {
    console.error("Category not found");
    return res.status(404).send("Category not found");
  }
};

const addProduct = async (req, res) => {
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
    taxRate,
  } = req.body;

  const images = req.files.map((file) => file.filename);
  console.log("images===>>>", images);

  try {
    const newProduct = new ProductModel({
      productName: productName,
      description: Description,
      regularPrice: regularPrice,
      salePrice: salePrice,
      brand: brand,
      stock: stock,
      size: size,
      color: color,
      Material: Material,
      type: type,
      shippingFees: shippingFees,
      taxRate: taxRate,
      category: category,
      Image: images,
    });

    if (newProduct) {
      await newProduct.save();
      console.log("Product created successfully");
      res.redirect("/admin/addproduct");
    } else {
      console.log("Internal Server Error");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteOneProduct = async (req, res) => {
  console.log("deleteingg......");  
  const productname = req.body.productName;

  const product = await ProductModel.findById(productname);

  if (product) {
    console.log("productID>>>>>", product);
    product.isDeleted = true;
    await product.save();
    try {
      return res.json({
        success: true,
        isAuthenticted: true,
        product: product,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  loadAddProduct,
  addProduct,
  getAllProduct,
  deleteOneProduct,
  updateProduct,
  showUpdatedProduct,
  productStatusUpdate,
};
