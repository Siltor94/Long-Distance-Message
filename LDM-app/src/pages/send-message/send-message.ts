import { Component, ViewChild, Renderer } from '@angular/core';
import { Content, NavParams, NavController, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ApiService } from '../../service/api.service';

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
  private scrollContentElement: any;
  private footerElement: any;
  private initialTextAreaHeight;
  private user;
  private message = "";
  private messageObject: Object;

  constructor(
    private camera: Camera,
    private keyboard: Keyboard,
    private imagePicker: ImagePicker,
    private api: ApiService,
    public platform: Platform,
    public renderer: Renderer,
    public navParams: NavParams,
    public navCtrl: NavController) {


    this.user = navParams.get('user');

  }

  // La text area ne s'ouvrira que si on clique dessus directement
  // sinon la fonction bloque l'event
  footerTouchStart(event) {
    //console.log('footerTouchStart: ', event.type, event.target.localName, '...')
    if (event.target.localName !== "textarea") {
      event.preventDefault();
    }
  }
  // On aggrandit la textarea
  textAreaChange() {

    let newHeight: number = Number(this.inputElement.style.height.replace('px', ''));
    if (newHeight !== this.textareaHeight) {

      let diffHeight: number = newHeight - this.textareaHeight;
      this.textareaHeight = newHeight;
      let newNumber: number = Number(this.scrollContentElement.style.marginBottom.replace('px', '')) + diffHeight;

      let marginBottom: string = newNumber + 'px';
      this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', marginBottom);
      this.updateScroll('textAreaChange', this.scrollTimeout);
    }
  }

  back(event: Event) {

    this.inputElement.blur();
    this.navCtrl.pop();
  }

  ionViewDidLoad() {

    this.scrollContentElement = this.content.getScrollElement();

    this.footerElement = document.getElementsByTagName('send-message-page')[0].getElementsByTagName('ion-footer')[0];
    this.inputElement = document.getElementsByTagName('send-message-page')[0].getElementsByTagName('textarea')[0];

    this.footerElement.style.cssText = this.footerElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.scrollContentElement.style.cssText = this.scrollContentElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
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

    this.messageObject = { msg: this.message, num: '0638157701' }
    let strMessageObject = JSON.stringify(this.messageObject);
    let jsonObject = JSON.parse(strMessageObject);

    this.api.postMessage(jsonObject).then((data) => {
      console.log("data");
      console.log(data);
    }, (err) => {
      console.log("error");
      console.log(err);
    });

    this.addMessage('right', this.message);
    this.message = "";

    let currentHeight = this.scrollContentElement.style.marginBottom.replace('px', '');
    let newHeight = currentHeight - this.textareaHeight + this.initialTextAreaHeight;
    let top = newHeight + 'px';
    this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', top);
    this.updateScroll('sendMessage', this.scrollTimeout);
    this.textareaHeight = this.initialTextAreaHeight;


    //DUMMY response message
    // setTimeout(() => {
    //   let msg = "random reply to your amazing message is here";
    //   this.addMessage('left', msg)
    //   this.updateScroll('reply message', this.scrollTimeout);
    // }, 3000);

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