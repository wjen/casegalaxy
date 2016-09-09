var mongoose = require('./database');
var User     = require('../models/user');
var Category = require('../models/category');
var Item     = require('../models/item');

var users = [
  { // 0
    name:   "admin",
    email: "admin@gmail.com",
    password: "admin"
  },
  { // 1
    name:   "guest",
    email: "guest@gmail.com",
    password: "guest"
  }
];

var categories = [ "Phone Cases", "Screen Protectors", "Car Chargers" ];

Item.remove({}, function(error) {
  if (error) console.log(error);
  User.remove({}, function(error) {
    if(error) console.log(error);
    User.create(users, function(error, users) {
      if (error) console.log(error);
      var items = [
      {
        category:     categories[0],
        manufacturer: "CaseGalaxy",
        type:         "Bumper TPU",
        color:        "red",
        price:        9.99,
        picture:      "http://orzly.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/o/r/orzly-fusion-frame-case-for-iphone-6-red-_-clear_1.jpg",
        phoneModel:   "Iphone 6",
      },
      {
        category:     categories[0],
        manufacturer: "CaseGalaxy",
        type:         "Bumper TPU",
        color:        "blue",
        price:        9.99,
        picture:      "http://www.luvvitt.com/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/i/p/iphone-6-case-clear-blue-1_2.jpg",
        phoneModel:   "Iphone 6",
      },
      {
        category:     categories[0],
        manufacturer: "CaseGalaxy",
        type:         "Wallet Case",
        color:        "red",
        price:        9.99,
        picture:      "http://cdn.igeeksblog.com/wp-content/uploads/Bear-Motion-Wallet-Case-for-iPhone-6-and-6-Plus.jpg",
        phoneModel:   "Iphone 6",
      },
      {
        category:     categories[0],
        manufacturer: "CaseGalaxy",
        type:         "Wallet Case",
        color:        "blue",
        price:        9.99,
        picture:      "http://product-images.highwire.com/11217085/extra-storage-blue-textured-lg-g4-wallet-phone-case-matching-wristlet-shop-trokm-1.jpg",
        phoneModel:   "Iphone 6",
      },
      {
        category:     categories[0],
        manufacturer: "CaseGalaxy",
        type:         "Hybrid",
        color:        "blue",
        price:        9.99,
        picture:      "http://shieldtail.com/eng_pl_SHTL-Hybrid-Case-for-Samsung-Galaxy-A5-Blue-40669_6.jpg",
        phoneModel:   "Samsung Galaxy Note 6",
      },
      {
        category:     categories[0],
        manufacturer: "CaseGalaxy",
        type:         "Hybrid",
        color:        "red",
        price:        9.99,
        picture:      "http://cdn.ww0.org/i/itm/800/62/19066_01.jpg",
        phoneModel:   "Samsung Galaxy Note 6",
      },
      {
        category:     categories[0],
        manufacturer: "CaseGalaxy",
        type:         "Hybrid",
        color:        "red",
        price:        19.99,
        picture:      "http://cdn.ww0.org/i/itm/800/62/19066_01.jpg",
        phoneModel:   "Samsung Galaxy Note 6",
      },
      {
        category:     categories[0],
        manufacturer: "CaseGalaxy",
        type:         "Hybrid",
        color:        "red",
        price:        19.99,
        picture:      "http://www.sqwireless.com/image/cache/data/Phone_Case/H118-S6-RD-500x500.jpg",
        phoneModel:   "Samsung Galaxy Note 6",
      },
      {
        category:     categories[0],
        manufacturer: "CaseGalaxy",
        type:         "Hybrid",
        color:        "blue",
        price:        29.99,
        picture:      "https://cdn-img-1.wanelo.com/p/1ec/26c/874/50e0613d4c9f8bd410878e6/x354-q80.jpg",
        phoneModel:   "Samsung Galaxy S7",
      },
      {
        category:     categories[0],
        manufacturer: "CaseGalaxy",
        type:         "Hybrid",
        color:        "red",
        price:        29.99,
        picture:      "http://img.dxcdn.com/productimages/sku_428324_1.jpg",
        phoneModel:   "Samsung Galaxy S7",
      },
      {
        category:     categories[0],
        manufacturer: "CaseGalaxy",
        type:         "Hybrid",
        color:        "blue",
        price:        19.99,
        picture:      "http://www.kikowireless.com/image/data/category/Armor%20Defender-%20Holster/Samsung/Galaxy%20S7/Shield/GS7-Hard-Shield-Blue.jpg",
        phoneModel:   "Samsung Galaxy Note 6",
      },
      {
        category:     categories[1],
        manufacturer: "CaseGalaxy",
        type:         "TemperGlass",
        price:        9.99,
        picture:      "http://img.bbystatic.com/BestBuy_US/images/products/8302/8302024_rd.jpg",
        phoneModel:   "Samsung Galaxy Note 6",
      },
      {
        category:     categories[1],
        manufacturer: "WDI-10",
        type:         "TemperGlass",
        price:        19.99,
        picture:      "http://i.kinja-img.com/gawker-media/image/upload/kndb1rxfolx9z0kxb5hs.png",
        phoneModel:   "Samsung Galaxy S7",
      },
      {
        category:     categories[1],
        manufacturer: "WDI-10",
        type:         "Diamond",
        price:        9.99,
        picture:      "http://cdn.shopify.com/s/files/1/0796/3401/products/cmi_Screen-protector_Glass_Samsung-Galaxy_S6_CM032408_8_1024x1024.png?v=1434571738",
        phoneModel:   "Samsung Galaxy S7",
      },
      {
        category:     categories[2],
        manufacturer: "WDI-10",
        type:         "Dual-Port USB",
        price:        9.99,
        picture:      "http://media.gadgetsin.com/2013/10/id_america_lx_dual_usb_car_charger_with_leather_grip_1.jpg",
        phoneModel:   "Samsung Galaxy",
      },
      {
        category:     categories[2],
        manufacturer: "WDI-10",
        type:         "USB",
        price:        9.99,
        picture:      "http://cdn.cdnru1.com/templates/products/282/1.jpg",
        phoneModel:   "Apple Iphone 5/6"
      }
      ];

      Item.create(items, function(error, items) {
        if (error) {
          console.log(error);
        } else {
          console.log(`Database seeded with ${items.length} items`);
        //disconnect db
        mongoose.connection.close();
        }
        process.exit();
      });
    });
  });
});


