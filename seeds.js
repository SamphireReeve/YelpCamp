var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "Like a lil cloud."
    },
    {
        name: "Daisy Mountain", 
        image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
        description: "Soooo many daisy's."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "A canyon."
    }
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds!");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Campsite Added");
                        Comment.create(
                            {
                                text: "This place was great!",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("New Comment Created");
                                }
                        });
                    }
                });
            });
        }
    });  
}

module.exports = seedDB;