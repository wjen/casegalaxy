(function () {
  'use strict';

  angular.module('caseGalaxy', ["ui.router", "ngAnimate", "ui.bootstrap", "ngCart"])
    .config(function($httpProvider) {

      // attach our auth interceptor to the http requests
      $httpProvider.interceptors.push('authInterceptor');
    })

    .run(['authService', function(authService){
      if (authService.isLoggedIn()) authService.setUser();
    }])

})();




(function () {
  'use strict'

  angular.module("caseGalaxy")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("homePage", {
        url: "/",
        templateUrl: "templates/home.html",
        controller: "CarouselController",
        controllerAs: "carouselCtrl"
      })
      .state("aboutPage", {
        url: "/about",
        templateUrl:  "templates/about.html"
      })
      //used modal instead
      // .state("signUpPage", {
      //   url: "/signup",
      //   templateUrl: "/templates/signup.html",
      //   controller: "UsersController",
      //   controllerAs: "vm"
      // })
      //used modal instead
      // .state("loginPage", {
      //   url: "/login",
      //   templateUrl: "/templates/login.html",
      //   controller: "LoginController",
      //   controllerAs: "vm"
      // })
      .state("itemsPage", {
        url: "/items",
        templateUrl: "./templates/items.html",
        controller: "ItemsController",
        controllerAs: "itemCtrl"
      })
      .state("cart", {
        url: "/cart",
        templateUrl: "templates/checkout.html",
        controller: "ShopCartCtrl"
      })
      .state("checkout", {
        url: "/checkout",
        templateUrl: "bower_components/ngCart/template/ngCart/checkout.html",
        controller: "CartController"
      });

    $urlRouterProvider.otherwise("/");
  }

})();

(function () {
  'use strict'

  angular.module('caseGalaxy')
    .controller('CarouselController', CarouselController);

  CarouselController.$inject = [];

  function CarouselController() {
    var carouselCtrl = this;
    carouselCtrl.myInterval = 4000;
    carouselCtrl.noWrapSlides = false;
    carouselCtrl.active = 0;
    var slides = carouselCtrl.slides = [
      {
        image: "//i.imgur.com/0oIek4C.jpg?1%3E%3C/div%3E%3Cdiv%20style=",
        title: "HYBRID CASES",
        text: "Dual-Layer Protection",
        sref: "itemsPage"
      },
      {
        image: "https://appsmartmall.com/wp-content/uploads/2015/12/iPhone-6-Case-Hotbin-Protective-Rubber-iPhone-6-Case-Crystal-Clear-Flexible-Soft-TPU-Case-Ultra-Slim-Case-for-iPhone-6-Clear-0-0.jpg",
        title: "TPU BUMPER CASES",
        text: "Protection With Style",
        sref: "itemsPage"
      },
      {
        image: "https://masetv.com/wp-content/uploads/2014/09/spigen-wallet-case-iphone-6.jpg",
        title: "PREMIUM WALLET CASES",
        text: "Protection With Convenience",
        sref: "itemsPage"
      }
    ];
  };
})();

(function() {
  "use strict";

  angular
      .module("caseGalaxy")
      .controller("ItemsController", ItemsController);

  ItemsController.$inject = ['$state', 'authService', 'authToken', 'userDataService', '$log', "$http", "itemDataService"];

  function ItemsController($state, authService, authToken, userDataService, $log, $http, itemDataService) {
    var itemCtrl = this;
    itemCtrl.items = [];

    itemCtrl.getItems      = getItems;
    itemCtrl.deleteItem    = deleteItem;
    itemCtrl.updateItem   = updateItem;
    itemCtrl.postItem     = postItem;
    itemCtrl.resetEditForm = resetEditForm;
    itemCtrl.currentItem = itemDataService.item;
    itemCtrl.totalItems = getItemsLength;
    itemCtrl.getItems();

    itemCtrl.newItem = {
      category: "",
      phoneModel: "",
      manufacturer: "",
      type: "",
      color: "",
      price: "",
      picture: "",
    }

    function getItemsLength() {
      return itemCtrl.items.length;
    }

    // Object.keys returns the unique keys of each item in array
    function getUnique(arr, field) {
      var obj = {};
      arr.forEach(function(e){
        obj[e[field]] = true;
      });
      return Object.keys(obj).sort();
    };


    function getItems() {
      itemDataService.all().then(function(response) {
        itemCtrl.items = response.data;
        // console.log(itemCtrl.items[0]);
        itemCtrl.uniqueMans = getUnique(itemCtrl.items, 'manufacturer');
        itemCtrl.uniqueColors = getUnique(itemCtrl.items, 'color').filter(function(color) {
          return color !== 'undefined';
        });
        itemCtrl.uniqueType = getUnique(itemCtrl.items, 'type');
        itemCtrl.uniquePhoneModels = getUnique(itemCtrl.items, "phoneModel");
        itemCtrl.uniquePrices = getUnique(itemCtrl.items, "price");
        // itemCtrl.phoneModelSelect = itemCtrl.items[0].phoneModel;
        console.log(response.data);
      }, function(errRes) {
        console.error('Error retrieving item!', errRes);
      });
    }

    function deleteItem(id) {
      itemDataService.delete(id).then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('Error deleting Item!', errRes);
      }).then(getItems);
    }

    function postItem() {
      $http.post('/api/items', itemCtrl.newItem)
        .then(getItems)
        .then(function(response) {
          itemCtrl.newItem.picture = "";
        });
    }

    function updateItem(id) {
      $http.put('/api/items/' + id, itemCtrl.editItem)
        .then(function(response) {
          itemCtrl.editItem = {
            model: "",
            manufacturer: "",
            price: ""
          };
        }, function(errRes) {
          console.log("Error updating Item", errRes);
        }).then(getItems);
    }

    function resetEditForm() {
      itemCtrl.editItem = {
        model: "",
        manufacturer: "",
        price: ""
      };
    }


  }

})();

(function() {
  "use strict";

  angular
    .module("caseGalaxy")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$state", "userDataService", "$log", "authService", "$uibModalInstance"];

  function LoginController($state, userDataService, $log, authService, $uibModalInstance) {
    var loginCtrl = this;

    loginCtrl.login      = login;
    loginCtrl.isLoggedIn = authService.isLoggedIn;
    loginCtrl.currentUser = userDataService.user;

    loginCtrl.close = function () {
      $uibModalInstance.close();
    };

    // Form data for login
    loginCtrl.loginData;

    function login() {
      authService.login(loginCtrl.loginData.email, loginCtrl.loginData.password)
        .then(function(res) {
          $log.log(res.data);
          $uibModalInstance.close();
          $state.go('homePage');
        });
    };

  }

})();

(function() {
  "use strict";

  angular.module("caseGalaxy")
    .controller("MainController", MainController);

  MainController.$inject = ["$state", "userDataService", "$log", "authService", "$uibModal"];

  function MainController($state, userDataService, $log, authService, $uibModal) {
    var mainCtrl = this;
    mainCtrl.userService = userDataService;
    mainCtrl.logout      = authService.logout;
    mainCtrl.isLoggedIn  = authService.isLoggedIn;

    mainCtrl.$state = $state;
    //uibModal is injected and called as a ui bootstrap method
    mainCtrl.open = function() {
     var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'templates/login.html',
         controller: 'LoginController as loginCtrl'
     });
    };

    mainCtrl.openSignUp = function() {
     var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'templates/signup.html',
         controller: 'UsersController as userCtrl'
     });
    };

    mainCtrl.hello = "hello";


  };

})();

(function() {
    'use strict';

    angular.module('caseGalaxy')
        .controller('ModalController', ModalController)
    // $uibModalInstance comes from ui bootstrap
    ModalController.$inject = ["$uibModalInstance"];
    //the close button is calling the close() function
    function ModalController($uibModalInstance) {
      // var vm = this;
      // vm.close = function () {
      //   $uibModalInstance.close();
      // };
    }


}());

(function(){
  'use strict';

  angular.module('caseGalaxy')
    .controller('ShopCartCtrl', ['$scope', 'ngCart', '$http', function ($scope, ngCart, $http) {

    ngCart.setTaxRate(9.5);
    ngCart.setShipping(2.99);

  }]);

})();


angular.module('caseGalaxy')
.controller('PaginationDemoCtrl', function ($log, $anchorScroll) {
  var paginationCtrl = this;
  paginationCtrl.currentPage = 1;

  paginationCtrl.pageChanged = function() {
    $log.log('Page changed to: ' + paginationCtrl.currentPage);
    $anchorScroll();

  };

  paginationCtrl.maxSize = 5;
  paginationCtrl.bigTotalItems = 75;
  paginationCtrl.bigCurrentPage = 1;
  paginationCtrl.itemsPerPage = 9;
});

var app = angular.module('caseGalaxy');

app.filter('startFrom', function () {
  return function (input, start) {
    if (input) {
      start = +start;
      return input.slice(start);
    }
    return [];
  };
});

app.controller('PageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
  $scope.items = [{
    "name": "name 1",
      "category": [{
      "category": "management"
    }, {
      "category": "business"
    }],
      "branch": "West"
  }, {
    "name": "name 2",
      "category": [{
      "category": "engineering"
    }],
      "branch": "West"
  }, {
    "name": "name 3",
      "category": [{
      "category": "management"
    }, {
      "category": "engineering"
    }],
      "branch": "West"
  }, {
    "name": "name 4",
      "category": [{
      "category": "management"
    }, {
      "category": "business"
    }],
      "branch": "West"
  }, {
    "name": "name 5",
      "category": [{
      "category": "management"
    }, {
      "category": "business"
    }],
      "branch": "East"
  }, {
    "name": "name 6",
      "category": [{
      "category": "management"
    }, {
      "category": "business"
    }],
      "branch": "East"
  }, {
    "name": "name 7",
      "category": [{
      "category": "management"
    }, {
      "category": "business"
    }],
      "branch": "East"
  }, {
    "name": "name 8",
      "category": [{
      "category": "business"
    }],
      "branch": "West"
  }, {
    "name": "name 9",
      "category": [{
      "category": "management"
    }, {
      "category": "business"
    }],
      "branch": "East"
  }, {
    "name": "name 10",
      "category": [{
      "category": "management"
    }],
      "branch": "East"
  }, {
    "name": "name 11",
      "category": [{
      "category": "management"
    }, {
      "category": "business"
    }],
      "branch": "East"
  }, {
    "name": "name 12",
      "category": [{
      "category": "engineering"
    }],
      "branch": "West"
  }, {
    "name": "name 13",
      "category": [{
      "category": "management"
    }, {
      "category": "business"
    }],
      "branch": "West"
  }, {
    "name": "name 14",
      "category": [{
      "category": "engineering"
    }],
      "branch": "East"
  }, {
    "name": "name 15",
      "category": [{
      "category": "management"
    }, {
      "category": "engineering"
    }],
      "branch": "East"
  }, {
    "name": "name 16",
      "category": [{
      "category": "management"
    }],
      "branch": "West"
  }, {
    "name": "name 17",
      "category": [{
      "category": "management"
    }],
      "branch": "East"
  }, {
    "name": "name 18",
      "category": [{
      "category": "business"
    }],
      "branch": "West"
  }, {
    "name": "name 19",
      "category": [{
      "category": "business"
    }],
      "branch": "West"
  }, {
    "name": "name 20",
      "category": [{
      "category": "engineering"
    }],
      "branch": "East"
  }, {
    "name": "Peter",
      "category": [{
      "category": "business"
    }],
      "branch": "East"
  }, {
    "name": "Frank",
      "category": [{
      "category": "management"
    }],
      "branch": "East"
  }, {
    "name": "Joe",
      "category": [{
      "category": "business"
    }],
      "branch": "East"
  }, {
    "name": "Ralph",
      "category": [{
      "category": "management"
    }, {
      "category": "business"
    }],
      "branch": "East"
  }, {
    "name": "Gina",
      "category": [{
      "category": "business"
    }],
      "branch": "East"
  }, {
    "name": "Sam",
      "category": [{
      "category": "management"
    }, {
      "category": "engineering"
    }],
      "branch": "East"
  }, {
    "name": "Britney",
      "category": [{
      "category": "business"
    }],
      "branch": "West"
  }];

  // create empty search model (object) to trigger $watch on update
  $scope.search = {};

  $scope.resetFilters = function () {
    // needs to be a function or it won't trigger a $watch
    $scope.search = {};
  };

  // pagination controls
  $scope.currentPage = 1;
  $scope.totalItems = $scope.items.length;
  $scope.entryLimit = 8; // items per page
  $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

  // $watch search to update pagination
  $scope.$watch('search', function (newVal, oldVal) {
    $scope.filtered = filterFilter($scope.items, newVal);
    $scope.totalItems = $scope.filtered.length;
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    $scope.currentPage = 1;
  }, true);
}]);

(function() {

  angular.module("caseGalaxy")
         .controller('UsersController', UsersController);

  UsersController.$inject = ['$state', 'authService', 'authToken', 'userDataService', '$log', "$uibModalInstance"];

  function UsersController($state, authService, authToken, userDataService, $log, $uibModalInstance) {
    var userCtrl = this;

    userCtrl.currentUser = userDataService.user;
    // attaching functions to controller
    userCtrl.createUser = createUser;


    // defining function declarations
    function createUser() {
      userCtrl.message = '';
      // use the create function in the userService
      userDataService.create(userCtrl.userData)
        .success(function(data) {
          authToken.setToken(data.token);
          // set userDataService.user to the logged in user
          userDataService.user = data.user;
          userCtrl.userData = data.user;
          userCtrl.message = data.message;
          console.log(userCtrl.message);
          $uibModalInstance.close();
        });

        $state.go('homePage');
    };

    userCtrl.close = function () {
      $uibModalInstance.close();
    };
  };
})();

(function() {

  angular.module("caseGalaxy")
         .factory('authToken',       authToken)
         .factory('authService',     authService)
         .factory('authInterceptor', authInterceptor);

  authService.$inject     = ["$http", "$q", "authToken", "userDataService", "$state", "$window"];
  authToken.$inject       = ["$window"];
  authInterceptor.$inject = ["$q", "$location", "authToken"];


  //||||||||||||||||||||||||||--
  // AUTH SERVICE FACTORY
  //||||||||||||||||||||||||||--
  function authService($http, $q, authToken, userDataService, $state, $window) {

    // create auth factory object
    var authFactory = {};

    // log a user in
    authFactory.login = function(email, password) {

      // return the promise object and its data
      return $http.post('/api/login', {
        email:    email,
        password: password
      })
        .success(function(data) {
          authToken.setToken(data.token);

          // set userDataService.user to the logged in user
          userDataService.user = data.user;
          console.log("check it out", userDataService);
          return data;
        });
    };

    // log a user out by clearing the token
    authFactory.logout = function() {
      // clear the token
      authToken.setToken();

      // return to homepage
      $state.go('homePage');
    };

    // check if a user is logged in
    // checks if there is a local token
    authFactory.isLoggedIn = function() {
      if (authToken.getToken())
        return true;
      else
        return false;
    };

    // get the logged in user
    authFactory.setUser = function() {
      var token = authToken.getToken().split('.')[1];
      var user = JSON.parse($window.atob(token));
      userDataService.user = user;
      console.log(userDataService);
      return user;
    };

    // return auth factory object
    return authFactory;
  }


  //||||||||||||||||||||||||||--
  // AUTH TOKEN FACTORY
  //||||||||||||||||||||||||||--
  function authToken($window) {
    var authTokenFactory = {};

    // get the token out of local storage
    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    };

    // function to set token or clear token
    // if a token is passed, set the token
    // if there is no token, clear it from local storage
    authTokenFactory.setToken = function(token) {
      if (token) {
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    };

    return authTokenFactory;
  }


  //||||||||||||||||||||||||||--
  // AUTH INTERCEPTOR FACTORY
  //||||||||||||||||||||||||||--
  function authInterceptor($q, $location, authToken) {
    var interceptorFactory = {};

    // this will happen on all HTTP requests
    interceptorFactory.request = function(config) {

      // grab the token
      var token = authToken.getToken();

      // if the token exists, add it to the header as x-access-token
      if (token) config.headers['x-access-token'] = token;

      return config;
    };

    // happens on response errors
    interceptorFactory.responseError = function(response) {

      // if our server returns a 403 forbidden response
      if (response.status == 403) {
        authToken.setToken();
        $location.path('/');
      }

      // return the errors from the server as a promise
      return $q.reject(response);
    };

    return interceptorFactory;
  }

})();

(function() {
  "use strict";

  angular
    .module("caseGalaxy")
    .factory("itemDataService", itemDataService);

  itemDataService.$inject = ['$http'];

  function itemDataService($http) {
    var itemFactory = {
      item: {}
    };

    // get a single item
    itemFactory.get = function(id) {
      return $http.get('/api/items/' + id);
    };

    // get all items
    itemFactory.all = function() {
      return $http.get('/api/items/');
    };

    // create a item
    itemFactory.create = function(itemData) {
      return $http.post('/api/items/', itemData);
    };

    // update a item
    itemFactory.update = function(id, itemData) {
      return $http.put('/api/items/' + id, itemData);
    };

    // delete a item
    itemFactory.delete = function(id) {
      return $http.delete('/api/items/' + id);
    };



    // return our entire itemFactory object
    return itemFactory;
  }

})();

(function() {
  "use strict";

  angular
    .module("caseGalaxy")
    .factory("userDataService", userDataService);

  userDataService.$inject = ['$http'];

  function userDataService($http) {
    var userFactory = {
      user: {}
    };

    // get a single user
    userFactory.get = function(id) {
      return $http.get('/api/users/' + id);
    };

    // get all users
    userFactory.all = function() {
      return $http.get('/api/users/');
    };

    // create a user
    userFactory.create = function(userData) {
      return $http.post('/api/users/', userData);
    };

    // update a user
    userFactory.update = function(id, userData) {
      return $http.put('/api/users/' + id, userData);
    };

    // delete a user
    userFactory.delete = function(id) {
      return $http.delete('/api/users/' + id);
    };



    // return our entire userFactory object
    return userFactory;
  }

})();

'use strict';


angular.module('ngCart', ['ngCart.directives'])

    .config([function () {

    }])

    .provider('$ngCart', function () {
        this.$get = function () {
        };
    })

    .run(['$rootScope', 'ngCart','ngCartItem', 'store', function ($rootScope, ngCart, ngCartItem, store) {

        $rootScope.$on('ngCart:change', function(){
            ngCart.$save();
        });

        if (angular.isObject(store.get('cart'))) {
            ngCart.$restore(store.get('cart'));

        } else {
            ngCart.init();
        }

    }])

    .service('ngCart', ['$rootScope', 'ngCartItem', 'store', function ($rootScope, ngCartItem, store) {

        this.init = function(){
            this.$cart = {
                shipping : null,
                taxRate : null,
                tax : null,
                items : []
            };
        };

        this.addItem = function (id, name, price, quantity, data) {

            var inCart = this.getItemById(id);

            if (typeof inCart === 'object'){
                //Update quantity of an item if it's already in the cart
                inCart.setQuantity(quantity, false);
            } else {
                var newItem = new ngCartItem(id, name, price, quantity, data);
                this.$cart.items.push(newItem);
                $rootScope.$broadcast('ngCart:itemAdded', newItem);
            }

            $rootScope.$broadcast('ngCart:change', {});
        };

        this.getItemById = function (itemId) {
            var items = this.getCart().items;
            var build = false;

            angular.forEach(items, function (item) {
                if  (item.getId() === itemId) {
                    build = item;
                }
            });
            return build;
        };

        this.setShipping = function(shipping){
            this.$cart.shipping = shipping;
            return this.getShipping();
        };

        this.getShipping = function(){
            if (this.getCart().items.length == 0) return 0;
            return  this.getCart().shipping;
        };

        this.setTaxRate = function(taxRate){
            this.$cart.taxRate = +parseFloat(taxRate).toFixed(2);
            return this.getTaxRate();
        };

        this.getTaxRate = function(){
            return this.$cart.taxRate
        };

        this.getTax = function(){
            return +parseFloat(((this.getSubTotal()/100) * this.getCart().taxRate )).toFixed(2);
        };

        this.setCart = function (cart) {
            this.$cart = cart;
            return this.getCart();
        };

        this.getCart = function(){
            return this.$cart;
        };

        this.getItems = function(){
            return this.getCart().items;
        };

        this.getTotalItems = function () {
            var count = 0;
            var items = this.getItems();
            angular.forEach(items, function (item) {
                count += item.getQuantity();
            });
            return count;
        };

        this.getTotalUniqueItems = function () {
            return this.getCart().items.length;
        };

        this.getSubTotal = function(){
            var total = 0;
            angular.forEach(this.getCart().items, function (item) {
                total += item.getTotal();
            });
            return +parseFloat(total).toFixed(2);
        };

        this.totalCost = function () {
            return +parseFloat(this.getSubTotal() + this.getShipping() + this.getTax()).toFixed(2);
        };

        this.removeItem = function (index) {
            this.$cart.items.splice(index, 1);
            $rootScope.$broadcast('ngCart:itemRemoved', {});
            $rootScope.$broadcast('ngCart:change', {});

        };

        this.removeItemById = function (id) {
            var cart = this.getCart();
            angular.forEach(cart.items, function (item, index) {
                if  (item.getId() === id) {
                    cart.items.splice(index, 1);
                }
            });
            this.setCart(cart);
            $rootScope.$broadcast('ngCart:itemRemoved', {});
            $rootScope.$broadcast('ngCart:change', {});
        };

        this.empty = function () {

            $rootScope.$broadcast('ngCart:change', {});
            this.$cart.items = [];
            localStorage.removeItem('cart');
        };

        this.isEmpty = function () {

            return (this.$cart.items.length > 0 ? false : true);

        };

        this.toObject = function() {

            if (this.getItems().length === 0) return false;

            var items = [];
            angular.forEach(this.getItems(), function(item){
                items.push (item.toObject());
            });

            return {
                shipping: this.getShipping(),
                tax: this.getTax(),
                taxRate: this.getTaxRate(),
                subTotal: this.getSubTotal(),
                totalCost: this.totalCost(),
                items:items
            };
        };


        this.$restore = function(storedCart){
            var _self = this;
            _self.init();
            _self.$cart.shipping = storedCart.shipping;
            _self.$cart.tax = storedCart.tax;

            angular.forEach(storedCart.items, function (item) {
                _self.$cart.items.push(new ngCartItem(item._id,  item._name, item._price, item._quantity, item._data));
            });
            this.$save();
        };

        this.$save = function () {
            return store.set('cart', JSON.stringify(this.getCart()));
        };

    }])

    .factory('ngCartItem', ['$rootScope', '$log', function ($rootScope, $log) {

        var item = function (id, name, price, quantity, data) {
            this.setId(id);
            this.setName(name);
            this.setPrice(price);
            this.setQuantity(quantity);
            this.setData(data);
        };


        item.prototype.setId = function(id){
            if (id)  this._id = id;
            else {
                $log.error('An ID must be provided');
            }
        };

        item.prototype.getId = function(){
            return this._id;
        };


        item.prototype.setName = function(name){
            if (name)  this._name = name;
            else {
                $log.error('A name must be provided');
            }
        };
        item.prototype.getName = function(){
            return this._name;
        };

        item.prototype.setPrice = function(price){
            var priceFloat = parseFloat(price);
            if (priceFloat) {
                if (priceFloat <= 0) {
                    $log.error('A price must be over 0');
                } else {
                    this._price = (priceFloat);
                }
            } else {
                $log.error('A price must be provided');
            }
        };
        item.prototype.getPrice = function(){
            return this._price;
        };


        item.prototype.setQuantity = function(quantity, relative){


            var quantityInt = parseInt(quantity);
            if (quantityInt % 1 === 0){
                if (relative === true){
                    this._quantity  += quantityInt;
                } else {
                    this._quantity = quantityInt;
                }
                if (this._quantity < 1) this._quantity = 1;

            } else {
                this._quantity = 1;
                $log.info('Quantity must be an integer and was defaulted to 1');
            }
            $rootScope.$broadcast('ngCart:change', {});

        };

        item.prototype.getQuantity = function(){
            return this._quantity;
        };

        item.prototype.setData = function(data){
            if (data) this._data = data;
        };

        item.prototype.getData = function(){
            if (this._data) return this._data;
            else $log.info('This item has no data');
        };


        item.prototype.getTotal = function(){
            return +parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
        };

        item.prototype.toObject = function() {
            return {
                id: this.getId(),
                name: this.getName(),
                price: this.getPrice(),
                quantity: this.getQuantity(),
                data: this.getData(),
                total: this.getTotal()
            }
        };

        return item;

    }])

    .service('store', ['$window', function ($window) {

        return {

            get: function (key) {
                if ($window.localStorage [key]) {
                    var cart = angular.fromJson($window.localStorage [key]);
                    return JSON.parse(cart);
                }
                return false;

            },


            set: function (key, val) {

                if (val === undefined) {
                    $window.localStorage .removeItem(key);
                } else {
                    $window.localStorage [key] = angular.toJson(val);
                }
                return $window.localStorage [key];
            }
        }
    }])

    .controller('CartController',['$scope', 'ngCart', function($scope, ngCart) {
        $scope.ngCart = ngCart;

    }])

    .value('version', '1.0.0');
;'use strict';


angular.module('ngCart.directives', ['ngCart.fulfilment'])

    .controller('CartController',['$scope', 'ngCart', function($scope, ngCart) {
        $scope.ngCart = ngCart;
    }])

    .directive('ngcartAddtocart', ['ngCart', function(ngCart){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {
                id:'@',
                name:'@',
                quantity:'@',
                quantityMax:'@',
                price:'@',
                data:'='
            },
            transclude: true,
            templateUrl: function(element, attrs) {
                if ( typeof attrs.templateUrl == 'undefined' ) {
                    return 'template/ngCart/addtocart.html';
                } else {
                    return attrs.templateUrl;
                }
            },
            link:function(scope, element, attrs){
                scope.attrs = attrs;
                scope.inCart = function(){
                    return  ngCart.getItemById(attrs.id);
                };

                if (scope.inCart()){
                    scope.q = ngCart.getItemById(attrs.id).getQuantity();
                } else {
                    scope.q = parseInt(scope.quantity);
                }

                scope.qtyOpt =  [];
                for (var i = 1; i <= scope.quantityMax; i++) {
                    scope.qtyOpt.push(i);
                }

            }

        };
    }])

    .directive('ngcartCart', [function(){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {},
            templateUrl: function(element, attrs) {
                if ( typeof attrs.templateUrl == 'undefined' ) {
                    return 'template/ngCart/cart.html';
                } else {
                    return attrs.templateUrl;
                }
            },
            link:function(scope, element, attrs){

            }
        };
    }])

    .directive('ngcartSummary', [function(){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {},
            transclude: true,
            templateUrl: function(element, attrs) {
                if ( typeof attrs.templateUrl == 'undefined' ) {
                    return 'template/ngCart/summary.html';
                } else {
                    return attrs.templateUrl;
                }
            }
        };
    }])

    .directive('ngcartCheckout', [function(){
        return {
            restrict : 'E',
            controller : ('CartController', ['$rootScope', '$scope', 'ngCart', 'fulfilmentProvider', function($rootScope, $scope, ngCart, fulfilmentProvider) {
                $scope.ngCart = ngCart;

                $scope.checkout = function () {
                    fulfilmentProvider.setService($scope.service);
                    fulfilmentProvider.setSettings($scope.settings);
                    fulfilmentProvider.checkout()
                        .success(function (data, status, headers, config) {
                            $rootScope.$broadcast('ngCart:checkout_succeeded', data);
                        })
                        .error(function (data, status, headers, config) {
                            $rootScope.$broadcast('ngCart:checkout_failed', {
                                statusCode: status,
                                error: data
                            });
                        });
                }
            }]),
            scope: {
                service:'@',
                settings:'='
            },
            transclude: true,
            templateUrl: function(element, attrs) {
                if ( typeof attrs.templateUrl == 'undefined' ) {
                    return 'template/ngCart/checkout.html';
                } else {
                    return attrs.templateUrl;
                }
            }
        };
    }]);
;
angular.module('ngCart.fulfilment', [])
    .service('fulfilmentProvider', ['$injector', function($injector){

        this._obj = {
            service : undefined,
            settings : undefined
        };

        this.setService = function(service){
            this._obj.service = service;
        };

        this.setSettings = function(settings){
            this._obj.settings = settings;
        };

        this.checkout = function(){
            var provider = $injector.get('ngCart.fulfilment.' + this._obj.service);
              return provider.checkout(this._obj.settings);

        }

    }])


.service('ngCart.fulfilment.log', ['$q', '$log', 'ngCart', function($q, $log, ngCart){

        this.checkout = function(){

            var deferred = $q.defer();

            $log.info(ngCart.toObject());
            deferred.resolve({
                cart:ngCart.toObject()
            });

            return deferred.promise;

        }

 }])

.service('ngCart.fulfilment.http', ['$http', 'ngCart', function($http, ngCart){

        this.checkout = function(settings){
            return $http.post(settings.url,
                { data: ngCart.toObject(), options: settings.options});
        }
 }])


.service('ngCart.fulfilment.paypal', ['$http', 'ngCart', function($http, ngCart){


}]);
