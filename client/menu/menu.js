app.directive('sideMenu', function($mdSidenav) {
  return {
    restrict: 'C',
    templateUrl: 'menu/menuView.html',
    link: function (scope) {
      scope.closeMenu = () => $mdSidenav('left').close();
    }
  }
});

