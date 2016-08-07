class usersComponent {
  constructor(){
    console.log("pouet");
    }
}

app.component('users', {
  templateUrl: 'users/users.html',
  controller: usersComponent
});
