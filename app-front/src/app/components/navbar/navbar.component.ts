import {Component, OnInit} from '@angular/core';
import 'jquery';
import {NavListItem} from './navbar.interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  currentHighLight: number = -1;
  shouldStick = false;

  workNavItem: NavListItem = {
    index: 0,
    sectionId: '#work-history'
  };

  featuredNavItem: NavListItem = {
    sectionId: '#featured-projects',
    index: 1
  };

  techSumNavItem: NavListItem = {
    sectionId: '#tech-my-summary',
    index: 2
  };

  articlesNavItem: NavListItem = {
    sectionId: '#articles',
    index: 3
  };

  contactNavItem: NavListItem = {
    sectionId: '#contact-me',
    index: 4
  };

  constructor() {
  }

  ngOnInit() {
    const win = $(window);

    const scrollToElements = [
      this.workNavItem,
      this.featuredNavItem,
      this.techSumNavItem,
      this.articlesNavItem,
      this.contactNavItem
    ].map(i => {
      return {
        elem: $(i.sectionId),
        index: i.index
      };
    });

    const menu: JQuery = $('.navbar.navbar-default.pf-space-nav');

    win.on('scroll', () => {
      const origOffsetY = menu.offset().top;
      const navHeight = menu.outerHeight();
      const currentPosition = win.scrollTop();
      const currentPosOff = currentPosition + navHeight;
      if (this.shouldStick) {
        this.shouldStick = currentPosOff >= origOffsetY + navHeight;
      } else {
        this.shouldStick = currentPosOff >= origOffsetY;
      }

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
      scrollTop: $(id).offset().top - 50
    }, 300);
  }


}
