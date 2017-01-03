import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from './../pages/login/login';
import { ListasPage } from './../pages/listas/listas';
import { ComprasPage } from './../pages/compras/compras';

import { Usuarios } from './../providers/usuarios';
import { Compras } from './../providers/compras';
import { NumberReal } from './../pipes/number_real';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ListasPage,
    ComprasPage,
    NumberReal
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListasPage,
    ComprasPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, Usuarios, Compras]
})
export class AppModule {}
