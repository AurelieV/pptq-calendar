class tournamentService {
  /*@ngInject*/
  constructor (Tournament) {
    this.tournaments = Tournament.find({
      filter: {
        include: [
          'headJudge'
          ,
          {
            relation: 'availabilities',
            scope: {include: 'judge'}
          }
        ]
      }
    }).$promise
  }

  getTournaments() {
    return this.tournaments;
  }

  getTournament(id) {
    return this.tournaments.then(function(tournaments) {
      return _.find(tournaments, {id: id})
    })
  }
}

app.service('tournamentService', tournamentService);
