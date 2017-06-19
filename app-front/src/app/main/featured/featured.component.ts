import {Component, OnInit} from '@angular/core';
import {Project} from './featured.interfaces';
import * as faker from 'faker';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.sass']
})
export class FeaturedComponent implements OnInit {

  fallBack: Project;
  projects: Project[];
  current: Project | null;

  constructor() {
    this.projects = [];
    const max = Math.floor(Math.random() * 5) + 5;
    for (let i = 0; i < max; i++) {
      const project: Project = {
        title: faker.commerce.productName(),
        subTitle: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(5),
        imageUrl: faker.image.imageUrl(2048, 2048, 'technics')
      };
      if (Math.random() > 0.2) {
        project.projectUrl = faker.internet.url()
      }
      this.projects.push(project);
    }

    this.current = this.projects[0];

    this.fallBack = {
      title: 'Coming Soon',
      subTitle: '',
      description: 'Check back soon for featured projects update!',
      imageUrl: '/assets/coming-soon.jpg'
    };

  }

  ngOnInit() {
  }

}
