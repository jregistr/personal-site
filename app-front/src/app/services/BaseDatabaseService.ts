import {Injectable} from '@angular/core';

@Injectable()
export abstract class BaseDatabaseService {

  protected endPoint: string;
  protected source: Promise<any>;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
    this.source = new Promise((resolve, reject) => {
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

  makeFromSource<T>(transmute: (value: any) => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.source.then(value => {
        resolve(transmute(value));
      }, reason => {
        reject(reason);
      })
    });
  }

}
