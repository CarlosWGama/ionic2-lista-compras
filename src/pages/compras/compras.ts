import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html'
})
export class ComprasPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ComprasPage Page');
  }

}
