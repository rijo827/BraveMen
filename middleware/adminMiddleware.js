
const islogout = (req, res, next) => {
    if (! req.session.adminID) {
      console.log("Admin not loged in!");   
      next();
    } else {
      console.log("Admin loged in!");   
      res.redirect('/admin/home');
    }
  };

  const islogin = (req, res, next) => {
    if (req.session.adminID) {
      console.log("Admin loged in!");   
      next();
    } else {
      console.log("Admin not loged in!");   
      res.redirect('/admin/?err=true&msg=Login first to access it');
    }
  };

  module.exports={

    islogout,
    islogin,
  }