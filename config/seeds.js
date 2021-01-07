var mongoose = require('./database');
var User = require('../models/user');
var Category = require('../models/category');
var Item = require('../models/item');

var users = [
  {
    // 0
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
  },
  {
    // 1
    name: 'guest',
    email: 'guest@gmail.com',
    password: 'guest',
  },
];

var categories = ['Phone Cases', 'Screen Protectors', 'Car Chargers'];

Item.remove({}, function (error) {
  if (error) console.log(error);
  User.remove({}, function (error) {
    if (error) console.log(error);
    User.create(users, function (error, users) {
      if (error) console.log(error);
      var items = [
        {
          category: categories[0],
          manufacturer: 'CaseGalaxy',
          type: 'Bumper TPU',
          color: 'red',
          price: 9.99,
          picture:
            'https://ak1.ostkcdn.com/images/products/7402354/BasAcc-Red-Bumper-TPU-Case-with-Aluminum-Button-for-Apple-iPhone-5-24ebda5a-2821-4bee-a919-2111ee5e32d8_600.jpg',
          phoneModel: 'Iphone 6',
        },
        {
          category: categories[0],
          manufacturer: 'CaseGalaxy',
          type: 'Bumper TPU',
          color: 'blue',
          price: 9.99,
          picture:
            'https://www.luvvitt.com/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/i/p/iphone-6-case-clear-blue-1_2.jpg',
          phoneModel: 'Iphone 6',
        },
        {
          category: categories[0],
          manufacturer: 'CaseGalaxy',
          type: 'Wallet Case',
          color: 'blue',
          price: 9.99,
          picture:
            'https://rlv.zcache.com/relaxing_blue_beach_ocean_landscape_nature_scene_wallet_phone_case_for_iphone_6_6s-rd2f821bba6884b949a15bc240d99c831_zk7cs_630.jpg?rlvnet=1&view_padding=%5B285%2C0%2C285%2C0%5D',
          phoneModel: 'Iphone 6',
        },
        {
          category: categories[0],
          manufacturer: 'CaseGalaxy',
          type: 'Hybrid',
          color: 'blue',
          price: 9.99,
          picture:
            'https://ss7.vzw.com/is/image/VerizonWireless/apple-case-mosaic-blue-wtl6scovmosblu-iset?$acc-lg$&fmt=jpeg',
          phoneModel: 'Samsung Galaxy Note 6',
        },
        {
          category: categories[0],
          manufacturer: 'CaseGalaxy',
          type: 'Hybrid',
          color: 'red',
          price: 19.99,
          picture:
            'https://blog.incipio.com/wp-content/uploads/2011/07/Iphone-4-EDGE-Iridescent-Red-Hard-Shell-Slider-Case1.jpg',
          phoneModel: 'Samsung Galaxy Note 6',
        },
        {
          category: categories[0],
          manufacturer: 'CaseGalaxy',
          type: 'Hybrid',
          color: 'red',
          price: 19.99,
          picture:
            'https://www.sqwireless.com/image/cache/data/Phone_Case/H118-S6-RD-500x500.jpg',
          phoneModel: 'Samsung Galaxy Note 6',
        },
        {
          category: categories[0],
          manufacturer: 'CaseGalaxy',
          type: 'Hybrid',
          color: 'blue',
          price: 29.99,
          picture:
            'https://cdn-img-1.wanelo.com/p/1ec/26c/874/50e0613d4c9f8bd410878e6/x354-q80.jpg',
          phoneModel: 'Samsung Galaxy S7',
        },
        {
          category: categories[0],
          manufacturer: 'CaseGalaxy',
          type: 'Hybrid',
          color: 'red',
          price: 29.99,
          picture: 'https://img.dxcdn.com/productimages/sku_428324_1.jpg',
          phoneModel: 'Samsung Galaxy S7',
        },
        {
          category: categories[0],
          manufacturer: 'CaseGalaxy',
          type: 'Hybrid',
          color: 'blue',
          price: 19.99,
          picture:
            'https://www.kikowireless.com/image/data/category/Armor%20Defender-%20Holster/Samsung/Galaxy%20S7/Shield/GS7-Hard-Shield-Blue.jpg',
          phoneModel: 'Samsung Galaxy Note 6',
        },
        {
          category: categories[1],
          manufacturer: 'CaseGalaxy',
          type: 'TemperGlass',
          color: 'clear',
          price: 9.99,
          picture:
            'https://applenapps.com/wp-content/uploads/2011/08/10730425-iphone-4-screen-protector.jpg',
          phoneModel: 'Samsung Galaxy Note 6',
        },
        {
          category: categories[1],
          manufacturer: 'WDI-10',
          type: 'TemperGlass',
          color: 'clear',
          price: 19.99,
          picture:
            'https://www.bestskinsever.com/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/i/p/iphone-5-screen-protector_2.jpg',
          phoneModel: 'Samsung Galaxy S7',
        },
        {
          category: categories[1],
          manufacturer: 'WDI-10',
          type: 'Diamond',
          price: 9.99,
          color: 'clear',
          picture:
            'https://cdn.shopify.com/s/files/1/0796/3401/products/cmi_Screen-protector_Glass_Samsung-Galaxy_S6_CM032408_8_1024x1024.png?v=1434571738',
          phoneModel: 'Samsung Galaxy S7',
        },
        {
          category: categories[2],
          manufacturer: 'WDI-10',
          type: 'Dual-Port USB',
          price: 9.99,
          color: 'black',
          picture:
            'https://www.androidcentral.com/sites/androidcentral.com/files/styles/medium/public/article_images/2015/10/aukey-qc20-car-charger.jpg?itok=tBm7F_Wy',
          phoneModel: 'Samsung Galaxy',
        },
        {
          category: categories[2],
          manufacturer: 'WDI-10',
          type: 'USB',
          price: 9.99,
          color: 'black',
          picture:
            'https://www.targus.com/content/images/thumbs/0018137_dual-usb-car-charger-for-media-tablets-mobile-phones.jpeg',
          phoneModel: 'Apple Iphone 5/6',
        },
      ];

      Item.create(items, function (error, items) {
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
