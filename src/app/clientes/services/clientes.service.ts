import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { Ciudad } from '../interfaces/ciudad.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl: string ='http://localhost:8080/api/';

  constructor(private http: HttpClient,
                private router: Router) { }

  getClientesRequest(page: number): Observable<any>{
    return this.http.get(`${this.apiUrl}clientes/page/${page}`).pipe(
      map((response: any)=>{
        (response.content as Cliente[]).map(({nombre,apellido,email})=>{
           nombre = nombre.toUpperCase();
           apellido = apellido.toUpperCase();
           email = email.toUpperCase();
           console.log(nombre)
           console.log(apellido)
           console.log(email)
           return [nombre,apellido,email]
        })
        return response
      })
    )
  }

  getClientesById(id: number):Observable<Cliente>{
    return this.http
                    .get<Cliente>(`${this.apiUrl}cliente/${id}`)
                    .pipe(
                      catchError((e) => {
                        if(e.status != 401 && e.error.mensaje){
                            /*capturamos el error y redirigimos a gastos*/
                         this.router.navigate(['clientes'])
                          console.error(e.error.mensaje);
                        }
                        return throwError(()=>e);
                      })
                    )
  }

  createCliente(cliente: Cliente): Observable<Cliente>{
    return this.http
                  .post(`${this.apiUrl}cliente`,cliente)
                  .pipe(
                    map((response: any) => response.cliente as Cliente),
                    catchError((e)=>{
                      // el estado 400 viene de la validacion, un bad request
                   if (e.status === 400){

                        return throwError(() =>e);
                      }
                      if(e.error.mensaje){
                         console.error(e.error.mensaje);
                       }
                       return throwError(() =>e);

                   })
                  )
  }

  updateCliente(cliente: Cliente): Observable<Cliente>{
    return this.http
                  .put<Cliente>(`${this.apiUrl}cliente/${cliente.id}`,cliente)
                  .pipe(
                    catchError((e)=>{
                      if (e.status === 400) {
                        return throwError(() =>e);
                      }
                      if(e.error.mensaje){
                        console.error(e.error.mensaje);
                        }
                        return throwError(()=>e);
                    })
                  )
  }

  deleteCliente(id: number): Observable<Cliente>{
    return this.http
                  .delete<Cliente>(`${this.apiUrl}cliente/${id}`)
                  .pipe(
                    catchError((e)=>{
                      if(e.error.mensaje){
                        console.error(e.error.mensaje);
                        }
                      return throwError(()=>e);
                    })
                  )
  }

  getCiudades(): Observable<Ciudad[]>{
    return this.http.get<Ciudad[]>(`${this.apiUrl}clientes/ciudades`).pipe(
      catchError((e)=>{
        console.error('Error al obtener ciudades', e);
        return throwError(()=>e);
      })
    )
  }
}
