import { Compra } from './../../models/compra.model';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ListasPage } from './../listas/listas';
import { Compras } from './../../providers/compras';
import { Item } from './../../models/item.mode';

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {

  itensDisponiveis: Item[] = [];
  itensComprados: Item[] = [];

  totalLista: number = 0;
  totalComprado: number = 0;

  private contID: number = 0;

  constructor(public navCtrl: NavController, private compras: Compras, private alertCtrl: AlertController ) {}

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
      inputs: [ { name: 'nome', placeholder: 'Nome da compra' } ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            let compra = new Compra(0, data.nome, this.itensDisponiveis, this.itensComprados);
            this.compras.cadastrar(compra);
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
            let item = new Item(++this.contID, data.nome, data.quantidade, data.preco);
            this.itensDisponiveis.push(item);
            this.ordenaListas();
          }
        }
      ]
    }).present();
  }

  /**
   * Manda o item para lista de itens comprados
   */
  comprar(item: Item) {
    this.removeListaDisponivel(item)
    this.itensComprados.push(item);
    this.ordenaListas();
  }

  /**
   * Manda o item para lista de itens ainda a comprar 
   */
  descomprar(item: Item) {
    this.removeListaComprados(item);
    this.itensDisponiveis.push(item);
    this.ordenaListas();
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
                this.removeListaDisponivel(item);
                break;
              case 2: 
                this.removeListaComprados(item);
                break;
            }
         }
        }
      ]
    }).present();
    this.atualizarTotais();
  }

  /**
   * Remove item da lista de itens disponiveis
   */
  private removeListaDisponivel(item: Item) {
    this.itensDisponiveis = this.itensDisponiveis.filter((value: Item) => value.getID() != item.getID());
  }

  /**
   * Remove item da lista de itens comprados
   */
  private removeListaComprados(item: Item) {
    this.itensComprados = this.itensComprados.filter((value: Item) => value.getID() != item.getID());
  }

  /**
   * Reordena as listas
   */
  private ordenaListas() {
    this.itensComprados.sort((a: Item, b: Item) => a.getNome() > b.getNome() ? 1 : -1);
    this.itensDisponiveis.sort((a: Item, b: Item) => a.getNome() > b.getNome() ? 1 : -1);
    this.atualizarTotais();
  }

  /**
   * Preço gasto na compra
   */
  private atualizarTotais() {
    this.totalComprado = 0;
    this.totalLista = 0;

    //Itens comprados
    this.itensComprados.forEach((item: Item) => {
      this.totalComprado += item.getTotal();
    });

    this.totalLista = this.totalComprado;

    //Itens ainda na lista
    this.itensDisponiveis.forEach((item: Item) => {
      this.totalLista += item.getTotal();
    });

  }
}
