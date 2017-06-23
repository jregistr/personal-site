import {Injectable} from '@angular/core';
import {AppConfig} from '../data/app.interfaces';
import {BaseDatabaseService} from './BaseDatabaseService';

@Injectable()
export class AppSettingsDatabaseService extends BaseDatabaseService {

  private source: Promise<any> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        capchaPublicId: '6LcIfyYUAAAAAElXyCyZOk2PsaWyn-LiDgnPOedc',
        projectUrl: 'https://github.com/jregistr/personal-site.git'
      });
    }, 200);
  });

  public appSettings: Promise<AppConfig> = this.makeFromSource(this.source, value => {
    return {
      capchaPublicId: value.capchaPublicId,
      projectUrl: value.projectUrl
    }
  });

}
