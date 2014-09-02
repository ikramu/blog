
## Using ngModel in Custom Directives - AngularJS Video Tutorial #free @eggheadio
https://egghead.io/lessons/angularjs-using-ngmodel-in-custom-directives


## JavaScript Function Scope and $scope - AngularJS Video Tutorial #pro @eggheadio
https://egghead.io/lessons/javascript-function-scope-and-scope

Public interface for HTML.


## Using $anchorScroll - AngularJS Video Tutorial #pro @eggheadio
https://egghead.io/lessons/using-anchorscroll



## 92. WebStorm Video Tutorial: Tips & Tricks

Live templates

`cmd+;` for Ace Jump plugin

Enter to complete, Tab to complete & replace.

Cyclic expand word `alt + /`

Introduce variable `cmd+shift+v`


## 87. AngularJS Video Tutorial: Accessing Data in HTML

Avoid rootScope.
Use services for data.
As little logic in HTML as possible, move logic to controllers.
You can expose directly services in your HTML from controller, but not a best practise.





## 84. AngularJS Video Tutorial: ui-router Named Views

$stateProvider – define states

index.html
```
<!DOCTYPE html>
<html  ng-app="ui-router-named-views">
<head>
</head>
<body>

<div class="container">

  <!-- Header -->
  <div ui-view="header" class="row"></div>

  <div class="row">
    <!-- Sidebar/Nav -->
    <div ui-view="sidebar" class="col-xs-3"></div>
    <!-- Content -->
    <div ui-view="content" class="col-xs-9"></div>
  </div>

  <!-- Footer -->
  <div ui-view="footer" class="row"></div>
</div>

<!-- compiled JavaScript -->
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular.min.js"></script>
<!-- Sadly the cdn version of ui-router is out of date :< -->
<script type="text/javascript" src="angular-ui-router.js"></script>
<script type="text/javascript" src="app.js"></script>
</body>
</html>
```

app.js
```
// this is the concatenated source from the video
// and includes the HTML partials as javascript objects.
(function ( window, angular, undefined ) {

angular.module('ui-router-named-views.alt-one', ['ui.router']).config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('app.alt-one', {
      url: 'alt-one',
      views: { 'content@': { templateUrl: 'alt-one/alt-one.content.tpl.html' } }
    });
    ;
  }
]);
;
angular.module('ui-router-named-views.alt-three', [
  'ui.router',
  'blink'
]).config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('app.alt-three', {
      url: '/alt-three',
      views: {
        'content@': { templateUrl: 'alt-three/alt-three.content.tpl.html' },
        'header@': { templateUrl: 'alt-three/alt-three.header.tpl.html' },
        'one@app.alt-three': { template: '<div class="alert-info">Sub One</div>' },
        'two@app.alt-three': { template: '<div class="alert-success">Sub Two</div>' }
      }
    });
  }
]);
;
angular.module('ui-router-named-views.alt-two', ['ui.router']).config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('app.alt-two', {
      url: '/alt-two',
      views: {
        'content@': { templateUrl: 'alt-two/alt-two.content.tpl.html' },
        'header@': { templateUrl: 'alt-two/alt-two.header.tpl.html' }
      }
    });
  }
]);

angular.module('ui-router-named-views', [
  'ui-router-named-views.alt-one',
  'ui-router-named-views.alt-two',
  'ui-router-named-views.alt-three',
  'egghead-banner',
  'templates-app',
  'templates-common',
  'ui.router'
]).config([
  '$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
      url: '/',
      views: {
        'header': { templateUrl: 'common/header.tpl.html' },
        'sidebar': { templateUrl: 'common/sidebar.tpl.html' },
        'content': { templateUrl: 'common/content.tpl.html'},
        'footer': { templateUrl: 'common/footer.tpl.html' }
      }
    });
    $urlRouterProvider.otherwise('/');
  }
]);
;
angular.module('blink', []).directive('blink', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: [
        '$scope',
        '$element',
        function ($scope, $element) {
          function showElement() {
            $element.css('opacity', '1.0');
            $timeout(hideElement, 400);
          }
          function hideElement() {
            $element.css('opacity', '0.0');
            $timeout(showElement, 400);
          }
          showElement();
        }
      ],
      template: '<span ng-transclude></span>',
      replace: true
    };
  }
]);
angular.module('egghead-banner', ['templates-common']).directive('eggheadBanner', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'directives/egghead-banner/egghead-banner.tpl.html',
    scope: { title: '@' }
  };
});
;
angular.module('templates-app', ['alt-one/alt-one.content.tpl.html', 'alt-three/alt-three.content.tpl.html', 'alt-three/alt-three.header.tpl.html', 'alt-two/alt-two.content.tpl.html', 'alt-two/alt-two.header.tpl.html', 'common/content.tpl.html', 'common/footer.tpl.html', 'common/header.tpl.html', 'common/sidebar.tpl.html']);

angular.module("alt-one/alt-one.content.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("alt-one/alt-one.content.tpl.html",
    "<div class=\"row alt-content\">\n" +
    "  <h4 class=\"text-success\">Alternative Content</h4>\n" +
    "\n" +
    "  <p>The content is replaceable independently\n" +
    "    targeting the specific named view.</p>\n" +
    "</div>");
}]);

angular.module("alt-three/alt-three.content.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("alt-three/alt-three.content.tpl.html",
    "<div class=\"row alt-two-content\">\n" +
    "  <h4 class=\"text-danger\">Russian Nesting Dolls</h4>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-6\" ui-view=\"one\"></div>\n" +
    "    <div class=\"col-sm-6\" ui-view=\"two\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row text-center \">\n" +
    "    <img src=\"assets/cosmic-jackpot-sm.jpg\" alt=\"All the way down...\" class=\"whiz\"/>\n" +
    "  </div>\n" +
    "\n" +
    "  <p>You can take it a step further and have named\n" +
    "    views within named views (within\n" +
    "    named views, within named views... you get the idea).\n" +
    "  </p>\n" +
    "\n" +
    "  <p><strong class=\"text-primary\">Show some restraint here ;)</strong></p>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("alt-three/alt-three.header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("alt-three/alt-three.header.tpl.html",
    "<div class=\"row alt-two-header\">\n" +
    "  <h3 class=\"text-crazy\"><blink>Getting Crazy!</blink></h3>\n" +
    "</div>");
}]);

angular.module("alt-two/alt-two.content.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("alt-two/alt-two.content.tpl.html",
    "<div class=\"row alt-two-content\">\n" +
    "  <h4 class=\"text-danger\">More Alternative Content</h4>\n" +
    "\n" +
    "  <p>This content has replaced the previous content,\n" +
    "    while the views around it are updated.</p>\n" +
    "\n" +
    "  <div class=\"row text-center\">\n" +
    "    <img src=\"assets/thumbs_up.jpg\" alt=\"thumbs up!\" class=\"thumbs-up\"/>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("alt-two/alt-two.header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("alt-two/alt-two.header.tpl.html",
    "<div class=\"row alt-two-header\">\n" +
    "  <h3>Even a Different Header</h3>\n" +
    "</div>");
}]);

angular.module("common/content.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/content.tpl.html",
    "<div class=\"row content\">\n" +
    "  <h4 class=\"text-primary\">The Content</h4>\n" +
    "\n" +
    "  <p>This content is here for your viewing pleasure.</p>\n" +
    "</div>");
}]);

angular.module("common/footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/footer.tpl.html",
    "<div class=\"row footer text-center\">\n" +
    "  <hr/>\n" +
    "  <h5>This footer presented by egghead.io (c) 2013</h5>\n" +
    "</div>");
}]);

angular.module("common/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/header.tpl.html",
    "<div class=\"row header\">\n" +
    "  <h3>Routing with Named Views</h3>\n" +
    "</div>");
}]);

angular.module("common/sidebar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/sidebar.tpl.html",
    "<div class=\"row sidebar\">\n" +
    "  <h4>Nav</h4>\n" +
    "  <ul class=\"list-unstyled\">\n" +
    "    <li><a ui-sref=\"app\">Home</a></li>\n" +
    "    <li><a ui-sref=\"app.alt-one\">One</a></li>\n" +
    "    <li><a ui-sref=\"app.alt-two\">Two</a></li>\n" +
    "    <li><a ui-sref=\"app.alt-three\">Three</a></li>\n" +
    "  </ul>\n" +
    "</div>");
}]);

angular.module('templates-common', ['directives/egghead-banner/egghead-banner.tpl.html']);

angular.module("directives/egghead-banner/egghead-banner.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/egghead-banner/egghead-banner.tpl.html",
    "<div class=\"row text-center text-muted\">\n" +
    "  <img src=\"assets/egghead_red_shirt.png\" alt=\"egghead.io\" class=\"logo\"/>\n" +
    "\n" +
    "  <div>{{title}}</div>\n" +
    "  <hr/>\n" +
    "</div>");
}]);

})( window, window.angular );
```

## 83. AngularJS Video Tutorial: transformRequest

api-request.js
```
angular.module('twitterapi.transformers').factory('services.transformer.ApiRequest',
    function () {
        return function (data) {
            if (data.commaSeparatedAutoTags) {
                var ar = data.commaSeparatedAutoTags.split(", ");
                for (var i = 0; i < ar.length; i++) {
                    var tag = ar[i];
                    data.tweet = data.tweet.replace(tag, "#" + tag);
                }
            }
            return JSON.stringify({status: data.tweet});
        };
    });
```

api-request-spec.js
```
describe("service.transformer.ApiRequest", function () {
    var transformer, simpleRequest, taggedRequest;

    beforeEach(function () {
        module('twitterapi.transformers');
        inject(function ($injector) {
            transformer = $injector.get('services.transformer.ApiRequest');
        });

        simpleRequest = {
            tweet: "Check out my latest transform request video on egghead.io!",
            commaSeparatedAutoTags: ""
        };
        taggedRequest = {
            tweet: "Angular JS fans, be sure to pick up your tickets for NGCONF!",
            commaSeparatedAutoTags: "Angular, JS, NGCONF"
        }
    });

    it("Should set the status to the tweet provided in the request", function () {
        expect(transformer(simpleRequest)).
            toEqual(JSON.stringify({status: "Check out my latest transform request video on egghead.io!"}));
    });

    it("Should replace the commaSeparatedAutoTags in the tweet with the tag versions", function () {
        expect(transformer(taggedRequest)).
            toEqual(JSON.stringify({status: "#Angular #JS fans, be sure to pick up your tickets for #NGCONF!"}));
    });

    it("Should not require the comma separated auto tags in the request", function () {
        expect(transformer({tweet: "This is my tweet!"})).
            toEqual(JSON.stringify({status: "This is my tweet!"}));
    });
});
```


## 81. AngularJS Video Tutorial: $provide.decorator

```
angular
  .module('app', [])
  .factory('System', function() {
    function System() {
      this.error = 15;
    }
    return System;
  })
  .controller('MainCtrl', function($scope, System) {
    $scope.system = new System();
  })
  .config(function($provide) {
    $provide.decorator('System', function($delegate) {

      Object.defineProperty($delegate.prototype, 'message', {
        get: function() { return parseMessage(this.error); }
      });

      function parseMessage(error) {
        return {
          15: 'Faulted'
        }[error];
      }

      return $delegate;

    });
  });
```

## 80. AngularJS Video Tutorial: Chained Promises

https://www.dropbox.com/s/uunhmnscfkprm7w/Screenshot%202014-03-26%2010.57.55.png

https://www.dropbox.com/s/st3xwqbzwryp0ob/Screenshot%202014-03-26%2011.00.34.png

https://www.dropbox.com/s/5pcl1dp85mtfx12/Screenshot%202014-03-26%2011.01.23.png

https://github.com/ThomasBurleson/angularjs-FlightDashboard

## 79. AngularJS Video Tutorial: transformResponse

https://www.dropbox.com/s/28wu5wdlx65xe1q/Screenshot%202014-03-26%2010.54.21.png

Alter API to your needs.

api-response.js
```
angular.module('publicapi.transformers').factory('services.transformer.ApiResponse',
    function () {
        return function (data) {
            data = JSON.parse(data);
            if (data.length) {
                data = _.map(data, function(repo) {
                    return {userName: repo.full_name, gitUrl: repo.git_url};
                })
            }
            return data;
        };
    });
```

api-response-spec.js
```
describe("services.transformer.ApiResponse", function () {
    var transformer, response;

    beforeEach(function () {
        module('publicapi.transformers');
        inject(function ($injector) {
            transformer = $injector.get('services.transformer.ApiResponse');
        });
    });

    it("Should return an empty array when it receives an empty array", function () {
        expect(transformer('[]')).toEqual([]);
    });

    it("Should parse the response to 3 items with userName and gitUrl defined", function () {
        expect(transformer(response)).toEqual(
            [
                {userName: "mralexgray/-REPONAME", gitUrl: "git://github.com/mralexgray/-REPONAME.git"},
                {userName: "mralexgray/ace", gitUrl: "git://github.com/mralexgray/ace.git"},
                {userName: "mralexgray/ACEView", gitUrl: "git://github.com/mralexgray/ACEView.git"}
            ]
        );
    });

    //Response Fixture
    beforeEach(function () {
        response = JSON.stringify(
            [
                {
                    "id": 6104546,
                    "name": "-REPONAME",
                    "full_name": "mralexgray/-REPONAME",
										// ... more
```

## 78. GruntJS Video Tutorial: Multitask

https://www.dropbox.com/s/zb32peb10oythbf/Screenshot%202014-03-26%2010.19.40.png

## 77. GruntJS Video Tutorial: External Config

Webstorm has virtual file system on top on native.

```
module.exports = function (grunt) {

    grunt.initConfig({
        conf: grunt.file.readJSON("config.json"),
        uglify:{
            dist:{
                files:{
                    "dist/app.min.js": "<%= conf.input %>"
                }
            }
        },
        watch:{
            files:"<%= conf.input %>",
            tasks:["uglify"]
        }
    })

    grunt.loadNpmTasks("grunt-contrib-uglify")
    grunt.loadNpmTasks("grunt-contrib-watch")

}
```

## 76. D3: d3.max

## 75. GruntJS Video Tutorial: Uglify

```
module.exports = function (grunt) {

    grunt.initConfig({
        uglify:{
            dist:{
                files:{
                    "dist/app.min.js":"app/**/*.js"
                }
            }
        }
    })

    grunt.loadNpmTasks("grunt-contrib-uglify")
}
```

## 74. D3 Video Tutorial: Scaling Basics

## 73. AngularJS Video Tutorial: Design Pattern: Simple Mediator

Single responsibility principle.

```
angular
    .module('app', [])
    .controller('MainCtrl', function($scope, Order) {
      $scope.newOrder = function() { new Order(); }
    })
    .factory('$emit', function($rootScope) {
      return function() { $rootScope.$emit.apply($rootScope, arguments); }
    })
    .factory('Order', function($emit) {
      function Order() {
        this.email   = 'brett.shollenberger@gmail.com';
        this.product = 'Macbook Pro';
        $emit('order:created', this);
      }
      return Order;
    })
    .factory('Email', function($window) {
      function Email(text) {
        $window.alert(text);
      }
      return Email;
    })
    .run(function($rootScope, Email) {
      $rootScope.$on('order:created', function(event, order) {
        new Email('Email sent to ' + order.email + ' for ' + order.product);
      });
    });
```

https://www.dropbox.com/s/744ttn9f72gnsjl/Screenshot%202014-03-26%2010.08.11.png


## 72. AngularJS Video Tutorial: $http

In memory "database" for testing.

https://www.dropbox.com/s/es8fgqwjhsv2mgg/Screenshot%202014-03-26%2010.04.17.png

https://www.dropbox.com/s/c8rotldls4t5c3z/Screenshot%202014-03-26%2010.03.03.png

## 69. GruntJS Video Tutorial: Watch

grunt.log.writeln("string to console");

https://www.dropbox.com/s/embu2d4i19e9gzh/Screenshot%202014-03-26%2009.57.27.png

## 68. AngularJS Video Tutorial: Design Patterns: Mixin

Mixin pattern is common design pattern in all languages.

Factor out reusable code into single module.

angular.extend(mixinto, mixin) – but you can't override it.
We want to behave as pseudo parent – inject into hierarchy – using pocket knife library. (install via bower).

https://www.dropbox.com/s/tletgvo9tolpebu/68__Egghead.io__AngularJS__Design_Patterns_Mixins.mp4_20140326_095010_20140326_095018.png


## 67. RequireJS Video Tutorial: Introduction to RequireJS

html
```
<script data-main="js/main.js" src="...path to require..."></script>
```

main.js
```
require(['app'], function(app) {

})
```

app.js
```
define(function(require) {
	var alerter = require(['alerter'], function(alerter) {
		alerter("Do something");
	});
})
```

alerter.js
```
define(function() {
	return function(message) {
		alert(message);
	}
})
```

#### Async vs Sync
```
// Synchronous
var alerter = require('alerter');
alerter("Boom!");

// Asynchronous
var alerter = require(['alerter'], function(alerter) {
	alerter("Boom!");
});
```

## [] 66. D3 Video Tutorial: Get Started With D3

## [] 65. GruntJS Video Tutorial: Introduction to Grunt

## [] 64. AngularJS Video Tutorial: Testing a Controller

## [] 63. AngularJS Video Tutorial: Testing a Service


## 62. Introduction to Karma
https://dl.dropbox.com/s/3rgfgzjzurikbnp/_20131105_143616.png

## 61. AngularJS Video Tutorial: Speed Testing with WebStorm and Jasmine

## 60. Testing Underscores
https://dl.dropbox.com/s/mars3ho4h80dcwx/_20131105_143520.png

## 59. AngularJS: Unit Testing Directive Scope Binding 

## 58. Unit Testing Directive Scope
Testing directives with inherited scope
```
app.directive('simple', function() {
     function(scope, element) {
          element.bind('click', function() {
               scope.clicked = true
          })
     }
})
```
```
it 'should respond to click', inject ($rootScope) ->
     $scope = $rootScope
  browserTrigger element, "click"
     expect($scope.clicked).to.be.true
```

Harder with isolated scope
```
app.directive('simple', function() {
     return {
          scope: {},
          link: function(scope, element) {
               element.bind('click', function() {
                    scope.clicked = true
               })
          }
     }
    
})
```
```
it 'should respond to click', inject ($rootScope) ->
     $scope = $rootScope
  browserTrigger element, "click"
     expect(element.scope().clicked).to.be.true
```

## 57. Unit Testing a Directive
![](_20131105_142846.png)


## 56. Unit Testing "Hello World"
Compiling returns a linking function, we need to invoke it and pass a scope to it.
![](Unit_Testing_Hello_World__AngularJS_Video_Tutorial_free_eggheadio_20131105_143246.png)

## 55. No Custom Markup
```
var app = angular.module("app", []);

app.controller("AppCtrl", function () {
    this.random = Math.random()
})

app.directive("app", function () {
    return {
        restrict: "C",
        controller: "AppCtrl as app"
    }
})

angular.bootstrap(document.getElementById("container"), ["app"])
```

## 54. Using angular.bootstrap to initialise Your App
```
angular.bootstrap(document.getElementById("container"), ["app"])
angular.bootstrap(document.getElementById("container2"), ["app"])
```

## 53. Introduction to ui-router
```
angular.module("uiRouterExample", ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html'
            })
            .state('list', {
                url: '/list',
                templateUrl: 'templates/list.html',
                controller: 'ListCtrl'
            })
            .state('list.item', {
                url: '/:item',
                templateUrl: 'templates/list.item.html',
                controller: function($scope, $stateParams) {
                    $scope.item = $stateParams.item;
                }
            });
    })
    .controller('ListCtrl', function ($scope) {
        $scope.shoppingList = [
            {name: 'Milk'},
            {name: 'Eggs'},
            {name: 'Bread'},
            {name: 'Cheese'},
            {name: 'Ham'}
        ];
        $scope.selectItem = function (selectedItem) {
            _($scope.shoppingList).each(function (item) {
                item.selected = false;
                if (selectedItem === item) {
                    selectedItem.selected = true;
                }
            });
        };
    });
```

```
<div ui-view></div>
```

## 52. Introduction to Bower
```
bower install angular#1.2.0-rc.1
```

Wizard
```
bower init
```

```
bower search angular
```

## 51. angular.copy
```
app.controller("AppCtrl", function (contacts) {
    this.contacts = contacts;
    this.selectedContact = null;
    this.contactCopy = null;

    this.selectContact = function (contact) {
        this.selectedContact = contact;
        this.contactCopy = angular.copy(contact);
    }

    this.saveContact = function () {
        this.selectedContact.firstName = this.contactCopy.firstName;
    }
});
```
```
<form>
    <input type="text" ng-model="app.contactCopy.firstName"/>
    <button ng-click="app.saveContact()">Save</button>
</form>

<tr ng-repeat="contact in app.contacts" ng-click="app.selectContact(contact)">
    <td>{{contact.firstName}}</td>
    <td>{{contact.lastName}}</td>
    <td>{{contact.phone}}</td>
</tr>
```

## 50. Animating the Angular Way
```
app.controller("AppCtrl", function () {
  this.isHidden = false;
  this.fadeIt = function () {
    this.isHidden = !this.isHidden;
  }
});
 
app.directive("hideMe", function ($animate) {
  return function (scope, element, attrs) {
    scope.$watch(attrs.hideMe, function (newVal) {
      if (newVal) {
        $animate.addClass(element, "fade");
      } else {
        $animate.removeClass(element, "fade");
      }
    })
  }
})
 
app.animation(".fade", function () {
  return {
    addClass: function (element, className) {
      TweenMax.to(element, 1, {opacity: 0});
    },   
    removeClass: function (element, className) {
      TweenMax.to(element, 1, {opacity: 1});
    }
  }
})
```

## 49. Animating with JavaScript
[Tweenmax](http://www.greensock.com/tweenmax/)
```
app.animation(".toggle", function() {
  return {
    leave: function(element, done) {
      TweenMax.fromTo(element, 1, {opacity: 1}, {opacity: 0, onComplete: done});
    }
    enter: function(element, done) {
      TweenMax.fromTo(element, 1, {opacity: 0}, {opacity: 1, onComplete: done});
    }
  }
}
```

## 48. animation basics
Based on CSS and classes.
```
.toggle {transition: linear 1s;}
.toggle.ng-enter {opacity: 0;}
.toggle.ng-enter-active {opacity: 1;}
.toggle.ng-leave {opacity: 1;}
.toggle.ng-leave-active {opacity: 0;}
```

## 47. ng-repeat-start
```
<body ng-app="app" ng-controller="AppCtrl as app">
  <div ng-repeat-start="thing in app.things">{{ thing }}</div>
  Anything in here
  <div ng-repeat-end="">Also in here with binding {{ thing }}</div>
</body>
```

## 46. ngmin
```
ngmin app.js app.annotate.js
```

``` app.js
app.controller("AppCtrl", function ($scope, Store) {
  $scope.products = Store.products;
})
```

``` app.annotate.js
app.controller('AppCtrl', [
  '$scope',
  'Store',
  function ($scope, Store) {
    $scope.products = Store.products;
  }
]);
```

## 45. Directive Communication
Nested controllers can communicate.
```
<div ng-app="app">
  <country>
    <state>
      <city>
      </city>
    </state>
  </country>
</div>
```

```
app.directive("country", function () {
  return {
    restrict: "E",
    controller: function() {
      this.makeAnnouncement = function (message) {
        console.log("Country says: " + message);
      };
    }
  };
});

app.directive("state", function () {
  return {
    restrict: "E",
    require: "^country", // controller from above this
    controller: function () {
      this.makeLaw = function (law) {
        console.log("Law: " + law);
      };
    },
    link: function (scope, element, attrs, countryCtrl) {

    }
  };
});

app.directive("city", function () {
  return {
    restrict: "E",
    require: ["^country","^state"],
    link: function (scope, element, attrs, ctrls) {
      ctrls[0].makeAnnouncement("from city");
      ctrls[1].makeLaw("Jump higher!");
    }
  };
});
```

## 44. Experimental "Controller as" Syntax
Communicate directly through controller properties and not through scope.

Different way of providing information to view.

$scope still useful for $watch and $apply.

Can be achieved with `$scope.room = this;` in the RoomCtrl. Now is built in feature.

Benefit: Easier, clearer to read in nested controllers.

````
app.controller('RoomCtrl', function () {
  this.openDoor = function () {
    alert("creak");
  };
  this.buttonTitle = "I'm a button";
  this.foo = "I'm in the room controller!";
});

<div ng-app="app" ng-controller="RoomCtrl as room">
  <div class="button" ng-click="room.openDoor()">
    {{ room.buttonTitle }}

    <div ng-controller="OtherCtrl as other">
      {{ room.foo }}
      {{ other.foo }}
    </div>
  </div>
</div>
````

## 43. $index, $event, $log
```
<div ng-app="app">
  <div ng-controller="FooCtrl">
    <button ng-repeat="item in 'somewords'.split('')" ng-click="myFunc($event)">
      {{ $index + 1 }}. {{ item }}
      {{ $event.pageX }}
    </button>
  </div>
</div>

app.config(function ($logProvider) {
  $logProvider.debugEnabled(false);
});

app.run(function ($rootScope, $log) {
  $rootScope.$log = $log;
});

app.controller("FooCtrl", function($scope) {
  $scope.myFunc = function(ev) {
    console.warn(ev);
  };
});
```

## 42. Components and Containers

Component
````
app.directive("clock", function () {
  return {
    restrict: "E",
    scope: {
      timezone: "@"
    },
    template: "<div>12:00pm {{ timezone }}</div>"
  };
});
````

Container
````
app.directive("panel", function () {
  return {
    restrict: "E",
    transclude: true,
    scope: {
      title: "@"
    },
    template: '<div style="border: 3px solid #000000">' +
    '<div class="alert-box">{{ title }}</div>' +
    '<div ng-transclude></div>' +
    '</div>'
  };
});
````

## 41. Injectors
Injector allows the providers to come to the party.

One injector per module.

```
app.factory("game", function () {
  return {
    title: "StarCraft"
  };
});

app.controller("AppCtrl", function ($scope, game, $injector) {
  $injector.invoke(function (game) {
    $scope.title = game.title;
    alert(game.title);
  });
});
```

## 40. Providers
$provide is setting up for $injector (anything that can be injected)

`myApp.factory` is shorthand for defining factory on `$provide` in app `config` block.
```
app.factory("game", function () {
  return {
    title: "StarCraft"
  };
});
// same as
app.config(function ($provide) {
  $provide.factory("game", function () {
    return {
      title: "StarCraft"
    };
  });
});
```

`factory` is shorthand for `provider` with predefined $get function
```
app.config(function ($provide) {
  $provide.provider("game", function () {
    return {
      $get: function () {
        return {
          title: "StarCraft"
        };
      }
    };
  });
});
```

Providers are more customizable
````
app.provider("game", function () {
  var type;
  return {
    setType: function(value) {
      type = value;
    },
    $get: function () {
      return {
        title: type + "Craft"
      };
    }
  };
});

app.config(function (gameProvider) {
  gameProvider.setType("War");
});

app.controller("AppCtrl", function ($scope, game) {
  $scope.title = game.title;
});
````

## 39. Route Life Cycle
```
app.controller("AppCtrl", function ($scope, $rootScope, $route, $location) {
  $rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {
    // Step 2, route change starts, no promises have been resolved yet
    console.log($scope, $rootScope, $route, $location);
  });
  $rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
    // Step 3, route is successfully changed, UI has not been updated yet
    console.log($scope, $rootScope, $route, $location);
  });
});

var viewCtrl = app.controller("ViewCtrl", function ($scope, $rootScope, $route, $location) {
  $scope.changeRoute = function () {
    // Step 1, occurs before the route change begins
    console.log($scope);
    $location.path("/new");
  };
});

app.controller("NewCtrl", function ($scope, loadData, $template) {
  // Step 4, the new controller has been instantiated
  console.log($scope, loadData, $template);
});
```


## 38. Directive for Route Handling
Be careful about injecting logic into controllers.
````
app.directive("error", function($rootScope) {
  return {
    restrict: "E",
    template: '<div class="alert-box alert" ng-show="isError">Error!</div>',
    link: function(scope) {
      $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
        scope.isError = true;
      });
    }
  }
});
````

## 37. resolve $routeChangeError
If something in `resolve` fails (`rejected`) to load, it will block everything

Always have some kind of main ctrl (MainCtrl, AppCtrl) that handles failures.

```
var app = angular.module("app", []);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/',
    {
      templateUrl: "app.html",
      controller: "ViewCtrl",
      resolve: {
        loadData: viewCtrl.loadData,
      }
    });
});

app.controller('AppCtrl', function ($rootScope) {
  $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
    console.log(event);
    console.log(current);
    console.log(previous);
    console.log(rejection);
  });
});

var viewCtrl = app.controller("ViewCtrl", function ($scope, $q) {
  console.log($route);
  $scope.model = {
    message: 'This is my app'
  };
});

viewCtrl.loadData = function($q, $timeout) {
  var defer = $q.defer();
  $timeout(function() {
    defer.reject("Your network is down");
  }, 2000);
  return defer.promise;
};
```

## 36. resolve conventions
```
var app = angular.module("app", []);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/',
    {
      templateUrl: "app.html",
      controller: "AppCtrl",
      resolve: {
        loadData: appCtrl.loadData,
        prepData: appCtrl.prepData
      }
    });
});

var appCtrl = app.controller("AppCtrl", function ($scope, $q) {
  $scope.model = {
    message: 'This is my app'
  };
});

appCtrl.loadData = function($q, $timeout) {
  var defer = $q.defer();
  $timeout(function() {
    defer.resolve("loadData");
  }, 2000);
  return defer.promise;
};

appCtrl.prepData = function($q, $timeout) {
  var defer = $q.defer();
  $timeout(function() {
    defer.resolve("prepData");
  }, 2000);
  return defer.promise;
};
```

## 35. Resolve
resolve property in $routeProvider – list of promises that need to happed before routes proceed
```
$routeProvider
  .when('/', {
    templateUrl: "home.html",
    controller: "HomeCtrl",
    resolve: {
      app: function($q, $timeout) {
        var defer = $q.defer();
        $timeout(function() {
          defer.resolve();
        }, 2000);
        return defer.promise;
      }
    }
  })
```

## 34. Promises
```
var defer = $q.defer();

defer.promise
  .then(function(weapon) {
    alert("Promised I show up with " + weapon);
    return "bow"
  })
  .then(function(weapon) {
    alert("Me too " + weapon);
    return "axe";
  })
  .then(function(weapon) {
    alert("And my " + weapon);
  })
defer.resolve("sword");
```

## 33. redirectTo
```
$routeProvider
  .when('/pizza/:crust/:toppings', {
    redirectTo: function(routeParams, path, search) {
      return "/" + routeParams.crust
    }
  })
```

## 32. $routeParams
```
$routeProvider
  .when('/movie/:id', {
    templateUrl: "movie.html",
    controller: "MovieCtrl"
  })

app.controller("MovieCtrl", function($scope, $routeParams) {
  $scope.model = {
    id: $routeParams.id
  }
});
```

## 31. $routeProvider api
`when` and `otherwise`
```
$routeProvider
  .when('/', {
    templateUrl: "app.html",
    controller: "AppCtrl"
  })
  .when('/list', {
    templateUrl: "app.html",
    controller: "AppCtrl"
  })
  .otherwise({
    templateUrl: "404.html",
  }) 
```

## 30. The config function
in config phase we have access to providers which provide instance of service
```
app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'app.html',
    controller: 'AppCtrl'
  })
});

app.controller("AppCtrl", function($scope, $route) { // $route is preconfigured service from $routeProvider configed in config
  $route.routes["/"] = {
    templateUrl: 'app.html',
    controller: 'AppCtrl' // Too late
  }
});
```

## 29. ng-view
```
<div ng-app="app">
  <ng-view></ng-view>
</div>
```

```
app.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "app.html",
      controller: "AppCtrl"
    }
  );
});
```

## 28. $templateCache
```
app.directive("zippy", function($templateCache){
  console.log($templateCache.get("zippy.html"));
```

```
templateUrl: "zippy.html" <>==> template: $templateCache.get("zippy.html")
```

```
app.run(function($templateCache){
  $templateCache.put("zippy.html", '<div><h3ng-click="toggleContent()">{{title}}</h3><div ng-show="isContentVisible" ng-transclude></div></div>')
})
```

## 27. templateUrl
Templates can be located inside script tag
```
<script type="text/ng-template" id="zippy.html">
  <div><h3 ng-click="toggleContent()">{{title}}</h3>
    <div ng-show="isContentVisible" ng-transclude></div>
  </div>
</script>
```

## 26. $scope vs. scope
Order in normal function arguments is important, but names doesn't matter.
Order in $named arguments doesn't matter, but names matter.


```
app.controller("MyCtrl",["$scope", function(a){
  console.log(a)
}]);
```

```
app.directive("myDirective", function() {
  return {
    scope: {};
    link: function(scope, element, attrs) {
      console.log(element);
    }
  };
});
```

## 25. angular.element
```
var app = angular.module("app", [])
 
app.directive("dumbPassword", function () {
  var validElement = angular.element('<div>{{ model.input }}</div>');
  return {
    restrict: "E",
    replace: true,
    compile: function (tElem) {
      tElem.append(validElement);
      return function (scope) {
        scope.$watch("model.input", function (value) {
          if(value === "password") {
            validElement.toggleClass("alert-box alert");
          }
        });
      };
    }
  }
});
```

## 24. Building Zippy
```
<zippy title="{{model.title}}">
  The content is: {{model.content}}
</zippy>
```

```
app.directive("zippy", function(){
  return {
    restrict: "E",
    transclude: true,
    scope: {
      title: "@"
    },
    template: '<div>' +
      '<h3 ng-click="toggleContent()">{{title}}</h3>' +
      '<div ng-show="isContentVisible" ng-transclude></div>' +
      '</div>',
    link: function(scope){
      scope.isContentVisible = false;
      scope.toggleContent = function(){
        scope.isContentVisible = !scope.isContentVisible;
      };
    };
  };
});
```

## 23. Thinking Differently About Organization
```
var app = angular.module('phoneApp', []);
 
var controllers = {};
controllers.AppCtrl = function ($scope) {
  …
});
 
app.controller(controllers);
```

```
var directives = {};
directives.panel = function () {
  …
};
 
app.directive(directives);
```

## 22. An Alternative Approach to Controllers
```
app.controller("AppCtrl", function ($scope) {
  this.sayHi = function () {
    alert('hi');
  };
  return $scope.AppCtrl = this;
});
```
```
<div ng-controller="AppCtrl">
  <div class="button" ng-click="AppCtrl.sayHi()">Click me!</div> // more explicit
</div>
```

## 21. Transclusion Basics

```
transclude: true
template: '<div class="project" ng-transclude>{{name}}</div>'
```

## 20. Isolate Scope Review

```
@ – read value
= - bidirectional bidning
& – evaluate on scope
```

## 19. Isolate Scope "&"
Evaluate expression on a parent scope.
```
<div ng-app="phoneApp">
  <div ng-controller="AppCtrl">
    <div phone dial="callHome(message)"></div>
    <div phone dial="callHome(message)"></div>
    <div phone dial="callHome(message)"></div>
  </div>
</div>
```

```
app.controller("AppCtrl", function ($scope) {
  $scope.callHome = function (message) {
    alert(message);
  };
});

app.directive("phone", function() {
  return {
    scope: {
      dial: "&"
    },
    template: '<input type="text" ng-model="value">' +
              '<div class="button" ng-click="dial({message: value})">Call home!</div>'
  };
});
```

## 18. Isolate Scope "="
Expecting a object to bind both ways.

## 17. Isolate Scope "@"
```
link: (scope, element, attrs) ->
      scope.name = attrs.name
```
same as
```
scope: {
  name: '@' // pass this as a string to the scope and assign it
}
```

## 16. Understanding Isolate Scope
scope: {}
break interaction with controller

```
<div ng-app="choreApp">
  <div ng-controller="ChoreCtrl">
    <kid done="logChore(chore)"></kid>
  </div>
</div>
```

```
var app = angular.module('choreApp', []);

app.controller("ChoreCtrl", function($scope) {
  $scope.logChore = function(chore) {
    alert(chore + " is done");
  };
});

app.directive("kid", function() {
  return {
    restrict: "E",
    scope: {
      done: "&"
    },
    template: '<input type="text" ng-model="chore"> {{ chore }}' +
              '<div class="button" ng-click="done({chore:chore})">I\'m done</div>'
  };
});
```

## 15. Directive to Directive Communication
Controller in directive ~ API for other directives to talk to this one
Directives can require other directives via `require` and has access to its controller.
`link: function()

```
<div ng-app="superApp">
  <superhero flight speed strength>Superman</superhero>
  <superhero speed>The Flash</superhero>
  <superhero strength>The Hulk</superhero>
</div>
```

```
app.directive("superhero", function () {
  return {
    restrict: "E",
    scope: {}, // Create own scope for each superhero element, otherwise it will be shared

    controller: function ($scope) {
      $scope.abilities = [];

      this.addStrength = function () {
        $scope.abilities.push("strength");
      };

      this.addSpeed = function () {
        $scope.abilities.push("speed");
      };

      this.addFlight = function () {
        $scope.abilities.push("flight");
      };
    },
   
    link: function (scope, element) {
      element.bind("mouseenter", function () {
        console.log(scope.abilities);
      });
    }
  };
});

app.directive("strength", function () {
  return {
    require: "superhero",
    link: function (scope, element, attrs, superheroCtrl) {
      superheroCtrl.addStrength();
    }
  };
});

app.directive("speed", function () {
  return {
    require: "superhero",
    link: function (scope, element, attrs, superheroCtrl) {
      superheroCtrl.addSpeed();
    }
  };
});

app.directive("flight", function () {
  return {
    require: "superhero",
    link: function (scope, element, attrs, superheroCtrl) {
      superheroCtrl.addFlight();
    }
  };
});
```

## 14. Directives Talking to Controllers
```
<div enter="deleteTweets()">Roll over to delete</div>

app.directive("enter", function () {
  return function (scope, element, attrs) {
    element.bind("mouseenter", function () {
      scope.$apply(attrs.enter);
    });
  };
});
```

## 13. Useful Behaviors
```
<div ng-app="behaviorApp">
  <div enter="panel" leave>I'm content</div>
</div>
```

```
app.directive("enter", function () {
  return function (scope, element, attrs) {
    element.bind("mouseenter", function () {
      element.addClass(attrs.enter);
    });
  };
});

app.directive("leave", function () {
  return function (scope, element, attrs) {
    element.bind("mouseleave", function () {
      element.removeClass(attrs.enter);
    });
  };
});
```

## 12. Basic Behaviors
```
<div ng-app="behaviorApp">
  <div enter leave>I'm content</div>
</div>
```

```
app.directive("enter", function () {
  return function (scope, element) {
    element.bind("mouseenter", function () {
      console.log("I'm inside of you!");
    });
  };
});

app.directive("leave", function () {
  return function (scope, element) {
    element.bind("mouseleave", function () {
      console.log("I'm leaving on a jetplane!");
    });
  };
});
```

TIP: If we want to set just linking function, we can return it instead of object.


## 11. Directive Restrictions
http://docs.angularjs.org/guide/directive
Custom retrictions:
E - Element name: <my-directive></my-directive>
A - Attribute (default): <div my-directive="exp"> </div>
C - Class: <div class="my-directive: exp;"></div>
M - Comment: <!-- directive: my-directive exp -->


## 10. First Directive
```
myApp.directive('superman', function() {
  return {
    restrict: "E",
    template: "<div>Here I am to save the day</div>"
  }
})

<superman></superman>
```

## 9. Built-in Filters
```
<tr ng-repeat="actor in avengers.cast | orderBy:'name'">
<tr ng-repeat="actor in avengers.cast | orderBy:'-name'"> // reverse
<tr ng-repeat="actor in avengers.cast | limitTo:'5'">
<tr ng-repeat="actor in avengers.cast | limitTo:'-5'"> // from end 
<tr ng-repeat="actor in avengers.cast | orderBy:'name' | limitTo:'-5' | filter:search"> // stacking
```

#### currency
#### date
#### filter
#### json
#### limitTo
limitTo:5 (first 5)
limitTo:-5 (last 5)

#### number
#### orderBy
#### lowercase, uppercase


## 8. ngRepeat and Filtering Data
```
var app = angular.module('app', []);
myApp.factory('Avengers', function () {
  var Avengers = {};
  Avengers.cast = [
    {name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man'},
    …
  ];
  return Avengers;
});

function AvengersCtrl($scope, Avengers) {
  $scope.avengers = Avengers;
}
```

```
<input ng-model="searchText">
<tr ng-repeat="actor in avengers.cast | filter:searchText">
 
<input ng-model="search.name"> 
<tr ng-repeat="actor in avengers.cast | filter:search">

<input ng-model="search.$"> 
<tr ng-repeat="actor in avengers.cast | filter:search">
```

## 7. Testing Overview
Smallest steps to pass.
```
app.filter('reverse', function() {
  return function(text) {
    return "DCBA";
  }
});
```

Have enough coverage to address all possible cases.
```
describe('filter', function() {
  beforeEach(module('myApp'));
 
  describe('reverse', function() {
    it('should reverse a string', inject(function(reverseFilter) {
        expect(reverseFilter('ABCD')).toEqueal('DCBA');
      }))
  })
})
```

## 6. Filters
```
myApp.filter('reverse', function() {
  return function(text) {
    return text.split("").reverse().join("");
  }
})
```

## 5. Defining a Method on the Scope
Define methods on $scope – become accessible in controller's views.

Best practice: Do not reference $scope inside of $scope functions –> easier to extracts

```
$scope.reverseMessage = function(msg) {
  return msg.split("").reverse().join(""); // Even better, use filter for this use case
}
```

## 4. Sharing Data Between Controllers
What is parent of top-level controller? *ng-app?*

Pass services to controllers to share data between controllers.

```
myApp.factory('Data', function() {
  return {message: 'Hello'}
})
function FirstController($scope, Data) {
  $scope.message = Data.message;
}
```

## 3. The Dot
Avoid overwriting properties in the scope from `ng-model`

Assign model to scope, do not assign properties directly to scope.
```
<input type="text" ng-model="data.name">
```

## 2. Controllers
Controllers are the 'glue' of an AngularJS application. They connect your markup with your data and act as a sort of switchboard.
```
<div ng-controller="FirstCtrl">
function FirstCtrl($scope) {
  $scope.data = {message: "Hello"};
}
```

## 1. Binding
Simple mechanism for integrating your HTML with your data via {{bracketed expressions}}.
```
<div ng-app>
  {{1 + 1}}
  {{"Joe " + "Doe"}}
  {{3 * 3}}
</div>
```

Usable even in attrs
```
<div class="{{data.message}}">
```

vs ngClass
```
<p ng-class="{strike: deleted, bold: important}">Example</p>
```