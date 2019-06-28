import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API = environment.api;
const KEY = 'start';

@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private http: HttpClient) {}

  cadastraDadosIniciais() {
    if (!this.getStart()) {
      this.http.post(API + 'start', {})
        .subscribe(() => console.log('Dados Cadastrados'));
      this.setStart();
    }
  }

  getStart() {
    return window.localStorage.getItem(KEY);
  }

  setStart() {
    window.localStorage.setItem(KEY, KEY);
  }
}
