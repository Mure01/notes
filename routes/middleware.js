const isAdmin = (req, res, next) => {
    if (req.session.user_logged?.role == "admin") {
      next();
    } else {
      return res.status(401).send("Ne mozete pristupiti ovoj ruti!");
    }
  };
  
  const isLogged = (req, res, next) => {
    console.log(req.session.user_logged)
    if (req.session.user_logged) {
      next();
    } else {
      return res.status(401).send("Prijavite se!");
    }
  };
  const isLoggedAlready = (req, res, next) => {
    if (req.session.user_logged) {
      return res.status(401).send("Vec ste prijavljeni!");
    } else {
      next();
    }
  };

  module.exports = {isAdmin, isLogged, isLoggedAlready}