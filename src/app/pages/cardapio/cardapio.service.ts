import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  constructor(private http: HttpClient) {}

  listar() {
      return this.http.get<any[]>(API + 'items');
  }

  listarPorTipo(tipo: string) {
    return this.http.get<any[]>(API + 'items/tipo/' + tipo);
  }

}
