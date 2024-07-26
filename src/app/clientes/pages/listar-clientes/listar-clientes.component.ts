import { Component } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent {
    title : string = 'Clientes'
    clientes: Cliente[] = [];
    paginador: any;

    constructor(private clienteService: ClientesService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params:any)=>{
            // el operador suma convierte el string en number
        let page: number = +params.get('page')
        if (!page) {
          page = 0;
        }
        this.clienteService
                  .getClientesRequest(page)
                  .subscribe((response) =>{
                    this.clientes = response.content as Cliente[]
                    this.paginador = response
                  })
      })
    }

    delete(cliente: Cliente): void{
      const swalWithBootstrapButtons =Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
          buttonsStyling: false,
      });
      swalWithBootstrapButtons
             .fire({
              title: 'Está seguro?',
              text: `¿Seguro que desea eliminar el cliente ${cliente.nombre} ${cliente.apellido}?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Si, eliminar!',
              cancelButtonText: 'No, cancelar!',
              reverseButtons: true,
             })
             .then((result) => {
              if (result.value) {
                this.clienteService.deleteCliente(cliente.id).subscribe({
                  next: (response) => {
                    this.clientes = this.clientes.filter((cl) => cl !== cliente);
                    this.router.navigate(['/clientes']);
                    swalWithBootstrapButtons.fire(
                      'Cliente eliminado!',
                      `Cliente de nombre: ${cliente.nombre} ${cliente.apellido} eliminado con éxito.`,
                      'success'
                    );
                  },
                  error: (err) => {
                    // Aquí manejas el error
                    if (err.error.mensaje) {
                      // Muestra el mensaje de error usando Swal
                      swalWithBootstrapButtons.fire('Error', err.error.mensaje, 'error');
                    } else {
                      // Si no hay mensaje de error personalizado, muestra un mensaje genérico
                      swalWithBootstrapButtons.fire('Error', 'Ha ocurrido un error al eliminar el gasto.', 'error');
                    }
                  }
                });
              }
            });

    }

}
