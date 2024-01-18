const catModel = require("../models/categoryModel");

const AccessCatogery = async (req, res) => {
  const err = req.query.err;
  const msg = req.query.msg;
  try {
    const Categories = await catModel.find({ isActvie: true });
    console.log("Categories>>>>>", Categories);
    if (Categories) {
      res.render("categories", {
        succmsg: "",
        errmsg: msg,
        isAuthenticted: true,
        category: Categories,
      });
    } else {
      res.render("categories", {
        succmsg: "",
        errmsg: msg,
        isAuthenticted: false,
        category: Categories,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (req, res) => {
  const catName = req.body.CategoryName;
  console.log("Catname====>>>", catName);
  const category = await catModel.findById(catName);

  if (category) {
    console.log("categoryNAme>>>>>", category);
    category.isActvie = false;
    await category.save();
    try {
      return res.json({
        success: true,
        isAuthenticted: true,
        category: category,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
const getCategoryDetails = async (req, res) => {
  const categoryId = req.query.categoryId;

  try {
    const category = await catModel.findById(categoryId);
    console.log(category);

    if (category) {
      res.json({ success: true, category: category });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateCategory = async (req, res) => {
  console.log("updating Category");
  const { newCategoryName, newDescription, categoryId } = req.body;
  console.log("newCategoryName =>>>>>", newCategoryName);
  console.log("categoryId =>>>>>", categoryId);

  try {
    const checkdata = await catModel.findById(categoryId);

    // Check if the new category name already exists in other categories
    const existingCategories = await catModel.find(
      { _id: { $ne: categoryId } }, // Exclude the current category from the query
      { CategoryName: 1, _id: 0 }
    );

    const isNameAlreadyExists = existingCategories.some(
      (category) => category.CategoryName === newCategoryName
    );

    if (isNameAlreadyExists) {
      console.log("This name already exists in other categories");
      return res.redirect(
        "/admin/category?err=true&msg=This name already exists in other categories"
      );
    } else if (checkdata.CategoryName === newCategoryName) {
      const updatedCategory = await catModel.findByIdAndUpdate(
        categoryId,
        { CategoryName: newCategoryName, Description: newDescription },
        { new: true }
      );

      if (updatedCategory) {
        console.log("Category updated successfully");
        console.log("Updated category======>>>", updatedCategory);
        return res.redirect("/admin/category");
      } else {
        console.log("Category not found");
        return res.redirect("/admin/category?err=true&msg=Category not found");
      }
    }
  } catch (error) {
    console.log(error);
    return res.redirect("/admin/category?err=true&msg=Something went wrong");
  }
};

const postCategory = async (req, res) => {
  console.log("posting Category");

  try {
    const { CategoryName, Description } = req.body;

    // Check if the category with the same name already exists (excluding the current one)
    const existingCategory = await catModel.findOne({
      CategoryName: CategoryName,
      _id: { $ne: req.params.id }, // Exclude the current category ID if it's available in the request parameters
    });

    if (existingCategory) {
      console.log("This Name is already Exist!!");
      res.redirect("/admin/category?err=true&msg=This Name is already Exist!!");
    } else {
      const category = new catModel({
        CategoryName: CategoryName,
        Description: Description,
      });

      if (category) {
        await category.save();
        console.log("Category Added Successfully");
        console.log("category======>>>", category);
        res.redirect("/admin/category");
      }
    }
  } catch (error) {
    console.log(error);
    res.redirect("/admin/category?err=true&msg=Something went wrong");
  }
};

module.exports = {
  AccessCatogery,
  postCategory,
  deleteCategory,
  updateCategory,
  getCategoryDetails,
};
