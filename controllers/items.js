// Require the model/s you're controlling
var Item = require("../models/item");


//get all items
var itemsIndex = function(req, res, next) {
  Item.find({}, function(err, items) {
    if (err) {
      res.json(err);
    }
    // return the items
    res.json(items);
  });
};

//delete item
var itemDelete = function(req, res) {

  var id = req.params.id;

  Item.remove({"_id" : id}, function(err) {
    if (err) {
      res.json(err);
    }
    res.json({ message: 'Item removed' });
  });
}

//add item
var itemCreate = function(req, res) {
  var item = new Item(); // create a new instance of the item model
  item.category     = req.body.category;
  item.phoneModel   = req.body.phoneModel;
  item.manufacturer = req.body.manufacturer;
  item.type         = req.body.type;
  item.color        = req.body.color;
  item.price        = req.body.price;
  item.picture      = req.body.picture;

  item.save(function(err, savedItem) {
    if(err) {
      res.send(err)
    }
    //log a message
    console.log("Item saved!")
    //return the item
    res.json(savedItem);
  });
}

//update item
var itemUpdate = function(req, res) {
  var id = req.params.id;

  Item.findById(id, function(err, item) {
    if(err) {
      res.send(err);
    }
    //set the new item info if it exists in the request
    if(req.body.model) item.phoneModel = req.body.model;
    if(req.body.manufacturer) item.manufacturer = req.body.manufacturer;
    if(req.body.price) item.price = req.body.price;

    //save the item
    item.save(function(err, updatedItem) {
      if(err) {
        res.send(err);
      }
      //log message for update
      console.log("Updated fish");
      //return the item
      res.json(updatedItem);
    });
  });
}

// Export the function/s as JSON
module.exports = {
  itemDelete:  itemDelete,
  itemsIndex:  itemsIndex,
  itemCreate:  itemCreate,
  itemUpdate:  itemUpdate,
}
