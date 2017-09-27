var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/campgrounds", function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index.ejs", {campgrounds:allCampgrounds});
        }
    });
});

//NEW - show form to create new campground
router.get("/campgrounds/new", function(req,res){
   res.render("campgrounds/new"); 
});

//CREATE - add new campground to database
router.post("/campgrounds", function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image:image, description:description}
  Campground.create(newCampground, function(err, newCreate){
      if(err){
         console.log(err);
      } else {
        res.redirect("/campgrounds");     
      }
  });
});

//SHOW - shows more info about one campground
router.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});           
        }
    });
});

module.exports = router;
