import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WaveObject } from '../classes/wave';

@Injectable()
export class DataLoaderService {
  constructor( private httpClient: HttpClient ) {}

  getTestLevel(): Observable<Array<WaveObject>> {
    return this.httpClient.get<Array<WaveObject>>('/levels/test-level.json');
  }
}
