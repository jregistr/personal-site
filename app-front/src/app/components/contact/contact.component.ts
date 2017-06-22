import {Component, OnInit} from '@angular/core';
import * as faker from 'faker';
import {Contact, Messages, Socials} from '../../data/profile.interfaces';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  contactInfo: Contact | null;
  messageData: Messages | null;
  socials: Socials | null;

  constructor() {
    this.contactInfo = {
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email()
    };

    this.messageData = {
      aboutMe: faker.lorem.sentences(3),
      contactMe: faker.lorem.sentences(3)
    }
  }

  ngOnInit() {
  }

}
