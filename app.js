var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f6c071a2e9bcbc_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144293f1c97ca3e4b1_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144293f1c97ca3e4b1_340.jpg"}
  ];

  res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(3000, function(){
  console.log("The YelpCamp Server has started !!!");
});
