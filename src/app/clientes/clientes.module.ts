import { LOCALE_ID, NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { CommonModule, registerLocaleData } from '@angular/common';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { FormClienteComponent } from './page/form-cliente/form-cliente.component';
import { ClientesRoutingModule } from './clientes-routing.module';
registerLocaleData(localeEs,'es')//importar esto para cambiar el idioma a español



@NgModule({
  declarations: [
    PaginadorComponent,
    ListarClientesComponent,
    FormClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    ClientesRoutingModule
  ],
  providers:[{provide: LOCALE_ID, useValue: 'es'}]
})
export class ClientesModule { }
