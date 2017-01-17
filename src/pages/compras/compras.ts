import { Compra } from './../../models/compra.model';
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { ListasPage } from './../listas/listas';
import { Compras } from './../../providers/compras';
import { Item } from './../../models/item.mode';

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {

  compra: Compra = new Compra();
  
  constructor(public navCtrl: NavController, private compras: Compras, private alertCtrl: AlertController, public params: NavParams ) {
    let compraID: string = this.params.get('compraID');
    if (compraID) {
      this.compras.getCompra(compraID).then(compra => this.compra = compra );
    }

  }

  ionViewDidLoad() {
    console.log('Hello ComprasPage Page');
  }

  /**
   * Finaliza a compra
   */
  salvarCompra() {
    this.alertCtrl.create({
      title: 'Salvar?',
      message: 'Digite um nome para a compra',
      inputs: [ { name: 'nome', placeholder: 'Nome da compra', value: this.compra.getNome() } ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            this.compra.setNome(data.nome);
            if (this.compra.getID())
              this.compras.editar(this.compra.getID(), this.compra);
            else
              this.compras.cadastrar(this.compra);
            this.navCtrl.setRoot(ListasPage);
          }
        }
      ]
    }).present();
  }

  /**
   * Adiciona um novo item a lista de itens pendentes 
   */
  novoItem() {
    
    this.alertCtrl.create({
      title: 'Novo Item',
      message: 'Adicione um novo item a compra',
      inputs: [
        { name: 'nome', placeholder: 'Item', type: 'text' },
        { name: 'quantidade', placeholder: 'Quantidade', type: 'number'},
        { name: 'preco', placeholder: 'Preço', type: 'number'}
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Adicionar',
          handler: (data) => {
            let item = new Item(this.compra.pushItemID(), data.nome, data.quantidade, data.preco);
            this.compra.getItensDisponiveis().push(item);
            this.compra.ordenaListas();
          }
        }
      ]
    }).present();
  }

  /**
   * Manda o item para lista de itens comprados
   */
  comprar(item: Item) {
    this.compra.removeListaDisponivel(item)
    this.compra.getItensComprados().push(item);
    this.compra.ordenaListas();
  }

  /**
   * Manda o item para lista de itens ainda a comprar 
   */
  descomprar(item: Item) {
    this.compra.removeListaComprados(item);
    this.compra.getItensDisponiveis().push(item);
    this.compra.ordenaListas();
  }

  /**
   * Exclui o item da compra 
   */
  excluir(item: Item, lista: number) { 
    this.alertCtrl.create({
      title: 'Excluir ' + item.getNome() ,
      message: 'Deseja realmente excluir o item ' + item.getNome(),
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {             
            switch(lista) {
              case 1:
                this.compra.removeListaDisponivel(item);
                break;
              case 2: 
                this.compra.removeListaComprados(item);
                break;
            }
         }
        }
      ]
    }).present();
    this.compra.atualizarTotais();
  }
}
