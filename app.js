var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");

  seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
  	if(err){
  		console.log(err);
  	} else {
  		res.render("index", {campgrounds:allCampgrounds});
  	}
  });
  //res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description:desc};
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

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
  // find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
  	if(err) {
  		console.log(err);
  	} else {
  		// render show template with that campground
  		res.render("show", {campground: foundCampground});		
  	}
  });
  req.params.id;
  
});

app.listen(3000, function(){
  console.log("The YelpCamp Server has started !!!");
});
