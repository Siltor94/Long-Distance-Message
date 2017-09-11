import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SendMessagePage } from '../send-message/send-message';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {


  constructor(public navCtrl: NavController) {
  }

  showMessages(user: String){
    this.navCtrl.push(SendMessagePage, {user: user, num: 0638157701})
  }

  newMessage(){
    this.navCtrl.push(SendMessagePage)
  }
}
