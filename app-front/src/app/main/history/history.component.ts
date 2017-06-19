import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Occupation} from './occupation.interfaces';
import * as faker from 'faker';

@Component({
  selector: 'app-experience',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements OnInit {
  occupations: Occupation[] = [];
  current: Occupation | null = null;

  constructor() {
    const out: Occupation[] = [];
    const cur: Occupation = {
      company: 'CACI',
      title: 'Software Engineer',
      city: 'Rome',
      state: 'NY',
      startMonth: 'May',
      startYear: 2016,
      story: `Sartorial occaecat pinterest salvia kinfolk XOXO ut beard dolore. Gochujang pabst meditation lyft ut
      jianbing deep v in fam woke selfies salvia skateboard. Jianbing godard exercitation venmo, pok pok minim kale
      chips vexillologist do shabby chic kogi kitsch in ullamco. Bespoke selfies iPhone, wayfarers snackwave sartorial
      viral mumblecore edison bulb retro portland try-hard coloring book. Cred ramps marfa esse green juice YOLO migas
       poke gentrify celiac kombucha ut. Cloud bread PBR&B forage crucifix.`
    };

    for (let i = 0; i < 2; i++) {
      out.push({
        company: faker.company.companyName(),
        title: faker.company.bsNoun(),
        city: faker.address.city(),
        state: faker.address.state(true),
        startMonth: faker.date.month(),
        startYear: Math.floor(Math.random() * 2020) + 2017,
        endMonth: faker.date.month(),
        endYear: Math.floor(Math.random() * 2020) + 2017,
        story: faker.lorem.paragraph(10)
      });
    }

    this.occupations = out;
    this.current = cur;
  }

  ngOnInit() {
  }

}
