import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


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

}
