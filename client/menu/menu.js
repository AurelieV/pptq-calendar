class MenuComponent {
  constructor($mdSidenav, authenticationService) {
    this._$mdSidenav = $mdSidenav;
    this._authenticationService = authenticationService;
  }

  close() {
    this._$mdSidenav('left').close();
  }
}

app.component('sideMenu', {
  templateUrl: 'menu/menu.html',
  controller: MenuComponent,
  bindings: { $router: '<' }
});



