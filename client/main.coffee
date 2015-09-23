angular.module('pptq-calendar', [
  # Vendors
  'ui.router'
  'lbServices'
  'ngMaterial'
  'alAngularHero'
  'ngAnimate'
  'ngStorage'

  'pptq-calendar.templates'
])
.run ($mdSidenav, $rootScope, $state, MyUser, loginFactory, $mdToast, $localStorage) ->
  moment.locale 'fr'

  $rootScope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams, error) ->
    console.log error

  $rootScope.$on '$stateChangeSuccess', (event) ->
    $mdSidenav('left').close()

  $rootScope.$on '$stateChangeStart', (event, toState) ->
    return unless toState.data?.roleRequired?
    return unless loginFactory.isGranted(toState.data.roleRequired?)
    event.preventDefault()
    $mdToast 'Vous n\'avez pas les droits nécessaire pour accéder à cette page'


  $rootScope.$on 'auth-failed', (event) ->
    event.preventDefault()
    #Good redirection if authentication fail in login page
    $state.nextAfterLogin = $state.current.name if ($state.current.name isnt 'login')
    $state.go 'login'

  $rootScope.$state = $state
  $rootScope.loginFactory = loginFactory

  #Check Authentication
  if MyUser.isAuthenticated()
    MyUser.getCurrent()
#    MyUser.findById
#      id: MyUser.getUserId()
#      filter:
#        include:
#          relation: "roles"
#    , (user) ->
#      console.log 'pouet', user
#      $localStorage.roles = _.map user.roles, 'name'

.config ($httpProvider) ->
  $httpProvider.interceptors.push 'authInterceptor'



