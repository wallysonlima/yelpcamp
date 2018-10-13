var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// index route
router.get("/", function(req, res){
  res.render("landing");
});


// ============
// Auth Routes
// ============

// show register form
router.get("/register", function(req, res){
  res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to YelpCamp " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

// show login form
router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res){
    res.send("Login logic happens here!");
});

// logic route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});

module.exports = router;