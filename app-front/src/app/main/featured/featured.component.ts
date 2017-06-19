import {AfterViewInit, Component, Input, NgZone, ChangeDetectorRef} from '@angular/core';
import {Project} from './featured.interfaces';
import * as faker from 'faker';
import 'jquery';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.sass']
})
export class FeaturedComponent implements AfterViewInit {

  @Input() carouselId: string;
  fallBack: Project;
  projects: Project[];
  current: Project | null;
  private curIndex: number;

  constructor(private detector: ChangeDetectorRef) {
    this.projects = [];
    const images = [
      'http://herogamesworld.com/images/batman%20games%20online.jpg',
      'https://www.pcgamesn.com/sites/default/files/Best%20PC%20games%20The%20Witcher%203.jpg',
      'http://www.intrawallpaper.com/static/images/1799810.jpg',
      'http://www.intrawallpaper.com/static/images/Battlefield-3-close-quarters-3D-Game-Widescreen-Wallpapers.jpg',
      'http://www.intrawallpaper.com/static/images/Final-Fantasy-Game-Wallpaper.jpg',
      'http://www.intrawallpaper.com/static/images/God-Of-War-Eyes-Games-HD-Wallpapers-1920x1080.jpg'
    ];
    const max = Math.floor(Math.random() * 5) + 2;
    for (let i = 0; i < max; i++) {
      const project: Project = {
        title: faker.commerce.productName(),
        subTitle: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(5),
        imageUrl: images[Math.floor(Math.random() * images.length)]
      };
      if (Math.random() > 0.2) {
        project.projectUrl = faker.internet.url()
      }
      this.projects.push(project);
    }
    this.current = this.projects[0];
    this.curIndex = 0;
    this.fallBack = {
      title: 'Coming Soon',
      subTitle: '',
      description: 'Check back soon for featured projects update!',
      imageUrl: '/assets/coming-soon.jpg'
    };
  }

  ngAfterViewInit() {
    const carousel = $(`#${this.carouselId}`);
    const self = this;
    carousel.on('slide.bs.carousel', function () {
      const eventObj: any = arguments[0];
      const direction: string = eventObj.direction;
      if (direction === 'left') {// next
        self.curIndex = self.curIndex !== self.projects.length - 1 ? self.curIndex + 1 : 0;
      } else {// previous
        self.curIndex = self.curIndex !== 0 ? self.curIndex - 1 : self.projects.length - 1;
      }
      self.current = self.projects[self.curIndex];
      self.detector.detectChanges();
    });
  }
}

