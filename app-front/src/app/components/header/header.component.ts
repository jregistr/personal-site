import {Component, OnInit} from '@angular/core';
import {Contact, Personal, Profile, Socials} from '../../data/profile.interfaces';
import * as faker from 'faker';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  profile: Profile | null;

  constructor() {
    const name = faker.name;
    const f = name.firstName();
    const l = name.lastName();
    const personal: Personal = {
      name: faker.name.findName(f, l),
      title: faker.name.jobTitle(),
      imageUrl: 'http://placekitten.com/1024/1024',
      resume: faker.internet.url(),
      messages: {
        aboutMe: faker.lorem.paragraph(6),
        contactMe: faker.lorem.paragraph(2)
      }
    };
    const contact: Contact = {
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(f, l)
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
