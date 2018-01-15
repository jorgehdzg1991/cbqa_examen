import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { InternalServerError } from '../common/internal-server-error';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  constructor(private serviceUrl: string, private http: Http) { }

  getAll() {
    return this.http.get(this.serviceUrl + '/getAll')
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getById(id: number) {
    const requestUrl = this.serviceUrl + '/getById/' + id;
    return this.http.get(requestUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  create(resource: any) {
    const headers = new Headers();

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.serviceUrl + '/create', JSON.stringify(resource), { headers: headers })
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  update(resource: any) {
    const headers = new Headers();

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const requestUrl = this.serviceUrl + '/update';

    return this.http.put(requestUrl, JSON.stringify(resource), { headers: headers })
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  delete(id: number) {
    const requestUrl = this.serviceUrl + '/delete/' + id;
    return this.http.delete(requestUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    switch (error.status) {
      case 404:
        return Observable.throw(new NotFoundError());
      case 400:
        return Observable.throw(new InternalServerError());
      default:
        return Observable.throw(new AppError(error));
    }
  }

}
