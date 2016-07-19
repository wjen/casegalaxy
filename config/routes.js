var express = require('express'),
    router  = express.Router();

// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');

// root path:
router.get('/', pagesController.welcome);

//new paths
router.post('/login',                        usersController.userAuth);
router.post("/users",                        usersController.userCreate);


// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

module.exports = router;
