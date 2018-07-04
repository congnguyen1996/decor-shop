import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getHttpPromise(obs: Observable<Response>): any {
    return new Promise((resolve, reject) => {
      obs.subscribe(data => {
        return resolve(data);
      }, err => {
        return reject(err._body ? err._body : err);
      });
    });
  }
}
