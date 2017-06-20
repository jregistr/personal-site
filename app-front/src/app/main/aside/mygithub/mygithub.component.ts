import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mygithub',
  templateUrl: './mygithub.component.html',
  styleUrls: ['./mygithub.component.sass']
})
export class MygithubComponent implements OnInit {

  githubUserName: string | null = null;

  constructor() {
      this.githubUserName = 'jregistr';
  }

  ngOnInit() {
  }

}
