import {Component, ViewEncapsulation} from '@angular/core';
import 'jquery';
import {GithubConfig} from '../../../../data/misc.interfaces';
import {MiscDatabaseService} from '../../../../services/misc-database.service';

@Component({
  selector: 'app-mygithub',
  templateUrl: './mygithub.component.html',
  styleUrls: ['./mygithub.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MygithubComponent {

  githubConfig: GithubConfig | null = null;
  top1: string | null;
  top2: string | null;
  top3: string | null;

  constructor(misc: MiscDatabaseService) {
    misc.githubConfig.then(value => {
      console.log(value);
      if (value.repositoryHighlight.length > 0) {
        this.top1 = value.repositoryHighlight[0];
      }
      if (value.repositoryHighlight.length > 1) {
        this.top2 = value.repositoryHighlight[1];
      }
      if (value.repositoryHighlight.length > 2) {
        this.top3 = value.repositoryHighlight[2];
      }
      this.githubConfig = value;
    }).catch(reason => {
      console.log(reason);
    });
  }

}
