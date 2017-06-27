import {Injectable} from '@angular/core';
import {Contact, Messages, Personal, Profile, Socials} from '../data/profile.interfaces';
import {BaseDatabaseService} from './BaseDatabaseService';

@Injectable()
export class ProfileDatabaseService extends BaseDatabaseService {

  public personal: Promise<Personal> = this.makeFromSource(value => {
    return value.personal as Personal;
  });

  public messages: Promise<Messages> = this.makeFromSource( value => {
    return value.messages as Messages;
  });

  public contact: Promise<Contact> = this.makeFromSource(value => {
    return value.contact as Contact;
  });

  public socials: Promise<Socials> = this.makeFromSource(value => {
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
      resolve(profile as Profile);
    }, reason => {
      reject(reason);
    });
  });

  protected get endPoint(): string {
    return '/app/config/profile';
  }

}
