Angular prefixes names of public objects with $ and names of private objects with $$. Please do not use the $ or $$ prefix in your code.


## Directives

#### a
modify default behaviour
prevent default action when `href` is empty


#### form, ngForm, input, ngBlur, ngChange, ngChecked
If the name attribute is specified, the form controller is published onto the current scope under this name.

Angular prevents the default action (form submission to the server) unless the <form> element has an action attribute specified.

Submit
• ngSubmit on form
• ngClick on first button/input with type=“submit"



In Angular forms can be nested. This means that the outer form is valid when all of the child forms are valid as well. However, browsers do not allow nesting of <form> elements, so Angular provides the ngForm directive which behaves identically to <form> but can be nested.

polyfills HTML5 validation behavior for older browsers

```
<input
       ng-model="{string}"
       [name="{string}"]
       [required]
       [ng-required="{boolean}"]
       [ng-minlength="{number}"]
       [ng-maxlength="{number}"]
       [ng-pattern="{string}"]
       [ng-change="{string}"]>
</input>
```

```
<input type="text" name="userName" ng-model="user.name" required>
<span class="error" ng-show="myForm.userName.$error.required”>Required</span>
<input type=“checkbox" [ng-true-value="{string}”] [ng-false-value="{string}”]>
<input type=“text” ng-trim />
```


#### ngApp

auto-bootstrap an application
one per HTML doc
http://plnkr.co/edit/qhzH2o4D5fRZO3KDZDZY?p=preview


#### ngBind, ngBindHtml, ngBindTemplate

Replace content with value of expression
Typically use {{ }} instead.
Use to avoid displaying raw state to browser (on home page)

Secure way.
Include angular-sanitize.min.js
http://plnkr.co/edit/C7sQMl?p=preview

Can contain multiple {{ }}
<pre ng-bind-template="{{salutation}} {{name}}!"></pre>


#### ngClass, ngClassEven, ngClassOdd
Access method from scope


ng-class=“{
     strike: isStrike,
     bold: isBold,
     red: isRed
}



#### ngClick



#### ngCloak
Prevent displaying HTML before angular can compile (in raw state)
Works due to small CSS in angular.ks
For the best result, angular.js must be loaded in head

Use important to override display: block styles (e.g. in Bootstrap) (added in 1.2.0)
```
[ng\:cloak], [ng-cloak], .ng-cloak {
  display: none !important;
}
```

Alternative <any ng-show="true" style="display: none;"></any>



#### ngController
Alternative attach in $route

If you are using $routeProvider never register controller there if you already bound it to html template using ng-controller directive!!!

#### ngCopy, ngCut, ngDblclick, ngMousedown, ngMouseenter, ngMouseleave, ngMousemove, ngMouseover ,ngMouseup, ngFocus

Custom behaviour on event

Execute inside angular context
ng-click=“action()”

setFocus http://stackoverflow.com/questions/14833326/how-to-set-focus-in-angularjs
Focus & Blur in 1.0.x https://gist.github.com/eliotsykes/5394631


Custom event on copying (selecting) text.



#### ngCsp
Enables CSP (Content Security Policy) support.
Necessary when developing things like Google Chrome Extensions.

#### ngDisabled
<button disabled="{{scope.isDisabled}}">Disabled</button>

ngHide




ngHref
ngIf


ngInclude
Fetches, compile and include external HTML fragment.

By default from same domain (& protocol), done by $sce.getTrustedResourceUrl.
Can be bypassed by whitelisting them or wrapping them as trusted values.

Browsers policies involved: SOP, CORS.
file:// won’t work on some browsers //TODO, which ones?

<ANY ng-include="{string}" [onload="{string}”] [autoscroll="{string}”]></ANY>

Creates new scope.
If controller in loaded HTML, $scope.$parent; will get ParentCtrl.ngInclude.
To access ParentCtrl use $scope.$parent.$parent;

Animations via enter/leave.

Events:
$includeContentLoaded
$includeContentRequested

TIP: Load only if property exists
<div ng-if="url" ng-include="'views/' + url"></div>




ngInit
ngKeydown
ngKeypress
ngKeyup
ngList
ngModel
ngNonBindable
ngOpen
ngPaste
ngPluralize
ngReadonly
ngRepeat
ngSelected
ngShow
ngSrc
ngSrcset
ngStyle
ngSubmit
ngSwitch
ngTransclude
ngValue
script



select
<select ng-model="template" ng-options="t.name for t in templates">
     <option value="">(blank)</option>
</select>



textarea


## Angular Patterns: Test structure
```
describe 'Module "»module name«":', ->
  $httpBackend = null

  beforeEach ->
    module 'ott.assets'

    module ($provide)->
      $provide.value 'sessionService', getSessionID: -> 'client-id'
      undefined

    inject (_$httpBackend_)->
      $httpBackend = _$httpBackend_

    sessionStorage.clear()
    localStorage.clear()

    afterEach ->
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()


  describe "#»method name«", ->
    »service to store« = null

    beforeEach inject (_»service to store«_) ->
      »service to store« = _»service to store«_
      playerStub =
        api:
          Hide: ->
          Show: ->
        controls:
          Fullscreen: ->
          Stop: ->


    it "should send proper request", ->
      data =
        asset_id: ''
        asset_type: ''
        asset_lang: ''
        timestamp: 10
        '-type': 'explicit'

      $httpBackend.expectPOST(/createBookmark.ashx/, bookmark: data).respond null
      »service to store«.query {}, bookmark: data
      $httpBackend.flush()


    it 'should handle "onNotf_24: content provided (success)" response type', ->
      $httpBackend.expectGET().respond(res: resp: [code: "notf_24"])
      sinon.spy getEpgWS, 'onNotf_24'
      getEpgWS.query()
      $httpBackend.flush()
      expect(getEpgWS.onNotf_24.called).to.be.true


    it 'should be able to wait for promise', inject ($q, $rootScope) ->
      promise = __testedService__.waitAndReturnPromise()
      resolvedValue = ''
      promise.then (value) -> resolvedValue = value

      __testedService__.setSomething('something') # Will resolve promise
      expect(resolvedValue).to.be.equal ''
      $rootScope.$apply()
      expect(resolvedValue).to.be.equal 'something'


    it 'should send proper request', ->
      $httpBackend.expectGET(/url.ashx(?=.*query=test(&|$))(?=.*start=0(&|$))(?=.*limit=99(&|$))/).respond null
      __tested_web_service__.exec "test", "search", { start: 0, limit: 0 }
      $httpBackend.flush()


    it 'should wait for session and call itself again if session service do not provide session ID', ->
      module ($provide) ->
        $provide.value "sessionService", {
          getSessionID: (->) # placeholder
          waitForSession: (->) # placeholder
        }
        undefined

      inject (webServiceWithSession, sessionService, $q, $rootScope, $httpBackend) ->
        # Setup spy
        sinon.spy(webServiceWithSession, 'query')
        # Set up defer for sessionService.waitForSession
        deffered = $q.defer()
        sessionService.waitForSession = -> deffered.promise
        # Call #query & expect 1 backend call
        $httpBackend.expectGET().respond null
        webServiceWithSession.query {}, {}, null
        # Enable getSessionID & resolve waitForSession
        sessionService.getSessionID = -> "VALID_ID"
        deffered.resolve()
        $rootScope.$apply()
        # Expect two calls to #query
        expect(webServiceWithSession.query.calledTwice).to.be.true
```


## Angular Patterns: Service structure

```
angular.module('ott.ui.dialog')
  .service('dialogService',
    ['dependendcies',
      function dialogService(dependendcies) {
          // Private properties
          var x =
          var y =
          …

          var Constructor = function(args…) {

          }

          Constructor.prototype.method = function() {}
          Constructor.prototype.method = function() {}
          …

          // Private functions
          function doX() {}
          function doY() {}

          // Public methods
          // Can work like a fasade
          this.create = function(args…) {
               return new Constructor(args…);
          }
          this.doA = function() {};
          this.doB = function() {};

          return this;
      }]);
```

## Unsorted notes


DOM manipulations inside directives and not view

Service provide heavy stuff, they provide API to whatever you want.

Controllers just to manipulate the scope, just functions

Context aware communication – PubSub. broadcast() will send a message to all children controllers, while emit() will send a message to all ancestors.

AngularJS is the only framework that understands JavaScript language as it was originally designed.


