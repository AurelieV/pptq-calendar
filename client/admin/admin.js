class AdminComponent extends BaseComponent {
}

app.component('admin', {
  templateUrl: 'admin/admin.html',
  controller: AdminComponent,
  $routeConfig: [
    {path: '/users', name: 'AdminUsers', component: 'adminUsers', useAsDefault: true},
    {path: '/regions', name: 'AdminRegions', component: 'adminRegions'}
  ]
});
