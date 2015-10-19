angular.module 'pptq-calendar'
.controller 'tournamentListController', ($scope, loginFactory, Tournament, Availability, $mdToast, $state, $location, $anchorScroll) ->
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
        endMoment: tournaments[0].moment.clone().endOf('week')
    now = moment()
    $scope.nextWeeks = _.filter weeks, (w) -> now.isBefore(w.endMoment)
    $scope.displayedWeeks = $scope.nextWeeks

    # Go to anchor.
    # TODO: move it on routing, and more generally
    console.log $state.params
    if $state.params.anchorId?
      $location.hash('tournament-' + $state.params.anchorId)
      $anchorScroll()

  $scope.toggleIsDateOnCalendar = (event, tournament) ->
    event.stopPropagation()
    Tournament.prototype$updateAttributes {id: tournament.id}
    , {isDateOnCalendar: not tournament.isDateOnCalendar}
    , (tournamentUpdated) ->
      tournament.isDateOnCalendar = not tournament.isDateOnCalendar
      $mdToast.showSimple 'Donnée modifiée !'
    , (err) ->
      $mdToast.showSimple 'Impossible de modifier la donnée'




