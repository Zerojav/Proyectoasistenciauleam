import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'T8AW-MeroArcentalesVictorJavier-5A';
  
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isContraolvPage(): boolean {
    return this.router.url === '/contraolv';
  }

  isRegistrocuentaPage(): boolean {
    return this.router.url === '/registrocuenta'
  }

  ngOnInit() {
    setTimeout(() => {
      const allowedRoutes = ['login', 'contraolv', 'registrocuenta']; // Rutas permitidas sin inicio de sesión
      const currentRoute = this.router.url.split('/')[1]; // Obtiene la ruta actual
      console.log('Ruta actual:', currentRoute);
  
      if (!localStorage.getItem('loggedIn') || localStorage.getItem('loggedIn') !== 'true') {
        // Si el usuario no ha iniciado sesión correctamente y la ruta no está permitida, redirige a "login"
        if (!allowedRoutes.includes(currentRoute)) {
          this.router.navigate(['login']);
        }
      }
    }, 100);
  }
  cerrarSesion(){
    localStorage.setItem('loggedIn', 'false');
  }
}
