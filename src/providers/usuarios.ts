import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

declare var firebase;

@Injectable()
export class Usuarios {

  public auth;

  constructor(private http: Http, private storage: Storage) {
    console.log('Hello Usuarios Provider');
    this.auth = firebase.auth();
  }

  /**
   * Realiza o login
   */
  public logar(login: string, senha: string): any {
    this.auth.signInWithEmailAndPassword(login, senha);
  }

  /**
   * Cria o usuário
   */
  public cadastrar(email: string, senha: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, senha);
  }

  /**
   * Recupera o usuário logado
   */
  public getUsuario(): any {
    return this.auth.currentUser;
  }

  /**
   * Realiza o logout
   */
  public logout() {
    this.auth.signOut();
  }

}
