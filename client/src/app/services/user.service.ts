import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { UtilService } from './../services/util.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  domain = environment.domain;
  authToken;
  options;

  constructor(
    private http: Http,
    private utilService: UtilService
  ) {
    this.createAuthenticationHeaders();
   }

  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });
  }

  // Function to get token from client local storage
  loadToken() {
    this.authToken = localStorage.getItem(btoa('token')); // Get token and asssign to variable to be used elsewhere
  }

  // Function to register
  getUsers(query, page, limit, sort) {
    let params = '?';
    if (query) {
      params += '&query=' + query;
    }
    if (page) {
      params += '&page=' + page;
    }
    if (limit) {
      params += '&limit=' + limit;
    }
    if (sort) {
      params += '&sort=' + sort;
    }
    return this.utilService
    .getHttpPromise(this.http.get(this.domain + 'api/user/get' + params, this.options)
    .pipe(map(res => res.json())));
  }

  updateUser(user) {
    return this.utilService
    .getHttpPromise(this.http.put(this.domain + 'api/user/update', user, this.options)
    .pipe(map(res => res.json())));
  }

  updatePassword(data) {
    this.createAuthenticationHeaders();
    return this.utilService
    .getHttpPromise(this.http.put(this.domain + 'api/user/update-pw', data, this.options)
    .pipe(map(res => res.json())));
  }

  deleteUser(id) {
    return this.utilService
    .getHttpPromise(this.http.delete(this.domain + 'api/user/delete/' + id, this.options)
    .pipe(map(res => res.json())));
  }
}
