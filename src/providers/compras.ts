import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/of';
import 'rxjs/add/operator/map';

import { Compra } from './../models/compra.model';
import { Item } from './../models/item.mode';
@Injectable()
export class Compras {

  constructor(public http: Http) {
    console.log('Hello Compras Provider');
  }

  getCompras(): Observable<Compra[]> {
    let item = new Item(0, 'teste', 1, 10);
    let compra = new Compra(0, 'Teste', [item], [item]);
    return Observable.of([compra]);
  }

  getCompra(id: number) {
    
  }

  cadastrar(compra: Compra) {
    
  }

  editar() {

  }

  excluir() {

  }
}
