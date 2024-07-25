import { Component } from '@angular/core';
import { Autor } from './interface/autor.interface';

@Component({
  selector: 'footer-clientes',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public autor: Autor ={nombre: 'Patricio',apellido: 'Contreras'}
}
