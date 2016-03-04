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
      controller: 'tournamentDetailController',
      templateUrl: 'tournament/detail/view.html',
      resolve: {
        tournament: function ($stateParams, tournamentService) {
          return tournamentService.getTournament($stateParams.id);
        }
      }
    })
});
