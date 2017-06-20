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
import { MygithubComponent } from './main/mygithub/mygithub.component';
import { AsideComponent } from './main/aside/aside.component';
import { TechnologiesComponent } from './main/aside/technologies/technologies.component';

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
    MygithubComponent,
    AsideComponent,
    TechnologiesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
