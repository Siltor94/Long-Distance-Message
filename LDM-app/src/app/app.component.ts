import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { SendMessagePage } from '../pages/send-message/send-message';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html',
  providers: [Keyboard]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private keybaord: Keyboard
  ) {
    this.initializeApp();
    this.pages = [
      { title: 'Hello Ionic', component: SendMessagePage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.keybaord.disableScroll(true);
    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }
}

