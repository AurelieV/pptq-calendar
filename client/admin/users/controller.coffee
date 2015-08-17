angular.module 'pptq-calendar'
.controller 'adminUsersController', ($scope, MyUser, loginFactory, $mdToast) ->
  $scope.users = MyUser.find
    filter:
      include: 'roles'

  $scope.loginFactory = loginFactory

  $scope.isAdmin = (user) ->
    _.indexOf(_.map(user.roles, 'name'), 'admin') > -1

  $scope.isJudgeTwo = (user) ->
    _.indexOf(_.map(user.roles, 'name'), 'judgeTwo') > -1

  $scope.addRole = (user, role) ->
    MyUser.addRole {userId: user.id, role: role}
    , (userUpdated) ->
      user.roles = userUpdated.roles
      $mdToast.showSimple 'Role bien ajouté'
    , (err) ->
      $mdToast.showSimple 'Impossible d\'ajouter le role'

  $scope.removeRole = (user, role) ->
    MyUser.removeRole {userId: user.id, role: role}
    , (userUpdated) ->
      user.roles = userUpdated.roles
      $mdToast.showSimple 'Role bien retiré'
    , (err) ->
      $mdToast.showSimple 'Impossible de retirer le role'

