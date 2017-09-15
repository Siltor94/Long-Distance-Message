import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SendMessagePage } from '../send-message/send-message';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  public conv;
  public myconv;
  public items: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiService) {
    this.items = this.navParams.get("conv");
    
  }

  showMessages(username: String, phoneNumber: String){
    console.log(phoneNumber);
    this.api.getMessage(phoneNumber).then((data) => {
      this.myconv = data;
      this.navCtrl.push(SendMessagePage, {user: username, num: phoneNumber, myconv: this.myconv})
    }, (err) => {
      console.log(err);
    });
  }

  newMessage(){
    this.navCtrl.push(SendMessagePage)
  }
}
