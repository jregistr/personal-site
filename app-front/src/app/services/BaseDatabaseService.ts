import {Injectable} from '@angular/core';

@Injectable()
export abstract class BaseDatabaseService {

  makeFromSource<T>(source: Promise<any>, transmute: (value: any) => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      source.then(value => {
        resolve(transmute(value));
      }, reason => {
        reject(reason);
      })
    });
  }

}
