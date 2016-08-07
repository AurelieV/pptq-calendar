app.config(($stateProvider) => {
  $stateProvider
    .state({
      name: 'home',
      url: '/',
      component: 'tournamentList'
    })
    .state({
      name: 'admin',
      url: '/admin',
      component: 'admin',
      abstract: true
    })
      .state({
        name: 'admin.users',
        url: '/users',
        component: 'users'
      })
      .state({
        name: 'admin.regions',
        url: '/regions',
        component: 'regionsList'
      })
      .state({
        name: 'admin.regions-new',
        url: '/regions/new',
        component: 'regionsEdit'
      })
      .state({
        name: 'admin.regions-edit',
        url: '/regions/edit/:id',
        component: 'regionsEdit',
        resolve: {
          region: (regionService, $stateParams) => {
            return regionService.get($stateParams.id)
          }
        }
      })
  ;
});
