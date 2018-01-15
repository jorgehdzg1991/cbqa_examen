import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Injectable()
export class PersonService extends DataService {

  constructor(http: Http) {
    const serviceUrl = 'http://localhost/CBQA/api/v1/persons';
    super(serviceUrl, http);
  }

}
