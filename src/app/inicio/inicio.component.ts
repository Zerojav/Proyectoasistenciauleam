import { Component, Injectable } from '@angular/core';
import * as $ from 'jquery';
import { LocalStorageService } from '../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {

  constructor (private localStorageService: LocalStorageService, private http: HttpClient){}
 mensaje() {
  const attendanceData: {
    nombre: string;
    facultad: string;
    asignatura: string;
    correo: string;
    telefono: string;
    horadentradaysalida: string;
    asistencia: boolean;
  }[] = [];

  $('#tabla-asistencia tbody tr').each(function () {
    const nombre = $(this).find('td:eq(0)').text();
    const facultad = $(this).find('td:eq(1)').text();
    const asignatura = $(this).find('td:eq(2)').text();
    const correo = $(this).find('td:eq(3)').text();
    const telefono = $(this).find('td:eq(4)').text();
    const horadentradaysalida = $(this).find('td:eq(5)').text();
    const asistencia = $(this).find('td:eq(6) input[type="checkbox"]').prop('checked');

    attendanceData.push({
      nombre,
      facultad,
      asignatura,
      correo,
      telefono,
      horadentradaysalida,
      asistencia
    });
  });

  // Guardar los datos de asistencia en el localStorage
  localStorage.setItem('attendanceData', JSON.stringify(attendanceData));

  alert('Asistencia Registrada');
  location.reload();
}
  importarXML() {
    $.ajax({
      type: 'GET',
      url: '../../resources/profesores.xml',
      dataType: 'xml'
    }).done((data) => {
      $('#tabla-asistencia tbody').empty();
      $(data).find('profesor').each(function() {
        let fila = $('<tr>');
        fila.append($(`<td>${$(this).find('nombre').text()}</td>`)),
        fila.append($(`<td>${$(this).find('facultad').text()}</td>`)),
        fila.append($(`<td>${$(this).find('asignatura').text()}</td>`));
        fila.append($(`<td>${$(this).find('correo').text()}</td>`));
        fila.append($(`<td>${$(this).find('telefono').text()}</td>`));
        fila.append($(`<td>${$(this).find('horadentradaysalida').text()}</td>`));
        let tdAsistencia = $('<td>');
        let checkbox = $('<input type="checkbox">');
        tdAsistencia.append(checkbox);
        fila.append(tdAsistencia);
        $('#tabla-asistencia tbody').append(fila);
      });
    });
  }

  importarJSON() {
    const data = this.localStorageService.getData();
    const url = 'http://localhost:3000/profesores';

    // Leer el archivo profesores.json
    this.http.get<any[]>(url).subscribe((jsonData) => {
      const combinedData = [...data, ...jsonData];

      if (combinedData.length > 0) {
        $('#tabla-asistencia tbody').empty();
        $.each(combinedData, function (indice, profesor) {
          let fila = $('<tr>');
          fila.append($(`<td>${profesor.nombre}</td>`));
          fila.append($(`<td>${profesor.facultad}</td>`));
          fila.append($(`<td>${profesor.asignatura}</td>`));
          fila.append($(`<td>${profesor.correo}</td>`));
          fila.append($(`<td>${profesor.telefono}</td>`));
          fila.append($(`<td>${profesor.horaEyS}</td>`));
          let checkbox = $('<input>').attr('type', 'checkbox').attr('name', 'asistencia');
          fila.append($('<td>').append(checkbox));
          $('#tabla-asistencia tbody').append(fila);
        });
      } else {
        alert("No hay datos guardados ni disponibles en el archivo profesores.json.");
      }
    });
  }

}
