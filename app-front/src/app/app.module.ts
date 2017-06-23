import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ReCaptchaModule} from 'angular2-recaptcha';

import {AppComponent} from './app/app.component';
import {HeaderComponent} from './components/header/header.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {MainComponent} from './components/main/main.component';
import {HistoryComponent} from './components/main/history/history.component';
import {WorkComponent} from './components/main/history/occupation.component';
import {FeaturedComponent} from './components/main/featured/featured.component';
import {AsideComponent} from './components/main/aside/aside.component';
import {TechnologiesComponent} from './components/main/technologies/technologies.component';
import {MygithubComponent} from './components/main/aside/mygithub/mygithub.component';
import {CreditsComponent} from './components/main/aside/credits/credits.component';
import {NewsComponent} from './components/main/aside/news/news.component';
import {ArticlesComponent} from './components/main/articles/articles.component';
import {ContactComponent} from './components/contact/contact.component';
import {MessageComponent} from './components/contact/message/message.component';
import {MainDatabaseService} from './services/main-database.service';
import {AppSettingsDatabaseService} from './services/app-settings-database.service';
import {ProfileDatabaseService} from './services/profile-database.service';
import {MiscDatabaseService} from './services/misc-database.service';
import { WidgetComponent } from './components/main/aside/mygithub/widget/widget.component';

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
    ContactComponent,
    MessageComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ReCaptchaModule
  ],
  providers: [MainDatabaseService, AppSettingsDatabaseService, ProfileDatabaseService, MiscDatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
