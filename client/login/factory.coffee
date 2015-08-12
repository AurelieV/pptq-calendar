angular.module 'pptq-calendar'
.factory 'loginFactory', ($state, MyUser, $mdToast, $localStorage) ->
  @connect = (credentials) =>
    MyUser.login credentials
    , (data) =>
      MyUser.findById
        id: data.userId
        filter:
          include:
            relation: "roles"
      , (user) ->
        $localStorage.roles = _.map user.roles, 'name'
        next = $state.nextAfterLogin or 'home'
        $state.go next
        $mdToast.showSimple 'Connexion réussie'
    , (err) =>
      $mdToast.showSimple 'Impossible de se connecter, veuillez réessayer'

  @isGranted = (role) =>
    _.indexOf($localStorage.roles, role) > -1

  connect: @connect
  disconnect: =>
    MyUser.logout =>
      $state.go 'login'
      $mdToast.showSimple 'Déconnexion réussie'
      $localStorage.roles = null
    , (err) =>
      $mdToast.showSimple 'Erreur lors de la déconnexion'

  createUser: (user) =>
    MyUser.create user
    , =>
      $mdToast.showSimple 'Utilisateur créé avec succès'
      @connect {username: user.username, password: user.password}
    , (err) =>
      $mdToast.showSimple 'Erreur lors de la création'

  isAuthenticated: =>
    MyUser.isAuthenticated()

  getUser: =>
    MyUser.getCachedCurrent()?.username

  isGranted: @isGranted
  isAdmin: =>
    @isGranted 'admin'


