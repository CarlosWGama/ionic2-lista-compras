import { Compra } from './../../models/compra.model';
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';

import { ListasPage } from './../listas/listas';
import { Compras } from './../../providers/compras';
import { Item } from './../../models/item.mode';

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {

  compra: Compra = new Compra();
  
  constructor(public navCtrl: NavController, private compras: Compras, private alertCtrl: AlertController,
              public params: NavParams, private loadingCtrl: LoadingController ) {
    
    let compraID: string = this.params.get('compraID');
    //Edição
    if (compraID) {
      //cria o loading
      let loading = this.loadingCtrl.create({
        content: "Aguarde"
      });  
      loading.present();
      
      this.compras.getCompra(compraID).then(compra => {
        this.compra = compra;
        loading.dismiss();
      });
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
      inputs: [ { name: 'nome', placeholder: 'Nome da compra', value: this.compra.Nome } ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            this.compra.Nome = data.nome;
            if (this.compra.ID)
              this.compras.editar(this.compra.ID, this.compra);
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
            let keyItem = this.compra.pushItemID();
            if (!data.nome) data.nome = "Item " + keyItem; 
           
            let item = new Item(keyItem, data.nome, Number(data.quantidade), Number(data.preco));
            this.compra.ItensDisponiveis.push(item);
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
    this.compra.ItensComprados.push(item);
    this.compra.ordenaListas();
  }

  /**
   * Manda o item para lista de itens ainda a comprar 
   */
  descomprar(item: Item) {
    this.compra.removeListaComprados(item);
    this.compra.ItensDisponiveis.push(item);
    this.compra.ordenaListas();
  }

  /**
   * Exclui o item da compra 
   */
  excluir(item: Item, lista: number) { 
    this.alertCtrl.create({
      title: 'Excluir ' + item.Nome ,
      message: 'Deseja realmente excluir o item ' + item.Nome,
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
