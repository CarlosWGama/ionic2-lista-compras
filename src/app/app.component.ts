import { Usuarios } from './../providers/usuarios';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from './../pages/login/login';
import { ListasPage } from './../pages/listas/listas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = null;
  menuInfo: {usuario: string} = {usuario: ''};
  menuPages: any[] = [
    {menu: "Compras", page: ListasPage }
  ]

  constructor(platform: Platform,  private menuCtrl: MenuController, private storage: Storage, private events: Events, private usuarios: Usuarios) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();


      //Redireciona para a página inciial
      if (this.usuarios.getUsuario() == null) 
        this.rootPage = LoginPage;
      else
        this.rootPage = ListasPage;
    

      this.usuarios.auth.onAuthStateChanged((user) => {
        if (user) {
          this.menuInfo.usuario = user.email;
        }
      });

    });
  }

  /**
   * Botão do Menu para deslogar da conta
   */
  menuLogout() {
    this.rootPage = LoginPage;
    this.usuarios.logout();
  }

  /**
   * Abre a Page correspondente no menu
   */
  menuOpenPage(page) {
    this.rootPage = page;
  }

}
