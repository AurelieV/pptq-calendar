class AdminComponent extends BaseComponent {

}

app.component('admin', {
  templateUrl: 'admin/admin.html',
  controller: AdminComponent,
  $routeConfig: [
    {path: '/users', name: 'Users', component: 'users', useAsDefault: true},
    {path: '/regions/...', name: 'Regions', component: 'regions'}
  ],
  $canActivate: function adminCanActivate(authenticationService, $mdToast, $rootRouter) {
    return authenticationService.initialFetch
      .then(function testRoles() {
        if (authenticationService.isGranted('admin')) {
          return true;
        }
        $mdToast.showSimple('Vous ne pouvez pas accéder à cette page');

        //TODO: find a way to be no dependant of other routes
        $rootRouter.navigate(['Tournaments', 'List']);

        return false;
      })
      .catch(function testRolesError() {
        return false;
      });
  }
});
