import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Shop', url: '/folder/shop', icon: 'bag' },
    { title: 'Reports', url: '/folder/reports', icon: 'analytics' },
  ];
  constructor() {}
}
