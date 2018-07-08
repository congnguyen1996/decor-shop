import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { UtilService } from './util.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  domain = environment.domain;
  authToken;
  options;

  constructor(
    private http: Http,
    private utilService: UtilService
  ) { }

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

  // Function to check product's id exist
  checkProductId(id) {
    return this.utilService
    .getHttpPromise(this.http.get(this.domain + 'api/product/check-product-id/' + id)
    .pipe(map(res => res.json())));
  }

  // Function to get a product record by _id
  getProduct(id) {
    return this.utilService
    .getHttpPromise(this.http.get(this.domain + 'api/product/get-product/' + id)
    .pipe(map(res => res.json())));
  }

  // Function to get products
  getProducts(query, key, page, limit, sort) {
    let params = '?';
    if (query) {
      params += '&query=' + query;
    }
    if (key) {
      params += '&key=' + key;
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
    .getHttpPromise(this.http.get(this.domain + 'api/product/get' + params)
    .pipe(map(res => res.json())));
  }

  // Function to create a new product
  createProduct(product) {
    this.createAuthenticationHeaders();
    return this.utilService
    .getHttpPromise(this.http.post(this.domain + 'api/product/create', product, this.options)
    .pipe(map(res => res.json())));
  }

  // Function to update product
  updateProduct(product) {
    this.createAuthenticationHeaders();
    return this.utilService
    .getHttpPromise(this.http.put(this.domain + 'api/product/update', product, this.options)
    .pipe(map(res => res.json())));
  }

  // Function to delete product
  deleteProduct(id) {
    this.createAuthenticationHeaders();
    return this.utilService
    .getHttpPromise(this.http.delete(this.domain + 'api/product/delete/' + id, this.options)
    .pipe(map(res => res.json())));
  }
}
