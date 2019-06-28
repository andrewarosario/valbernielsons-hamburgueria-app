import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PedidosService } from './pedidos.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.sass']
})
export class PedidosComponent implements OnInit {

  pedidos = [];
  periodo: { startDate: Moment, endDate: Moment } = { startDate: moment(new Date()).add(-30, 'days'), endDate: moment(new Date()) };

  constructor(
    private pedidosService: PedidosService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.filtrarPeriodo();
  }

  preco(item): number {
    return item.item.preco * item.quantidade;
  }

  total(items): number {
    return items
      .map(item => this.preco(item))
      .reduce((prev, value) => prev + value, 0);
  }

  retornaClasseStatus(status) {
    switch (status) {
      case 'aberto':
        return 'secondary';
      case 'andamento':
        return 'warning';
      case 'concluido':
        return 'success';
    }
  }

  filtrarPeriodo() {
    this.pedidosService
      .listar(
        this.periodo.startDate.format('DD-MM-YYYY'),
        this.periodo.endDate.format('DD-MM-YYYY')
      )
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });
  }

  formataData(data) {
    return moment(data).format('DD/MM/YYYY');
  }

  isAdmin() {
    return this.usuarioService.isAdmin();
  }

  alterarStatus(pedido, status) {
    console.log(pedido._id, status);
    this.pedidosService
      .atualizarStatus(pedido._id, status)
      .subscribe(() => pedido.status = status);
  }

}
