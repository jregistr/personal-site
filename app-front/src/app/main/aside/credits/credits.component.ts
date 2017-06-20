import {Component, OnInit} from '@angular/core';
import {Credit, CreditSummary} from './credits.interfaces';
import * as faker from 'faker';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.sass']
})
export class CreditsComponent implements OnInit {

  creditSummary: CreditSummary | null;

  constructor() {
    const credits: Credit[] = [];
    for (let i = 0; i < 5; i++) {
      credits.push({
        name: faker.hacker.verb(),
        url: faker.internet.url()
      });
    }
    this.creditSummary = {
      message: faker.lorem.paragraph(2),
      credits
    }
  }

  ngOnInit() {
  }

}
