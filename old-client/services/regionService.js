class regionService {
  constructor (Region) {
    this.api = Region;
    this.fetch();
  }

  getAll () {
    return this.regions;
  }

  getById (id) {
    return this.regions
      .then(function(regions) {
        return _.find(regions, {id: id});
    })
  }

  add (region) {
    return this.api.create(region).$promise.then(this.fetch.bind(this));
  }

  fetch () {
    this.regions = this.api.find({
      filter: {
        include: 'captain'
      }
    }).$promise
  }
}

app.service('regionService', regionService);
