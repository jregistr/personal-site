import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html'
})
export class WidgetComponent implements AfterViewInit {

  @Input() githubUsername: string;

  constructor() {
  }

  ngAfterViewInit(): void {
    (window['start'])();
  }

}
