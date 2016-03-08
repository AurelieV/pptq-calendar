class createLoginCtl {
  constructor (MyUser, $mdToast) {
    this._MyUser = MyUser;
    this._$mdToast = $mdToast;
    this.showConfirmationMessage = false;
    this.errorMessage = null;
    this.email = null;
  }

  createUser (user) {
    this._MyUser.create(user).$promise
      .then(() => {
        this.authenticationService.login({
          username: user.username,
          password: user.password
        });
        this.showConfirmationMessage = true;
        this.errorMessage = null;
        this.email = user.email;
      })
      .catch((err) => {
        // TODO: find why no error status
        this.errorMessage = 'Impossible de créer l\'utilisateur';
      })
  }
}
app.controller('createLoginCtl', createLoginCtl);
