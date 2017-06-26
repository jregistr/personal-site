import {Component, ViewEncapsulation} from '@angular/core';
import {Socials} from '../../../../data/profile.interfaces';
import {ProfileDatabaseService} from '../../../../services/profile-database.service';
import 'jquery';

@Component({
  selector: 'app-mygithub',
  templateUrl: './mygithub.component.html',
  styleUrls: ['./mygithub.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MygithubComponent {

  socials: Socials | null = null;

  constructor(profileDb: ProfileDatabaseService) {
    profileDb.socials.then(value => {
      this.socials = value;
     }).catch(reason => {
      console.log(reason);
    });
  }

}
