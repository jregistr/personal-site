import {Component, ElementRef, ViewChild} from '@angular/core';
import {Article} from '../../../data/main.interfaces';
import {MainDatabaseService} from '../../../services/main-database.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent {

  @ViewChild('content') content: ElementRef;
  articles: Article[] = [];

  constructor(db: MainDatabaseService) {
    db.articles.then(value => {
      this.articles = value;
    }).catch(reason => console.log(reason));
  }

}
