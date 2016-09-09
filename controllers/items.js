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

// Export the function/s as JSON
module.exports = {
  itemDelete:   itemDelete,
  itemsIndex:  itemsIndex,

}
