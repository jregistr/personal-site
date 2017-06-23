import { Injectable } from '@angular/core';

@Injectable()
export class MainDatabaseService {

  private _count = 0;

  get count() {
    this._count += 1;
    return this._count;
  }

  constructor() { }

}
