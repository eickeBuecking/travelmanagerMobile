import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { BasePage } from '../pages/base/base.page';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TravelListPage } from '../pages/travel-list/travel-list';
import { LoginComponent } from '../pages/login/login.component';
import { TravelDetailPage } from '../pages/travel-detail/travel-detail';
import { NewTravelPage } from '../pages/new-travel/new-travel';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationService } from '../services/authentication.service';
import { TravelsService } from '../services/travels.service';
import { HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    MyApp,
    BasePage,
    HomePage,
    ListPage,
    TravelListPage,
    TravelDetailPage,
    LoginComponent,
    NewTravelPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BasePage,
    HomePage,
    ListPage,
    TravelListPage,
    TravelDetailPage,
    LoginComponent,
    NewTravelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    TravelsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
