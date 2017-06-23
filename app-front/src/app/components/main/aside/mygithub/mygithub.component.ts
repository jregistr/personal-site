import {
  AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {Socials} from '../../../../data/profile.interfaces';
import {ProfileDatabaseService} from '../../../../services/profile-database.service';

@Component({
  selector: 'app-mygithub',
  templateUrl: './mygithub.component.html',
  styleUrls: ['./mygithub.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MygithubComponent implements AfterViewInit, OnChanges {

  socials: Socials | null = null;

  constructor(detector: ChangeDetectorRef, profileDb: ProfileDatabaseService) {
    profileDb.socials.then(value => {
      this.socials = value;
    });
  }

  ngAfterViewInit() {
    // console.log('fired');
    // const start: any = window['start'];
    // start();
  }

  ngOnChanges(changes: SimpleChanges) {
  //  console.log(changes);
  }

}
