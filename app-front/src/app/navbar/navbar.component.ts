import {Component, OnInit} from '@angular/core';
import 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  currentHighLight: number = -1;
  shouldStick = false;

  constructor() {
  }

  ngOnInit() {
    const win = $(window);

    const scrollToElements = [
      {
        id: '#work-history',
        index: 0
      },
      {
        id: '#featured-projects',
        index: 1
      },
      {
        id: '#my-github',
        index: 2
      }
    ].map(i => {
      return {
        elem: $(i.id),
        index: i.index
      };
    });

    const menu: JQuery = $('.navbar.navbar-default.pf-navbar');
    const origOffsetY = menu.offset().top;
    const navHeight = menu.outerHeight();

    win.on('scroll', () => {
      const currentPosition = win.scrollTop();
      const currentPosOff = currentPosition + navHeight;
      this.shouldStick = currentPosition >= origOffsetY;

      let set = false;
      for (let i = 0; i < scrollToElements.length; i++) {
        const item = scrollToElements[i];
        const posInit = item.elem.offset().top;
        const posEnd = posInit + item.elem.height();
        if (currentPosOff >= posInit && currentPosOff <= posEnd) {
          this.currentHighLight = item.index;
          set = true;
        }
      }

      if (!set) {
        this.currentHighLight = -1;
      }
    });
  }

  onNavButtonClicked(event: any, id: string): void {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 300);
  }


}
