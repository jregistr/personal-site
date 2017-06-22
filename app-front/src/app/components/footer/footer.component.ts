import {Component, OnInit} from '@angular/core';
import 'jquery';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onBackToTop(event: any, id: string): void {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 500);
  }

}
