class LoginComponent {

}

app.component('login', {
  template: '<ng-outlet layout="row" layout-align="center"></ng-outlet>',
  controller: LoginComponent,
  $routeConfig: [
    {path: '/connect', name: 'LoginConnect', component: 'loginConnect', useAsDefault: true},
    {path: '/create', name: 'LoginCreate', component: 'loginCreate'}
  ]
});

