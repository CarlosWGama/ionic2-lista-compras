import { Injectable } from '@angular/core';

import { Compra } from './../models/compra.model';

declare var firebase;

@Injectable()
export class Compras {

  private db;
  private usuarioID;

  constructor() {
    console.log('Hello Compras Provider');
    this.db = firebase.database();
    this.usuarioID = firebase.auth().currentUser.uid;
    firebase.auth().onAuthStateChanged((user) => {
      if (user)
        this.usuarioID = user.uid;
    });
  }

  /**
   * Lista todas as compras do usuário logado
   */
  getCompras(): Promise<Compra[]> {
    return this.db.ref('/compras/' + this.usuarioID).once('value').then(snapshot => {
        
        let compras: Compra[] = [];
        
        if (snapshot.val() && Object.keys(snapshot.val()).length > 0) {
          
          Object.keys(snapshot.val()).forEach(key => {
            let data = snapshot.val()[key];
            compras.push(Compra.parseJSON(data));
          });       
        }
        
        return compras;
    });
  }

  /**
   * Busca uma compra pelo ID
   */
  getCompra(id: string): Promise<Compra> {
    return this.db.ref('/compras/' + this.usuarioID + '/' + id).once('value').then(snapshot => {
      return Compra.parseJSON(snapshot.val());
    });
  }

  /**
   * Cadastra uma nova compra
   */
  cadastrar(compra: Compra):void {
    let newKey = this.db.ref('/compras/'+this.usuarioID).push().key;
    compra.ID = newKey;
   
    this.db.ref('/compras/' + this.usuarioID + '/' + newKey).set(compra);
  }

  /**
   * Edita uma compra pelo ID
   */
  editar(id: string, compra: Compra):void {
    this.db.ref('/compras/'+ this.usuarioID + '/' + id).set(compra);
  }

  /**
   * Remove uma compra
   */
  excluir(id: string): void {
    this.db.ref('/compras/' + this.usuarioID + '/' + id).set(null);
  }
}
