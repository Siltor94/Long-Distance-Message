import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import * as io from 'socket.io-client';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  socket:any
  chat_input:string;
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
       this.contacts.push(obj)    // adding in separate array with keys: name, number
     }      
    }

    this.groupContacts(this.contacts);
  })
}

groupContacts(contacts){

  let sortedContacts = contacts.sort(function(a, b){
    if(String(a.name).toLowerCase() < String(b.name).toLowerCase()) return -1;
    if(String(a.name).toLowerCase() > String(b.name).toLowerCase()) return 1;
    return 0;
   });

  let currentLetter:String = null;
  let currentContacts = [];

  sortedContacts.forEach((value, index) => {
    if(String(value.name.charAt(0)).toLowerCase() != currentLetter){
      currentLetter = String(value.name.charAt(0)).toLowerCase();

      let newGroup ={
        letter: String(currentLetter).toLowerCase(),
        contacts:[]
      };

      currentContacts = newGroup.contacts;
      this.groupedContacts.push(newGroup);
    }
    currentContacts.push(value);
  });
}

  send(msg) {
        if(msg != ''){
            this.socket.emit('message', msg);
        }
        this.chat_input = '';
    }
}
