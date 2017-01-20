import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { ComprasPage } from './../compras/compras';
import { Compras } from './../../providers/compras';

@Component({
  selector: 'page-listas',
  templateUrl: 'listas.html',
  providers: []
})
export class ListasPage implements OnInit {

  lista: Promise<any[]>;

  constructor(public navCtrl: NavController, private compras: Compras, private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando Informações'
    });
    loading.present();

    this.lista = this.compras.getCompras();
    
    this.lista.then(value => {
      loading.dismiss();
    });
  }

  /**
   * Abre uma compra existente
   */
  abrirCompra(id: number) {
    this.navCtrl.push(ComprasPage, {
      compraID: id
    });
  }

  /**
   *  Inicia uma nova compra
   */
  novaCompra() {
    this.navCtrl.setRoot(ComprasPage);
  }

  /**
   * Remove uma compra
   */
  excluirCompra(compraID: string) {
    this.compras.excluir(compraID);
    this.lista = this.compras.getCompras();
  }

}
