import {Injectable} from '@angular/core';
import {BaseDatabaseService} from './BaseDatabaseService';
import {CreditSummary, NewsItem} from '../data/side.interfaces';
import 'jquery';
import {GithubConfig} from '../data/misc.interfaces';

@Injectable()
export class MiscDatabaseService extends BaseDatabaseService {

  public credits: Promise<CreditSummary> = this.makeFromSource(value => {
    return value;
  });

  public githubConfig: Promise<GithubConfig> = this.passThroughEndpoint('/app/config/github');

  public get news(): Promise<NewsItem[]> {
    return this.passThroughEndpoint('/app/config/news');
  }

  protected get endPoint(): string {
    return '/app/config/credits';
  }

}
