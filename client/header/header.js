class HeaderComponent {
  constructor ($mdSidenav, authenticationService) {
    this._$mdSidenav = $mdSidenav;
    this._authenticationService = authenticationService;
  }

  toggle() {
    this._$mdSidenav('left').toggle();
  }
}

app.component('header', {
  templateUrl: 'header/header.html',
  controller: HeaderComponent
});

