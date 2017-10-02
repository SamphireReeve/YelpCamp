var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();                     
                } else {
                    res.flash("error", "Need permission to do that");
                    res.redirect("back");
                }
            }
        });        
    } else {
        req.flash("error","Please Login First");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();                     
                } else {
                    res.flash("error", "Need permission to do that");
                    res.redirect("back");
                }
            }
        });        
    } else {
        req.flash("error","Please Login First");
        res.redirect("back");
    }    
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // req.flash(key, value);
    req.flash("error", "Please Login First");
    res.redirect("/login");
}



module.exports = middlewareObj;