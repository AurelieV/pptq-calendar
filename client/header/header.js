app.directive('headerBar', function($mdSidenav) {
  return {
    restrict: 'C',
    templateUrl: 'header/headerView.html',
    link: function (scope) {
      scope.openMenu = () => $mdSidenav('left').toggle()
    }
  }
});

