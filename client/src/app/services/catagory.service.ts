import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UtilService } from './util.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {
  domain = environment.domain;
  authToken;
  options;

  constructor(
    private http: Http,
    private utilService: UtilService
  ) {}

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

  checkCatagoryName(name) {
    return this.utilService
    .getHttpPromise(this.http.get(this.domain + 'api/catagory/check-catagory-name/' + name)
    .pipe(map(res => res.json())));
  }

  // Function to register
  getCatagories(query, page, limit, sort) {
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
    .getHttpPromise(this.http.get(this.domain + 'api/catagory/get' + params)
    .pipe(map(res => res.json())));
  }

  createCatagory(catagory) {
    this.createAuthenticationHeaders();
    return this.utilService
    .getHttpPromise(this.http.post(this.domain + 'api/catagory/create', catagory, this.options)
    .pipe(map(res => res.json())));
  }

  updateCatagory(catagory) {
    this.createAuthenticationHeaders();
    return this.utilService
    .getHttpPromise(this.http.put(this.domain + 'api/catagory/update', catagory, this.options)
    .pipe(map(res => res.json())));
  }

  deleteCatagory(id) {
    this.createAuthenticationHeaders();
    return this.utilService
    .getHttpPromise(this.http.delete(this.domain + 'api/catagory/delete/' + id, this.options)
    .pipe(map(res => res.json())));
  }
}
