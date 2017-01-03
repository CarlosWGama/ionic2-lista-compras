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

  constructor(platform: Platform,  private menuCtrl: MenuController, private storage: Storage, private events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();


      //Redireciona para a página inciial
      this.storage.get('isLogin').then((isLogin: boolean) => {
        if (!isLogin)
          this.rootPage = LoginPage;
        else
          this.rootPage = ListasPage;
      });

      //Altera sempre que faz o login ou logout
      this.events.subscribe('login:created', (data) => {
        console.log(data);
        if (data.login == true) {
          this.menuCtrl.enable(true);
          this.menuInfo.usuario = data.usuario;
        } else {
          this.menuCtrl.enable(false); 
        }
      });

    });
  }

  /**
   * Botão do Menu para deslogar da conta
   */
  menuLogout() {
    this.storage.set('isLogin', false);
    this.rootPage = LoginPage;
  }

  /**
   * Abre a Page correspondente no menu
   */
  menuOpenPage(page) {
    this.rootPage = page;
  }

}
