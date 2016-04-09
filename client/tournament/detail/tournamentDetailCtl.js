class tournamentDetailCtl {
   
}

app.controller('tournamentDetailCtl', tournamentDetailCtl);


// if $scope.isAdmin()
//   MyUser.findByRole {role: 'judgeTwo'}
//   , (data) ->
//     $scope.judges = data.users
//
// $scope.edit = ->
//   $scope.editMode = true
//   $scope.tournamentEdited = angular.copy tournament
//
// $scope.saveInfo = ->
//   Tournament.prototype$updateAttributes {id: tournament.id}, $scope.tournamentEdited
//   , (tournamentUpdated) ->
//     dumpHJ = tournament.headJudge
//     dumpAvailabilites = tournament.availabilities
//     angular.copy tournamentUpdated, tournament
//     tournament.headJudge = dumpHJ
//     tournament.availabilities = dumpAvailabilites
//     $mdToast.showSimple 'Données modifiées !'
//     $scope.editMode = false
//   , (err) ->
//     $mdToast.showSimple 'Impossible de modifier les données'
//
// $scope.myAvailability = _.find tournament.availabilities, (availability) -> availability.judgeId is me
//
// $scope.notMyAvailabilies = _.filter tournament.availabilities, (availability) -> availability.judgeId isnt me
//
// $scope.changeMyAvailability = (value) ->
//   return unless me
//   if $scope.myAvailability
//     Availability.prototype$updateAttributes {id: $scope.myAvailability.id}, {value: value}
//     , (data) ->
//       $scope.myAvailability.value = value
//       $mdToast.showSimple 'Dispo modifiée'
//     , (err) ->
//       $mdToast.showSimple 'Impossible de modifier la dispo'
//   else
//     Availability.create
//       value: value
//       tournamentId: tournament.id
//       judgeId: me
//     , (data) ->
//       $scope.myAvailability = data
//       $mdToast.showSimple 'Dispo modifiée'
//     , (err) ->
//       $mdToast.showSimple 'Impossible de modifier la dispo'
//
// $scope.nominateHeadJudge = (headJudge) ->
//   Tournament.prototype$updateAttributes {id: tournament.id}, {headJudgeId: headJudge}
//   , (data) ->
//     tournament.headJudge = _.find $scope.judges, (judge) -> judge.id is headJudge
//     $mdToast.showSimple 'HeadJudge nommé'
//   , (err) ->
//     $mdToast 'Impossible de modifier le head judge'
//



