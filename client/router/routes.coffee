angular.module 'pptq-calendar'
.config ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider, $urlMatcherFactoryProvider) ->
  $compileProvider.aHrefSanitizationWhitelist /^\s*(mailto|tel|http|https):/

  $urlRouterProvider.otherwise '/'

  $urlMatcherFactoryProvider.strictMode(false)

  $stateProvider
  .state 'home',
    url: '/'
    controller: 'homeController'
    templateUrl: 'home/view.html'
  .state 'login',
    url: '/login'
    controller: 'loginController'
    templateUrl: 'login/view.html'
  .state 'create-login',
    url: '/create-login'
    controller: 'createLoginController'
    templateUrl: 'login/create/view.html'

  delete $httpProvider.defaults.headers.common['X-Requested-With']
