import {Injectable} from '@angular/core';
import {BaseDatabaseService} from './BaseDatabaseService';
import * as faker from 'faker';
import {Occupation, Project} from '../data/main.interfaces';

@Injectable()
export class MainDatabaseService extends BaseDatabaseService {

  private source: Promise<any> = new Promise((resolve, reject) => {
    const occupations = [];
    const maxOcc = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < maxOcc; i++) {
      occupations.push({
        company: faker.company.companyName(),
        title: faker.name.jobTitle(),
        city: faker.address.city(),
        state: faker.address.state(true),
        startMonth: faker.date.month(),
        startYear: Math.floor(Math.random() * (2017 - 2001)) + 2000,
        endMonth: faker.date.month(),
        endYear: Math.floor(Math.random() * (2017 - 2001)) + 2000,
        story: faker.lorem.paragraph(5)
      });
    }

    const projects: Project[] = [];
    const max = Math.floor(Math.random() * 5) + 2;
    for (let i = 0; i < max; i++) {
      const project: Project = {
        title: faker.commerce.productName(),
        subTitle: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(5),
        imageUrl: 'http://placekitten.com/1600/800'
      };
      if (Math.random() > 0.2) {
        project.projectUrl = faker.internet.url()
      }
      projects.push(project);
    }

    setTimeout(() => {
      resolve({
        occupations,
        projects
      });
    }, 1500);
  });

  public occupations: Promise<Occupation[]> = this.makeFromSource(this.source, value => {
    return value.occupations;
  });

  public projects: Promise<Project[]> = this.makeFromSource(this.source, value => {
    return value.projects;
  });

}
