import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  usuario$: Observable<Usuario>;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) {

      this.usuario$ = usuarioService.getUsuario();
  }

  logout() {
      this.usuarioService.logout();
      this.router.navigate(['']);
  }

  usuarioLogado() {
    return this.usuarioService.isLogged();
  }

  isAdmin() {
    return this.usuarioService.isAdmin();
  }

}
