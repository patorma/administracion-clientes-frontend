import { Component } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';
import { Ciudad } from '../../interfaces/ciudad.interface';
import { Region } from '../../interfaces/region.interface';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent {

   cliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: 0,
    fechaNacimiento: '',
    ciudad: {
      id: 0,
      nombreCiudad: '',
      region: {
        id: 0,
        nombreRegion: ''
      }
    }
  };
ciudades: Ciudad[] =[];
  public titulo: string = "Crear cliente";
  public errores: string[] =[];

  constructor(private clienteService: ClientesService,private router: Router,
    private activatedRoute:ActivatedRoute){}

    ngOnInit(): void {
      this.cargarCliente()
     }

     cargarCliente(): void {
      this.activatedRoute.params.subscribe((params)=>{
        let id =params['id'];
        if(id){
          this.clienteService
            .getClientesById(id)
            .subscribe((cliente)=>(this.cliente =cliente))
        }
      });
      this.clienteService.getCiudades()
        .subscribe((ciudades) =>(this.ciudades = ciudades))
     }

     create(): void{
       this.clienteService.createCliente(this.cliente).subscribe(
          (cliente) =>{
            this.router.navigate(['/clientes'])
            Swal.fire(
              'Nuevo cliente creado!!',
              `El cliente de nombre ${cliente.nombre} ${cliente.apellido} ha sido creado con éxito!`,
              'success'
            )
          },
          (err:any) =>{
            this.errores = err.error.errors as string[]
            console.error("Codigo del error desde el backend: " + err.status);
            console.error(err.error.errors);
            Swal.fire(
              'Error',
              'Ocurrio un error al ingreso del cliente',
              'error'
            )
          }
       )
     }

     update(): void{
       this.clienteService.updateCliente(this.cliente).subscribe(
        (response: any) =>{
          this.router.navigate(['/clientes']);
          Swal.fire(
            'Cliente actualizado',
            `${response.mensaje}: era de nombre ${response.cliente.nombre}`,
             'success'
          )
        },
        (err)=>{
          this.errores = err.error.errors as string[];
         console.error("Codigo del error desde el backend: " + err.status);
         console.error(err.error.errors);
        }
       )
     }

   // el primer objeto corresponde a cada una de los tipos de cliente
  // el segundo objeto es el objeto asignado al cliente y ahi hay que comparar
  compararCiudad(o1: Ciudad,o2: Ciudad): boolean{
    // se compara el objeto 1 y el objeto 2
   // si es undefined se deja marcado el seleccionar con un mensaje
   if (o1  ===  undefined &&  o2  ===  undefined ){
     return true;
   }
   return o1 === null || o2 === null || o1 === undefined || o2 === undefined
   ? false
   : o1.id === o2.id;

 }
}
