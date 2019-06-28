import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { Usuario, NovoUsuario } from '../models/usuario';
import * as jtw_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject = new BehaviorSubject<Usuario>(null);
  usuario: Usuario;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
  ) {

      if (this.tokenService.hasToken()) {
        this.decodeAndNotify();
      }
  }

  setToken(token: string) {
      this.tokenService.setToken(token);
      this.decodeAndNotify();
  }

  getUsuario() {
      return this.usuarioSubject.asObservable();
  }

  private decodeAndNotify() {
      const token = this.tokenService.getToken();
      const usuario = jtw_decode(token) as Usuario;
      this.usuario = usuario;
      this.usuarioSubject.next(usuario);
  }

  logout() {
      this.tokenService.removeToken();
      this.usuario = null;
      this.usuarioSubject.next(null);
  }

  isLogged() {
      return this.tokenService.hasToken();
  }

  isAdmin() {
    if (!this.usuario) {
      return false;
    }
    return this.usuario.permissoes.includes('admin');
  }

  cadastrar(novoUsuario: NovoUsuario) {
    return this.http.post<any>(API + 'usuarios', novoUsuario);
  }
}
