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
    this.usuarios.logout();
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false);

    this.usuarios.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.changeToLista();
      }
    });  
  }

  //** Login **/
  logar(): void {
      this.usuarios.auth.signInWithEmailAndPassword(this.usuario.login, this.usuario.senha).catch((erro) => {
        let msg = '';
        switch(erro.code) {
          case 'auth/invalid-email': msg = 'Email inválido'; break;
          case 'auth/user-disabled': msg = 'Esse usuário foi desabilitado'; break;
          case 'auth/user-not-found': msg = 'Usuário não encontrado'; break;
          case 'auth/wrong-password': msg = 'Senha incorreta'; break
           
        }

        if (msg == '' && erro.message) {
          msg = erro.message;
        }

        this.alertCtrl.create({
          title: 'Erro',
          message: msg,
          buttons: ['Ok']
        }).present();  
      });    
  }

  public cadastrar() {
    this.alertCtrl.create({
      title: 'Cadastrar Usuário',
      message: 'Message',
      inputs: [
        {name: 'email', placeholder: 'Email', type:'email'},
        {name: 'senha', placeholder: 'Senha', type: 'password'}
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Cadastrar',
          handler: (data) => {
            this.usuarios.cadastrar(data.email, data.senha);
          }
        }
      ]
    }).present();
  }

  /* Envia o usuário para a página após login */
  private changeToLista():void {
    this.navCtrl.setRoot(ListasPage);
    this.menuCtrl.enable(true); 
  }
}
