import { Component, OnInit } from '@angular/core';
import { SacolaService } from './sacola.service';
import { Sacola } from './sacola';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { PedidosService } from '../pedidos/pedidos.service';
import toastr from 'toastr';

@Component({
  selector: 'app-sacola',
  templateUrl: './sacola.component.html',
  styleUrls: ['./sacola.component.sass']
})
export class SacolaComponent implements OnInit {

  constructor(
    private sacolaService: SacolaService,
    private usuarioService: UsuarioService,
    private pedidoService: PedidosService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  get items() {
    return this.sacolaService.sacola;
  }

  removerItem(item: Sacola) {
    this.sacolaService.removeItem(item);
  }

  get totalSacola(): number {
    return this.sacolaService.total;
  }

  fecharPedido() {
    if (!this.usuarioService.isLogged()) {
      this.router.navigate(['/login']);
      return;
    }

    this.pedidoService
      .cadastrarPedido()
      .subscribe(
        (res) => {
          toastr.success(res.message);
          this.sacolaService.limpar();
          this.router.navigate(['/pedidos']);
        },
        err => {
          console.log(err);
          toastr.success(err.error.message);
        }
      );

  }

  limpar() {
    this.sacolaService.limpar();
  }

}
