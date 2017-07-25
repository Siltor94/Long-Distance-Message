import { Component, ViewChild, Renderer } from '@angular/core';
import { Content, NavParams, NavController, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'send-message-page',
  templateUrl: 'send-message.html',
  providers: [Keyboard, ImagePicker, Camera]
})
export class SendMessagePage {

  @ViewChild(Content) content: Content;
  private inputElement;
  private millis = 200;
  private scrollTimeout = this.millis + 50;
  private textareaHeight;
  private scrollContentElelment: any;
  private footerElement: any;
  private initialTextAreaHeight;
  private user;
  private keyboardHideSub;
  private keybaordShowSub;
  private message = "";

  constructor(private camera: Camera, private keyboard: Keyboard, private imagePicker: ImagePicker, public platform: Platform, public renderer: Renderer, public navParams: NavParams, public navCtrl: NavController) {


    this.user = navParams.get('user');

  }

  footerTouchStart(event) {
    //console.log('footerTouchStart: ', event.type, event.target.localName, '...')
    if (event.target.localName !== "textarea") {
      event.preventDefault();
      // console.log('preventing')
    }
  }

  textAreaChange() {

    let newHeight = Number(this.inputElement.style.height.replace('px', ''));
    if (newHeight !== this.textareaHeight) {

      let diffHeight = newHeight - this.textareaHeight;
      this.textareaHeight = newHeight;
      let newNumber = Number(this.scrollContentElelment.style.marginBottom.replace('px', '')) + diffHeight;

      let marginBottom = newNumber + 'px';
      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
      this.updateScroll('textAreaChange', this.scrollTimeout);
    }
  }

  back(event: Event) {

    this.inputElement.blur();
    this.navCtrl.pop().then(() => {
      if (this.platform.is('ios')) {
        this.removeKeyboardListeners();
      }
    });
  }

  removeKeyboardListeners() {
    this.keyboardHideSub.unsubscribe();
    this.keybaordShowSub.unsubscribe();
  }

  addKeyboardListeners() {

    this.keyboardHideSub = this.keyboard.onKeyboardHide().subscribe(() => {
      let newHeight = this.textareaHeight - this.initialTextAreaHeight + 44;
      let marginBottom = newHeight + 'px';
      console.log('marginBottom', marginBottom)
      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', '0px')
    });

    this.keybaordShowSub = this.keyboard.onKeyboardShow().subscribe((e) => {

      let newHeight = (e['keyboardHeight']) + this.textareaHeight - this.initialTextAreaHeight;
      let marginBottom = newHeight + 44 + 'px';
      console.log('marginBottom', marginBottom)
      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', e['keyboardHeight'] + 'px');
      this.updateScroll('keybaord show', this.scrollTimeout);
    });
  }

  ionViewDidLoad() {

    if (this.platform.is('ios')) {
      this.addKeyboardListeners()
    }

    this.scrollContentElelment = this.content.getScrollElement();

    this.footerElement = document.getElementsByTagName('send-message-page')[0].getElementsByTagName('ion-footer')[0];
    this.inputElement = document.getElementsByTagName('send-message-page')[0].getElementsByTagName('textarea')[0];

    this.footerElement.style.cssText = this.footerElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.scrollContentElelment.style.cssText = this.scrollContentElelment.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.textareaHeight = Number(this.inputElement.style.height.replace('px', ''));
    this.initialTextAreaHeight = this.textareaHeight;

    this.updateScroll('load', 500)

  }

  contentMouseDown(event) {
    //console.log('blurring input element :- > event type:', event.type);
    this.inputElement.blur();
  }

  touchSendButton(event: Event) {
    //console.log('touchSendButton, event type:', event.type);
    event.preventDefault();
    this.sendMessage();
  }

  // private options = {
  //   maximumImagesCount: 3,
  //   width: 300,
  //   height: 300,
  //   quality: 75,
  //   outputType: 1 // default .FILE_URI

  // };






  touchImageButton() {
    event.preventDefault();
    // this.imagePicker.getPictures(this.options).then((results) => {
    //   for (var i = 0; i < results.length; i++) {
    //     console.log('Image URI: ' + results[i]);

    //   }
    // }, (err) => { });


    const camerOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0,
      allowEdit: true,
      saveToPhotoAlbum: true,
      targetWidth: 300,
      targetHeight: 300
    }

    this.camera.getPicture(camerOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.addImage('right', base64Image);
      console.log(base64Image);
      this.updateScroll('image add', this.millis)
    }, (err) => {
      // Handle error
    });

  }

  addImage(position, imgData) {
    this.messages.push({
      position: position,
      img: imgData,
      timestamp: new Date()
    });
  }

  addMessage(position, msg) {

    this.messages.push({
      position: position,
      body: msg,
      timestamp: new Date()
    });

  }

  sendMessage() {

    this.addMessage('right', this.message);
    this.message = "";

    let currentHeight = this.scrollContentElelment.style.marginBottom.replace('px', '');
    let newHeight = currentHeight - this.textareaHeight + this.initialTextAreaHeight;
    let top = newHeight + 'px';
    this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', top);
    this.updateScroll('sendMessage', this.scrollTimeout);
    this.textareaHeight = this.initialTextAreaHeight;


    //DUMMY response message
    setTimeout(() => {
      let msg = "random reply to your amazing message is here";
      this.addMessage('left', msg)
      this.updateScroll('reply message', this.scrollTimeout);
    }, 3000);

  }



  updateScroll(from, timeout) {
    setTimeout(() => {
      //console.log('updating scroll -->', from)
      if (this.content != null)
        this.content.scrollToBottom();
    }, timeout);
  }

  public messages: any[] = [
    {
      position: 'left',
      body: 'aaa',
      timestamp: new Date(),
    }
  ];

}