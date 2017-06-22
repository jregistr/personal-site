import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NewsItem} from '../../../../data/side.interfaces';
import * as faker from 'faker';
import 'jquery';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements AfterViewInit {

  @ViewChild('content') content: ElementRef;
  newsItems: NewsItem[] = [];
  showScrollIndicator = true;

  constructor() {
    for (let i = 0; i < 5; i++) {
      this.newsItems.push({
        title: faker.lorem.words(6),
        shortDescription: faker.lorem.sentences(2),
        url: faker.internet.url()
      });
    }
  }

  onRefreshNews(event): void {
    event.preventDefault();
  }

  ngAfterViewInit(): void {
    const content = $(this.content.nativeElement);
    content.scroll(() => {
      this.showScrollIndicator = content[0].scrollHeight - content.scrollTop() !== content.height();
    });
  }

}
