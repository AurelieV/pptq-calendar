app.value('$routerRootComponent', 'app');

app.component('app', {
  templateUrl: 'app/app.html',
  $routeConfig: [
    {path: '/tournaments/...', name: 'Tournaments', component: 'tournaments', useAsDefault: true},
    {path: '/admin/...', name: 'Admin', component: 'admin'},
    {path: '/login/...', name: 'Login', component: 'login'}
  ]
});
