import {Component, OnInit} from '@angular/core';
import {Profile} from '../../data/profile.interfaces';
import {ProfileDatabaseService} from '../../services/profile-database.service';
import {GithubConfig} from '../../data/misc.interfaces';
import {MiscDatabaseService} from '../../services/misc-database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  profile: Profile | null = null;
  githubConfig: GithubConfig | null = null;

  constructor(profileDb: ProfileDatabaseService, miscDb: MiscDatabaseService) {
    profileDb.profile.then(value => {
      this.profile = value;
    }).catch(reason => console.error(reason));

    miscDb.githubConfig.then(value => {
      this.githubConfig = value;
    }).catch(reason => console.error(reason));
  }

  ngOnInit() {
  }

}
