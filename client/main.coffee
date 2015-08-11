angular.module('pptq-calendar', [
  # Vendors
  'ui.router'
  'lbServices'
  'ngMaterial'
  'alAngularHero'
  'ngAnimate'

  'pptq-calendar.templates'
])
.run ($mdSidenav, $rootScope, $state) ->
  moment.locale 'fr'

  $rootScope.openMenu = -> $mdSidenav('left').toggle()

  $rootScope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams, error) ->
    console.log error

  $rootScope.$on '$stateChangeSuccess', (event) ->
    $mdSidenav('left').close()

  $rootScope.$on 'auth-failed', (event) ->
    event.preventDefault()
    $state.nextAfterLogin = $state.current.name
    $state.go 'login'

  $rootScope.$state = $state

.config ($httpProvider) ->
  $httpProvider.interceptors.push 'authInterceptor'



