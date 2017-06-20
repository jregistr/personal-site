import {Component, OnInit} from '@angular/core';
import {Example, Technology, TechnologySummary} from './technologies.interfaces';
import * as faker from 'faker';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.sass']
})
export class TechnologiesComponent implements OnInit {

  techSummary: TechnologySummary | null;

  constructor() {
    const description = faker.lorem.paragraph(3);
    const techs: Technology[] = [];
    for (let i = 0; i < 5; i++) {

      const projects: Example[] = [];
      const pCount = Math.round(Math.random() * 3);

      for (let j = 0; j < pCount; j++) {
        projects.push({
          name: faker.commerce.productName(),
          url: faker.internet.url()
        });
      }

      techs.push({
        name: faker.hacker.adjective(),
        examples: projects
      })
    }

    this.techSummary = {
      description,
      techs
    }
  }

  ngOnInit() {
  }

}
