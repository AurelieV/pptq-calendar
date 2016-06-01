class usersComponent extends BaseComponent {
  $routerOnActivate() {
    this.adminCtl.active = 'users';
  }
}

app.component('users', {
  templateUrl: 'users/users.html',
  controller: usersComponent,
  require: {
    adminCtl: '^admin'
  }
});
