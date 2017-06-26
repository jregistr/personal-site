import {AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Project} from '../../../data/main.interfaces';
import 'jquery';
import {MainDatabaseService} from '../../../services/main-database.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.sass']
})
export class FeaturedComponent implements AfterViewInit {

  @Input() carouselId: string;

  fallBack: Project = {
    title: 'Coming Soon',
    subTitle: '',
    description: 'Check back soon for featured projects update!',
    imageUrl: '/assets/coming-soon.jpg'
  };

  projects: Project[] = [];
  current: Project | null;
  failed = false;
  private curIndex: number;

  constructor(private detector: ChangeDetectorRef, private database: MainDatabaseService) {
    this.curIndex = 0;
    database.projects.then(value => {
      this.projects = value;
      if (this.projects.length > 0) {
        this.curIndex = 0;
        this.current = this.projects[this.curIndex];
      } else {
        this.curIndex = 0;
        this.current = null;
      }
    }).catch(reason => this.failed = true);
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

