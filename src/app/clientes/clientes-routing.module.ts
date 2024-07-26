import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarClientesComponent } from "./pages/listar-clientes/listar-clientes.component";
import { FormClienteComponent } from "./page/form-cliente/form-cliente.component";
import { PaginadorComponent } from "./components/paginador/paginador.component";

const routes: Routes =[
   {
    path: '',
    component: ListarClientesComponent
   },
   {
    path:'formcliente',
    component: FormClienteComponent
   },
   {
    path: 'formcliente/:id',
    component:FormClienteComponent
   },
   {
    path: '',
    component: PaginadorComponent
   }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],

})
export class ClientesRoutingModule { }
