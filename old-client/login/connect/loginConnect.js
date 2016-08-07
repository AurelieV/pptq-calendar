class LoginConnectComponent {
  constructor (authenticationService) {
    this._authenticationService = authenticationService;
  }
}

app.component('loginConnect', {
  templateUrl: 'login/connect/loginConnect.html',
  controller: LoginConnectComponent
});
