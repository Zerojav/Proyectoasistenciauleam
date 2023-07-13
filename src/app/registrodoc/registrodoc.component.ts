import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrodoc',
  templateUrl: './registrodoc.component.html',
  styleUrls: ['./registrodoc.component.css']
})
export class RegistrodocComponent {
  
  
  constructor(private http: HttpClient) { }

  registrodoc() {
    const pnombre = (<HTMLInputElement>document.getElementById("pnombre")).value;
    const facultad = (<HTMLInputElement>document.getElementById("facultad")).value;
    const correo = (<HTMLInputElement>document.getElementById("correo")).value;
    const telefono = (<HTMLInputElement>document.getElementById("telefono")).value;
    const asignatura = (<HTMLInputElement>document.getElementById("asignatura")).value;
    const horaentrada = (<HTMLInputElement>document.getElementById("horaentrada")).value;
    const horasalida = (<HTMLInputElement>document.getElementById("horasalida")).value;

    if (pnombre === "" || facultad === "" || correo === "" || telefono === "" ||
     asignatura === "" || horaentrada === "" || horasalida === "") {
      alert("Por favor complete todos los campos requeridos.");
    } else {
      const horaEyS = `${horaentrada} - ${horasalida}`;
      const profesor = {
        nombre: pnombre,
        facultad: facultad,
        correo: correo,
        telefono: telefono,
        asignatura: asignatura,
        horaEyS: horaEyS
      };

      let profesoresString = JSON.stringify(profesor);
      localStorage.setItem('profesor', profesoresString);

      // Realizar la solicitud POST al backend para guardar los datos en profesores.json
      this.http.post('http://localhost:3000/profesores', profesor).subscribe(
        () => {
          alert("Datos enviados y guardados");
          location.reload();
        },
        (error) => {
          console.error("Error al guardar los datos en profesores.json", error);
        }
      );
    }
  }

  validardatosdoc(){
    const pnombre = (<HTMLInputElement>document.getElementById("pnombre")).value;
    const facultad = (<HTMLInputElement>document.getElementById("facultad")).value;
    const correo = (<HTMLInputElement>document.getElementById("correo")).value;
    const telefono = (<HTMLInputElement>document.getElementById("telefono")).value;
    const asignatura = (<HTMLInputElement>document.getElementById("asignatura")).value;

  // Expresión regulares para la validacion de los campos
  const patronemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const patronnombre = /^[a-zA-Z\s]*$/;
  const patrontelf = /^\d{10}$/;
  const patronnombre2 = /^[a-zA-Z0-9\- ]*[a-zA-Z][a-zA-Z0-9\- ]*$/
  
  if(!patronnombre.test(pnombre)) {
    alert('Ingresa un nombre válido')
    return;
  }

  if(!patronnombre2.test(facultad)){
    alert('Ingresa un nombre de facultad válido')
    return;
  }
  
  if (!patronemail.test(correo)) {
    alert('Ingresa un correo electrónico válido');
    return;
  }

  if(!patrontelf.test(telefono)){
    alert('Ingresa un telefóno válido (Solo números)')
    return;
  }

  if(!patronnombre2.test(asignatura)){
    alert('Ingresa una asignatura válida')
    return;
  }

    this.registrodoc();
  }
}