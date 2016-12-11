import { Component } from '@angular/core';

import { MyUserInterface } from '../sdk/models';
import { UsersActions, MessagesActions } from '../actions';

@Component({
  template : require('./register.html'),
  styles: [ require('./register.scss') ]
})
export class RegisterComponent {
  private user: MyUserInterface = {
    firstname: '',
    lastname: '',
    password: '',
    username: '',
    email: ''
  };
  private submited: boolean = false;
  private isErrored: boolean = false;
  private isLoading: boolean = false;

  constructor(
    private usersActions: UsersActions,
    private messagesActions: MessagesActions,
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.usersActions.createUser(this.user).subscribe(
      (user) => {
        this.isLoading = false;
        this.isErrored = false;
        this.submited = true;
        const content = `Votre compte a bien été créé`;
        this.messagesActions.addMessage(content, 'success');
        this.user = user;
      }, (err) => {
        this.isLoading = false;
        this.isErrored = true;
        const content = `Un problème est survenu lors de la création de votre compte`;
        this.messagesActions.addMessage(content, 'danger');
      }
    );
  }
}
