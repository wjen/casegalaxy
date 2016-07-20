var mongoose     = require('mongoose'),
    debug        = require('debug')('app:models'),
    Schema       = mongoose.Schema,
    Category     = require('./category.js')


//create items for sale schema
var itemSchema = new Schema({
  category:     { type: mongoose.Schema.Types.String, ref:'Category' },
  manufacturer: { type: String },
  type:         { type: String },
  color:        { type: String },
  price:        { type: Number },
  picture:      { type: String },
  phoneModel:   { type: String }
});

//Create the model using schema.
var Item = mongoose.model("Item", itemSchema);

// Export the model of the Item.
module.exports = Item;



