var mongoose     = require('mongoose'),
    debug        = require('debug')('app:models'),
    Schema       = mongoose.Schema,


//create items for sale schema
var itemSchema = new Schema({
  category:     { type: String, required: true },
  manufacturer: {type: String }
  type:
  color:
  price:

});

var categorySchema = new Schema({
  name: {type: String, required: true}
})
