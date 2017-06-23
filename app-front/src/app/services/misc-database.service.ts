import {Injectable} from '@angular/core';
import {BaseDatabaseService} from './BaseDatabaseService';
import {Credit, CreditSummary, NewsItem} from '../data/side.interfaces';
import * as faker from 'faker';

@Injectable()
export class MiscDatabaseService extends BaseDatabaseService {

  private source: Promise<any> = new Promise((resolve, reject) => {
    const credits: Credit[] = [];
    for (let i = 0; i < 5; i++) {
      credits.push({
        name: faker.hacker.verb(),
        url: faker.internet.url()
      });
    }
    const creditSummary = {
      message: faker.lorem.paragraph(2),
      credits
    };
    resolve({
      credits: creditSummary
    });
  });

  public get news(): Promise<NewsItem[]> {
    return new Promise((resolve, reject) => {
      const newsItems: NewsItem[] = [];
      for (let i = 0; i < 5; i++) {
        newsItems.push({
          title: faker.lorem.words(6),
          shortDescription: faker.lorem.sentences(2),
          url: faker.internet.url()
        });
      }
      resolve(newsItems);
    });
  }

  public credits: Promise<CreditSummary> = this.makeFromSource(this.source, value => {
    return value.credits;
  });

}
