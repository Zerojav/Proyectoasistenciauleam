import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { HttpClient } from '@angular/common/http';

interface AttendanceItem {
  nombre: string;
  facultad: string;
  asignatura: string;
  correo: string;
  telefono: string;
  horadentradaysalida: string;
  asistencia: boolean;
}

@Component({
  selector: 'app-modificarprofesores',
  templateUrl: './modificarprofesores.component.html',
  styleUrls: ['./modificarprofesores.component.css']
})
export class ModificarprofesoresComponent implements OnInit {
  attendanceData: AttendanceItem[] = [];
  searchText: string = '';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    // Obtener los datos del localStorage
    const data = localStorage.getItem('attendanceData');

    // Verificar si los datos existen
    if (data) {
      // Convertir los datos a objeto JSON
      this.attendanceData = JSON.parse(data);

      // Realizar alguna operación con los datos
      console.log(this.attendanceData);
    } else {
      console.log('No se encontraron datos en el localStorage.');
    }
  }

  guardarCambios(): void {
    this.attendanceData.forEach(item => {
      item.asistencia = item.asistencia ? true : false;
    });
  
    // Guardar los datos actualizados en el localStorage
    localStorage.setItem('attendanceData', JSON.stringify(this.attendanceData));
    alert('Datos Guardados');
    location.reload();
  }

  matchesSearch(item: any): boolean {
    if (!this.searchText) {
      return true;
    }
    
    const searchTextLower = this.searchText.toLowerCase();
    const nombreLower = item.nombre.toLowerCase();
    const asignaturaLower = item.asignatura.toLowerCase();
    const facultadLower = item.facultad.toLowerCase();

    return (
      nombreLower.includes(searchTextLower) ||
      asignaturaLower.includes(searchTextLower) ||
      facultadLower.includes(searchTextLower)
    );
  }

  cambiarAsistencia(item: any): void {
    item.asistencia = !item.asistencia;

  }

  eliminarItem(item: any): void {
    const index = this.attendanceData.indexOf(item);
    if (index !== -1) {
      this.attendanceData.splice(index, 1);
    }
  }

  hayFilasOcultas() {
    return this.attendanceData.some(item => !this.matchesSearch(item));
  }

}