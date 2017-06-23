import {Injectable} from '@angular/core';
import {BaseDatabaseService} from './BaseDatabaseService';
import {Credit, CreditSummary} from '../data/side.interfaces';
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

  public credits: Promise<CreditSummary> = this.makeFromSource(this.source, value => {
    return value.credits;
  });

}
