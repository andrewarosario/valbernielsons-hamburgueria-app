import { Item } from '../cardapio/models/item';

export class Sacola {
  constructor(public menuItem: Item,
              public quantidade: number = 1
            ) {}

  get valor(): number {
    return this.menuItem.preco * this.quantidade;
  }
}
