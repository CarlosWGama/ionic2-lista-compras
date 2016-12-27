import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ComprasPage } from './../compras/compras';

@Component({
  selector: 'page-listas',
  templateUrl: 'listas.html'
})
export class ListasPage {

  compras: any = [
    {compra: "AAAA", id: 1}, {compra: "BBBB", id: 1}, {compra: "CCCC", id: 1},
    {compra: "DDDD", id: 1}, {compra: "EEEE", id: 1}, {compra: "FFFF", id: 1},
    {compra: "GGGG", id: 1}, {compra: "HHHH", id: 1}, {compra: "IIII", id: 1},
  ]

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ListasPage Page');
  }

  abrirCompra(id: number) {
    this.navCtrl.push(ComprasPage, {
      compraID: id
    });
  }

  novaCompra() {
    this.navCtrl.setRoot(ComprasPage);
  }

}
