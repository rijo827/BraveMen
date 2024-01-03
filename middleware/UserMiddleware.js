const islogout = (req, res, next) => {
    if (! req.session.userID) {
      console.log("User not loged in!");   
      next();
    } else {
      console.log("User loged in!");   
      res.redirect('/');
    }
  };

  const islogin = (req, res, next) => {
    if (req.session.userID) {
      console.log("User loged in!");   
      next();
    } else {
      console.log("User not loged in!");   
      res.redirect('/login?err=true&msg=Login first to access it');
    }
  };

  module.exports={

    islogout,
    islogin,
  }