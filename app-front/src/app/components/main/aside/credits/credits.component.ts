import {Component} from '@angular/core';
import {CreditSummary} from '../../../../data/side.interfaces';
import {MiscDatabaseService} from '../../../../services/misc-database.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.sass']
})
export class CreditsComponent {

  creditSummary: CreditSummary | null = null;

  constructor(db: MiscDatabaseService) {
    db.credits.then(value => {
      this.creditSummary = value;
    }).catch(reason => {
      console.log(reason);
    });
  }

}
