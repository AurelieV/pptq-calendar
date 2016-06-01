class TournamentsComponent {

}

app.component('tournaments', {
  template: '<ng-outlet></ng-outlet>',
  controller: TournamentsComponent,
  $routeConfig: [
    {path: '/', name: 'List', component: 'tournamentList', useAsDefault: true},
    {path: '/detail/:id', name: 'Detail', component: 'tournamentDetail'},
    {path: '/create', name: 'Create', component: 'tournamentCreate'},
    {path: '/edit/:id', name: 'Edit', component: 'tournamentEdit'}
  ]
});
