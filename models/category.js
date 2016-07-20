var mongoose     = require('mongoose'),
    debug        = require('debug')('app:models'),
    Schema       = mongoose.Schema,


//create items for sale schema
var categorySchema = new Schema({
  category:     { type: String, required
                  enum: ["Phone Cases", "Screen Protectors", "Car Chargers"]
                },
});
