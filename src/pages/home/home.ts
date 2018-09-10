import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { LoginPage } from '../login/login'
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  description;
  rate;
  items=[];  
  comment={
    description:'',
    rate:''
  }

  // rate : any = 0;


  //  static get parameters() {
  //   var rating=[];
  //   return rating;
  //  }

  // description

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    firebase.database().ref('/comment/').on("value", (snapshot) => {
      snapshot.forEach((snap) => {

        console.log(snap.val());
        //append To Item List
        this.items.push(snap.val());

        return false;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
    onModelChange(event){
      this.rate = event;
      console.log(event);
   
    }
  //   onSubmit(formData) {
  //     // let's log our findings
  //     console.log('Form submission is ', formData);
  //     var databese = firebase.database();
  //   databese.ref('/rate/').push(this.rate);
  //   databese.ref('/rate/').push(this.rate);
  // }
  submit(){

    console.log(this.description);
    this.comment.description = this.description;
    this.comment.rate = this.rate;
    var databese = firebase.database();
    databese.ref('/comment/').push(this.comment);
    // console.log(this.description)
  }
    goToAbout() {
    this.navCtrl.push("LoginPage");
  
  }
}

