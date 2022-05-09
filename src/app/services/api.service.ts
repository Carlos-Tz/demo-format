import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Form } from '../models/form';
import { Call } from '../models/call';
import { Cita } from '../models/cita';
import { Casa } from '../models/casa';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  formsList: AngularFireList<any>;
  formObject: AngularFireObject<any>;
  citaObject: AngularFireObject<any>;
  public callList: AngularFireList<any>;
  public citaList: AngularFireList<any>;
  public casasList: AngularFireList<any>;
  public callObject: AngularFireObject<any>;
  public casaObject: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }

  AddForm(form: object) {
    this.formsList.push(form as Form);
  }

  GetFormsList() {
    this.formsList = this.db.list('afinauto/client-list');
    return this.formsList;
  }

  GetForm(key: string) {
    this.formObject = this.db.object('afinauto/client-list/' + key);
    return this.formObject;
  }

  UpdateForm(form: Form, key: string) {
    this.db.object('afinauto/client-list/' + key)
    .update(form);
  }
  /* UpdateEstado(form: Form, key: string) {
    this.db.object('afinauto/client-list/' + key)
    .update(form);
  } */

  UpdateLengthCalls(ncalls: number, key: string) {
    this.db.object('afinauto/client-list/' + key)
    .update({ nCalls: ncalls });
  }

  DeleteForm(key: string) {
    this.formObject = this.db.object('afinauto/client-list/' + key);
    this.formObject.remove();
  }
  DeleteCasa(key: string) {
    this.casaObject = this.db.object('afinauto/casas/' + key);
    this.casaObject.remove();
  }

  DeleteCita(key: string) {
    this.citaObject = this.db.object('afinauto/citas/' + key);
    this.citaObject.remove();
  }

  async AddCall(call: any, key: string) {
      this.callList.push(call as Call);
  }

  GetCall(key: string) {
    this.callList = this.db.list('afinauto/client-list/' + key + '/llamadas', ref =>
      ref.orderByChild('id_')
    );
    return this.callList;
  }
  async AddCita(cita: any) {
      this.citaList.push(cita as Cita);
  }
  async AddCasa(casa: any) {
      this.casasList.push(casa as Casa);
  }

  GetCita() {
    this.citaList = this.db.list('afinauto/citas', ref =>
      ref.orderByChild('id_')
    );
    return this.citaList;
  }
  GetCasas() {
    this.casasList = this.db.list('afinauto/casas', ref =>
      ref.orderByChild('id_')
    );
    return this.casasList;
  }

  GetCurrentCall(key: string, key2: string) {
    this.callObject = this.db.object('afinauto/client-list/' + key + '/llamadas/' + key2);
    return this.callObject;
  }
  GetCurrentCasa(key: string) {
    this.casaObject = this.db.object('afinauto/casas/' + key);
    return this.casaObject;
  }

  UpdateCall(call: Call) {
    this.callObject.update(call);
  }
  UpdateCasa(casa: Casa) {
    this.casaObject.update(casa);
  }
}
