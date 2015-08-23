angular.module 'pptq-calendar'
.config ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider, $urlMatcherFactoryProvider) ->
  $compileProvider.aHrefSanitizationWhitelist /^\s*(mailto|tel|http|https):/

  $urlRouterProvider.otherwise '/'

  $urlMatcherFactoryProvider.strictMode(false)

  $stateProvider
  .state 'tournamentList',
    url: '/'
    controller: 'tournamentListController'
    templateUrl: 'tournament/list/view.html'
  .state 'tournamentDetail',
    url: '/tournament/:id'
    controller: 'tournamentDetailController'
    templateUrl: 'tournament/detail/view.html'
    resolve:
      tournament: ($stateParams, Tournament) ->
        Tournament.findById
          id: $stateParams.id
          filter:
            include: [
              'headJudge'
              ,
                relation: 'availabilities'
                scope:
                  include: 'judge'
            ]
        .$promise
  .state 'login',
    url: '/login'
    controller: 'loginController'
    templateUrl: 'login/view.html'
  .state 'create-login',
    url: '/create-login'
    controller: 'createLoginController'
    templateUrl: 'login/create/view.html'
  .state 'admin',
    url: '/admin'
    abstract: true
    templateUrl: 'admin/view.html'
    data:
      roleRequired: 'admin'
  .state 'admin.users',
    url: '/users'
    templateUrl: 'admin/users/view.html'
    controller: 'adminUsersController'
  .state 'admin.tournaments',
    url: '/tournaments'
    templateUrl: 'admin/tournaments/view.html'
    controller: 'adminTournamentsController'

  delete $httpProvider.defaults.headers.common['X-Requested-With']
