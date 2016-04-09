app.config(function($stateProvider) {
  $stateProvider
    .state('tournamentList', {
      url: '/?anchorId',
      controller: 'tournamentListCtl',
      controllerAs: 'ctl',
      templateUrl: 'tournament/list/tournamentListView.html'
    })
    .state('tournamentDetail', {
      url: '/tournament/:id',
      controller: 'tournamentDetailCtl',
      templateUrl: 'tournament/detail/tournamentDetailView.html',
      resolve: {
        tournament: function ($stateParams, tournamentService) {
          return tournamentService.getTournament($stateParams.id);
        }
      }
    })
    .state('tournamentCreate', {
      url: '/tournament-create',
      controller: 'tournamentCreateCtl',
      templateUrl: 'tournament/create/tournamentCreateView.html'
    })
});
