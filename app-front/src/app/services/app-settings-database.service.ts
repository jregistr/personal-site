import {Injectable} from '@angular/core';
import {AppConfig} from '../data/app.interfaces';
import {BaseDatabaseService} from './BaseDatabaseService';

@Injectable()
export class AppSettingsDatabaseService extends BaseDatabaseService {

  public appSettings: Promise<AppConfig> = this.makeFromSource(value => {
    return {
      capchaPublicId: value.capchaPublicId,
      projectUrl: value.projectUrl
    }
  });

  constructor() {
    super('/app/config/app');
  }
}
