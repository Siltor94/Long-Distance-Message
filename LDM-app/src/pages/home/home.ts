import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MessagesPage } from '../messages/messages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  goToPage(i: number): void {
    switch (i) {
      case 1:
        this.navCtrl.push(MessagesPage);
        break;
    
      default:
        break;
    }
  }
}