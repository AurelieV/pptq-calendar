angular.module 'pptq-calendar'
.factory 'loginFactory', ($state, MyUser, $mdToast) ->
  @connect = (credentials) =>
    MyUser.login credentials
    , (data) =>
      next = $state.nextAfterLogin or 'home'
      $state.go next
      $mdToast.showSimple 'Connexion réussie'
    , (err) =>
      $mdToast.showSimple 'Impossible de se connecter, veuillez réessayer'

  connect: @connect
  disconnect: =>
    MyUser.logout =>
      $state.go 'login'
      $mdToast.showSimple 'Déconnexion réussie'
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

