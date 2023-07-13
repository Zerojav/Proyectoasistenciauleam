import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { AcercadeComponent } from './acercade/acercade.component';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistrodocComponent } from './registrodoc/registrodoc.component';
import { ContraolvComponent } from './contraolv/contraolv.component';
import { RegistrocuentaComponent } from './registrocuenta/registrocuenta.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore,getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { ModificarprofesoresComponent } from './modificarprofesores/modificarprofesores.component';


const appRoutes:Routes=[
  {path:'inicio', component:InicioComponent},
  {path:'login', component:LoginComponent},
  {path:'registrodoc', component:RegistrodocComponent},
  {path:'ayuda', component:AyudaComponent},
  {path:'acercade', component:AcercadeComponent},
  {path:'modificarprofesores', component:ModificarprofesoresComponent},
  {path:'contraolv', component:ContraolvComponent},
  {path: 'registrocuenta', component:RegistrocuentaComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AyudaComponent,
    AcercadeComponent,
    InicioComponent,
    RegistrodocComponent,
    ContraolvComponent,
    RegistrocuentaComponent,
    ModificarprofesoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true});
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      connectFirestoreEmulator(firestore, 'http://localhost', 9098);
      return firestore;
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
