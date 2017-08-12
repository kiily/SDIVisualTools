import { HttpDataService } from './http-data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SEATService extends HttpDataService {

  constructor(http : Http) {
    super('urltobedetermined', http);
   }

}
