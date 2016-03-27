class authenticationService {
  /*@ngInject*/
  constructor($state, MyUser, $mdToast, LoopBackAuth, $q) {
    this._$state = $state;
    this._MyUser = MyUser;
    this._$mdToast = $mdToast;
    this._LoopBackAuth = LoopBackAuth;
    this._$q = $q;
    this.roles = [];
    this.user = null;

    if (MyUser.isAuthenticated()) {
      this._setUserAndRole(MyUser.getCurrentId());
    }
  }

  connect(credentials) {
    return this._MyUser.login(credentials).$promise
      .then((data) => {
        return this._setUserAndRole(data.userId);
      })
      .then(() => {
        var next = this._$state.nextAfterLogin || 'tournamentList';
        this._$state.go(next);
        this._$mdToast.showSimple('Connexion réussie');
      })
      .catch(() => {
        this._$mdToast.showSimple('Impossible de se connecter, veuillez réessayer');
      });
  }

  disconnect () {
    return this._MyUser.logout().$promise
      .then(() => {
        this._$state.go('login');
        this._$mdToast.showSimple('Déconnexion réussie');
        this.roles = [];
        this.user = null;
      })
      .catch(() => {
        this._$mdToast.showSimple('Erreur lors de la déconnexion');
      });
  }

  isGranted (role) {
    return _.indexOf(this.roles, role) > -1;
  }

  isAdmin () {
    return this.isGranted('admin');
  }

  isAuthenticated () {
    return this._MyUser.isAuthenticated();
  }

  _setUserAndRole (id) {
    return this._MyUser.findById({id: id})
    .$promise
    .then((user) => {
      this.user = user;
      return this._MyUser.getAllRoles().$promise
    })
    .then((data) => {
      this.roles = data.roles;
    })
    .catch(() => {
      this.user = null;
      this.roles = [];
      this._LoopBackAuth.clearUser();
      this._LoopBackAuth.clearStorage();

      return Promise.reject();
    });
  }
}

app.service('authenticationService', authenticationService);





