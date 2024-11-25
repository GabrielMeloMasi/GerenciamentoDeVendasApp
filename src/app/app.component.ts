import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Comprar', url: '/folder/shop', icon: 'bag' },
    { title: 'Gráficos', url: '/folder/reports', icon: 'analytics' },
    { title: 'Produto', url: '/criar-produto', icon: 'server' },
  ];
  constructor() {}
}
