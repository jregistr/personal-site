import {BrowserModule} from '@angular/platform-browser';
import {ScrollToModule} from 'ng2-scroll-to';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from '../header/header.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';
import {MainComponent} from '../main/main.component';
import {ExperienceComponent} from '../main/experience/experience.component';
import {WorkComponent} from '../main/experience/work.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    ExperienceComponent,
    WorkComponent
  ],
  imports: [
    BrowserModule,
    ScrollToModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
