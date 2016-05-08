class LoginCreateComponent {
  constructor (MyUser, authenticationService) {
    this._MyUser = MyUser;
    this.showConfirmationMessage = false;
    this.errorMessage = null;
    this.email = null;
    this._authenticationService = authenticationService;
  }

  createUser (user) {
    this._MyUser.create(user).$promise
      .then(() => {
        this.showConfirmationMessage = true;
        this.errorMessage = null;
        this.email = user.email;
      })
      .catch((err) => {
        if (err.status === 422) {
          this.errorMessage = 'Pseudo ou email déjà existant';
        } else {
          this.errorMessage = 'Impossible de créer l\'utilisateur';
        }
      })
  }
}

app.component('loginCreate', {
  templateUrl: 'login/create/loginCreate.html',
  controller: LoginCreateComponent
});
