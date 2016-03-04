class createLoginCtl {
  constructor (MyUser, $mdToast) {
    this._MyUser = MyUser;
    this._$mdToast = $mdToast;
  }

  createUser (user) {
    this._MyUser.create(user).$promise
      //TODO: instead, go to confirmation message
      .then(() => {
        this._$mdToast.showSimple('Utilisateur créé avec succès');
        this.authenticationService.login({
          username: user.username,
          password: user.password
        });
      })
      .catch(() => {
        this._$mdToast.showSimple('Erreur lors de la création');
      })
  }
}
app.controller('createLoginCtl', createLoginCtl);
