import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MessagesPage } from '../messages/messages';

import * as io from 'socket.io-client';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  socket: any
  chat_input: string;
  chats = [];

  constructor(public navCtrl: NavController) {
    this.socket = io('http://localhost:3000');

    this.socket.on('message', (msg) => {
      console.log("message", msg);
      this.chats.push(msg);
    });
  }

  send(msg) {
    if (msg != '') {
      this.socket.emit('message', msg);
    }
    this.chat_input = '';
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
