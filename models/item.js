var mongoose     = require('mongoose'),
    debug        = require('debug')('app:models'),
    Schema       = mongoose.Schema,
    Category     = require('./category.js')


//create items for sale schema
var itemSchema = new Schema({
  category:     { type: String, required: true,
                  enum: ["Phone Cases", "Screen Protectors", "Car Chargers"]
                },
  manufacturer: { type: String, trim: true},
  type:         { type: String, trim: true},
  color:        { type: String, trim: true},
  price:        { type: Number, trim: true},
  picture:      { type: String, trim: true},
  phoneModel:   { type: String, trim: true}
});

//Create the} model using schema.
var Item = mongoose.model("Item", itemSchema);

// Export the model of the Item.
module.exports = Item;



