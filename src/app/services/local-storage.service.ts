import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveData(data: any) {
    let dataList = [];
    const existingData = localStorage.getItem('dataList');

    if (existingData) {
      dataList = JSON.parse(existingData);
    }

    dataList.push(data);
    localStorage.setItem('dataList', JSON.stringify(dataList));
  }

  getData(): any[] {
    const dataList = localStorage.getItem('dataList');

    if (dataList) {
      return JSON.parse(dataList);
    }

    return [];
  }

  clearData() {
    localStorage.removeItem('dataList');
  }
}
