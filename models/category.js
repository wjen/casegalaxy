var mongoose     = require('mongoose'),
    debug        = require('debug')('app:models'),
    Schema       = mongoose.Schema;


//create items for sale schema
var categorySchema = new Schema({
  category:     { type: String, required: true,
                  enum: ["Phone Cases", "Screen Protectors", "Car Chargers"]
  }
});


//Create the model using schema.
var Category = mongoose.model("Category", categorySchema);

// Export the model of the Item.
module.exports = Category;

