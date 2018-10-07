
// ======================
// COMMENTS ROUTES
// ======================
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Comments New
router.get("/new", isLoggedIn, function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

// Comments Create
router.post("/", isLoggedIn, function(req, res){
  // lookup campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          console.log(err);
        } else {
          // add username and id to comments
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
        
      });
    }
  });
 
});

router.gets("/:comment_id/edit", function(req, res){
  res.render("/comments/edit");
});

// Comment edit route
router.get("/:comment_id/edit", function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err) {
      res.redirect("back");
    } else {
      res.render("/comments/edit", {campground_id: req.params.id, comment:foundComment});    
    }
  });
});

// Comment update
router.put("/:comment_id", function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    } 
  });
});


// middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect("/login");
}


module.exports = router;