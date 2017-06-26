import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NewsItem} from '../../../../data/side.interfaces';
import 'jquery';
import {MiscDatabaseService} from '../../../../services/misc-database.service';

const REFRESH_TIME = 100000;
const CHECK_DELAY = 2000;

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
    setInterval(this.onAutoRefresh.bind(this), CHECK_DELAY);
  }

  onRefreshNews(event?: any): void {
    if (event) {
      event.preventDefault();
      this.timer = REFRESH_TIME;
    }

    this.db.news.then(value => {
      this.newsItems = value;
    }).catch(reason => {
      console.log(reason)
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
