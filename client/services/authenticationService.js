class authenticationService {
  /*@ngInject*/
  constructor($state, MyUser, $mdToast, LoopBackAuth, $q) {
    this._$state = $state;
    this._MyUser = MyUser;
    this._$mdToast = $mdToast;
    this._LoopBackAuth = LoopBackAuth;
    this._$q = $q;
    this.roles = [];
  }

  connect(credentials) {
    return this._MyUser.login(credentials).$promise.then((data) => {
      return this._MyUser.findById({
        id: data.userId,
        filter: {include: 'roles'}
      }).$promise
    })
    .then((user) => {
      this.roles = _.map(user.roles, 'name');
      var next = this._$state.nextAfterLogin || 'tournamentList';
      this._$state.go(next);
      this._$mdToast.showSimple('Connexion réussie');
    })
    .catch((err) => {
      // In case successfull log, but unable to fetch user, "logout" locally
      this._LoopBackAuth.clearUser();
      this._LoopBackAuth.clearStorage();
      this._$mdToast.showSimple('Impossible de se connecter, veuillez réessayer');
    });
  }

  disconnect () {
    return this._MyUser.logout().$promise
      .then(() => {
        this._$state.go('login');
        this._$mdToast.showSimple('Déconnexion réussie');
        this.roles = [];
      })
      .catch(() => {
        this._$mdToast.showSimple('Erreur lors de la déconnexion');
      });
  }

  isGranted (role) {
    return _.indexOf(this.roles, role) > -1;
  }

  isAdmin () {
    this.isGranted('admin');
  }

  isAuthenticated () {
    return this._MyUser.isAuthenticated();
  }

  getUser () {
    var cachedUser = this._MyUser.getCachedCurrent();
    if (cachedUser) return this._$q.resolve(cachedUser);
    return this._MyUser.getCurrent().$promise;
  }
}

app.service('authenticationService', authenticationService);





