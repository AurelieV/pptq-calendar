angular.module 'pptq-calendar'
.controller 'adminTournamentsController', ($scope, Tournament, $mdToast, $state) ->
  $scope.create = (tournament) ->
    Tournament.create tournament
    , ->
      $mdToast.showSimple 'Tournoi créé avec succès'
      $state.go 'home'
    , (err) =>
      $mdToast.showSimple 'Erreur lors de la création'

