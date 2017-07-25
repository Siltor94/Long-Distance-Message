import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Contacts } from '@ionic-native/contacts';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { contactList } from '../pages/contact-list/contact-list';
import { contactPage } from '../pages/contact-page/contact-page';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    contactList,
    contactPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    contactList,
    contactPage
  ],
  providers: [
    Contacts,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
