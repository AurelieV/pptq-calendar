class tournamentListCtl {
  constructor (tournamentService) {
    console.log('caca');
    this.loading = true;
    tournamentService.getTournaments()
      .then((tournaments) => {
        this.tournaments = tournaments;
      })
      .finally( () => {
        this.loading = false;
      });
  }
}

app.controller('tournamentListCtl', tournamentListCtl);

//($scope, authenticationService, Tournament, Availability, $mdToast, $state, $location, $anchorScroll) ->
//  $scope.isJudgeTwo = ->
//    authenticationService.isGranted 'judgeTwo'
//  $scope.isAdmin = ->
//    authenticationService.isGranted 'admin'
//
//  $scope.goToTournament = (tournament) ->
//    $state.go 'tournamentDetail', {id: tournament.id}
//
//  Tournament.find
//    filter:
//      include: ['headJudge'
//      ,
//        relation: 'availabilities'
//        scope:
//          where:
//            judgeId: authenticationService.getUserId()
//      ]
//  , (tournaments) ->
//    for tournament in tournaments
//      tournament.moment = moment(tournament.date)
//      tournament.week = tournament.moment.week()
//    $scope.hasTournament = tournaments.length > 0
//    tournamentsByWeek = _.groupBy tournaments, 'week'
//    weeks = []
//    for week, tournaments of tournamentsByWeek
//      weeks.push
//        tournaments: tournaments
//        start: tournaments[0].moment.clone().startOf('week').format('DD MMM')
//        end: tournaments[0].moment.clone().endOf('week').format('DD MMM')
//        endMoment: tournaments[0].moment.clone().endOf('week')
//    now = moment()
//    $scope.nextWeeks = _.filter weeks, (w) -> now.isBefore(w.endMoment)
//    $scope.displayedWeeks = $scope.nextWeeks
//
//    # Go to anchor.
//    # TODO: move it on routing, and more generally
//    console.log $state.params
//    if $state.params.anchorId?
//      $location.hash('tournament-' + $state.params.anchorId)
//      $anchorScroll()




