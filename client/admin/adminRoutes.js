app.config(function($stateProvider) {
  $stateProvider
    .state('admin', {
      url: '/admin',
      abstract: true,
      templateUrl: 'admin/adminView.html',
      data: {
        roleRequired: 'admin'
      }
    })
    .state('admin.users', {
      url: '/users',
      templateUrl: 'admin/users/adminUsersView.html',
      controller: 'adminUsersCtl'
    })
});
