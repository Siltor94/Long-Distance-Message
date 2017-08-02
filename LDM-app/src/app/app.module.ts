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

import { MessagesPage } from '../pages/messages/messages';
import { SendMessagePage } from '../pages/send-message/send-message';
import { ChatBubble } from '../components/chat-bubble/chat-bubble';
import { keyboardFix } from '../components/keyboard-fix/keyboard-fix'

import { HttpModule } from '@angular/http';
import { ApiService } from '../service/api.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    contactList,
    contactPage,
    MessagesPage,
    SendMessagePage,
    ChatBubble,
    keyboardFix
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
        ios: {
          scrollAssist: false, 
          autoFocusAssist: false,
          inputBlurring: false
        }
    }
)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    contactList,
    contactPage,
    MessagesPage,
    SendMessagePage,
    ChatBubble
  ],
  providers: [
    Contacts,
    ApiService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
