class authenticationService {
  /*@ngInject*/
  constructor(MyUser, $mdToast, LoopBackAuth, $q, $timeout) {
    this._MyUser = MyUser;
    this._$mdToast = $mdToast;
    this._LoopBackAuth = LoopBackAuth;
    this._$q = $q;
    this._$timeout = $timeout;
    this.roles = [];
    this.user = null;
    // TODOs
    this._$rootRouter = null;
    this.initialFetch = this._$q.defer().resolve();
    if (MyUser.isAuthenticated()) {
      this.initialFetch = this._setUserAndRole(MyUser.getCurrentId());
    }
  }

  connect(credentials) {
    return this._MyUser.login(credentials).$promise
      .then((data) => {
        return this._setUserAndRole(data.userId);
      })
      .then(() => {
        var next = this._$rootRouter.nextAfterLogin || ['Tournaments', 'List'];
        this._$rootRouter.navigate(next);
        this._$mdToast.showSimple('Connexion réussie');
      })
      .catch(() => {
        this._$mdToast.showSimple('Impossible de se connecter, veuillez réessayer');
      });
  }

  disconnect () {
    return this._MyUser.logout().$promise
      .then(() => {
        this._$rootRouter.navigate(['Login', 'LoginConnect']);
        this._$mdToast.showSimple('Déconnexion réussie');
        this.roles = [];
        this.user = null;
      })
      .catch(() => {
        this._$mdToast.showSimple('Erreur lors de la déconnexion');
      });
  }

  isGranted (role) {
    if (!role) {
      return true;
    }

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
    .catch((e) => {
      this.user = null;
      this.roles = [];
      this._LoopBackAuth.clearUser();
      this._LoopBackAuth.clearStorage();

      return this._$q.defer().reject(e);
    });
  }
}

app.service('authenticationService', authenticationService);





