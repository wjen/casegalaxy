// Require the model/s you're controlling
var Item = require("../models/item");
var Category = require("../models/item");

//Get Single Item
var fishShow = function(req, res, next){
  var id = req.params.id;

  Fish.findById(id, function(err, fish){
    if (err) {
      res.send(err);
    }

    // return that fish as JSON
    res.json(fish);
  });
};

//get all items
var itemsIndex = function(req, res, next) {
  Item.find({}, function(err, items) {
    if (err) {
      res.send(err);
    }
    // return the fishes
    res.json(items);
  });
};

//||||||||||||||||||||||||||--
// CREATE FISH
//||||||||||||||||||||||||||--
var fishCreate = function(req, res) {
  var fish       = new Fish();   // create a new instance of the Fish model

  fish.name      = req.body.name;
  fish.category  = req.body.category;

  fish.save(function(err, savedFish) {
    if (err) {
      res.send(err)
    }

    // log a message
    console.log("What a fish!")
    // return the fish
    res.json(savedFish);
  });
};

//||||||||||||||||||||||||||--
// UPDATE FISH
//||||||||||||||||||||||||||--
var fishUpdate = function(req, res) {
  var id = req.params.id;

  Fish.findById(id, function(err, fish) {

    if (err) {
      res.send(err);
    }

    // set the new fish information if it exists in the request
    if (req.body.name) fish.name = req.body.name;
    if (req.body.category) fish.category = req.body.category;

    // save the fish
    fish.save(function(err, updatedFish) {
      if (err) {
        res.send(err);
      }
      // log a message
      console.log("Oh, that's the fish!");
      // return the fish
      res.json(updatedFish);
    });
  });
}

//||||||||||||||||||||||||||--
// DELETE FISH
//||||||||||||||||||||||||||--
var fishDelete = function(req, res) {

  var id = req.params.id;

  Fish.remove({"_id" : id}, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Forget that Fish!' });
  });
}

// Export the function/s as JSON
module.exports = {
  fishShow:   fishShow,
  itemsIndex:  itemsIndex,
  fishCreate: fishCreate,
  fishUpdate: fishUpdate,
  fishDelete: fishDelete
}
