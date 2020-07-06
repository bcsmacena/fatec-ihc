module.exports = (req, res, next) => {
    const { user } = req.session;
  
    console.log("-------------------------------------")
    console.log(user);
    console.log("-------------------------------------")

    if (!user) {
      return res.redirect("/");
    }
  
    res.locals.user = user;
    return next();
  };
  