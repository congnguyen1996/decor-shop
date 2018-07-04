import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { UtilService } from './util.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  domain = environment.domain;
  authToken;
  user;
  options;

  constructor(
    private http: Http,
    private utilService: UtilService
  ) {}

  // Function to create authentication header
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'authorization': this.authToken // Attach token
      })
    });
  }

  // Function to get token from client local storage
  loadToken() {
    this.authToken = localStorage.getItem(btoa('token')); // Get token and asssign to variable to be used elsewhere
  }

  // Funtion to upload image's file (jpg/png)
  uploadProductImages(filesInput) {
    this.createAuthenticationHeaders();
    const formData: FormData = new FormData();
    const files: Array<File> = filesInput;
    for (let i = 0; i < files.length; i++) {
      formData.append('images[]', files[i], files[i]['name']);
    }
    return this.utilService
    .getHttpPromise(this.http.post(this.domain + 'api/product/upload-images/', formData, this.options)
    .pipe(map(res => res.json())));
  }
}
