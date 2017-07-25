import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { contactPage } from '../contact-page/contact-page';


@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html'
})
export class contactList {
  chat_input:string;
  pushPage: any;
  chats = [];
  contacts = []
  groupedContacts = []

  constructor(public navCtrl: NavController, public contact: Contacts) {

    contact.find(["displayName", "phoneNumbers"], {multiple: true, hasPhoneNumber: true}).then((contacts) => {

    for (var i=0 ; i < contacts.length; i++){
     if(contacts[i].displayName !== null){
       var obj = {};
       obj["name"] = contacts[i].displayName;
       obj["number"] = contacts[i].phoneNumbers[0].value;
       obj["addresses"] = contacts[i].addresses ? contacts[i].addresses[0].streetAddress : " ";
       this.contacts.push(obj)    // adding in separate array with keys: name, number
     }      
    }

    this.groupContacts(this.contacts);
  })
}

go_contact(txt) {
  this.navCtrl.push(contactPage, {param : txt});
}

groupContacts(contacts){

  let sortedContacts = contacts.sort(function(a, b){
    if(String(a.name).toUpperCase() < String(b.name).toUpperCase()) return -1;
    if(String(a.name).toUpperCase() > String(b.name).toUpperCase()) return 1;
    return 0;
   });

  let currentLetter:String = null;
  let currentContacts = [];

  sortedContacts.forEach((value, index) => {
    if(String(value.name.charAt(0)).toUpperCase() != currentLetter){
      currentLetter = String(value.name.charAt(0)).toUpperCase();

      let newGroup ={
        letter: String(currentLetter).toUpperCase(),
        contacts:[]
      };

      currentContacts = newGroup.contacts;
      this.groupedContacts.push(newGroup);
    }
    currentContacts.push(value);
  });
}
}
