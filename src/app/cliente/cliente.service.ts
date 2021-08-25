import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint:string = 'http://localhost:8080/cliente/listar';
  private urlEndPointCrear:string = 'http://localhost:8080/cliente/crear';
  private urlEndPointBuscarId:string = 'http://localhost:8080/cliente/buscarid';
  private urlEndPointEditar:string = 'http://localhost:8080/cliente/modificar';
  private urlEndPointEliminar:string = 'http://localhost:8080/cliente/eliminar';
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(private http:HttpClient, private router:Router) { }

  getListaClientes(page:number): Observable <any>{
    //return of(CLIENTES);
    //return this.http.get<Cliente[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      map((response:any )=> {
        let clientes = response as Cliente[]
        (response.content as Cliente[]).map(
        
          cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();
            cliente.createAt = formatDate(cliente.createAt,"dd/MM/yyyy", "es");
            /* Otra forma es con datepipe, se debe importar datePipe (angular)
            let datePipe = new DatePipe('en-US')
            cliente.createAt = datePipe.transform(cliente.createAt,'dd/MM/yyyy')
            Si en el formato ponemos EEE nos va poner el dia pero abreviado, y si ponemos
            EEEE nos pone el dia completo
            MMM => nombre mes abreviado, MMMM => nombre mes completo
            por ejemplo EEEE dd, MMMM yyyy (nombre dia, numero del dia, el mes en letras completo y el ano)
            otra forma es poniendo directamente en el formato fullDate
            */
            return cliente;
          }
        );
        return response;
      })
    );
  } 

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post(this.urlEndPointCrear,cliente,{headers:this.httpHeaders}).pipe(
      map( (response : any) => response.cliente as Cliente),
      catchError( e=>{
        if(e.status == 400){
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      }

      )
    )

  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPointBuscarId}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/clientes'])
        Swal.fire(e.error.mensaje, e.error.error,"error");
        return throwError(e);
        
      })
    )
  };

  modificarCliente(cliente:Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndPointEditar}/${cliente.id}`,cliente,{headers:this.httpHeaders}).pipe(
      map((response : any) => response.cliente as Cliente),
      catchError( e=>{
        if(e.status == 400){
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      }

      )
    )
  };

  eliminarCliente(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPointEliminar}/${id}`,{headers:this.httpHeaders}).pipe(
      
      catchError( e=>{
        
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      }

      )
    )
  };


}
