import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { SendMessagePage } from '../send-message/send-message';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact-page.html'
})
export class contactPage {
  info: any;
  chats = [];
  contacts = []
  groupedContacts = []
  public myconv;

  constructor(public navCtrl: NavController, public navParams: NavParams, public contact: Contacts, public api: ApiService) {
    this.info = this.navParams.get("param");
  }

  gotoMessages() {
    this.api.getMessage(this.info.number).then((data) => {
      this.myconv = data;
      this.navCtrl.push(SendMessagePage, { user: this.info.name, num: this.info.number, myconv: this.myconv })
    }, (err) => {
      console.log(err);
    });

    /// this.navCtrl.push(SendMessagePage, { user: this.info.name, num: this.info.number })
  }
}
