import { Injectable } from '@angular/core';
import { CLIENTES } from './cliente.json';
import { Cliente } from './cliente';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


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

  constructor(private http:HttpClient) { }

  getListaClientes(): Observable <Cliente[]>{
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint);
    /*return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );*/
  } 

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPointCrear,cliente,{headers:this.httpHeaders})

  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPointBuscarId}/${id}`)
  };

  modificarCliente(cliente:Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPointEditar}/${cliente.id}`,cliente,{headers:this.httpHeaders})
  };

  eliminarCliente(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPointEliminar}/${id}`,{headers:this.httpHeaders})
  };


}
