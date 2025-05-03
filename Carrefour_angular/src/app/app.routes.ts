import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/zonaCliente/registroComponent/registro/registro.component';
import { LoginComponent } from './componentes/zonaCliente/loginComponent/login/login.component';
import { Verif2FACodeComponent } from './componentes/zonaCliente/verificacion2FAComponent/verif2-facode/verif2-facode.component';
import { HomeComponent } from './componentes/zonaTienda/homeComponent/home.component';
import { LayoutComponent } from './componentes/zonaTienda/layOutComponent/layout.component';

//array de objetos Route que mapea url del navegador con componente a cargar
//cada vez q hay un cambio en la url, el servicio Router de angular se dispara, intercepta esa url
//chequea este array de objetos hasta q encuentra el 1º cuyo prop. "path" coincida, y carga componente

export const routes: Routes = [
  { path:'', redirectTo: '/Tienda/Home', pathMatch: 'full'},
  {
   path: 'Tienda',
   component: LayoutComponent,
   children:[
    { path:'Home', component: HomeComponent }
   ]
  },

  {
    path :'Cliente',
    children:[
      { path:'Registro', component: RegistroComponent },
      { path:'Login', component: LoginComponent },
      { path:'Verificar/:operacion', component: Verif2FACodeComponent },

    ]
  }
];
