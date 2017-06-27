import {Component} from '@angular/core';
import {Contact, Messages, Socials} from '../../data/profile.interfaces';
import {ProfileDatabaseService} from '../../services/profile-database.service';
import {GithubConfig} from '../../data/misc.interfaces';
import {MiscDatabaseService} from '../../services/misc-database.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent {

  contactInfo: Contact | null = null;
  messageData: Messages | null = null;
  socials: Socials | null = null;
  githubConfig: GithubConfig | null = null;

  constructor(profileDatabase: ProfileDatabaseService, misc: MiscDatabaseService) {
    profileDatabase.contact
      .then(value => this.contactInfo = value)
      .catch(reason => console.error(reason));

    profileDatabase.messages
      .then(value => this.messageData = value)
      .catch(reason => console.error(reason));

    profileDatabase.socials.then(value => {
      this.socials = value;
    });

    misc.githubConfig
      .then(value => this.githubConfig = value)
      .catch(reason => console.error(reason));

  }

}
