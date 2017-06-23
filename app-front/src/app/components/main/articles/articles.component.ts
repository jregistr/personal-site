import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Article} from '../../../data/main.interfaces';
import * as faker from 'faker';
import {MainDatabaseService} from '../../../services/main-database.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent implements AfterContentInit, OnInit {

  @ViewChild('content') content: ElementRef;
  articles: Article[] = [];
  showScroll = false;

  constructor(private database: MainDatabaseService) {
    const max = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < max; i++) {
      this.articles.push({
        title: faker.name.jobDescriptor(),
        summary: faker.lorem.sentences(3),
        url: faker.internet.url()
      });
    }
  }

  ngAfterContentInit(): void {
    this.showScroll = this.articles.length > 4;
  }

  ngOnInit(): void {
    const content = $(this.content.nativeElement);
    content.scroll(() => {
      const scrollTop = content.scrollTop();
      const showScrollIndicator = content[0].scrollHeight - scrollTop !== content.height();
      if (showScrollIndicator !== this.showScroll) {
        this.showScroll = showScrollIndicator;
      }
    });
  }

}
