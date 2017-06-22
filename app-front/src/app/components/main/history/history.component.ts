import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Occupation} from '../../../data/main.interfaces';
import * as faker from 'faker';

@Component({
  selector: 'app-experience',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements OnInit {
  occupations: Occupation[] = [];

  constructor() {
    const out: Occupation[] = [];

    for (let i = 0; i < 3; i++) {
      out.push({
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

    this.occupations = out;
  }

  ngOnInit() {
  }

}
