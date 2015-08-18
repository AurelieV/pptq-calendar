angular.module 'pptq-calendar'
.controller 'homeController', ($scope, loginFactory, Tournament, Availability, $mdToast) ->
  $scope.isJudgeTwo = ->
    loginFactory.isGranted 'judgeTwo'
  $scope.isAdmin = ->
    loginFactory.isGranted 'admin'

  Tournament.find
    filters:
      include:
        relation: 'availabilities'
        scope:
          where:
            memberId: loginFactory.getUserId()
  , (tournaments) ->
    for tournament in tournaments
      tournament.moment = moment tournament.date
      console.log tournament
    $scope.tournaments = tournaments



