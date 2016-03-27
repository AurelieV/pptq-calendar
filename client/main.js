'use strict';
var app = angular.module('pptq-calendar', [
  // Vendors
  'ui.router',
  'ngMaterial',
  'ngAnimate',
  'ngStorage',
  'ngSanitize',
  'ngMessages',

  // API
  'lbServices',

  // Templates
  'pptq-calendar.templates'
]);
app.run(function($mdSidenav, $rootScope, $state, MyUser, authenticationService, $mdToast) {
  // Debug
  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => console.log(error));

  // Close the menu after navigation
  $rootScope.$on('$stateChangeSuccess', function(event) {
    $mdSidenav('left').close()
  });

  // Check if the user is allowed to see this page
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (! _.get(toState, 'data.roleRequired')) return;
    if (authenticationService.isGranted(toState.data.roleRequired)) return;
    event.preventDefault();
    $mdToast.showSimple('Vous n\'avez pas les droits nécessaire pour accéder à cette page');
  });

  // Handle authentication error
  $rootScope.$on('auth-failed', function(event) {
    event.preventDefault();
    if ($state.current.name !== 'login')
      $state.nextAfterLogin = $state.current.name;
    $state.go('login');
  });

  // Expose some var for everybody
  $rootScope.$state = $state;
  $rootScope.authenticationService = authenticationService;
});

app.config(function($httpProvider) {
  moment.locale('fr');
  $httpProvider.interceptors.push('authInterceptor');
});

app.config(function($httpProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
  //@Todo: check if necessary
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $urlRouterProvider.otherwise('/');
  $urlMatcherFactoryProvider.strictMode(false)
});
