import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html'
})
export class WidgetComponent implements AfterViewInit {

  @Input() githubUsername: string;
  @ViewChild('githubWidget') widgetElem: ElementRef;

  ngAfterViewInit(): void {
    if (this.widgetElem.nativeElement.childElementCount === 0) {
      window['start']();
    }
  }

}
