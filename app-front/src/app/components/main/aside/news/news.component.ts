import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NewsItem} from '../../../../data/side.interfaces';
import * as faker from 'faker';
import 'jquery';
import {MiscDatabaseService} from '../../../../services/misc-database.service';

const REFRESH_TIME = 10000;
const CHECK_DELAY = 1000;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements AfterViewInit {

  @ViewChild('content') content: ElementRef;
  newsItems: NewsItem[] = [];
  showScrollIndicator = true;

  private db: MiscDatabaseService;
  private timer = REFRESH_TIME;

  constructor(db: MiscDatabaseService) {
    this.db = db;
    this.onRefreshNews();
    console.log(REFRESH_TIME);
    console.log(typeof REFRESH_TIME);
    setInterval(this.onAutoRefresh.bind(this), CHECK_DELAY);
  }

  onRefreshNews(event?: any): void {
    if (event) {
      event.preventDefault();
      this.timer = REFRESH_TIME;
    }

    this.db.news.then(value => {
      this.newsItems = value;
    });
  }

  ngAfterViewInit(): void {
    const content = $(this.content.nativeElement);
    content.scroll(() => {
      this.showScrollIndicator = content[0].scrollHeight - content.scrollTop() !== content.height();
    });
  }

  private onAutoRefresh(): void {
    this.timer -= CHECK_DELAY;
    if (this.timer <= 0) {
      this.onRefreshNews();
      this.timer = REFRESH_TIME;
    }
  }

}
