import {Injectable} from '@angular/core';

@Injectable()
export abstract class BaseDatabaseService {

  protected abstract get endPoint(): string;
  protected source: Promise<any>;

  constructor() {
    this.source = this.passThroughEndpoint(this.endPoint);
  }

  makeFromSource<T>(transmute: (value: any) => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.source.then(value => {
        resolve(transmute(value));
      }, reason => {
        reject(reason);
      })
    });
  }

  protected passThroughEndpoint(endPoint: string): Promise<any> {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: endPoint,
        method: 'GET',
        contentType: 'application/json',
        success(response: JQueryAjaxSettings) {
          const success = response.success;
          if (success) {
            resolve(response.data);
          } else {
            reject('Data not present');
          }
        },
        error(xhr, status) {
          reject(status);
        }
      })
    });
  }

}
