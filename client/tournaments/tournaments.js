class TournamentsComponent {

}

app.component('tournaments', {
  template: '<ng-outlet></ng-outlet>',
  controller: TournamentsComponent,
  $routeConfig: [
    {path: '/', name: 'TournamentList', component: 'tournamentList', useAsDefault: true},
    {path: '/detail/:id', name: 'TournamentDetail', component: 'tournamentDetail'},
    {path: '/create', name: 'TournamentCreate', component: 'tournamentCreate'},
    {path: '/edit/:id', name: 'TournamentEdit', component: 'tournamentEdit'}
  ]
});
