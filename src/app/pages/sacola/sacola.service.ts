import { Injectable } from '@angular/core';
import { Item } from '../cardapio/models/item';
import { Sacola } from './sacola';
import toastr from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class SacolaService {

  sacola: Sacola[] = [];

  constructor() { }

  limpar() {
    this.sacola = [];
  }

  addItem(item: Item) {
    const itemEncontrado = this.sacola.find((mItem) => mItem.menuItem._id === item._id);
    if (itemEncontrado) {
      this.incrementa(itemEncontrado);
    } else {
      this.sacola.push(new Sacola(item));
    }
    toastr.success(`Você adicionou ${item.titulo} a sua sacola!`);
  }

  incrementa(item: Sacola) {
    item.quantidade = item.quantidade + 1;
  }

  decrementa(item: Sacola) {
    item.quantidade = item.quantidade - 1;
    if (item.quantidade === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: Sacola) {
    this.sacola.splice(this.sacola.indexOf(item), 1);
    toastr.success(`Você removeu ${item.menuItem.titulo} de sua sacola!`);
  }

  get total(): number {
    return this.sacola
      .map(item => item.valor)
      .reduce((prev, value) => prev + value, 0);
  }
}
