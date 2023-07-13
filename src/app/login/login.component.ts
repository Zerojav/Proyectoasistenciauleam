import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  usuario: string = '';
  contrasena: string = '';

  constructor(private router: Router, private angularfireauth: AngularFireAuth) {}

  ngOnInit(): void {
  }

  validarCorreo() {
    // Expresión regular para validar el formato de correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // Verificar si el usuario cumple con el formato de correo electrónico
    if (!emailPattern.test(this.usuario)) {
      alert('Ingresa un correo electrónico válido');
      return;
    }
    
    // El correo electrónico es válido, continuar con el inicio de sesión
    this.iniciarSesion();
  }

  async iniciarSesion() {
    try {
      const userCredential = await this.angularfireauth.signInWithEmailAndPassword(this.usuario, this.contrasena);
      // Autenticación exitosa
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['inicio']);
    } catch (error) {
      // Mostrar mensaje de error
      alert('Credenciales incorrectas');
      this.contrasena='';
    }
  }
}