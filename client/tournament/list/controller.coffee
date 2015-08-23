angular.module 'pptq-calendar'
.controller 'tournamentListController', ($scope, loginFactory, Tournament, Availability, $mdToast, $state) ->
  $scope.isJudgeTwo = ->
    loginFactory.isGranted 'judgeTwo'
  $scope.isAdmin = ->
    loginFactory.isGranted 'admin'

  $scope.goToTournament = (tournament) ->
    $state.go 'tournamentDetail', {id: tournament.id}

  Tournament.find
    filter:
      include: ['headJudge'
      ,
        relation: 'availabilities'
        scope:
          where:
            judgeId: loginFactory.getUserId()
      ]
  , (tournaments) ->
    for tournament in tournaments
      tournament.moment = moment(tournament.date)
      tournament.week = tournament.moment.week()
    $scope.hasTournament = tournaments.length > 0
    tournamentsByWeek = _.groupBy tournaments, 'week'
    weeks = []
    for week, tournaments of tournamentsByWeek
      weeks.push
        tournaments: tournaments
        start: tournaments[0].moment.clone().startOf('week').format('DD MMM')
        end: tournaments[0].moment.clone().endOf('week').format('DD MMM')
    $scope.weeks = weeks




