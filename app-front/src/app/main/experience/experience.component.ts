import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Experience} from './interfaces';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.sass'],
  encapsulation : ViewEncapsulation.None
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  current: Experience | null = null;

  constructor() {
    const months = [
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July'
    ];

    const out: Experience[] = [];
    const cur: Experience = {
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

    function randomString(max: number, min: number = 5): string {
      const letters = 'abcdefghijklmnopqrstuvwxyz';
      let text = '';
      const nMax = Math.floor(Math.random() * max) + min;
      for (let i = 0; i < nMax; i++) {
        text += letters[Math.floor(Math.random() * 26)];
      }
      return text;
    }

    for (let i = 0; i < 2; i++) {
      const startMonth = months[Math.floor(Math.random() * months.length)];
      const endMonth = months[Math.floor(Math.random() * months.length)];
      out.push({
        company: randomString(12),
        title: randomString(15),
        city: randomString(5),
        state: randomString(5),
        startMonth,
        startYear: Math.floor(Math.random() * 2020) + 2017,
        endMonth,
        endYear: Math.floor(Math.random() * 2020) + 2017,
        story: randomString(350, 150)
      });
    }

    this.experiences = out;
    this.current = cur;
  }

  ngOnInit() {
  }

}
