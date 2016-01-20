angular.module 'pptq-calendar'
.controller 'myDatepickerInputController', ($scope, $attrs, $timeout, $mdDialog) ->
  if angular.isDefined($scope.model)
    $scope.selected =
      model: moment($scope.model).format('LL')
      date: $scope.model
  else
    $scope.selected =
      model: undefined
      date: new Date

  $scope.openPicker = (ev) ->
    $scope.yearSelection = false
    $mdDialog.show
      targetEvent: ev
      templateUrl: 'utils/myDatepicker/dialog.html'
      controller: 'myDatepickerController'
      locals:
        model: $scope.model
        locale: $attrs.locale
        mdTheme: $attrs.dialogMdTheme
    .then (selected) ->
      if selected
        $scope.selected = selected
        $scope.model = selected.date

.directive 'mdcDatePicker', ->
  restrict: 'AE'
  controller: 'myDatepickerInputController'
  scope:
    model: '='
    label: '@'
  templateUrl: 'utils/myDatepicker/input.html'
