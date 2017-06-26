import {Component} from '@angular/core';
import {Contact, Messages, Socials} from '../../data/profile.interfaces';
import {ProfileDatabaseService} from '../../services/profile-database.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent {

  contactInfo: Contact | null = null;
  messageData: Messages | null = null;
  socials: Socials | null = null;

  constructor(profileDatabase: ProfileDatabaseService) {
    profileDatabase.contact.then(value => {
      this.contactInfo = value;
    }).catch(reason => {
      console.log(reason);
    });

    profileDatabase.messages.then(value => {
      this.messageData = value;
    });

    profileDatabase.socials.then(value => {
      this.socials = value;
    });
  }

}
