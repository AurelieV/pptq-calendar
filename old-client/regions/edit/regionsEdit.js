class regionsEditComponent {
  constructor($mdToast, regionService, MyUser, $state) {
    this.judges = [];
    this._regionService = regionService;
    this._MyUser = MyUser;
    this._$mdToast = $mdToast;
    this._$state = $state;
  }

  $onInit() {
    // Fetch judges
    MyUser.findByRole({role: 'judgeTwo'}).$promise
      .then((data) => {
        this.judges = data.users;
      });

    // Fetch region
    console.log("pouet", this.$state.$current.params);
  }

  add(region) {
    this._regionService.add(region)
      .then(() => {
        this._$mdToast.showSimple('Région créé');
        this._$state.go("^");
      })
      .catch(() => {
        this._$mdToast.showSimple('Impossible de créer la région')
      })
  };
}

app.component('regionsEdit', {
  templateUrl: 'regions/edit/regionsEdit.html',
  controller: regionsEditComponent,
  bindings: {
    region: '<'
  }
});
