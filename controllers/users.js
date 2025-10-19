const User = require("../models/user");

module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup");
};

module.exports.signUP = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    console.log("Registered User:", {
      id: registerUser._id,
      username: registerUser.username,
      email: registerUser.email,
    });
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to wanderlust!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  if (req.user) {
    console.log("Logged in user:", {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  } else {
    console.log("No user logged in");
  }
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "listings";
  res.redirect(redirectUrl);
};

module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You Have Successfully Logged out");
    res.redirect("/listings");
  });
};
