angular.module 'pptq-calendar'
.controller 'loginController', ($scope, $state) ->
  $scope.login = (credentials) ->
    User.login credentials
    , ->
      next = $state.nextAfterLogin || 'home'
      $state.nextAfterLogin = null
      $state.go next
    , (err) ->
      console.log 'err', err
