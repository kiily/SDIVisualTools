import { Injectable } from '@angular/core';
import * as pbi from 'powerbi-client';

@Injectable()
export class PowerBIService {

  private powerBiCoreService : pbi.service.Service;
  
  constructor() { }

}
