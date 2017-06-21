import {Component, OnInit} from '@angular/core';
import {ContactSummary} from './contact.interfaces';
import * as faker from 'faker';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  contactSummary: ContactSummary | null = null;

  constructor() {
    this.contactSummary = {
      message: faker.lorem.sentences(3),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      socials: {
        github: Math.random() > .5 ? faker.internet.url() : undefined,
        linkedIn: Math.random() > .5 ? faker.internet.url() : undefined,
        twitter: Math.random() > .5 ? faker.internet.url() : undefined
      }
    };
  }

  ngOnInit() {
  }

}
