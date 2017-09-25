var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");


seedDB();
mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
   res.render("landing"); 
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds:allCampgrounds});
        }
    })
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req,res){
   res.render("new.ejs"); 
});

//CREATE - add new campground to database
app.post("/campgrounds", function(req,res){
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
app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});           
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The yelp camp server has started");
});
