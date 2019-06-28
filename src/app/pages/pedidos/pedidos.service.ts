import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SacolaService } from '../sacola/sacola.service';
import { UsuarioService } from 'src/app/services/usuario.service';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private http: HttpClient,
    private sacolaService: SacolaService,
    private usuarioService: UsuarioService
  ) { }

  cadastrarPedido() {
    const items = this.sacolaService.sacola
      .map(item => {
        return {
          quantidade: item.quantidade,
          item: item.menuItem._id
         };
      });

    const pedido = { items };

    return this.http.post<any>(API + 'pedidos', pedido);
  }

  listar(dataInicio, dataFim) {
    if (this.usuarioService.isAdmin()) {
      return this.http.get<any>(API + `pedidos?inicio=${dataInicio}&fim=${dataFim}`);
    }
    return this.http.get<any>(API + `pedidos/usuario?inicio=${dataInicio}&fim=${dataFim}`);
  }

  atualizarStatus(idPedido, status) {
    return this.http.put<any>(API + 'pedidos/' + idPedido, { status });
  }
}
