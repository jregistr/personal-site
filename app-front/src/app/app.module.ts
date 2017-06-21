import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app/app.component';
import {HeaderComponent} from './header/header.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {HistoryComponent} from './main/history/history.component';
import {WorkComponent} from './main/history/occupation.component';
import { FeaturedComponent } from './main/featured/featured.component';
import { AsideComponent } from './main/aside/aside.component';
import { TechnologiesComponent } from './main/technologies/technologies.component';
import { MygithubComponent } from './main/aside/mygithub/mygithub.component';
import { CreditsComponent } from './main/aside/credits/credits.component';
import { NewsComponent } from './main/aside/news/news.component';
import { ArticlesComponent } from './main/articles/articles.component';
import { ContactComponent } from './main/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    HistoryComponent,
    WorkComponent,
    FeaturedComponent,
    AsideComponent,
    TechnologiesComponent,
    MygithubComponent,
    CreditsComponent,
    NewsComponent,
    ArticlesComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
