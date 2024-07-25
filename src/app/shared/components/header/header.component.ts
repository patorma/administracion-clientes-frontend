import { Component } from '@angular/core';

@Component({
  selector: 'header-clientes',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public title: string ='Sistema de Administración de Clientes';
}
