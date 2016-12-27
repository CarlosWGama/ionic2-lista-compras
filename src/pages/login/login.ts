import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { ListasPage } from './../listas/listas';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  usuario: any = {
    nome: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, private menuCtrl: MenuController) {}

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  logar(): void {
    this.navCtrl.setRoot(ListasPage);
  }
}
