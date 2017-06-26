import {Component, OnInit} from '@angular/core';
import {Profile} from '../../data/profile.interfaces';
import {ProfileDatabaseService} from '../../services/profile-database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  profile: Profile | null = null;

  constructor(profileDb: ProfileDatabaseService) {
    profileDb.profile.then(value => {
      this.profile = value;
    }).catch(reason => console.log(reason));
  }

  ngOnInit() {
  }

}
