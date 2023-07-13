import { Component } from '@angular/core';


@Component({
  selector: 'app-contraolv',
  templateUrl: './contraolv.component.html',
  styleUrls: ['./contraolv.component.css']
})
export class ContraolvComponent {
  email: string = '';
  contraolv() {
    alert("Peticion enviada, revise su correo");
    location.reload();
  }
}
