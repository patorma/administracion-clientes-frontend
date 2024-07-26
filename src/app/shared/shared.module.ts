import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClientesRoutingModule } from '../clientes/clientes-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
