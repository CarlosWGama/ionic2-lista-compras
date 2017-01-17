import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/of';
import 'rxjs/add/operator/map';

import { Compra } from './../models/compra.model';
import { Item } from './../models/item.mode';

declare var firebase;

@Injectable()
export class Compras {

  private db;
  private usuarioID;

  constructor(public http: Http) {
    console.log('Hello Compras Provider');
    this.db = firebase.database();
    this.usuarioID = firebase.auth().currentUser.uid;
  }


  getCompras() {
    return new Promise<any>((resolve, reject )=> {
      this.db.ref('/compras/' + this.usuarioID).once('value').then(snapshot => {
        
        let compras: Compra[] = [];
        if (Object.keys(snapshot.val()).length > 0) {
          
          Object.keys(snapshot.val()).forEach(key => {
            let data = snapshot.val()[key];

            //Itens disponiveis
            let itensDisponiveis: Item[] = [];
            data.itensDisponiveis.forEach(item => {
              itensDisponiveis.push(new Item(item.id, item.nome, item.quantidade, item.preco));  
            });

            //Itens comprados
            let itensComprados: Item[] = [];
            data.itensDisponiveis.forEach(item => {
              itensComprados.push(new Item(item.id, item.nome, item.quantidade, item.preco)); 
            });

            compras.push(new Compra(data.id, data.nome, itensDisponiveis, itensComprados));
    
          });
        
        }
        
        resolve(compras);
      });
    });
  }


  getCompra(id: string) {
    return this.db.ref('/compras/' + this.usuarioID + '/' + id).on('value');
  }

  cadastrar(compra: Compra) {
    let newKey = this.db.ref('/compras/'+this.usuarioID).push().key;
    compra.setID(newKey);
   
    this.db.ref('/compras/' + this.usuarioID + '/' + newKey).set(compra);
  }

  editar(id: string, compra: Compra) {
    this.db.ref('/compras/'+ this.usuarioID + '/' + id).set(compra);
  }

  excluir(id: string) {
    this.db.ref('/compras/' + this.usuarioID + '/' + id).set(null);
  }
}
