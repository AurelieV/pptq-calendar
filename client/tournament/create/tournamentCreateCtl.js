class tournamentCreateCtl {
  constructor () {
    console.log('pouet');
  }
}
app.controller('tournamentCreateCtl', tournamentCreateCtl);
//.controller 'createTournamentController', ($scope, Tournament, $mdToast, $state) ->
//  $scope.create = (tournament) ->
//    Tournament.create tournament
//    , (tournament) ->
//      $mdToast.showSimple 'Tournoi créé avec succès'
//      $state.go 'tournamentDetail', id: tournament.id
//    , (err) =>
//      $mdToast.showSimple 'Erreur lors de la création'

