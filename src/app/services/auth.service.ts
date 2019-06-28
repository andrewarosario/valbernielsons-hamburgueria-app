import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginUsuario } from '../models/usuario';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  autenticar(usuario: LoginUsuario) {

    return this.http
      .post<any>(
        API + 'usuarios/autenticar',
        usuario,
        { observe: 'response'}
      )
      .pipe<any>(tap(res => {
        const authToken = res.body['token'];
        this.usuarioService.setToken(authToken);
        console.log(`Usuário ${usuario} autenticado com o token ${authToken}`);
      }));
  }
}
