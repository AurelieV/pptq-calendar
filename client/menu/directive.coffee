angular.module 'pptq-calendar'
.directive 'sideMenu', ($mdSidenav, loginFactory) ->
  restrict: 'C'
  templateUrl: 'menu/view.html'
  link: (scope) ->
    scope.closeMenu = ->
      $mdSidenav('left').close()

    scope.loginFactory = loginFactory
