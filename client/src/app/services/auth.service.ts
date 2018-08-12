import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UtilService } from '../services/util.service';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  domain = environment.domain;
  authToken;
  user;
  options;

  constructor(
    private http: Http,
    private utilService: UtilService
  ) {
    this.loadUser();
  }

  loadUser() {
    const user = localStorage.getItem(btoa('user'));
    if (user) {
      try {
        this.user = JSON.parse(user);
      } catch (error) {
        console.log('>> login');
      }
    }
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

  // Function to store user's data in client local storage
  storeUserData(token, user) {
    localStorage.setItem(btoa('token'), token); // Set token in local
    localStorage.setItem(btoa('user'), JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  // Function to register
  registerUser(user) {
    this.createAuthenticationHeaders();
    return this.utilService
    .getHttpPromise(this.http.post(this.domain + 'api/auth/register', user, this.options)
    .pipe(map(res => res.json())));
  }

  // Function to login user
  login(user) {
    return this.utilService
    .getHttpPromise(this.http.post(this.domain + 'api/auth/login', user)
    .pipe(map(res => res.json())));
  }

  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  // Function to check if user is logged in
  // loggedIn() {
  //   this.loadToken();
  //   return !this.utilService.isTokenExpired(this.authToken);
  // }

  // Function to check if username is taken
  checkUsername(username) {
    return this.utilService
    .getHttpPromise(this.http.get(this.domain + 'api/auth/check-username/' + username)
    .pipe(map(res => res.json())));
  }

  // Function to check loggedIn
  async loggedIn() {
    if (!this.user) {
      return false;
    }
    this.createAuthenticationHeaders();
    try {
      const response = await this.utilService
      .getHttpPromise(this.http.get(this.domain + 'api/auth/check-loggedin/', this.options)
      .pipe(map(res => res.json())));
      return response.success;
    } catch (error) {
      return false;
    }
  }
}
