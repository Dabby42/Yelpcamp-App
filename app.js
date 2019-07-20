var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    passport    = require("passport"),
    flash       = require("connect-flash"),
    passportLocalMongoose = require("passport-local-mongoose"),
    LocalStrategy = require("passport-local"),
    methodOverrride = require("method-override"),
    mongoose    = require("mongoose"),
    Comment     = require("./models/comment"),
    Campground  = require("./models/campground"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")

//requiring routes
var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");

// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v7");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverrride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Dabby wins again!",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  res.locals.currentUser= req.user;
  res.locals.error= req.flash("error");
  res.locals.success= req.flash("success");
  next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, process.env.IP, function(){
  console.log("The YelpCamp Server is listening!");
})
