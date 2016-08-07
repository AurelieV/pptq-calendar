class regionsListComponent {
  constructor (regionService) {
    this.regionService = regionService;
  }

  $onInit() {
    this.regions = this.regionService.getAll();
  }

}

app.component('regionsList', {
  templateUrl: 'regions/list/regionsList.html',
  controller: regionsListComponent
});
