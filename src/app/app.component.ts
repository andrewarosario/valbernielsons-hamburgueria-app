import { Component } from '@angular/core';
import { StartService } from './services/start.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Valbernielsons Hamburgueria';

  constructor(private startService: StartService) {
    this.startService.cadastraDadosIniciais();
  }
}
