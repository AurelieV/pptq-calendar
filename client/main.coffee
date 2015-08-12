angular.module('pptq-calendar', [
  # Vendors
  'ui.router'
  'lbServices'
  'ngMaterial'
  'alAngularHero'
  'ngAnimate'

  'pptq-calendar.templates'
])
.run ($mdSidenav, $rootScope, $state, MyUser) ->
  moment.locale 'fr'

  $rootScope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams, error) ->
    console.log error

  $rootScope.$on '$stateChangeSuccess', (event) ->
    $mdSidenav('left').close()

  $rootScope.$on 'auth-failed', (event) ->
    event.preventDefault()
    #Good redirection if authentication fail in login page
    $state.nextAfterLogin = $state.current.name if $state.nextAfterLogin isnt 'login'
    $state.go 'login'

  $rootScope.$state = $state

  #Check Authentication
  MyUser.getCurrent() if MyUser.isAuthenticated()

.config ($httpProvider) ->
  $httpProvider.interceptors.push 'authInterceptor'



