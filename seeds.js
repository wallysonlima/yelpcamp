
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
	name: "Sunny day in the beach",
 	image: "https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606__340.jpg",
 	description: "Kombi in the beach !"
	 },

	{
	name: "Drinking coffe in the woods",
 	image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424__340.jpg",
 	description: "Woman drinking your coffe in peace !"
 	},

	{
	name: "Campground in the mountains",
 	image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092__340.jpg",
 	description: "Camping in the cold mountains !"
 	}
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;