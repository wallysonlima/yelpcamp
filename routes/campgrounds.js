var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

router.get("/", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
  	if(err){
  		console.log(err);
  	} else {
  		res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
  	}
  });
  //res.render("campgrounds", {campgrounds:campgrounds});
});

router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var newCampground = {name: name, image: image, description:desc, author:author};

  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
  	if(err){
  		console.log(err);
  	} else {
  		// redirect back to campgrouns page
  		res.redirect("/campgrounds");
  	}
  });
  
});

router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
  // find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
  	if(err) {
  		console.log(err);
  	} else {
  		// render show template with that campground
  		res.render("campgrounds/show", {campground: foundCampground});		
  	}
  });
  req.params.id;
  
});

 // EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  // is user logged in
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
          res.redirect("/campgrounds");
        } else {
          res.render("campgrounds/edit", {campground: foundCampground});    
        }
        
    });
  // does user own the campground ?
  // otherwise, redirect
  // if not, redirect
  
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if (err) {
      res.redirect("/campgrounds");  
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
  // redirect somewhere(show page)
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;