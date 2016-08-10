import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class User {
  username: string;
}

@Injectable()
export class LoginService {
  constructor(private http: Http) {}

  login({username, password}): Observable<User> {
      return this.http.post('api/MyUsers/login', {username, password})
        .map((res) => res.json());
  }

}
