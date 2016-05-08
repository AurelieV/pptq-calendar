'use strict';
var app = angular.module('pptq-calendar', [
  // Vendors
  'ngAnimate',
  'ngComponentRouter',
  'ngMaterial',
  'ngMessages',
  'ngStorage',
  'ngSanitize',

  // API
  'lbServices',

  // Templates
  'pptq-calendar.templates'
]);
app.run(function($rootScope, authenticationService, $rootRouter) {
  // // Debug
  // $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => console.log(error));
  //
  // // Close the menu after navigation
  // $rootScope.$on('$stateChangeSuccess', function(event) {
  //   $mdSidenav('left').close()
  // });
  //
  // // Scroll after navigation
  // $rootScope.$on('$stateChangeSuccess', function(event, toState) {
  //   var anchorId = $state.params.anchorId;
  //   if (anchorId) {
  //     scrollService.scrollTo(anchorId)
  //   }
  // });
  //
  // // Check if the user is allowed to see this page
  // $rootScope.$on('$stateChangeStart', function(event, toState) {
  //   if (! _.get(toState, 'data.roleRequired')) return;
  //   if (authenticationService.isGranted(toState.data.roleRequired)) return;
  //   event.preventDefault();
  //   $mdToast.showSimple('Vous n\'avez pas les droits nécessaire pour accéder à cette page');
  // });


  // Handle authentication error
  //TODO: check this work ok
  $rootScope.$on('auth-failed', function(event) {
    event.preventDefault();
    if ($rootRouter.isActive(['Login', 'LoginConnect']))
      $rootRouter.nextAfterLogin = $rootRouter.current.name;
    $rootRouter.navigate(['Login', 'LoginConnect']);
  });
});

app.config(function($httpProvider) {
  moment.locale('fr');
  $httpProvider.interceptors.push('authInterceptor');
});

app.config(function($httpProvider) {
  //@Todo: check if necessary
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

