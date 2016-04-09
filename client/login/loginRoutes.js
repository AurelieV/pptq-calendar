app.config(function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login/loginView.html'
    })
    .state('create-login', {
      url: '/create-login',
      templateUrl: 'login/create/createLoginView.html',
      controller: 'createLoginCtl',
      controllerAs: 'ctl'
    })
});
