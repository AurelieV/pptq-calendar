class AccountComponent extends BaseComponent {
}

app.component('account', {
  templateUrl: 'account/account.html',
  controller: AccountComponent,
  $canActivate: function (authenticationService, $mdToast, $rootRouter) {
    if (authenticationService.isAuthenticated()) {
      return true;
    }

    $mdToast.showSimple('Vous ne pouvez pas accéder à cette page');

    //TODO: find a way to be no dependant of other routes
    $rootRouter.navigate(['Tournaments', 'List']);

    return false;
  }
});
