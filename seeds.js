var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
  {
    name: "Salmon Creeks" ,
    img: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet ornare elit, id interdum nunc. Maecenas a est a neque scelerisque posuere."
  },
  {
    name: "Granite Hill",
    img: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet ornare elit, id interdum nunc. Maecenas a est a neque scelerisque posuere."
  },
  {
    name: "Mountain Goat's Rest",
    img: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet ornare elit, id interdum nunc. Maecenas a est a neque scelerisque posuere."
  }
];

function seedDB() {
  //Remove all campgrounds
  Campground.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("Campgrounds removed");
    data.forEach(function (seed) {
      //add a few campgrounds
      Campground.create(seed, function (err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          //add a few comments
          Comment.create({
            text: "This place is great, but i wish there was internet connection!",
            author: "Homer"
          }, function (err, comment) {
            if (err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created a new comment");
            }
          });
        }
      });
    });
  });
}

module.exports = seedDB;
