import {Component, OnInit} from '@angular/core';
import {Technology, TechnologySummary} from '../../../data/main.interfaces';
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
    for (let i = 0; i < 4; i++) {
      techs.push({
        name: faker.hacker.adjective(),
        description: faker.lorem.paragraph(3)
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
