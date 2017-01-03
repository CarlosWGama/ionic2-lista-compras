import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class Usuarios {

  constructor(private http: Http, private storage: Storage) {
    console.log('Hello Usuarios Provider');
  }

  public login(login: string, senha: string): boolean {
    if (login == 'carloswgama@gmail.com' && senha == '123456') {
      this.storage.set('usuario', {usuario: 'Carlos W. Gama', token: 'dajhuih1uh13'});
      return true;
    }
    return false;
  }

  public getUser(): { usuario: string, token: string } {
    let usuario = { usuario: '', token: ''}; 
    this.storage.get('usuario').then((data) => {
      usuario = data;
    });
    return usuario;
  }

  public getToken(): string {
    let usuario = this.getUser();
    return usuario.token;
  }

}
