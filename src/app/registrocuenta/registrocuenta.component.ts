import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registrocuenta',
  templateUrl: './registrocuenta.component.html',
  styleUrls: ['./registrocuenta.component.css']
})
export class RegistrocuentaComponent implements OnInit{
  registrocorreo: string = '';
  registrocontra: string = '';

  constructor(private angularfireauth: AngularFireAuth){}
  
  ngOnInit(): void{
  }

  validarDatos() {
    // Expresión regular para validar el formato de correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // Verificar si el usuario cumple con el formato de correo electrónico
    if (!emailPattern.test(this.registrocorreo)) {
      alert('Ingresa un correo electrónico válido');
      return;
    }

     // Verificar si la contraseña tiene al menos 6 caracteres
     if (this.registrocontra.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
  
  
    // El correo electrónico es válido, continuar con el inicio de sesión
    this.registrarCuenta(this.registrocorreo, this.registrocontra);
  }

  async registrarCuenta(registrocorreo: string, registrocontra: string): Promise<void> {
    try{
      const { user } = await this.angularfireauth.createUserWithEmailAndPassword(registrocorreo, registrocontra);
      console.log('Usuario registrado, user');
      alert('El correo ha sido registrado correctamente');
    } catch (error:unknown){
      alert("El correo electronico ya está registrado")
      console.log ('Message', error);
      this.registrocontra = '';
      this.registrocorreo = '';
    }
  }
}
