import {Component, OnInit} from '@angular/core';
import {Contact, Personal, Profile, Socials} from './header.interfaces';
import * as faker from 'faker';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  profile: Profile;

  constructor() {
    const personal: Personal = {
      name: faker.name.findName(),
      title: faker.name.jobTitle(),
      imageUrl: faker.image.imageUrl(1024, 1024, 'business'),
      aboutMe: faker.lorem.paragraph(8),
      resume: faker.internet.url()
    };
    const contact: Contact = {
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(personal.name)
    };
    const socials: Socials = {
      linkedIn: faker.internet.url(),
      twitter: faker.internet.url(),
      github: faker.internet.url()
    };
    this.profile = {
      personal,
      contact,
      socials
    }
  }

  ngOnInit() {
  }

}
