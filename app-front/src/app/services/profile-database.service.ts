import {Injectable} from '@angular/core';
import * as faker from 'faker';
import {Contact, Messages, Personal, Profile, Socials} from '../data/profile.interfaces';
import {BaseDatabaseService} from './BaseDatabaseService';

@Injectable()
export class ProfileDatabaseService extends BaseDatabaseService {

  private source: Promise<any> = new Promise((resolve, reject) => {
    const name = faker.name;
    const f = name.firstName();
    const l = name.lastName();
    setTimeout(() => {
      resolve({
        personal: {
          name: faker.name.findName(f, l),
          title: faker.name.jobTitle(),
          imageUrl: 'http://placekitten.com/1024/1024',
          resumeUrl: faker.internet.url()
        },
        messages: {
          aboutMe: faker.lorem.paragraph(6),
          contactMe: faker.lorem.paragraph(3)
        },
        contact: {
          phone: faker.phone.phoneNumber(),
          email: faker.internet.email(f, l)
        },
        socials: {
          linkedIn: faker.lorem.word(),
          github: 'jregistr',
          twitter: faker.lorem.word()
        }
      });
    }, 250);
  });

  public personal: Promise<Personal> = this.makeFromSource(this.source, value => {
    return value.personal as Personal;
  });

  public messages: Promise<Messages> = this.makeFromSource(this.source, value => {
    return value.messages as Messages;
  });

  public contact: Promise<Contact> = this.makeFromSource(this.source, value => {
    return value.contact as Contact;
  });

  public socials: Promise<Socials> = this.makeFromSource(this.source, value => {
    return value.socials as Socials;
  });

  public profile: Promise<Profile> = new Promise((resolve, reject) => {
    Promise.all([this.personal, this.messages, this.contact, this.socials]).then(values => {
      const profile: any = {};
      values.forEach(value => {
        if ((<Personal> value).name) {
          profile.personal = value;
        } else if ((<Messages> value).aboutMe) {
          profile.messages = value;
        } else if ((<Contact> value).phone) {
          profile.contact = value;
        } else {
          profile.socials = value;
        }
      });
      return profile as Profile;
    }, reason => {
      reject(reason);
    });
  });

}
