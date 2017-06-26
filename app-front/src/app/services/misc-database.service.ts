import {Injectable} from '@angular/core';
import {BaseDatabaseService} from './BaseDatabaseService';
import {CreditSummary, NewsItem} from '../data/side.interfaces';
import 'jquery';

@Injectable()
export class MiscDatabaseService extends BaseDatabaseService {

  public credits: Promise<CreditSummary> = this.makeFromSource(value => {
    return value;
  });

  constructor() {
    super('/app/config/credits');
  }

  public get news(): Promise<NewsItem[]> {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/app/config/news',
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
