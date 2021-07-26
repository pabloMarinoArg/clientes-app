import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
  
})
export class ClienteComponent implements OnInit {

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getListaClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  clientes: Cliente[];

  eliminar(cliente : Cliente){
    swal.fire({
      title: '¿Estás seguro?',
      text: `Estas por eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
       this.clienteService.eliminarCliente(cliente.id).subscribe(
         response => {
          this.clientes = this.clientes.filter(cli => cli !==cliente) 
          swal.fire(
            'Eliminado!',
            `Cliente ${cliente.nombre} ${cliente.apellido} eliminado con exito`,
            'success'
          )
         }
       )
       
       
      }
    })
  }

}
