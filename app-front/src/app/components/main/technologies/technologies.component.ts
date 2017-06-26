import {Component} from '@angular/core';
import {TechnologySummary} from '../../../data/main.interfaces';
import {MainDatabaseService} from '../../../services/main-database.service';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.sass']
})
export class TechnologiesComponent {

  techSummary: TechnologySummary | null = null;

  constructor(db: MainDatabaseService) {
    db.techSummary.then(value => {
      this.techSummary = value;
    }).catch(reason => console.log(reason));
  }

}
