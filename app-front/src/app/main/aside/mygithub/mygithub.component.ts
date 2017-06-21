import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-mygithub',
  templateUrl: './mygithub.component.html',
  styleUrls: ['./mygithub.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MygithubComponent implements OnInit {

  githubUserName: string | null = null;

  constructor() {
      this.githubUserName = 'jregistr';
  }

  ngOnInit() {
  }

}
