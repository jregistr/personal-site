import {Injectable} from '@angular/core';
import {BaseDatabaseService} from './BaseDatabaseService';
import {Article, Occupation, Project, TechnologySummary} from '../data/main.interfaces';

@Injectable()
export class MainDatabaseService extends BaseDatabaseService {

  public occupations: Promise<Occupation[]> = this.makeFromSource(value => {
    return value.occupations;
  });

  public projects: Promise<Project[]> = this.makeFromSource(value => {
    return value.projects;
  });

  public techSummary: Promise<TechnologySummary> = this.makeFromSource(value => {
    return value.techSummary;
  });

  public articles: Promise<Article[]> = this.makeFromSource(value => {
    return value.articles;
  });

  constructor() {
    super('/app/config/main');
  }
}
