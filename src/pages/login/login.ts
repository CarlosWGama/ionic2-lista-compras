import { AlertController, Events } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Usuarios } from './../../providers/usuarios';
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ListasPage } from './../listas/listas';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  usuario: any = {
    nome: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, 
              private alertCtrl: AlertController, private usuarios: Usuarios,
              private events: Events,
              private storage: Storage) {}

  //Redireciona, caso necessário
  ngOnInit(): void {
    //Redireciona se já estiver logado
    this.storage.get('isLogin').then((isLogin: boolean) => {
      if (isLogin) {
        this.changeToLista();
      }
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
  }

  //** Login **/
  logar(): void {
    if (this.usuarios.login(this.usuario.login, this.usuario.senha)) {
      this.events.publish('login:created', {
        login: true,
        usuario: this.usuarios.getUser().usuario
      });
      
      this.storage.set('isLogin', true);
      this.changeToLista();
      
    } else {
      this.alertCtrl.create({
        title: 'Erro',
        message: 'Login ou Senha incorreta',
        buttons: ['Ok']
      }).present();
    }
  }

  /* Envia o usuário para a página após login */
  private changeToLista():void {
    this.navCtrl.setRoot(ListasPage);
    this.menuCtrl.enable(true); 
  }
}
