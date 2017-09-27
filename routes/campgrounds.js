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
router.get("/campgrounds/new", isLoggedIn, function(req,res){
   res.render("campgrounds/new"); 
});

//CREATE - add new campground to database
router.post("/campgrounds", isLoggedIn, function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var newCampground = {name: name, image:image, description:description, author:author}
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


// EDIT - edit a campground
router.get("/campgrounds/:id/edit", checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground:foundCampground});              
    });
});


// UPDATE - update a campground
router.put("/campgrounds/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


// DELETE - remove a campground from the db
router.delete("/campgrounds/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
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

function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();                     
                } else {
                    res.redirect("back");
                }
            }
        });        
    } else {
        res.redirect("back");
    }
}

module.exports = router;
