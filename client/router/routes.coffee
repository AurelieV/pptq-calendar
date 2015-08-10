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

  delete $httpProvider.defaults.headers.common['X-Requested-With']
