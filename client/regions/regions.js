class regionsComponent extends BaseComponent {
  $routerOnActivate() {
    this.adminCtl.active = 'regions';
  }
}

app.component('regions', {
  templateUrl: 'regions/regions.html',
  controller: regionsComponent,
  require: {
    adminCtl: '^admin'
  },
  $routeConfig: [
    {path: '/', name: 'List', component: 'regionsList', useAsDefault: true},
    {path: '/create', name: 'Create', component: 'regionsCreate'},
    {path: '/edit/:id', name: 'Edit', component: 'regionsEdit'}
  ]
});
