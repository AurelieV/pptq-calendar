angular.module 'pptq-calendar'
.directive 'headerBar', ($mdSidenav, loginFactory) ->
  restrict: 'C'
  templateUrl: 'header/view.html'
  link: (scope) ->
    scope.loginFactory = loginFactory

    scope.openMenu = ->
      $mdSidenav('left').toggle()
