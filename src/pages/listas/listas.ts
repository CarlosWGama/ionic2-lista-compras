import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ComprasPage } from './../compras/compras';
import { Compras } from './../../providers/compras';

@Component({
  selector: 'page-listas',
  templateUrl: 'listas.html',
  providers: []
})
export class ListasPage implements OnInit {

  lista: Observable<any[]> = new Observable<any[]>();

  constructor(public navCtrl: NavController, private compras: Compras) {
  }

  ngOnInit() {
    this.lista = this.compras.getCompras();
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
