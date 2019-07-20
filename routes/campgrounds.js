var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX- dispaly all campgrounds
router.get("/", function (req, res) {
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds:allCampgrounds});
    }
  });
});

//CREATE - add new campground to DB:
router.post("/",middleware.isLoggedIn, function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampGround = {name:name, img:image, description:desc, author:author};
  Campground.create(newCampGround, function(err, newlyCreated){
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "You've successfully created a new campground!")
      res.redirect("/campgrounds");
    }
  });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

//SHOW- shows more info about one campground
router.get("/:id", function (req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground:foundCampground});
    }
  });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    })
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,function (req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
    if (err) {
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  })
});

module.exports = router;
