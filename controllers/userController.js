const userModel = require("../models/userModel");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catModel = require("../models/categoryModel");
const productModel = require("../models/ProductModel");
const addressModel = require("../models/addressModel");
const wishlistModel = require("../models/wishlistModel");
const cartModel = require("../models/cartModel");

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
    console.log("otpStorage   ===>>>  ", otpStorage);
    console.log("Otp expired");
    console.log("expired is otpStorage[Email]  ===>>>   ", otpStorage[Email]);
    delete otpStorage[Email];
    console.log("otpStorage   ===>>>  ", otpStorage);
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

const updatePassword = async (req, res) => {
  try {
    console.log("Updated Password");
    const Email = req.body.Email;
    const newPassword = req.body.Password;

    // Find the user by email
    const user = await userModel.findOne({ Email: Email });

    if (user) {
      // Compare the provided password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(newPassword, user.Password);

      if (isPasswordMatch) {
        console.log("You can't use the same password");
        res.redirect(
          "/forgotPassword?err=true&msg=You can't use the same password"
        );
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await userModel.updateOne(
          { Email: Email },
          { Password: hashedPassword }
        );

        console.log("Password updated successfully");
        res.redirect("/login");
      }
    } else {
      console.log("User not found ");
      res.redirect("/forgotPassword?err=true&msg=User not found");
    }
  } catch (error) {
    console.error(error);
  }
};

const forgotPassword = async (req, res) => {
  const err = req.query.err;
  const msg = req.query.msg;
  let categroy = await catModel.find({ isActvie: true });

  if (err) {
    res.render("forgotPassword", {
      succmsg: "",
      errmsg: msg,
      isAuthenticted: false,
      categroy: categroy,
    });
  } else {
    res.render("forgotPassword", {
      succmsg: msg,
      errmsg: "",
      isAuthenticted: false,
      categroy: categroy,
    });
  }
};

const getForgotUserPassword = async (req, res) => {
  const err = req.query.err;
  const msg = req.query.msg;
  let categroy = await catModel.find({ isActvie: true });

  if (err) {
    res.render("forgotUserPassword", {
      succmsg: "",
      errmsg: msg,
      isAuthenticted: true,
      categroy: categroy,
    });
  } else {
    res.render("forgotUserPassword", {
      succmsg: "",
      errmsg: msg,
      isAuthenticted: true,
      categroy: categroy,
    });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    console.log("Updated USer Password");
    const Email = req.body.Email;
    const updatePassword = req.body.newPassword;

    // Find the user by email
    const user = await userModel.findOne({ Email: Email });

    if (user) {
      // Compare the provided password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(
        updatePassword,
        user.Password
      );

      if (isPasswordMatch) {
        console.log("You can't use the same password");
        res.redirect(
          "/forgotuserPassword?err=true&msg=You can't use the same password"
        );
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(updatePassword, saltRounds);

        await userModel.updateOne(
          { Email: Email },
          { Password: hashedPassword }
        );

        console.log("Password updated successfully");
        res.redirect("/account");
      }
    } else {
      console.log("User not found ");
      res.redirect("/forgotuserPassword?err=true&msg=User not found");
    }
  } catch (error) {
    console.error(error);
  }
};

const insertUser = async (req, res) => {
  try {
    const { Firstname, Lastname, Phone, Password, Email } = req.body;
    const checkdata = await userModel.findOne({ Email: Email });
    if (checkdata) {
      console.log("checkdata   ===>>>  ", checkdata);
      res.redirect("/signup?err=true&msg=Email Already Exists");
    } else {
      const User = new userModel({
        Firstname: Firstname,
        Lastname: Lastname,
        Email: Email,
        Password: Password,
        Phone: Phone,
      });

      const isVerifiedPromise = verifiOtp(Email, req.body.otp);

      isVerifiedPromise.then((isVerified) => {
        if (isVerified) {
          saveUser();
        } else {
          res.redirect("/signup?err=true&msg=Invalid Otp");
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'Invalid OTP',
          //     text: 'Please enter a valid OTP.',
          //   });
        }

        console.log("USer====>", User);
        console.log(isVerified);
      });

      const saveUser = async () => {
        await User.save();
        console.log("password>>>>>>>", User.Password);
        // req.session.userID = User._id;
        let payload = { UserID: User._id };
        const token = jwt.sign(payload, process.env.SECRATE_KEY, {
          expiresIn: "1d",
        });
        console.log(" payload=====>>>", payload);
        console.log("token======>>>>", token);
        res.cookie("jwtusertoken", token, { httpOnly: true });
        res.cookie("userID", payload.UserID, { httpOnly: true });
        console.log(" req.session.userID  ===>>", req.session.userID);
        console.log("Account created successfully");
        res.redirect("/");
        User.jwt_token = token;
      };
    }
  } catch (error) {}
};

const loadRegister = async (req, res) => {
  try {
    const err = req.query.err;
    const msg = req.query.msg;
    let categroy = await catModel.find({ isActvie: true });

    if (err) {
      res.render("register", {
        errmsg: msg,
        succmsg: "",
        isAuthenticted: false,
        categroy: categroy,
      });
    } else {
      res.render("register", {
        succmsg: msg,
        errmsg: "",
        isAuthenticted: false,
        categroy: categroy,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const loadLogin = async (req, res) => {
  try {
    const err = req.query.err;
    const msg = req.query.msg;
    let categroy = await catModel.find({ isActvie: true });

    if (err) {
      res.render("login", {
        errmsg: msg,
        succmsg: "",
        isAuthenticted: false,
        categroy: categroy,
      });
    } else {
      res.render("login", {
        succmsg: msg,
        errmsg: "",
        isAuthenticted: false,
        categroy: categroy,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const loggingUser = async (req, res) => {
  try {
    const Email = req.body.Email;
    const password = req.body.Password;

    const User = await userModel.findOne({ Email: Email });

    if (User) {
      // Compare the entered password with the hashed password using bcrypt.compare
      bcrypt.compare(password, User.Password, (err, result) => {
        if (err) {
          // Handle the error
          console.error(err);
          res.redirect("/login?err=true&msg=Internal Server Error");
        } else if (result) {
          // Passwords match
          let payload = { UserID: User._id };
          console.log("payload ====>>>", payload);

          const token = jwt.sign(payload, process.env.SECRATE_KEY, {
            expiresIn: "1d",
          });

          if (token) {
            User.jwt_token = token;
            User.save()
              .then(() => {
                console.log("token======>>>>", token);
                res.cookie("jwtusertoken", token, { httpOnly: true });
                res.cookie("userID", payload.UserID, { httpOnly: true });
                console.log("Yes Its U");
                res.redirect("/");
              })
              .catch((err) => {
                res.redirect("/login?err=true&msg=Something went wrong!");
              });
          } else {
            res.redirect("/login?err=true&msg=You are not Authenticated!");
          }
        } else {
          // Passwords do not match
          res.redirect("/login?err=true&msg=Incorrect Password!");
        }
      });
    } else {
      // User not found
      res.redirect("/login?err=true&msg=User not Found!");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/login?err=true&msg=Internal Server Error");
  }
};

const loadhome = async (req, res) => {
  // let user = req.session.userID;
  let user = req.cookies?.jwtusertoken;
  let userID = req.cookies.userID;
  console.log("userId >>>>>>", userID);
  let categroy = await catModel.find({ isActvie: true });
  let product = await productModel
    .find({ isActive: false, isDeleted: false })
    .populate("category");

  if (user && userID) {
    let thisUser = await userModel.findById(userID);

    console.log("User name>>>>", thisUser.Firstname);
    res.render("home", {
      isAuthenticted: true,
      categroy: categroy,
      products: product,
    });
  } else {
    console.log("its else");
    res.render("home", {
      isAuthenticted: false,
      categroy: categroy,
      products: product,
    });
  }
};

const userAccountGet = async (req, res) => {
  try {
    let token = req.cookies.jwtusertoken;
    let userID = req.cookies.userID;
    const err = req.query.err;
    const msg = req.query.msg;
    if (token && userID) {
      const categroy = await catModel.find({ isActvie: true });
      const user = await userModel.findById(userID).populate("address");
      const address = await addressModel.find({ isDeleted: false });
      console.log("Address=====>>>>>", address);
      res.render("userAccount", {
        errmsg: msg,
        succmsg: "",
        isAuthenticted: true,
        categroy: categroy,
        User: user,
        Address: address,
      });
      // res.render("home",{isAuthenticted: true})
    } else {
      res.redirect("/login?err=true&msg=Login first to access it");
    }
  } catch (error) {}
};

const loggoutUser = async (req, res) => {
  let user = req.cookies?.jwtusertoken;

  if (user) {
    res.clearCookie("jwtusertoken");
    console.log("its cleared");
    res.redirect("/");
  }
};

const showShop = async (req, res) => {
  try {
    const userID = req.cookies.userID;
    const categroy = await catModel.find({ isActvie: true });
    const products = await productModel
      .find({ isActive: false, isDeleted: false })
      .populate("category");

    let wishlistProductIds = [];
    if (userID) {
      const userWishlist = await wishlistModel.find({ User: userID }).lean();
      wishlistProductIds = userWishlist.map(item => item.Product.toString());
    }

    const productsWithWishlistStatus = products.map(product => {
      return {
        ...product.toObject(),
        isInWishlist: wishlistProductIds.includes(product._id.toString())
      };
    });

    res.render("shopProduct", {
      isAuthenticted: true,
      categroy: categroy,
      products: productsWithWishlistStatus,
    });
  } catch (error) {
    console.log(error);
  }
};
const showSpecial = async (req, res) => {
  try {
    const userID = req.cookies.userID;
    const categroy = await catModel.find({ isActvie: true });
    const products = await productModel
      .find({ isActive: false, isDeleted: false, type: "Special" })
      .populate("category");

    let wishlistProductIds = [];
    if (userID) {
      const userWishlist = await wishlistModel.find({ User: userID }).lean();
      wishlistProductIds = userWishlist.map(item => item.Product.toString());
    }

    const productsWithWishlistStatus = products.map(product => {
      return {
        ...product.toObject(),
        isInWishlist: wishlistProductIds.includes(product._id.toString())
      };
    });

    res.render("shopProduct", {
      isAuthenticted: true,
      categroy: categroy,
      products: productsWithWishlistStatus,
    });
  } catch (error) {
    console.log(error);
  }
};


const showParty = async (req, res) => {
  try {
    const userID = req.cookies.userID;
    const categroy = await catModel.find({ isActvie: true });
    const products = await productModel
      .find({ isActive: false, isDeleted: false, type: "Party" })
      .populate("category");

    let wishlistProductIds = [];
    if (userID) {
      const userWishlist = await wishlistModel.find({ User: userID }).lean();
      wishlistProductIds = userWishlist.map(item => item.Product.toString());
    }

    const productsWithWishlistStatus = products.map(product => {
      return {
        ...product.toObject(),
        isInWishlist: wishlistProductIds.includes(product._id.toString())
      };
    });

    res.render("shopProduct", {
      isAuthenticted: true,
      categroy: categroy,
      products: productsWithWishlistStatus,
    });
  } catch (error) {
    console.log(error);
  }
};


const showProductDetails = async (req, res) => {
  try {
    const categroy = await catModel.find({ isActvie: true });
    const productID = req.params.product_id;
    const product = await productModel.findById(productID).populate("category");
    console.log("productID====>>>", productID);
    if (product.isActive == false && product.isDeleted == false) {
      res.render("productDetail", {
        isAuthenticted: true,
        categroy: categroy,
        product: product,
      });
    } else {
      res.render("productDetail", {
        isAuthenticted: false,
        categroy: categroy,
        products: product,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const showAbout = async (req, res) => {
  const categroy = await catModel.find({ isActvie: true });
  try {
    res.render("page-about", {
      isAuthenticted: true,
      categroy: categroy,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateUserGet = async (req, res) => {
  let userID = req.cookies.userID;
  const err = req.query.err;
  const msg = req.query.msg;
  try {
    const user = await userModel.findById(userID);

    if (user) {
      res.json({ success: true, User: user, succmsg: "", errmsg: msg });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  console.log("updating User");
  try {
    const userID = req.cookies.userID;
    const { Firstname, Lastname, Phone, currentPassword, newPassword, Email } =
      req.body;
    const User = await userModel.findById(userID);
    if (User) {
      console.log("its entering user if ");
      console.log("currentPassword====== ", currentPassword);
      console.log("User.Password====== ", User.Password);
      let isTrue = false;
      bcrypt.compare(currentPassword, User.Password, (err, result) => {
        if (err) {
          // Handle the error
          console.error(err);
          console.log("its entering user err ");

          res.redirect("/account?err=true&msg=Internal Server Error");
        } else {
          console.log("result====<>>>", result);
          isTrue = result;
        }
      });
      if (isTrue && currentPassword !== newPassword) {
        User.Firstname = Firstname;
        User.Lastname = Lastname;
        User.Phone = Phone;
        User.Password = newPassword;
        User.Email = Email;

        await User.save();
        res.redirect("/account");
        console.log("Updated successfully");
      } else {
        console.log("you Can't Give Same Password");
        res.redirect("/account?err=true&msg=you Can't Give Same Password");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const wishlistLoad = async (req, res) => {
  const categroy = await catModel.find({ isActvie: true });

  try {
    res.render("wishlist", {
      isAuthenticted: true,
      categroy: categroy,
    });
  } catch (error) {
    console.log(error);
  }
};

const addAddressget = async (req, res) => {
  const categroy = await catModel.find({ isActvie: true });
  const err = req.query.err;
  const msg = req.query.msg;
  try {
    if (err) {
      res.render("addAddress", {
        succmsg: "",
        errmsg: msg,
        isAuthenticted: true,
        categroy: categroy,
      });
    } else {
      res.render("addAddress", {
        succmsg: "",
        errmsg: msg,
        isAuthenticted: true,
        categroy: categroy,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const addAddress = async (req, res) => {
  const {
    Name,
    Address,
    Landmark,
    City,
    State,
    Pincode,
    MobileNumber,
    AlternativeNumber,
    AddressType,
  } = req.body;

  try {
    const userID = req.cookies.userID;
    const user = await userModel.findById(userID);
    if (user) {
      // Create a new address object
      const newAddress = new addressModel({
        Name,
        Address,
        Landmark,
        City,
        State,
        Pincode,
        MobileNumber,
        AlternativeNumber,
        AddressType,
      });

      const savedAddress = await newAddress.save();

      user.address = savedAddress._id;
      await user.save();

      console.log("Address added successfully:", savedAddress);

      res.redirect("/account");
    } else {
      console.log("User not found.");

      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {}
};

const editAddressGet = async (req, res) => {
  const categroy = await catModel.find({ isActvie: true });
  const userID = req.cookies.userID;

  const err = req.query.err;
  const msg = req.query.msg;
  try {
    const User = await userModel.findById(userID);
    if (User) {
      console.log("WE GOT USER");
      const addressID = req.params.address_id;
      const address = await addressModel.findById(addressID);
      if (address) {
        console.log("WE GOT ADDRESS");

        if (err) {
          res.render("editAddress", {
            succmsg: "",
            errmsg: msg,
            isAuthenticted: true,
            categroy: categroy,
            Address: address,
          });
        } else {
          res.render("editAddress", {
            succmsg: "",
            errmsg: msg,
            isAuthenticted: true,
            categroy: categroy,
            Address: address,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const editAddress = async (req, res) => {
  const {
    newName,
    newAddress,
    newLandmark,
    newCity,
    newState,
    newPincode,
    newMobileNumber,
    newAlternativeNumber,
    newAddressType,
  } = req.body;

  try {
    const userID = req.cookies.userID;
    const user = await userModel.findById(userID);
    if (user) {
      const addressID = req.params.address_id;
      const existingAddress = await addressModel.findById(addressID);
      if (!existingAddress) {
        console.log("ADDRESS NOT FOUND");
      }

      existingAddress.Name = newName;
      existingAddress.Address = newAddress;
      existingAddress.Landmark = newLandmark;
      existingAddress.City = newCity;
      existingAddress.State = newState;
      existingAddress.Pincode = newPincode;
      existingAddress.MobileNumber = newMobileNumber;
      existingAddress.AlternativeNumber = newAlternativeNumber;
      existingAddress.AddressType = newAddressType;

      await existingAddress.save();
      console.log("ADDRESS UPDATED SUCCESSFULLY");
      res.redirect("/account");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteAddress = async (req, res) => {
  console.log("deleteingg......");
  const addressID = req.body.addressID;
  console.log("addressID>>>>>>", addressID);
  const address = await addressModel.findById(addressID);
  try {
    if (address) {
      console.log("address>>>>>", address);
      address.isDeleted = true;
      await address.save();
      console.log("Deleted Successfully.....");
      return res.json({
        success: true,
        isAuthenticted: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const addtoCart = async (req, res) => {
  const ProductID = req.body.productID;
  const userID = req.cookies.userID;
  console.log("ProducID is", ProductID);
  console.log("userID===>>>", userID);
  if (userID && ProductID) {
    try {
      const User = await userModel.findById(userID);

      const product = await productModel.findById(ProductID);

      if (!User) {
        console.log("USer not found");
        return res.status(404).json({ message: "User not found" });
      } else {
        if (!product) {
          console.log("product is not found ");
          return res.status(404).json({ message: "product not found" });
        } else {
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const showCart= async (req, res) => {

  const categroy = await catModel.find({ isActvie: true });  
    try {
      res.render("cart", {
        isAuthenticted: true,
        categroy: categroy,
       
      });

    } catch (error) {
      console.log(error);
    
  }
}

const addwishlist = async (req, res) => {
  try {
    const ProductID = req.params.product_id;
    const userID = req.cookies.userID;
    console.log("ProductID is", ProductID);
    console.log("userID===>>>", userID);

    const User = await userModel.findById(userID);
    if (User) {
      const Product = await productModel.findById(ProductID);
      if (Product) {
        const existingWishlistItem = await wishlistModel.findOne({ User: userID, Product: ProductID });
        if (existingWishlistItem) {
          return res.status(400).json({ message: "Product is already in the wishlist" });
        } else {
          const wishlist = new wishlistModel({
            User: userID, // Assuming you want to associate wishlist with the user
            Product: ProductID,
            createdOn: new Date()
          });
          await wishlist.save();
          console.log("wishlist added successfully");
          return res.status(200).json({ message: "Wishlist added successfully" });
        }
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



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
  showShop,
  showSpecial,
  showParty,
  showProductDetails,
  showAbout,
  getForgotUserPassword,
  updateUserPassword,
  updateUser,
  updateUserGet,
  wishlistLoad,
  addAddressget,
  addAddress,
  editAddressGet,
  editAddress,
  deleteAddress,
  addtoCart,
  showCart,
  addwishlist,
};
