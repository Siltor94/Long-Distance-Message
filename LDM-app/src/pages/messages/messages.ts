import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SendMessagePage } from '../send-message/send-message';


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  public conv;
  public items: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = this.navParams.get("conv");
    
  }

  showMessages(username: String, phoneNumber: String){
    this.navCtrl.push(SendMessagePage, {user: username, num: phoneNumber})
  }

  newMessage(){
    this.navCtrl.push(SendMessagePage)
  }
}
