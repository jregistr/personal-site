import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Socials} from '../../../../data/profile.interfaces';

@Component({
  selector: 'app-mygithub',
  templateUrl: './mygithub.component.html',
  styleUrls: ['./mygithub.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MygithubComponent implements OnInit {

  socials: Socials | null;

  constructor() {
    this.socials = {
      github : 'jregistr'
    }
  }

  ngOnInit() {
  }

}
