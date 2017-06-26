import {Component, ViewEncapsulation} from '@angular/core';
import {Occupation} from '../../../data/main.interfaces';
import {MainDatabaseService} from '../../../services/main-database.service';

@Component({
  selector: 'app-experience',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent {
  occupations: Occupation[] = [];
  failed = false;

  constructor(mainDb: MainDatabaseService) {
    mainDb.occupations.then(value => {
      this.occupations = value;
    }).catch(reason => this.failed = true);
  }

}
