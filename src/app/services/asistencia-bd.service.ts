import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { RegistrocuentaComponent } from '../registrocuenta/registrocuenta.component';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class AsistenciaBDService {
  private dbPath = '/registrocuenta';
  registroRef!: AngularFirestoreCollection<any>;



  constructor(private firestore: Firestore) { }


  addCuenta(cuenta: RegistrocuentaComponent){
    const cuentaRef = collection(this.firestore, 'cuenta')
    return addDoc(cuentaRef, cuenta);
  }
}
