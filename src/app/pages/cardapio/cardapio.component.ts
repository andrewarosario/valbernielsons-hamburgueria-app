import { Component, OnInit } from '@angular/core';
import { CardapioService } from './cardapio.service';
import { Item } from './models/item';
import { ActivatedRoute } from '@angular/router';
import { SacolaService } from '../sacola/sacola.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.sass']
})
export class CardapioComponent implements OnInit {

  items: Item[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private cardapioService: CardapioService,
    private sacolaService: SacolaService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const tipo = this.activatedRoute.snapshot.params['tipo'];
      this.carregarItens(tipo);
    });
  }

  carregarItens(tipo) {
    this.cardapioService.listarPorTipo(tipo)
      .subscribe(items => {
        this.items = items;
      });
  }

  adicionar(item: Item) {
    this.sacolaService.addItem(item);
  }

}
