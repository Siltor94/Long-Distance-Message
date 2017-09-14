import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../service/api.service';
import { MessagesPage } from '../messages/messages';
import { contactList } from '../contact-list/contact-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private conv;

  // la mtehode http.get() etant asynchrone on subscribe() ici plutot que
  // dans le service pour eviter d'avoir une vairable undefined
  constructor(public navCtrl: NavController, private api: ApiService) {

    api.getJsonData().subscribe(res => this.conv = res);

    console.log(this.conv);
    
  }

  goToPage(i: number): void {
    switch (i) {
      case 1:
        this.navCtrl.push(MessagesPage, {conv: this.conv});
        break;
      case 2:
        this.navCtrl.push(contactList);
        break;
      default:
        break;
    }
  }
}