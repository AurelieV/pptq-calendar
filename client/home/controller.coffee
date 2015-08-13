angular.module 'pptq-calendar'
.controller 'homeController', ($scope, loginFactory) ->
  $scope.isJudgeTwo = ->
    loginFactory.isGranted 'judgeTwo'

