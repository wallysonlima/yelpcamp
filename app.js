var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  var campgrounds = [
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606__340.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg"}
  ];

  res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(3000, function(){
  console.log("The YelpCamp Server has started !!!");
});
