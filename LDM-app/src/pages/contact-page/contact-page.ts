import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { SendMessagePage } from '../send-message/send-message';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact-page.html'
})
export class contactPage {
  info:any;
  chats = [];
  contacts = []
  groupedContacts = []

  constructor(public navCtrl: NavController , public navParams: NavParams, public contact: Contacts) {
    this.info = this.navParams.get("param");
}

gotoMessages(){
  this.navCtrl.push(SendMessagePage, {user: this.info.name, num: this.info.number})
}
}
