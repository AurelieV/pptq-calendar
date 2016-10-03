import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

export class User {
  username: string;
}
const BASE_URL = "api/MyUsers";

@Injectable()
export class LoginService {
  constructor(private http: Http) {}

  login({username, password}): Observable<User> {
      return this.http.post(`${BASE_URL}/login`, {username, password})
        .map((res) => res.json());
  }

  logout(): Observable<any> {
    return this.http.post(`${BASE_URL}/logout`, {})
      .map((res) => res.json());
  }

}
